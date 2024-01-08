"use client";
import { SearchServices } from "@/lib/search";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Song } from "@/const/metadata";
import styles from "./metadisplay.module.css";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

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

	useEffect(() => {
		console.log(meta);
	}, [meta]);

	useEffect(() => {
		(async () => {
			if (id) {
				const search = await fetch(`/api/meta/${id}`);
				const metaInfo = await search.json();
				setMeta(metaInfo);
				console.log(meta);
			}
		})();
	}, [id]);

	if (meta.youtubeId == id) {
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
									<Link href="/web/home/">{artist.name}</Link>
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
