// SDK for the front-end to access parts of the backend without needing to make another request
import { Song } from "@/const/metadata";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { searchMusics } from "node-youtube-music";
import fs from "fs";
import { tmpdir } from "os";
import { addToCache } from "./cacheManagement";
import { prisma } from "./prisma";

export class SearchServices {
	constructor() {}

	async song(query: string) {
		return await searchSong(query);
	}
}

export const searchSong = async (query: string) => {
	const searchRequest = await searchMusics(query);

	(async () => {
		let songID: string[] = [];
		let artistID: string[] = ["none"];

		for (const song of searchRequest) {
			if (song.youtubeId) {
				songID.push(song.youtubeId);
			}

			if (song.artists) {
				for (const artist of song.artists) {
					if (artist.id) {
						artistID.push(artist.id);
					}
				}
			}
		}

		const artistsInDB = await prisma.artist.findMany({
			where: {
				youtubeId: {
					in: artistID,
				},
			},
			select: {
				youtubeId: true,
			},
		});

		let artistsNotInDB = searchRequest.filter((song) => {
			if (song.artists) {
				for (const artist of song.artists) {
					return !artistsInDB.find(
						(artistInDB) => artistInDB.youtubeId === artist.id
					);
				}
			}
		});

		let doneArtists: string[] = [];

		for (const artist of artistsNotInDB) {
			if (artist.artists) {
				for (const artistInSong of artist.artists) {
					console.log(`Creating profile for ${artistInSong.name}`);
					if (doneArtists.includes(artistInSong.id as string)) {
						continue;
					}

					if (artistInSong.id) {
						console.log(artistInSong.name);
						try {
							await prisma.artist.create({
								data: {
									youtubeId: artistInSong.id as string,
									name: artistInSong.name,
								},
							});

							doneArtists.push(artistInSong.id as string);
						} catch (e) {
							console.log("Catched", e);
						}
					}
				}
			}
		}

		const songsInDB = await prisma.song.findMany({
			where: {
				youtubeId: {
					in: songID,
				},
			},
			select: {
				youtubeId: true,
			},
		});

		const songsNotInDB = searchRequest.filter((song) => {
			return !songsInDB.find(
				(songInDB) => songInDB.youtubeId === song.youtubeId
			);
		});

		for (const song of songsNotInDB) {
			console.log("Creating song", song.title);
			if (song.artists) {
				try {
					await prisma.song.create({
						data: {
							youtubeId: song.youtubeId,
							name: song.title as string,
							thumbnailUrl: song.thumbnailUrl,
							isExplicit: song.isExplicit,
							duration: song.duration?.totalSeconds,
							Artist: {
								connect: song.artists?.map((artist) => {
									if (artist.id != undefined) {
										return {
											youtubeId: artist.id as string,
										};
									} else {
										return {
											youtubeId: "none",
										};
									}
								}),
							},
						},
					});
				} catch (e) {
					console.log("Catched", e);
				}
			} else {
				await prisma.song.create({
					data: {
						youtubeId: song.youtubeId,
						name: song.title as string,
						thumbnailUrl: song.thumbnailUrl,
						isExplicit: song.isExplicit,
						duration: song.duration?.totalSeconds,
						Artist: {
							connect: {
								youtubeId: "none",
							},
						},
					},
				});
			}
		}
	})();

	return searchRequest;
};
