import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/tokens";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	response: {
		params: {
			id: string;
		};
	}
) {
	const token = request.headers.get("authorization");
	if (!token) {
		return NextResponse.json(
			{
				error: "No token",
			},
			{
				status: 401,
			}
		);
	}

	const verifiedToken = await verifyToken(token);
	if (!verifiedToken) {
		return NextResponse.json(
			{
				error: "Unknown error",
			},
			{ status: 500 }
		);
	}

	if (!verifiedToken.valid) {
		return NextResponse.json(
			{
				error: "Invalid token",
			},
			{
				status: 401,
			}
		);
	}

	try {
		const userRecord = await prisma.user.findUnique({
			where: {
				id: response.params.id,
			},
			select: {
				id: true,
				username: true,
				name: true,
				profileImageUrl: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!userRecord) {
			return NextResponse.json(
				{
					error: "User not found",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(userRecord, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: "Unknown error",
			},
			{ status: 500 }
		);
	}
}
