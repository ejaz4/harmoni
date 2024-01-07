import { addToCache, loadFromCache } from "@/lib/cacheManagement";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { searchMusics } from "node-youtube-music";

export async function GET(
	request: NextRequest,
	params?: { params: { id: string } },
	server?: boolean
) {
	if (!params) {
		return false;
	}

	if (!params.params.id) {
		return false;
	}

	if (!fs.existsSync(join(tmpdir(), "harmoni-tmp"))) {
		fs.mkdirSync(join(tmpdir(), "harmoni-tmp"));
	}

	const cached = loadFromCache("manifest.json", "meta", params.params.id);

	if (!cached) {
		let apiResponse = await searchMusics(params.params.id);

		if (apiResponse.length > 0) {
			const manifest = apiResponse[0];
			fs.writeFileSync(
				join(tmpdir(), "harmoni-tmp", `${params.params.id}.json`),
				JSON.stringify(manifest)
			);

			addToCache(
				join(tmpdir(), "harmoni-tmp", `${params.params.id}.json`),
				"meta",
				params.params.id,
				"manifest.json"
			);

			console.log("RAW metadata!");
			if (!server) {
				return NextResponse.json(manifest, { status: 200 });
			} else {
				return manifest;
			}
		}
	}

	const fileCacheLocation = loadFromCache(
		"manifest.json",
		"meta",
		params.params.id
	);

	if (fileCacheLocation != false && typeof fileCacheLocation == "string") {
		const file = fs.readFileSync(fileCacheLocation);

		console.log("Cached metadata!");
		if (!server) {
			return NextResponse.json(JSON.parse(file.toString()), {
				status: 200,
			});
		} else {
			return JSON.parse(file.toString());
		}
	}
}
