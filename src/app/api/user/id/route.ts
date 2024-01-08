import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/tokens";

export type IDRequest = {
	error?: string;
	id?: string;
};

export async function GET(request: NextRequest, response: NextResponse) {
	const token = request.headers.get("authorization");
	if (!token) {
		return NextResponse.json(
			{
				error: "No token",
			},
			{ status: 401 }
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

	return NextResponse.json(
		{
			id: verifiedToken.userId,
		},
		{
			status: 200,
		}
	);
}
