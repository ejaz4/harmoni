"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import styles from "./audiocontrols.module.css";
import { MetaDisplay, MetaDisplaySkeleton } from "./components/metadisplay";
import { AudioControls } from "./components/uiControls";
import { AudioSelection } from "./components/audioselection";

export const AudioBar = ({
	setTimeUpdateFunc,
	setPlayFunc,
	setPauseFunc,
	setEndedFunc,
	setDurationFunc,
}: {
	setTimeUpdateFunc: React.Dispatch<
		React.SetStateAction<
			React.ReactEventHandler<HTMLAudioElement> | undefined
		>
	>;
	setPlayFunc: React.Dispatch<
		React.SetStateAction<
			React.ReactEventHandler<HTMLAudioElement> | undefined
		>
	>;
	setPauseFunc: React.Dispatch<
		React.SetStateAction<
			React.ReactEventHandler<HTMLAudioElement> | undefined
		>
	>;
	setEndedFunc: React.Dispatch<
		React.SetStateAction<
			React.ReactEventHandler<HTMLAudioElement> | undefined
		>
	>;
	setDurationFunc: React.Dispatch<
		React.SetStateAction<
			React.ReactEventHandler<HTMLAudioElement> | undefined
		>
	>;
}) => {
	const [currentID, setCurrentID] = useState("");
	const metaDisplay = useMemo(
		() => <MetaDisplay id={currentID} />,
		[currentID]
	);

	useEffect(() => {
		const audioElem = document.getElementById("audio") as HTMLAudioElement;

		audioElem.addEventListener("durationchange", (e) => {
			const audio = e.target as HTMLAudioElement;
			const id = new URL(audio.src).pathname.split("/").pop() as string;

			if (id !== currentID) {
				setCurrentID(id);
			}
		});
	}, []);

	return (
		<div className={styles.nowPlaying}>
			<Suspense fallback={<MetaDisplaySkeleton />}>
				{metaDisplay}
			</Suspense>
			<AudioControls
				setTimeUpdateFunc={setTimeUpdateFunc}
				setPlayFunc={setPlayFunc}
				setPauseFunc={setPauseFunc}
				setEndedFunc={setEndedFunc}
				setDurationFunc={setDurationFunc}
			/>
			<AudioSelection />
		</div>
	);
};
