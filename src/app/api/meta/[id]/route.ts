import { addToCache, loadFromCache } from "@/lib/cacheManagement";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { searchMusics } from "node-youtube-music";
import { prisma } from "@/lib/prisma";
import { fancyTimeFormat } from "@/lib/formatting";

export async function GET(
	request: NextRequest,
	params?: { params: { id: string } },
	server?: boolean
) {
	if (!params) {
		return false;
	}

	if (!params.params.id) {
		return false;
	}

	const songEntry = await prisma.song.findUnique({
		where: {
			youtubeId: params.params.id,
		},
		select: {
			youtubeId: true,
			name: true,
			thumbnailUrl: true,
			isExplicit: true,
			duration: true,
			Album: {
				select: {
					name: true,
					id: true,
				},
			},
			Artist: {
				select: {
					name: true,
					id: true,
				},
			},
		},
	});

	if (!songEntry) {
		let apiResponse = await searchMusics(params.params.id);

		if (apiResponse.length > 0) {
			const manifest = apiResponse[0];

			if (!server) {
				return NextResponse.json(manifest, { status: 200 });
			} else {
				return manifest;
			}

			return;
		}

		return;
	}

	const songProcessed = {
		youtubeId: songEntry.youtubeId,
		title: songEntry.name,
		thumbnailUrl: songEntry.thumbnailUrl,
		album: songEntry.Album,
		isExplicit: songEntry.isExplicit,
		duration: {
			label: fancyTimeFormat(songEntry.duration),
			totalSeconds: songEntry.duration,
		},
		artists: songEntry.Artist,
	};

	if (!server) {
		return NextResponse.json(songProcessed, {
			status: 200,
		});
	} else {
		return songEntry;
	}
}
