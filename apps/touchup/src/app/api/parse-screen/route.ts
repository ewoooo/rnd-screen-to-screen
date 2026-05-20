import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import type { Data } from "@puckeditor/core";

// All component names registered in puckConfig (cx-components)
const KNOWN_COMPONENTS = [
  "TitleMain", "TitleSection", "TitleContents", "TitleBottomSheet", "Text",
  "AppBar", "StatusBar", "Tab", "TabItem", "UnderlineTab", "Footer",
  "Button", "ActionButton", "IconButton",
  "TextField", "Checkbox", "RadioButton", "SearchBar",
  "ListText", "ListSelected", "SectionItem", "PageStackList",
  "Accordion", "AccordionList", "RQRCard", "RQRContentsDetail", "RQRListOption",
  "Badge", "BadgeIcon", "Indicator", "Callout", "Notice",
  "BannerHorizontal", "Popup", "Tooltip", "Chips", "ChipItem", "FilterSorting",
  "Divider", "Handle", "Bottomsheet",
] as const;

function extractOpeningTag(src: string, startIdx: number): string {
  // Collect characters from startIdx until we find an unescaped '>' at depth 0
  // (skipping nested {})
  let depth = 0;
  let i = startIdx;
  while (i < src.length) {
    const ch = src[i];
    if (ch === "{") { depth++; i++; continue; }
    if (ch === "}") { depth--; i++; continue; }
    if (depth === 0 && ch === ">") return src.slice(startIdx, i + 1);
    i++;
  }
  return src.slice(startIdx, i);
}

function parseProps(tagContent: string): Record<string, unknown> {
  const props: Record<string, unknown> = {};

  // prop="string"
  const str1 = /(\w+)="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = str1.exec(tagContent)) !== null) props[m[1]] = m[2];

  // prop={"string"}
  const str2 = /(\w+)=\{"([^"]*)"\}/g;
  while ((m = str2.exec(tagContent)) !== null) props[m[1]] = m[2];

  // prop={true|false}
  const bools = /(\w+)=\{(true|false)\}/g;
  while ((m = bools.exec(tagContent)) !== null) props[m[1]] = m[2] === "true";

  // prop={number}
  const nums = /(\w+)=\{(\d+(?:\.\d+)?)\}/g;
  while ((m = nums.exec(tagContent)) !== null) props[m[1]] = parseFloat(m[2]);

  // standalone boolean attribute: visible (without =)
  const standalone = /\b(\w+)(?=\s|\/|>)(?![=({])/g;
  while ((m = standalone.exec(tagContent)) !== null) {
    const name = m[1];
    // skip JSX tag name itself and already-set props
    if (name in props || name === name[0].toUpperCase() + name.slice(1)) continue;
    props[name] = true;
  }

  return props;
}

function screenToData(src: string): Data {
  const content: Data["content"] = [];
  const counters: Record<string, number> = {};

  // Find each known component in source order
  const hits: Array<{ idx: number; type: string }> = [];
  for (const name of KNOWN_COMPONENTS) {
    const re = new RegExp(`<${name}[\\s/>]`, "g");
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) {
      hits.push({ idx: m.index, type: name });
    }
  }
  hits.sort((a, b) => a.idx - b.idx);

  for (const { idx, type } of hits) {
    const tagStr = extractOpeningTag(src, idx);
    const rawProps = parseProps(tagStr);

    // Remove JSX-internal attrs not meaningful as Puck props
    const { "data-section-id": _a, "data-ogn-id": _b, className: _c, ...cleanProps } = rawProps as Record<string, unknown>;

    const n = counters[type] ?? 0;
    counters[type] = n + 1;
    const id = `${type.toLowerCase()}-${n}`;

    content.push({ type, props: { id, ...cleanProps } });
  }

  return { content, root: { props: {} } };
}

export async function GET(req: NextRequest) {
  const relPath = req.nextUrl.searchParams.get("path");
  if (!relPath) return NextResponse.json({ error: "missing path" }, { status: 400 });
  if (relPath.includes("..")) return NextResponse.json({ error: "invalid path" }, { status: 400 });

  const absPath = join(process.cwd(), "../mobile/src/app", relPath);
  if (!existsSync(absPath)) return NextResponse.json({ error: "not found" }, { status: 404 });

  const src = readFileSync(absPath, "utf-8");
  const data = screenToData(src);
  return NextResponse.json(data);
}
