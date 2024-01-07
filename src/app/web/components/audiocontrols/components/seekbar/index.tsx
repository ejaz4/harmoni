import React from "react";
import styles from "./seekbar.module.css";

export const SeekBar = ({
	current,
	duration,
	setCurrent,
}: {
	current: number;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	duration: number;
}) => {
	const seekTo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrent(e.target.valueAsNumber);
		const audio = document.getElementById("audio") as HTMLAudioElement;
		const target = e.target as HTMLInputElement;

		audio.currentTime = Number(target.value);
	};

	return (
		<input
			className={styles.seekbar}
			type="range"
			value={current}
			onChange={seekTo}
			max={duration}
			min={0}
		/>
	);
};
