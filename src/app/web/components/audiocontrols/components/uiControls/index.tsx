"use client";
import {
	SkipBack,
	Pause,
	Play,
	SkipForward,
	Repeat,
	Shuffle,
} from "lucide-react";
import styles from "../../audiocontrols.module.css";
import { pause, resume } from "../controls";
import { SeekBar } from "../seekbar";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { fancyTimeFormat } from "@/lib/formatting";

export const AudioControls = ({}: {}) => {
	const [currentTime, setCurrentTime] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [repeat, setRepeat] = useState(false);
	const [shuffle, setShuffle] = useState(false);

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
	}, []);

	useEffect(() => {
		const endedEventListener = () => {
			const audioElem = document.getElementById(
				"audio"
			) as HTMLAudioElement;

			console.log(repeat);
			if (repeat) {
				console.log(repeat);
				audioElem.currentTime = 0;
				audioElem.play();
			}
		};

		const audioElem = document.getElementById("audio") as HTMLAudioElement;

		console.log("removing event listener");
		audioElem.removeEventListener("ended", endedEventListener);

		console.log("adding event listener");
		audioElem.addEventListener("ended", endedEventListener);
	}, [repeat]);

	return (
		<div className={styles.audioControls}>
			<Buttons
				setRepeat={setRepeat}
				setShuffle={setShuffle}
				playing={playing}
			/>
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

const Buttons = ({
	playing,
	setRepeat,
	setShuffle,
}: {
	playing: boolean;
	setRepeat: React.Dispatch<React.SetStateAction<boolean>>;
	setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<div className={styles.buttons}>
			<PlaybackButton
				toggle={true}
				label={"Shuffle"}
				onToggle={(toggled: boolean) => {
					setShuffle(toggled);
				}}
				symbol={<Shuffle size={20} />}
			/>

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

			<PlaybackButton
				toggle={true}
				label={"Repeat"}
				onToggle={(toggled: boolean) => {
					console.log(toggled);
					setRepeat(toggled);
				}}
				symbol={<Repeat size={20} />}
			/>
		</div>
	);
};

const PlaybackButton = ({
	onClick,
	onToggle,
	symbol,
	label,
	toggle,
}: {
	onClick?: () => void;
	onToggle?: (toggled: boolean) => void;
	symbol: React.ReactNode;
	label: string;
	toggle?: boolean;
}) => {
	const [toggled, setToggled] = useState(false);

	useEffect(() => {
		if (onToggle) {
			onToggle(toggled);
		}
	}, [toggled]);

	if (toggle) {
		return (
			<button
				aria-label={label}
				className={toggled ? styles.toggled : ""}
				title={label}
				onClick={() => {
					setToggled(!toggled);
				}}
			>
				{symbol}
			</button>
		);
	}

	return (
		<button aria-label={label} title={label} onClick={onClick}>
			{symbol}
		</button>
	);
};
