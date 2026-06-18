from __future__ import annotations

import sys
from pathlib import Path

import pdfplumber


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: extract_pdf_text.py <pdf-path>", file=sys.stderr)
        return 2

    path = Path(sys.argv[1])
    with pdfplumber.open(path) as pdf:
        print(f"PAGES {len(pdf.pages)}")
        for index, page in enumerate(pdf.pages, start=1):
            print(f"--- PAGE {index} ---")
            print(page.extract_text() or "")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
