import { searchArtists } from "node-youtube-music";

export const searchArtist = async (query: string) => {
	const searchRequest = await searchArtists(query);

	return searchRequest;
};
