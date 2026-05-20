import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

export type ScreenItem = {
  id: string;
  group: string;
  relPath: string;
  hasScreen: boolean;
};

export type ScreenGroup = {
  key: string;
  label: string;
  items: ScreenItem[];
};

const TARGET_GROUPS = ["(cx-example)", "(nova-mbr-fp)", "(nova-mbr-fp-legacy)"] as const;

function scanGroup(appDir: string, groupFolder: string): ScreenItem[] {
  const groupDir = join(appDir, groupFolder);
  if (!existsSync(groupDir)) return [];

  const label = groupFolder.replace(/[()]/g, "");
  const items: ScreenItem[] = [];

  for (const entry of readdirSync(groupDir)) {
    const full = join(groupDir, entry);
    if (!statSync(full).isDirectory()) continue;

    const relPath = `${groupFolder}/${entry}/Screen.tsx`;
    items.push({
      id: entry,
      group: label,
      relPath,
      hasScreen: existsSync(join(full, "Screen.tsx")),
    });
  }

  items.sort((a, b) => a.id.localeCompare(b.id));
  return items;
}

export async function GET() {
  const appDir = join(process.cwd(), "../mobile/src/app");

  const groups: ScreenGroup[] = TARGET_GROUPS.map((folder) => ({
    key: folder,
    label: folder.replace(/[()]/g, ""),
    items: scanGroup(appDir, folder),
  }));

  return NextResponse.json(groups);
}
