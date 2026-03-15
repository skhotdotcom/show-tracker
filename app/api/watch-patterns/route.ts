// app/api/watch-patterns/route.ts
// GET — returns per-genre statistics computed from all tracked shows.

import { NextResponse } from "next/server";
import { getWatchPatterns } from "@/lib/db";

export async function GET() {
  try {
    const patterns = getWatchPatterns();
    return NextResponse.json(patterns);
  } catch (error) {
    console.error("Error computing watch patterns:", error);
    return NextResponse.json({ error: "Failed to compute watch patterns" }, { status: 500 });
  }
}
