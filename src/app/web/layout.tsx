"use client";
import { useState } from "react";
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

	return (
		<div className={styles.app}>
			<Header />
			<div className={styles.cover}>{children}</div>
			<AudioBar />
			<audio
				onEnded={endedFunc}
				onPlay={playFunc}
				onPause={pauseFunc}
				onTimeUpdate={currentTimeUpdateFunc}
				id="audio"
			></audio>
		</div>
	);
};

export default WebUIRoute;
