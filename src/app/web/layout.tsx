"use client";
import { useEffect, useState } from "react";
import { AudioBar } from "./components/audiocontrols";
import { Header } from "./components/header";
import styles from "./web.module.css";

const WebUIRoute = ({ children }: { children: React.ReactNode }) => {
	const [playFunc, setPlayFunc] =
		useState<React.ReactEventHandler<HTMLAudioElement>>();
	const [pauseFunc, setPauseFunc] =
		useState<React.ReactEventHandler<HTMLAudioElement>>();
	const [endedFunc, setEndedFunc] =
		useState<React.ReactEventHandler<HTMLAudioElement>>();
	const [currentTimeUpdateFunc, setTimeUpdateFunction] =
		useState<React.ReactEventHandler<HTMLAudioElement>>();
	const [durationUpdateFunc, setDurationUpdateFunc] =
		useState<React.ReactEventHandler<HTMLAudioElement>>();

	return (
		<div className={styles.app}>
			<Header />
			<div className={styles.cover}>{children}</div>
			<AudioBar
				setTimeUpdateFunc={setTimeUpdateFunction}
				setPlayFunc={setPlayFunc}
				setPauseFunc={setPauseFunc}
				setEndedFunc={setEndedFunc}
				setDurationFunc={setDurationUpdateFunc}
			/>
			<audio
				onEnded={endedFunc}
				onPlay={playFunc}
				onPause={pauseFunc}
				onTimeUpdate={currentTimeUpdateFunc}
				onDurationChange={durationUpdateFunc}
				id="audio"
			/>
		</div>
	);
};

export default WebUIRoute;
