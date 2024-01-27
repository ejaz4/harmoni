import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

type UserCreateRequest = {
	name: string;
	username: string;
	password: string;
};

export async function POST(request: NextRequest) {
	const { name, username, password } =
		(await request.json()) as UserCreateRequest;

	if (!name || !username || !password) {
		return NextResponse.json(
			{ message: "Missing fields" },
			{ status: 400 }
		);
	}

	const salt = bcrypt.genSaltSync(10);
	const newPassword = bcrypt.hashSync(password, salt);

	try {
		const user = await prisma.user.create({
			data: {
				name,
				username,
				password: newPassword,
				Playlist: {
					create: [
						{
							name: "Liked Songs",
						},
						{
							name: "Recently Played",
						},
						{
							name: "Queue",
						},
					],
				},
			},
			select: {
				id: true,
				Playlist: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});

		const playlists = user.Playlist.map((playlist) => playlist);
		let recentlyPlayedId = "";
		let likedSongsId = "";
		let queueId = "";

		for (const playlist of playlists) {
			if (playlist.name === "Recently Played") {
				recentlyPlayedId = playlist.id;
			} else if (playlist.name === "Liked Songs") {
				likedSongsId = playlist.id;
			} else if (playlist.name === "Queue") {
				queueId = playlist.id;
			}
		}

		const newUser = await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				queueID: queueId,
				recentlyPlayedPlaylistID: recentlyPlayedId,
				likedPlaylistID: likedSongsId,
			},
		});
	} catch (error: any) {
		return NextResponse.json({ message: error }, { status: 400 });
	}

	return NextResponse.json({ message: "Created user" }, { status: 200 });
}
