"use client";

import styles from "./results.module.css";
import Image from "next/image";
import {
	play,
	setQueue,
	setQueuePosition,
} from "@/app/web/components/audiocontrols/components/controls";
import Link from "next/link";
import { Artist, ArtistResults, Song } from "@/const/metadata";

export const ArtistResult = ({
	name,
	artistId,
	thumbnailUrl,
	subscribers,
}: ArtistResults) => {
	return (
		<Link href={`/web/artist/${artistId}`} className={styles.result}>
			<div className={styles.bigResult}>
				{thumbnailUrl && (
					<Image
						src={thumbnailUrl}
						alt={""}
						width={120}
						height={120}
					/>
				)}
				<div className={styles.textArea}>
					<h3>{name}</h3>
					<p>
						{subscribers.replace("subscribers", "").trim()}{" "}
						listeners
					</p>
				</div>
			</div>
		</Link>
	);
};
