"use client";
import { SearchServices } from "@/lib/search";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Song } from "@/const/metadata";
import styles from "./metadisplay.module.css";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import {
	nextTrack,
	pause,
	play,
	previousTrack,
	resume,
	seekTo,
} from "../controls";

export const MetaDisplay = async ({ id }: { id: string }) => {
	const [meta, setMeta] = useState<Song>({
		youtubeId: "nothing yet",
		title: "",
		artists: [],
		thumbnailUrl: "",
		isExplicit: false,
		duration: {
			label: "0:00",
			totalSeconds: 0,
		},
	});

	useEffect(() => {}, [meta]);

	useEffect(() => {
		(async () => {
			if (id) {
				const search = await fetch(`/api/meta/${id}`);
				const metaInfo = await search.json();
				setMeta(metaInfo);
			}
		})();
	}, [id]);

	if (meta.youtubeId == id) {
		console.log("Broadcasting new metadata");
		navigator.mediaSession.metadata = new MediaMetadata({
			title: meta.title,
			artist: meta.artists?.map((artist) => artist.name).join(", "),
			artwork: meta.thumbnailUrl
				? [
						{
							src: meta.thumbnailUrl,
							sizes: "96x96",
							type: "image/png",
						},
				  ]
				: [],
		});

		navigator.mediaSession.setActionHandler("nexttrack", nextTrack);

		navigator.mediaSession.setActionHandler("previoustrack", previousTrack);

		navigator.mediaSession.setActionHandler("pause", pause);

		navigator.mediaSession.setActionHandler("play", resume);

		navigator.mediaSession.setActionHandler("seekto", seekTo);

		return (
			<div className={styles.metaDisplay}>
				{meta?.thumbnailUrl && (
					<Image
						src={meta?.thumbnailUrl}
						height={60}
						width={60}
						alt={""}
					/>
				)}
				<div className={styles.text}>
					<Link href="/web/home/">{meta.title}</Link>

					{meta.artists && (
						<div className={styles.artist}>
							{meta.artists.map((artist, _) => (
								<>
									<Link
										href={`/web/artist/${artist.youtubeId}`}
									>
										{artist.name}
									</Link>
									{() => {
										if (meta.artists) {
											return artist.name !==
												meta.artists[
													meta.artists.length - 1
												].name
												? ", "
												: "";
										} else {
											return "";
										}
									}}
								</>
							))}
						</div>
					)}
				</div>
			</div>
		);
	} else {
		if (meta.title == "") {
			return <div></div>;
		} else {
			return <MetaDisplaySkeleton />;
		}
	}
};

export const MetaDisplaySkeleton = () => {
	return (
		<div className={styles.metaDisplay}>
			<Skeleton
				height={60}
				width={60}
				baseColor="#424242"
				highlightColor="#909090"
			/>
			<div className={styles.text}>
				<Skeleton
					height={20}
					width={120}
					baseColor="#424242"
					highlightColor="#909090"
				/>
				<Skeleton
					height={18}
					width={80}
					baseColor="#424242"
					highlightColor="#909090"
				/>
			</div>
		</div>
	);
};
