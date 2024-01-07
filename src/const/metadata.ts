export type Artist = {
	name: string;
	id: string;
};

export type Song = {
	youtubeId: string;
	title: string;
	artists: Artist[];
	thumbnailUrl: string;
	isExplicit: boolean;
	duration: {
		label: string;
	};
};
