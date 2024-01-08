import { Volume2 } from "lucide-react";
import styles from "./audioSelection.module.css";
import { useEffect, useState } from "react";

export const VolumeSlider = () => {
	const [elemVol, setElemVol] = useState(1.0);

	const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const audio = document.getElementById("audio") as HTMLAudioElement;
		const target = e.target as HTMLInputElement;

		audio.volume = Number(target.value);
	};

	useEffect(() => {
		const audio = document.getElementById("audio") as HTMLAudioElement;
		setElemVol(audio.volume);
	});

	return (
		<div className={styles.iconAndProp}>
			<Volume2 size={20} />
			<input
				className={styles.volumeSlider}
				defaultValue={elemVol}
				width={500}
				type="range"
				min={0}
				max={1}
				onChange={setVolume}
				step={0.01}
			/>
		</div>
	);
};
