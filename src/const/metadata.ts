export type ArtistMini = {
	name: string;
	id: string;
};

export type Song = {
	youtubeId?: string;
	title?: string;
	thumbnailUrl?: string;
	artists?: {
		name: string;
		id?: string;
		youtubeId?: string;
	}[];
	album?: string;
	isExplicit?: boolean;
	duration?: {
		label: string;
		totalSeconds: number;
	};
};

export type Artist = {
	id?: string;
	youtubeId?: string;
	name?: string;
	createdAt?: string;
	updatedAt?: string;
	Song?: Song[];
};
