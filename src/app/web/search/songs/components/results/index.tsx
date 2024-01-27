"use client";

import styles from "./results.module.css";
import Image from "next/image";
import {
	play,
	setQueue,
	setQueuePosition,
} from "@/app/web/components/audiocontrols/components/controls";
import Link from "next/link";
import { Artist, Song } from "@/const/metadata";

export const TopSongResult = ({
	title,
	artists,
	explicit,
	thumbnailUrl,
	time,
	id,
	proposedQueue,
	queuePosition,
}: {
	title?: string;
	artists?: Artist[];
	explicit?: boolean;
	thumbnailUrl?: string;
	time?: string;
	id?: string;
	proposedQueue: Song[];
	queuePosition: number;
}) => {
	return (
		<div
			onClick={(e) => {
				e.stopPropagation();
				setQueue(proposedQueue);
				setQueuePosition(queuePosition);
				play();
			}}
			className={styles.result}
		>
			{thumbnailUrl && (
				<Image src={thumbnailUrl} alt={""} width={120} height={120} />
			)}
			<div className={styles.bigResult}>
				<div>
					<h3>
						{title} {explicit && "🅴"}
					</h3>
					<label>
						{artists && (
							<>
								{artists.map((artist, _) => (
									<>
										<Link
											href={`/web/artist/${artist.id}`}
											key={artist.id}
											onClick={(e) => {
												e.stopPropagation();
											}}
										>
											{artist.name}
										</Link>
										{_ + 1 != artists.length ? ", " : ""}
									</>
								))}
							</>
						)}
					</label>
				</div>

				<label>{time}</label>
			</div>
		</div>
	);
};

export const OtherSongResult = ({
	title,
	artists,
	explicit,
	thumbnailUrl,
	time,
	id,
	proposedQueue,
	queuePosition,
}: {
	title?: string;
	artists?: Artist[];
	explicit?: boolean;
	thumbnailUrl?: string;
	time?: string;
	id?: string;
	proposedQueue: Song[];
	queuePosition: number;
}) => {
	return (
		<div
			onClick={(e) => {
				e.stopPropagation();
				setQueue(proposedQueue);
				setQueuePosition(queuePosition);
				play();
			}}
			className={styles.result}
		>
			{thumbnailUrl && (
				<Image src={thumbnailUrl} alt={""} width={60} height={60} />
			)}
			<div className={styles.smallResult}>
				<div>
					<h3>
						{title} {explicit && "🅴"}
					</h3>
					<label>
						{artists && (
							<>
								{artists.map((artist, _) => (
									<>
										<Link
											href={`/web/artist/${artist.id}`}
											key={artist.id}
											onClick={(e) => {
												e.stopPropagation();
											}}
										>
											{artist.name}
										</Link>
										{_ + 1 != artists.length ? ", " : ""}
									</>
								))}
							</>
						)}
					</label>
				</div>

				<label>{time}</label>
			</div>
		</div>
	);
};
