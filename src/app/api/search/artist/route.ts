import { NextRequest, NextResponse } from "next/server";
import { searchArtist } from "@/lib/search/artist";

export const GET = async (request: NextRequest, response: NextResponse) => {
	let query;

	const url = new URL(request.url);
	query = url.searchParams.get("q");

	if (query) {
		return NextResponse.json(await searchArtist(query), { status: 200 });
	} else {
		return NextResponse.json([], { status: 404 });
	}
};
