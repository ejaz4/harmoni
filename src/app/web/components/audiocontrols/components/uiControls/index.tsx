"use client";
import { SkipBack, Pause, Play, SkipForward } from "lucide-react";
import styles from "../../audiocontrols.module.css";
import { pause, resume } from "../controls";
import { SeekBar } from "../seekbar";
import { useEffect, useState } from "react";

export const AudioControls = ({}: {}) => {
	const [currentTime, setCurrentTime] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		const audioElem = document.getElementById("audio") as HTMLAudioElement;

		audioElem.addEventListener("timeupdate", () => {
			setCurrentTime(audioElem.currentTime);
		});

		audioElem.addEventListener("durationchange", () => {
			setDuration(audioElem.duration);
		});

		audioElem.addEventListener("play", () => {
			setPlaying(true);
		});

		audioElem.addEventListener("pause", () => {
			setPlaying(false);
		});
	});

	const fancyTimeFormat = (duration: number) => {
		// Hours, minutes and seconds
		const hrs = ~~(duration / 3600);
		const mins = ~~((duration % 3600) / 60);
		const secs = ~~duration % 60;

		// Output like "1:01" or "4:03:59" or "123:03:59"
		let ret = "";

		if (hrs > 0) {
			ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}

		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;

		return ret;
	};

	return (
		<div className={styles.audioControls}>
			<Buttons playing={playing} />
			<div className={styles.seekbar}>
				<span>{fancyTimeFormat(currentTime)}</span>
				<SeekBar
					setCurrent={setCurrentTime}
					current={currentTime}
					duration={duration}
				/>
				<span>{fancyTimeFormat(duration)}</span>
			</div>
		</div>
	);
};

const Buttons = ({ playing }: { playing: boolean }) => {
	return (
		<div className={styles.buttons}>
			<PlaybackButton
				symbol={<SkipBack size={20} />}
				label={"Previous song"}
			/>

			<PlaybackButton
				symbol={playing ? <Pause size={20} /> : <Play size={20} />}
				onClick={() => {
					(playing ? pause : resume)();
				}}
				label={"Play"}
			/>

			<PlaybackButton
				symbol={<SkipForward size={20} />}
				label={"Next song"}
			/>
		</div>
	);
};

const PlaybackButton = ({
	onClick,
	symbol,
	label,
}: {
	onClick?: () => void;
	symbol: React.ReactNode;
	label: string;
}) => {
	return (
		<button aria-label={label} title={label} onClick={onClick}>
			{symbol}
		</button>
	);
};
