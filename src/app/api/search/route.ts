import { searchMusics } from "node-youtube-music";
import { NextRequest, NextResponse } from "next/server";
import { addToCache } from "@/lib/cacheManagement";
import { join, parse } from "path";
import fs from "fs";
import { tmpdir } from "os";
import { searchSong } from "@/lib/search";

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
