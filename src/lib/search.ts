// SDK for the front-end to access parts of the backend without needing to make another request
import { Song } from "@/const/metadata";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { searchMusics } from "node-youtube-music";
import fs from "fs";
import { tmpdir } from "os";
import { addToCache } from "./cacheManagement";

export class SearchServices {
	constructor() {}

	async song(query: string) {
		return await searchSong(query);
	}
}

export const searchSong = async (query: string) => {
	const searchRequest = await searchMusics(query);

	(async () => {
		for (const song of searchRequest) {
			if (song.youtubeId) {
				fs.writeFileSync(
					join(tmpdir(), "harmoni-tmp", `${song.youtubeId}.json`),
					JSON.stringify(song)
				);

				addToCache(
					join(tmpdir(), "harmoni-tmp", `${song.youtubeId}.json`),
					"meta",
					song.youtubeId,
					"manifest.json"
				);
			}
		}
	})();

	return searchRequest;
};
