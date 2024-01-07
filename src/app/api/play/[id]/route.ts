import { addToCache, loadFromCache } from "@/lib/cacheManagement";
import { NextRequest, NextResponse } from "next/server";
import ytdl, { videoFormat } from "ytdl-core";
import fs from "fs";
import { join } from "path";
import { Blob } from "node:buffer";
import { tmpdir } from "os";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	if (!fs.existsSync(join(tmpdir(), "harmoni-tmp"))) {
		fs.mkdirSync(join(tmpdir(), "harmoni-tmp"));
	}

	const cached = loadFromCache("highestaudio.webm", "audio", params.id);

	if (!cached) {
		let headers, metadata;

		const best = ytdl(`https://music.youtube.com/watch?v=${params.id}`, {
			quality: "highestaudio",
			format: "webm" as any,
		});

		best.on("info", (data) => {
			metadata = data.player_response.videoDetails;
		});

		best.on("response", (res) => {
			headers = res.headers;

			if (headers["content-type"] !== "audio/webm") {
				return new Response("", {
					headers,
				});
			}
		});

		let count = 0;

		best.on("data", (chunk) => {
			count++;
			fs.appendFileSync(
				join(tmpdir(), "harmoni-tmp", `${params.id}.webm`),
				chunk
			);
		});

		best.on("end", () => {
			addToCache(
				join(tmpdir(), "harmoni-tmp", `${params.id}.webm`),
				"audio",
				params.id,
				"highestaudio.webm"
			);
		});

		return new Response(best as any, {
			headers,
		});
	}

	const fileCacheLocation = loadFromCache(
		"highestaudio.webm",
		"audio",
		params.id
	);

	if (fileCacheLocation != false && typeof fileCacheLocation == "string") {
		const file = fs.createReadStream(fileCacheLocation);

		return new Response(file as any, {
			headers: {
				"Content-Type": "audio/webm",
			},
		});
	}
}
