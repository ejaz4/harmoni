export type Artist = {
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
	}[];
	album?: string;
	isExplicit?: boolean;
	duration?: {
		label: string;
		totalSeconds: number;
	};
};
