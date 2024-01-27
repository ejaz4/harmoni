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
		let songsRepeat = searchRequest;

		let songID: string[] = [];
		let artistID: string[] = ["unknown"];

		// for (const song of songsRepeat) {
		// 	if (song.artists) {
		// 		for (let artist of song.artists) {
		// 			if (!artist.id) {
		// 				console.log(artist.name, "has no id");
		// 				artist = {
		// 					name: "Unknown",
		// 					id: "unknown",
		// 				};
		// 			}
		// 		}
		// 	}
		// }

		songsRepeat.forEach((song, songIndex) => {
			if (songsRepeat[songIndex].artists && song.artists) {
				song.artists.forEach((artist, artistIndex) => {
					if (!artist.id) {
						// songsRepeat[songIndex].artists?[artistIndex] = {
						// 			name: "Unknown",
						// 			id: "unknown",
						// 	  };
					}
				});
			}
		});

		// console.log(songsRepeat.map((song) => song.artists));

		for (const song of songsRepeat) {
			if (song.youtubeId) {
				songID.push(song.youtubeId);
			}

			if (song.artists) {
				for (const artist of song.artists) {
					if (artist.id) {
						artistID.push(artist.id);
					} else {
						artistID.push("unknown");
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

		// console.log(artistsInDB);
		let artistsNotInDB = songsRepeat.filter((song) => {
			if (song.artists) {
				for (const artist of song.artists) {
					if (!artist.id) {
						return false;
					} else {
						return !artistsInDB.find(
							(artistInDB) => artistInDB.youtubeId === artist.id
						);
					}
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
						console.log(artistInSong.name, artistInSong.id);
						if (artistInSong.id) {
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
						} else {
							try {
								await prisma.artist.create({
									data: {
										youtubeId: "unknown",
										name: "Unknown Artist",
									},
								});

								doneArtists.push(artistInSong.id as string);
							} catch (e) {
								console.log("Catched", e);
							}
						}
					} else {
						doneArtists.push();
					}
				}
			}
		}

		// console.log("Finding Songs in Database");
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

		// console.log("GOT all songs");

		const songsNotInDB = songsRepeat.filter((song) => {
			return !songsInDB.find(
				(songInDB) => songInDB.youtubeId === song.youtubeId
			);
		});

		for (const song of songsNotInDB) {
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
								connect: song.artists.map((artist) => {
									console.log(artist.id);
									if (!artist.id) {
										console.log("Picking unknown");
										return {
											youtubeId: "unknown",
										};
									} else {
										return {
											youtubeId: artist.id as string,
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
							connect: [
								{
									youtubeId: "unknown",
								},
							],
						},
					},
				});
			}
		}
	})();

	return searchRequest;
};
