# Skill marks

These upstream marks are stored locally so the skill cards work without external
image requests. Organization marks identify the makers of models without a
dedicated project logo; their original colors are preserved.

| Asset | Used for | Official source |
| --- | --- | --- |
| `meta.svg` | SAM 3, SAM 3D | [Meta SAM 3 page favicon](https://static.xx.fbcdn.net/rsrc.php/yf/r/-7pQO6hUGK_.svg), linked by [Meta's project page](https://ai.meta.com/research/sam3/) |
| `microsoft.ico` | MoGe | [Microsoft favicon](https://www.microsoft.com/favicon.ico?v2); [MoGe repository](https://github.com/microsoft/MoGe) |
| `nvidia.ico` | Kimodo | [NVIDIA favicon](https://www.nvidia.com/favicon.ico), linked by [Kimodo's project page](https://research.nvidia.com/labs/sil/projects/kimodo/) |
| `blender.svg` | Blender | [Blender favicon](https://www.blender.org/wp-content/themes/bthree/assets/icons/favicon.svg), linked by [Blender's logo page](https://www.blender.org/about/logo/) |

RoboKit and GraspKit reuse the existing OpenRoboKit gear mark in `../gear/`.
GeoCalib, HaWoR and GVHMR use calibration, hand and human-motion icons: no dedicated project logo was available
from their official repositories, and the latter two project-site icon links
returned 404 when checked on 2026-10-26. These inline SVGs are capability icons, not
upstream logos.
