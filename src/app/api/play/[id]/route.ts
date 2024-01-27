import { addToCache, loadFromCache } from "@/lib/cacheManagement";
import { NextRequest, NextResponse } from "next/server";
import ytdl, { videoFormat } from "ytdl-core";
import fs from "fs";
import { join } from "path";
import { Blob } from "node:buffer";
import { tmpdir } from "os";
import ffmpeg from "fluent-ffmpeg";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	console.log(
		"This is the query",
		request.nextUrl.searchParams.get("format")
	);
	if (!fs.existsSync(join(tmpdir(), "harmoni-tmp"))) {
		fs.mkdirSync(join(tmpdir(), "harmoni-tmp"));
	}

	let format = "webm";

	if (request.nextUrl.searchParams.get("format") == "mp3") {
		format = "mp3";
	}

	if (request.nextUrl.searchParams.get("format") == "aac") {
		format = "aac";
	}

	if (request.nextUrl.searchParams.get("format") == "caf") {
		format = "caf";
	}

	const cached = loadFromCache(`highestaudio.webm`, "audio", params.id);
	const requestFormatCached = loadFromCache(
		`highestaudio.${format}`,
		"audio",
		params.id
	);

	const conversion = async (cachePreloaded: boolean) => {
		let location = join(tmpdir(), "harmoni-tmp", `${params.id}.webm`);

		if (cachePreloaded) {
			location = loadFromCache(
				`highestaudio.webm`,
				"audio",
				params.id
			) as string;
		}

		if (format == "mp3") {
			console.log(
				"Beginning conversion to mp3 (potential WebKit device)"
			);

			const conversion = await new Promise<void>((resolve) =>
				ffmpeg(location)
					.noVideo()
					.audioCodec("libmp3lame")
					.audioBitrate(320)
					.save(join(tmpdir(), "harmoni-tmp", `${params.id}.mp3`))
					.on("end", () => {
						console.log("Finished conversion");
						resolve();
					})
			);

			addToCache(
				join(tmpdir(), "harmoni-tmp", `${params.id}.mp3`),
				"audio",
				params.id,
				`highestaudio.mp3`
			);
		}

		if (format == "aac") {
			console.log(
				"Beginning conversion to aac (potential WebKit device)"
			);

			const conversion = await new Promise<void>((resolve) =>
				ffmpeg(location)
					.noVideo()
					.audioCodec("aac")
					.audioBitrate(320)
					.save(join(tmpdir(), "harmoni-tmp", `${params.id}.aac`))
					.on("end", () => {
						console.log("Finished conversion");
						resolve();
					})
			);

			addToCache(
				join(tmpdir(), "harmoni-tmp", `${params.id}.aac`),
				"audio",
				params.id,
				`highestaudio.aac`
			);
		}

		if (format == "caf") {
			console.log(
				"Beginning conversion to caf (potential WebKit device)"
			);

			const conversion = await new Promise<void>((resolve) =>
				ffmpeg(location)
					.noVideo()
					.audioCodec("opus")
					.audioBitrate(320)
					.save(join(tmpdir(), "harmoni-tmp", `${params.id}.caf`))
					.on("end", () => {
						console.log("Finished conversion");
						resolve();
					})
			);

			addToCache(
				join(tmpdir(), "harmoni-tmp", `${params.id}.caf`),
				"audio",
				params.id,
				`highestaudio.caf`
			);
		}
	};

	if (!cached) {
		let headers, metadata;
		console.log("Not cached");

		const best = await new Promise<void>((resolve) => {
			ytdl(`https://music.youtube.com/watch?v=${params.id}`, {
				quality: "highestaudio",
				format: "webm" as any,
			})
				.pipe(
					fs.createWriteStream(
						join(tmpdir(), "harmoni-tmp", `${params.id}.webm`)
					)
				)
				.on("finish", resolve);
		});

		console.log("Skipped on");

		addToCache(
			join(tmpdir(), "harmoni-tmp", `${params.id}.webm`),
			"audio",
			params.id,
			`highestaudio.webm`
		);

		if (!requestFormatCached) {
			await conversion(false);
		}
	}

	if (!requestFormatCached && cached) {
		await conversion(true);
	}

	const fileCacheLocation = loadFromCache(
		`highestaudio.${format}`,
		"audio",
		params.id
	);

	console.log("This is the file cache location", fileCacheLocation);

	if (fileCacheLocation != false && typeof fileCacheLocation == "string") {
		const file = fs.createReadStream(fileCacheLocation);
		const contentLength = fs.statSync(fileCacheLocation).size.toString();
		// const file  =

		if (request.nextUrl.searchParams.get("preload") == "true") {
			return NextResponse.json(
				{
					success: true,
				},
				{ status: 200 }
			);
		}

		return new Response(file as any, {
			headers: {
				"Content-Type": `audio/${format}`,
				"Content-Length": contentLength,
				"Accept-Ranges": "bytes",
			},
		});
	}
}
