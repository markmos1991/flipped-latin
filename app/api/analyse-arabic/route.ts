import { NextRequest, NextResponse } from "next/server";
import { RuleBasedTransliterator } from "@/lib/arabic/providers/rule-based";

// Swap this import for the Claude provider when ready — nothing else changes.
const transliterator = new RuleBasedTransliterator();

export async function POST(req: NextRequest) {
  try {
    const { arabic } = await req.json();

    if (typeof arabic !== "string" || !arabic.trim()) {
      return NextResponse.json({ error: "arabic field required" }, { status: 400 });
    }

    const words = await transliterator.analyse(arabic.trim());
    return NextResponse.json({ words });
  } catch {
    return NextResponse.json({ error: "analysis failed" }, { status: 500 });
  }
}
