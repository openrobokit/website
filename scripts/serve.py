"""Static file server for local development — `make serve`.

The one thing it does that `python3 -m http.server` does not is answer `Range`
requests. Without them a browser cannot seek inside a `<video>`: it plays from
the start or not at all. The retargetingkit ablation scrubber does nothing but
seek, so on the stdlib server that whole control silently does nothing. GitHub
Pages answers ranges, so this only ever matters here.

    python3 scripts/serve.py [port] [root]
"""

import functools
import http.server
import os
import re
import socketserver
import sys

RANGE = re.compile(r"bytes=(\d*)-(\d*)")


class _Slice:
    """A read-only window onto an open file, for the 206 body."""

    def __init__(self, file, length):
        self.file = file
        self.left = length

    def read(self, size=-1):
        if self.left <= 0:
            return b""
        want = self.left if size < 0 else min(size, self.left)
        chunk = self.file.read(want)
        self.left -= len(chunk)
        return chunk

    def close(self):
        self.file.close()


class RangeHandler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        header = self.headers.get("Range")
        path = self.translate_path(self.path)
        # directory listings and index.html resolution stay with the base class
        if not header or os.path.isdir(path):
            return super().send_head()

        match = RANGE.match(header)
        if not match:
            return super().send_head()
        try:
            file = open(path, "rb")
        except OSError:
            self.send_error(404)
            return None

        size = os.fstat(file.fileno()).st_size
        start = int(match.group(1)) if match.group(1) else 0
        end = min(int(match.group(2)), size - 1) if match.group(2) else size - 1
        if start > end or start >= size:
            file.close()
            self.send_response(416)
            self.send_header("Content-Range", f"bytes */{size}")
            self.end_headers()
            return None

        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(end - start + 1))
        self.end_headers()
        file.seek(start)
        return _Slice(file, end - start + 1)

    def end_headers(self):
        # Local previews must reflect the latest build, including media and scripts.
        self.send_header("Cache-Control", "no-store")
        # a full response has to advertise ranges too, or the browser will not
        # try to seek in the first place
        if not self.headers.get("Range"):
            self.send_header("Accept-Ranges", "bytes")
        super().end_headers()

    def log_message(self, *args):
        pass


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8914
    root = sys.argv[2] if len(sys.argv) > 2 else "."
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    handler = functools.partial(RangeHandler, directory=root)
    with socketserver.ThreadingTCPServer(("", port), handler) as server:
        print(f"serving {os.path.abspath(root)} on http://localhost:{port}")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
