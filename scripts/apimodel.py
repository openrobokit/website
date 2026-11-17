# /// script
# requires-python = ">=3.10"
# dependencies = ["griffe>=2,<3", "pyyaml>=6,<7"]
# ///
"""griffe object -> the reference model scripts/apihtml.py renders.

Nothing here round-trips through Markdown: griffe already knows each
parameter's type, default and description, so a page carries that structure
into the kit's data/docs file directly. Only the free prose of a docstring -- its text,
examples and admonitions -- goes through md2doc, because that part really is
Markdown.

The importer calls `load_package` once, then `resolve` for each `:::` name a
document asked for.
"""

import ast
import re
import sys
from pathlib import Path
from typing import NamedTuple

from griffe import Alias, Class, Function, Module, Object, load
from md2doc import Converter


class Repo(NamedTuple):
    """Where the package is read from, and where its [source] links point."""

    src: Path  # the import root, e.g. <repo>/src
    github: str  # repository URL, with a trailing slash


# sections that become structured fields rather than prose
STRUCTURED = ("parameters", "attributes", "returns")
VARIADIC = {"var_positional": "*", "var_keyword": "**"}


def text(value) -> str:
    return "" if value is None else str(value)


def prose(obj: Object, conv: Converter, level: int = 2) -> str:
    """A docstring's free prose as HTML: text, examples, admonitions, raises.

    The section titles are headings, not bold runs, so an Examples block sits at
    the same weight as the Parameters the renderer draws around it. `level` is
    2 for a published symbol and 3 inside a member row.
    """
    if not obj.docstring:
        return ""
    hn = "#" * level
    out: list[str] = []
    for section in obj.docstring.parsed:
        kind, value = section.kind.value, section.value
        if kind in STRUCTURED:
            continue
        if kind == "text":
            out.append(value)
        elif kind in ("raises", "yields"):
            items = []
            for item in value:
                name = getattr(item, "name", "")
                annotation = text(getattr(item, "annotation", ""))
                label = f"`{name}`" if name else f"`{annotation}`" if annotation else "Value"
                if name and annotation:
                    label += f" (`{annotation}`)"
                items.append(f"- {label}: {item.description}")
            out.append(f"{hn} {kind.title()}\n\n" + "\n".join(items))
        elif kind == "examples":
            out.append(f"{hn} Examples")
            for _, example in value:
                out.append(f"```python\n{example}\n```")
        elif kind == "admonition":
            out.append(f"{hn} {value.annotation.replace('-', ' ').title()}")
            description = value.description
            out.append(
                f"```python\n{description}\n```"
                if description.lstrip().startswith(">>>")
                else description
            )
    if not out:
        return ""
    # A copied example imports what it reads from the module: its own names, and its imports as written.
    conv.example_imports = {name: f"from {obj.module.path} import {name}" for name in obj.module.members}
    for node in ast.parse(Path(obj.module.filepath).read_text()).body:
        if isinstance(node, ast.Import) or (isinstance(node, ast.ImportFrom) and not node.level):
            for alias in node.names:
                conv.example_imports[alias.asname or alias.name.split(".")[0]] = ast.unparse(
                    type(node)(**{**vars(node), "names": [alias]})
                )
    try:
        return conv.fragment("\n\n".join(out))
    finally:
        conv.example_imports = {}


def docstring_map(obj: Object, kind: str) -> dict:
    """`{name: (annotation, description)}` for one structured docstring section."""
    if not obj.docstring:
        return {}
    found = {}
    for section in obj.docstring.parsed:
        if section.kind.value != kind:
            continue
        for item in section.value:
            found[getattr(item, "name", "")] = (
                text(getattr(item, "annotation", "")),
                item.description,
            )
    return found


def parameters(func: Function, conv: Converter, extra: dict | None = None) -> list[dict]:
    """Signature parameters, each carrying its docstring description.

    `extra` covers the constructors: no class here documents its arguments on
    `__init__`, so the Args block sits on the class docstring instead.
    """
    docs = {**(extra or {}), **docstring_map(func, "parameters")}
    out = []
    for param in func.parameters:
        if param.name in ("self", "cls"):
            continue
        kind = getattr(param.kind, "value", str(param.kind))
        if kind == "keyword_only" and param.name == "*":
            continue  # the bare keyword-only marker carries no information
        prefix = VARIADIC.get(kind, "")
        doc_annotation, description = docs.get(param.name, ("", ""))
        default = text(param.default) if param.default is not None else None
        out.append(
            {
                "name": prefix + param.name,
                "type": text(param.annotation) or doc_annotation,
                "default": default,
                "required": default is None and not prefix,
                "doc": conv.fragment(description) if description else "",
            }
        )
    return out


def returns(func: Function, conv: Converter) -> dict | None:
    annotation = text(func.returns)
    doc_annotation, description = docstring_map(func, "returns").get("", ("", ""))
    annotation = annotation or doc_annotation
    if not annotation and not description:
        return None
    return {"type": annotation, "doc": conv.fragment(description) if description else ""}


