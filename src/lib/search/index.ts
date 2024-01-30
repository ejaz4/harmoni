// SDK for the front-end to access parts of the backend without needing to make another request
import { Song } from "@/const/metadata";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { searchMusics } from "node-youtube-music";
import fs from "fs";
import { tmpdir } from "os";
import { addToCache } from "../cacheManagement";
import { prisma } from "../prisma";
import { searchSong } from "./song";
import { searchArtist } from "./artist";

export class SearchServices {
	constructor() {}

	async song(query: string) {
		return await searchSong(query);
	}

	async artist(query: string) {
		return await searchArtist(query);
	}
}
