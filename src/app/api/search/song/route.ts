import { NextRequest, NextResponse } from "next/server";
import { searchSong } from "@/lib/search/song";

export const GET = async (request: NextRequest, response: NextResponse) => {
	let query;

	const url = new URL(request.url);
	query = url.searchParams.get("q");

	if (query) {
		return NextResponse.json(await searchSong(query), { status: 200 });
	} else {
		return NextResponse.json([], { status: 404 });
	}
};
