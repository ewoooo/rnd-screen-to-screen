import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { NextResponse } from "next/server";

export type ScreenItem = {
  id: string;
  group: string;
  relPath: string;
};

// 임시 타겟 설정: nova-mbr-fp만, 003-0-CX 제외
const TARGET_GROUP = "(nova-mbr-fp)";
const EXCLUDE_IDS = ["NOVA-MBR-FP-003-0-CX"];

function walkScreens(dir: string, root: string, result: ScreenItem[] = []): ScreenItem[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walkScreens(full, root, result);
    } else if (entry === "Screen.tsx") {
      const rel = relative(root, full);
      const parts = rel.split("/");
      const groupRaw = parts[0]?.replace(/[()]/g, "") ?? "unknown";
      const id = parts[1] ?? rel;
      result.push({ id, group: groupRaw, relPath: rel });
    }
  }
  return result;
}

export async function GET() {
  const targetDir = join(process.cwd(), "../mobile/src/app", TARGET_GROUP);
  const items = walkScreens(targetDir, join(process.cwd(), "../mobile/src/app"))
    .filter((s) => !EXCLUDE_IDS.includes(s.id));
  items.sort((a, b) => a.id.localeCompare(b.id));
  return NextResponse.json(items);
}
