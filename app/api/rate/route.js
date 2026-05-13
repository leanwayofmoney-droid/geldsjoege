import { NextResponse } from "next/server";
import { getRating, addRating } from "../../../lib/ratings";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ avg: 0, count: 0 });
  const rating = await getRating(slug);
  return NextResponse.json(rating);
}

export async function POST(request) {
  try {
    const { slug, stars } = await request.json();
    if (!slug || !stars || stars < 1 || stars > 5) {
      return NextResponse.json({ error: "Ongeldige input" }, { status: 400 });
    }
    const result = await addRating(slug, Number(stars));
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "KV niet beschikbaar" }, { status: 503 });
  }
}
