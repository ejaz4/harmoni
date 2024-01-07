import fs, { PathLike } from "fs";
import { ParsedPath, join, parse, basename } from "path";

export const addToCache = (
	location: string,
	type: string,
	id: string,
	as?: string
) => {
	const checkIfCacheExists = checkCache(type, id);

	if (checkIfCacheExists) {
		const parsedLocation = location;
		const newLocation = join(
			process.cwd(),
			".harmoni",
			type,
			id,
			as ? as : basename(location)
		);

		fs.copyFileSync(location, newLocation);
	}
};

export const loadFromCache = (file: string, type: string, id: string) => {
	const checkIfCacheExists = checkCache(type, id);

	if (checkIfCacheExists) {
		const cacheDir = join(process.cwd(), ".harmoni", type, id);
		const files = fs.readdirSync(cacheDir);

		const fileExists = files.includes(file);

		if (fileExists) {
			const location = join(process.cwd(), ".harmoni", type, id, file);
			return location;
		} else {
			return false;
		}
	}
};

const checkCache = (type: string, id: string) => {
	let cacheDir = join(process.cwd(), ".harmoni");

	let typeDir = join(cacheDir, type);
	let typeDirExists = false;

	let idDir = join(cacheDir, type, id);
	let idDirExists = false;

	let cacheDirExists = fs.existsSync(cacheDir);
	if (!cacheDirExists) {
		fs.mkdirSync(cacheDir);
		typeDirExists = false;
	} else {
		typeDirExists = fs.existsSync(typeDir);
	}

	if (!typeDirExists) {
		fs.mkdirSync(typeDir);
		idDirExists = false;
	} else {
		idDirExists = fs.existsSync(idDir);
	}

	if (!idDirExists) {
		fs.mkdirSync(idDir);
	}

	return true;
};
