"use client";

import styles from "../../songs.module.css";
import Image from "next/image";
import { play } from "@/app/web/components/audiocontrols/components/controls";
import Link from "next/link";
import { Artist, Song } from "@/const/metadata";

export const TopSongResult = ({
	title,
	artists,
	explicit,
	thumbnailUrl,
	time,
	id,
}: {
	title: string;
	artists: Artist[];
	explicit: boolean;
	thumbnailUrl: string;
	time: string;
	id: string;
}) => {
	return (
		<div
			onClick={() => {
				play(id);
			}}
			className={styles.result}
		>
			<Image src={thumbnailUrl} alt={""} width={120} height={120} />
			<div className={styles.bigResult}>
				<div>
					<h3>
						{title} {explicit && "🅴"}
					</h3>
					<label>
						{artists.map((artist, _) => (
							<>
								<Link
									href={`/web/artist/${artist.id}`}
									key={artist.id}
								>
									{artist.name}
								</Link>
								{_ + 1 != artists.length ? ", " : ""}
							</>
						))}
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
}: {
	title: string;
	artists: Artist[];
	explicit: boolean;
	thumbnailUrl: string;
	time: string;
	id: string;
}) => {
	return (
		<div
			onClick={() => {
				play(id);
			}}
			className={styles.result}
		>
			<Image src={thumbnailUrl} alt={""} width={60} height={60} />
			<div className={styles.smallResult}>
				<div>
					<h3>
						{title} {explicit && "🅴"}
					</h3>
					<label>
						{artists.map((artist, _) => (
							<>
								<Link
									href={`/web/artist/${artist.id}`}
									key={artist.id}
								>
									{artist.name}
								</Link>
								{_ + 1 != artists.length ? ", " : ""}
							</>
						))}
					</label>
				</div>

				<label>{time}</label>
			</div>
		</div>
	);
};