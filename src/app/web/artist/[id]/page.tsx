"use client";
import { useParams } from "next/navigation";
import styles from "./artist.module.css";
import { Suspense, useEffect, useState } from "react";
import { Artist } from "@/const/metadata";

const ArtistPage = () => {
	const { id } = useParams() as { id: string };
	const [artist, setArtist] = useState<Artist | null>(null);

	useEffect(() => {
		(async () => {
			const artistFetch = await fetch(`/api/artist/${id}`);
			if (artistFetch.ok) {
				const artist = (await artistFetch.json()) as Artist;
				setArtist(artist);
			}
		})();
	}, []);

	return (
		<div className={styles.artistContainer}>
			{artist != null && <ArtistHero artist={artist} />}
		</div>
	);
};

const ArtistHero = ({ artist }: { artist: Artist }) => {
	return (
		<div className={styles.hero}>
			<h1>{artist.name}</h1>
		</div>
	);
};

export default ArtistPage;
