import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function GET(request: NextRequest) {
	const manifest = JSON.parse(
		fs.readFileSync("./harmoni.configuration.json", "utf8")
	);
	return NextResponse.json(manifest, { status: 200 });
}

export async function POST(request: NextRequest) {
	return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
