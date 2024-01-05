import crypto from "crypto";
import { prisma } from "./prisma";

// Token generation
export const tokenGeneration = async (userId: string, secure: boolean) => {
	const randomElement = crypto.randomBytes(128).toString("base64");

	const composed = {
		randomElement,
	};

	const token = crypto
		.createHash("sha512")
		.update(JSON.stringify(composed))
		.digest("base64");

	const tokenQuery = await prisma.token.create({
		data: {
			id: token,
			User: {
				connect: {
					id: userId,
				},
			},
			validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
			secure,
		},
	});

	if (tokenQuery) {
		return token;
	} else {
		return null;
	}
};

export const verifyToken = async (token: string, secure?: boolean) => {
	const tokenQuery = await prisma.token.findUnique({
		where: {
			id: token,
		},
		select: {
			id: true,
			secure: true,
			validUntil: true,
			valid: true,
		},
	});

	if (!tokenQuery) {
		return false;
	}

	if (tokenQuery.id == token) {
		if (tokenQuery.valid) {
			if (tokenQuery.validUntil > new Date()) {
				if (secure) {
					if (tokenQuery.secure) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			} else {
				const updateToken = await prisma.token.update({
					where: {
						id: token,
					},
					data: {
						valid: false,
					},
				});
				return false;
			}
		} else {
			return false;
		}
	}
};
