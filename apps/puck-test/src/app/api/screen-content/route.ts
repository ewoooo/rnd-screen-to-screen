import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const relPath = req.nextUrl.searchParams.get("path");
  if (!relPath) return NextResponse.json({ error: "missing path" }, { status: 400 });

  // Sanitize: no traversal outside mobile app dir
  if (relPath.includes("..")) {
    return NextResponse.json({ error: "invalid path" }, { status: 400 });
  }

  const absPath = join(process.cwd(), "../mobile/src/app", relPath);
  if (!existsSync(absPath)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const content = readFileSync(absPath, "utf-8");
  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
