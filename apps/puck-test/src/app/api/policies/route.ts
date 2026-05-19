import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

export type PolicyItem = {
  id: string;
  parent: string;
  domain: string;
  group: string;
  title: string;
  sourceText: string;
};

function extract(src: string, key: string): string {
  const m = src.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  return m ? m[1] : "";
}

function walkDir(dir: string, result: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkDir(full, result);
    } else if (entry.endsWith(".policy.ts")) {
      result.push(full);
    }
  }
  return result;
}

export async function GET() {
  const policyRoot = join(
    process.cwd(),
    "../../packages/policy-core/policies",
  );

  const files = walkDir(policyRoot);
  const items: PolicyItem[] = [];

  for (const file of files) {
    const src = readFileSync(file, "utf-8");
    const id = extract(src, "id");
    if (!id) continue;
    items.push({
      id,
      parent: extract(src, "parent"),
      domain: extract(src, "domain"),
      group: extract(src, "group"),
      title: extract(src, "title"),
      sourceText: extract(src, "sourceText"),
    });
  }

  items.sort((a, b) => a.id.localeCompare(b.id));

  return NextResponse.json(items);
}