def source(obj: Object, repo: Repo) -> str:
    filepath = getattr(obj, "filepath", None)
    if not filepath:
        return ""
    try:
        relative = Path(filepath).resolve().relative_to(repo.src.resolve())
    except ValueError:
        return ""
    line = getattr(obj, "lineno", None)
    return f"{repo.github}blob/main/src/{relative}" + (f"#L{line}" if line else "")


def members(cls: Class, repo: Repo, conv: Converter) -> list[dict]:
    """Public attributes, properties and methods.

    Inherited members come first, in the order the base declares them, because
    that is the order a dataclass config takes its arguments; anything the
    class redeclares replaces the inherited entry in place.
    """
    attribute_docs = docstring_map(cls, "attributes")
    try:
        inherited = dict(cls.inherited_members)
    except Exception:
        inherited = {}
    ordered = {name: (m, True) for name, m in inherited.items()}
    ordered.update({name: (m, False) for name, m in cls.members.items()})
    out = []
    for name, (member, is_inherited) in ordered.items():
        if name.startswith("_"):
            continue
        # an inherited member arrives as an alias into the base class, whose
        # name is worth showing: it tells you where to look for the real docs
        if isinstance(member, Alias):
            try:
                member = member.final_target
            except Exception:
                continue
        owner = getattr(getattr(member, "parent", None), "name", "")
        base = owner if is_inherited and owner and owner != cls.name else ""
        if isinstance(member, Function):
            is_property = "property" in member.labels
            signature = str(member.signature())
            if is_property:
                signature = f"{name}: {text(member.returns)}" if member.returns else name
            out.append(
                {
                    "kind": "property" if is_property else "method",
                    "base": base,
                    "name": name,
                    "signature": signature,
                    "source": source(member, repo),
                    "doc": prose(member, conv, 3),
                    "params": [] if is_property else parameters(member, conv),
                    "returns": None if is_property else returns(member, conv),
                }
            )
        elif member.is_attribute and member.annotation is not None:
            # griffe models a @property as an attribute whose annotation is
            # the getter's return type
            is_property = "property" in member.labels
            signature = f"{name}: {text(member.annotation)}"
            if "class-attribute" in member.labels and member.value is not None:
                signature += f" = {text(member.value)}"
            description = (
                member.docstring.value
                if member.docstring
                else attribute_docs.get(name, ("", ""))[1]
            )
            out.append(
                {
                    "kind": "property" if is_property else "attribute",
                    "base": base,
                    "name": name,
                    "signature": signature,
                    "source": source(member, repo),
                    "doc": prose(member, conv, 3) if member.docstring else conv.fragment(description) if description else "",
                    "params": [],
                    "returns": None,
                }
            )
    return out


def symbol(public_name: str, module_name: str, obj: Object, repo: Repo, conv: Converter) -> dict:
    """One published class or function, as the reference block needs it."""
    # a symbol published from its own module (geom.sample_farthest_points)
    # would otherwise repeat its name in the qualified head
    if module_name.endswith(f".{public_name}"):
        module_name = module_name.rsplit(".", 1)[0]
    entry = {
        "kind": "class" if isinstance(obj, Class) else "function",
        "name": public_name,
        "module": module_name,
        "source": source(obj, repo),
        "anchor": re.sub(r"[^a-z0-9]+", "-", public_name.lower()).strip("-"),
        "doc": prose(obj, conv),
    }
    if isinstance(obj, Class):
        bases = ", ".join(text(base) for base in obj.bases)
        if bases:
            entry["bases"] = bases
        init = obj.members.get("__init__")
        entry["params"] = (
            parameters(init, conv, docstring_map(obj, "parameters"))
            if isinstance(init, Function)
            else []
        )
        # a dataclass has no __init__ to read, so the head keeps just the name
        entry["callable"] = isinstance(init, Function)
        entry["returns"] = None
        entry["members"] = members(obj, repo, conv)
    else:
        entry["params"] = parameters(obj, conv)
        entry["callable"] = True
        entry["returns"] = returns(obj, conv)
        entry["members"] = []
    return entry


def load_package(name: str, src: Path) -> Module:
    """Load one package for reading, without importing it."""
    return load(
        name,
        search_paths=[src],
        allow_inspection=False,
        resolve_aliases=True,
        resolve_external=False,
        resolve_implicit=True,
        docstring_parser="google",
    )


def resolve(package: Module, qualname: str, repo: Repo, conv: Converter) -> dict:
    """Turn a `::: pkg.mod.Symbol` name into the model the renderer wants."""
    module_path, _, public_name = qualname.rpartition(".")
    relative = re.sub(rf"^{package.name}\.?", "", module_path)
    module = package[relative] if relative else package
    if not isinstance(module, Module):
        sys.exit(f"module not found: {module_path}")
    if public_name not in module.members:
        sys.exit(f"not found: {qualname}")
    selected = module[public_name]
    obj = selected.final_target if isinstance(selected, Alias) else selected
    if not isinstance(obj, (Class, Function)):
        sys.exit(f"unsupported API object: {qualname}")
    return symbol(public_name, module_path, obj, repo, conv)
