import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { NextResponse } from "next/server";

export type ScreenItem = {
  id: string;
  group: string;
  relPath: string;
};

const GROUP_LABEL: Record<string, string> = {
  "chg": "CHG",
  "nova-mbr-fp": "Nova MBR FP",
  "nova-mbr-fp-legacy": "Nova MBR FP Legacy",
  "wds-mbr-legacy": "Legacy MBR",
  "cx-example": "CX Example",
};

function walkScreens(dir: string, root: string, result: ScreenItem[] = []): ScreenItem[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walkScreens(full, root, result);
    } else if (entry === "Screen.tsx") {
      const rel = relative(root, full);
      // rel = "(group)/SCREEN-ID/Screen.tsx"
      const parts = rel.split("/");
      const groupRaw = parts[0]?.replace(/[()]/g, "") ?? "unknown";
      const id = parts[1] ?? rel;
      result.push({
        id,
        group: GROUP_LABEL[groupRaw] ?? groupRaw,
        relPath: rel,
      });
    }
  }
  return result;
}

export async function GET() {
  const mobileAppDir = join(process.cwd(), "../mobile/src/app");
  const items = walkScreens(mobileAppDir, mobileAppDir);
  items.sort((a, b) => a.id.localeCompare(b.id));
  return NextResponse.json(items);
}
