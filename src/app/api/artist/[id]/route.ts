import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
	req: NextRequest,
	params: { params: { id: string } }
) => {
	if (!params) {
		return NextResponse.json(
			{
				error: "No params",
			},
			{ status: 404 }
		);
	}

	if (!params.params.id) {
		return NextResponse.json(
			{
				error: "No id",
			},
			{ status: 404 }
		);
	}

	const artistEntry = await prisma.artist.findUnique({
		where: {
			youtubeId: params.params.id,
		},
		select: {
			name: true,
			Album: {
				select: {
					name: true,
					id: true,
					Song: {
						select: {
							name: true,
							youtubeId: true,
							isExplicit: true,
							duration: true,
						},
					},
				},
			},
			Song: {
				select: {
					name: true,
					youtubeId: true,
					isExplicit: true,
					duration: true,
					Artist: true,
				},
			},
		},
	});

	if (!artistEntry) {
		return NextResponse.json(
			{
				error: "No artist",
			},
			{ status: 404 }
		);
	}

	return NextResponse.json(artistEntry, {
		status: 200,
	});
};
