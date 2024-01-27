import { Song } from "@/const/metadata";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/tokens";
import { NextRequest, NextResponse } from "next/server";

type QueueCreateRequest = {
	songs?: Song[];
	position: number;
};

export const POST = async (req: NextRequest, res: NextResponse) => {
	const token = req.headers.get("authorization");
	const body = (await req.json()) as QueueCreateRequest;

	if (!token) {
		return NextResponse.json({ message: "Missing token" }, { status: 400 });
	}

	const tokenValid = await verifyToken(token, false);

	if (!tokenValid || !tokenValid.userId) {
		return NextResponse.json({ message: "Invalid token" }, { status: 400 });
	}

	let position = 0;
	let songs: Song[] = [];
	if (body.position) {
		position = body.position;
	}

	if (body.songs) {
		songs = body.songs;
	}

	if (position < 0) {
		return NextResponse.json(
			{ message: "Invalid position" },
			{ status: 400 }
		);
	}

	if (!songs || songs == undefined || songs.length == 0) {
		if (position) {
			const queue = await prisma.user.update({
				where: {
					id: tokenValid.userId,
				},
				data: {
					queuePosition: position,
				},
			});

			return NextResponse.json({ message: "Success" }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "No position or songs." },
				{ status: 400 }
			);
		}
	}

	try {
		const queueID = await prisma.user.findUnique({
			where: {
				id: tokenValid.userId,
			},
			select: {
				queueID: true,
			},
		});

		if (!queueID || !queueID.queueID) {
			return NextResponse.json(
				{ message: "Invalid queue" },
				{ status: 500 }
			);
		}

		const deleteQueue = await prisma.playlistEntry.deleteMany({
			where: {
				playlist: {
					id: queueID.queueID,
				},
			},
		});

		// console.log("Deleted QUEUE");

		const queue = await prisma.playlist.update({
			where: {
				id: queueID?.queueID,
			},
			data: {
				PlaylistEntry: {
					create: songs.map((song: Song, index) => {
						console.log(song);
						return {
							song: {
								connect: {
									youtubeId: song.youtubeId,
								},
							},
							User: {
								connect: {
									id: tokenValid.userId,
								},
							},
						};
					}),
				},
			},
		});

		// console.log("Created new QUEUE");

		if (queue) {
			return NextResponse.json(
				{
					message: "Success",
				},
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{
					message: "Queue Failure",
				},
				{
					status: 500,
				}
			);
		}
	} catch (e) {
		console.log(e);
		return NextResponse.json({
			message: "Queue/DB failure",
			status: 500,
		});
	}
};
