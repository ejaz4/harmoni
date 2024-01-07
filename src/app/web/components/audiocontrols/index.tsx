"use client";
import { Suspense, useEffect, useState } from "react";
import { play, pause, resume } from "./components/controls";
import { SkipBack, Play, Pause, SkipForward } from "lucide-react";
import styles from "./audiocontrols.module.css";
import { SeekBar } from "./components/seekbar";
import { VolumeSlider } from "./components/audioselection/volumeSlider";
import { MetaDisplay, MetaDisplaySkeleton } from "./components/metadisplay";
import { AudioControls } from "./components/uiControls";
import { AudioSelection } from "./components/audioselection";

export const AudioBar = () => {
	const [currentID, setCurrentID] = useState("");

	useEffect(() => {
		const audioElem = document.getElementById("audio") as HTMLAudioElement;

		audioElem.addEventListener("durationchange", (e) => {
			const audio = e.target as HTMLAudioElement;
			const id = audio.src.split("/").slice(-1)[0];

			if (id !== currentID) {
				setCurrentID(id);
			}
		});
	}, []);

	return (
		<div className={styles.nowPlaying}>
			<Suspense fallback={<MetaDisplaySkeleton />}>
				<MetaDisplay id={currentID} />
			</Suspense>
			<AudioControls />
			<AudioSelection />
		</div>
	);
};
