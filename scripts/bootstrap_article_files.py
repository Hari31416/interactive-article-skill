#!/usr/bin/env python3
"""Copy interactive article starter files from the skill assets into a target directory."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Copy style.css, script.js, and template.html from this skill's "
            "assets folder into a target directory."
        )
    )
    parser.add_argument(
        "target_dir",
        nargs="?",
        default=".",
        help="Directory where starter files should be copied (default: current directory).",
    )
    parser.add_argument(
        "--article-file",
        help=(
            "If provided, template.html is copied using this output file name "
            "(example: oauth-guide.html)."
        ),
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite destination files if they already exist.",
    )
    return parser.parse_args()


def copy_file(src: Path, dst: Path, overwrite: bool) -> None:
    if dst.exists() and not overwrite:
        raise FileExistsError(
            f"Destination file already exists: {dst}\n"
            "Use --overwrite to replace existing files."
        )
    shutil.copy2(src, dst)


def main() -> int:
    args = parse_args()

    script_dir = Path(__file__).resolve().parent
    skill_dir = script_dir.parent
    assets_dir = skill_dir / "assets"

    required_assets = {
        "style.css": "style.css",
        "script.js": "script.js",
        "template.html": args.article_file or "template.html",
    }

    target_dir = Path(args.target_dir).expanduser().resolve()
    target_dir.mkdir(parents=True, exist_ok=True)

    for source_name, target_name in required_assets.items():
        src = assets_dir / source_name
        if not src.exists():
            raise FileNotFoundError(f"Missing required asset: {src}")

        dst = target_dir / target_name
        copy_file(src, dst, args.overwrite)
        print(f"Copied {source_name} -> {dst}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
