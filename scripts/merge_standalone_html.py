#!/usr/bin/env python3
"""Merge external local CSS and JavaScript files into a single standalone HTML document."""

from __future__ import annotations

import argparse
import logging
import re
from pathlib import Path

logger = logging.getLogger(__name__)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Merge external local stylesheets and scripts referenced in an HTML "
            "file into inline <style> and <script> tags to create a standalone document."
        )
    )
    parser.add_argument(
        "input_html",
        help="Path to the input HTML file.",
    )
    parser.add_argument(
        "--output",
        "-o",
        help="Path to the output standalone HTML file. If not provided, overwrites the input file in place.",
    )
    return parser.parse_args()


def merge_html(input_path: Path, output_path: Path) -> None:
    if not input_path.exists():
        raise FileNotFoundError(f"Input HTML file does not exist: {input_path}")

    content = input_path.read_text(encoding="utf-8")
    base_dir = input_path.parent

    # 1. Inline stylesheets
    link_pattern = re.compile(r"<link\s+[^>]+>", flags=re.IGNORECASE)
    matches = list(link_pattern.finditer(content))
    for match in reversed(matches):
        tag_text = match.group(0)
        if re.search(r'rel=["\']stylesheet["\']', tag_text, flags=re.IGNORECASE):
            href_match = re.search(
                r'href=["\']([^"\']+)["\']', tag_text, flags=re.IGNORECASE
            )
            if href_match:
                href = href_match.group(1)
                if not href.startswith(("http://", "https://", "//")):
                    css_path = (base_dir / href).resolve()
                    if not css_path.exists():
                        raise FileNotFoundError(
                            f"Referenced stylesheet not found: {css_path}"
                        )
                    logger.info(f"Inlining stylesheet: {href}")
                    css_content = css_path.read_text(encoding="utf-8")
                    replacement = f"<style>\n/* Inlined from {href} */\n{css_content}\n</style>"
                    content = (
                        content[: match.start()] + replacement + content[match.end() :]
                    )

    # 2. Inline scripts
    script_pattern = re.compile(
        r"<script\s+([^>]+)>([\s\S]*?)</script>", flags=re.IGNORECASE
    )
    matches = list(script_pattern.finditer(content))
    for match in reversed(matches):
        attrs = match.group(1)
        src_match = re.search(r'src=["\']([^"\']+)["\']', attrs, flags=re.IGNORECASE)
        if src_match:
            src = src_match.group(1)
            if not src.startswith(("http://", "https://", "//")):
                js_path = (base_dir / src).resolve()
                if not js_path.exists():
                    raise FileNotFoundError(f"Referenced script not found: {js_path}")
                logger.info(f"Inlining script: {src}")
                js_content = js_path.read_text(encoding="utf-8")
                replacement = (
                    f"<script>\n/* Inlined from {src} */\n{js_content}\n</script>"
                )
                content = (
                    content[: match.start()] + replacement + content[match.end() :]
                )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8")
    logger.info(f"Successfully generated standalone HTML: {output_path}")


def main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(message)s")
    args = parse_args()

    input_path = Path(args.input_html).expanduser().resolve()
    output_path = (
        Path(args.output).expanduser().resolve() if args.output else input_path
    )

    try:
        merge_html(input_path, output_path)
    except Exception as e:
        logger.error(f"Error: {e}")
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
