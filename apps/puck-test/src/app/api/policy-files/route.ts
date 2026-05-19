import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { NextResponse } from "next/server";

export type PolicyFile = {
  id: string;
  domain: string;
  group: string;
  relPath: string;
};

function walkPolicyFiles(dir: string, root: string, result: PolicyFile[] = []): PolicyFile[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walkPolicyFiles(full, root, result);
    } else if (entry.endsWith(".md") && !entry.startsWith("_")) {
      const rel = relative(root, full);
      // rel = "MBR/AUTH/POL-MBR-AUTH-001.md"
      const parts = rel.split("/");
      const domain = parts[0] ?? "";
      const group = parts[1] ?? "";
      const id = entry.replace(".md", "");
      result.push({ id, domain, group, relPath: rel });
    }
  }
  return result;
}

export async function GET() {
  const policiesRoot = join(process.cwd(), "../../packages/policy-core/policies");
  const items = walkPolicyFiles(policiesRoot, policiesRoot);
  items.sort((a, b) => a.id.localeCompare(b.id));
  return NextResponse.json(items);
}
