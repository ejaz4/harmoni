import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { tokenGeneration } from "@/lib/tokens";

type UserLoginRequest = {
	username: string;
	password: string;
};

export const POST = async (request: NextRequest) => {
	const { username, password } = (await request.json()) as UserLoginRequest;

	if (!username || !password) {
		return NextResponse.json(
			{ message: "Missing fields" },
			{ status: 400 }
		);
	}

	// Check if the user exists
	const user = await prisma.user.findUnique({
		where: {
			username,
		},
		select: {
			id: true,
			username: true,
			password: true,
		},
	});

	if (user) {
		const compareStatus = bcrypt.compareSync(password, user.password);

		if (compareStatus) {
			const token = await tokenGeneration(user.id, false);

			return NextResponse.json(
				{ message: "Logged in", token },
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{ message: "Credentials incorrect" },
				{ status: 400 }
			);
		}
	} else {
		return NextResponse.json(
			{ message: "Credentials incorrect" },
			{ status: 400 }
		);
	}
};
