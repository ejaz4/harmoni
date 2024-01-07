import { Volume2 } from "lucide-react";
import styles from "./audioSelection.module.css";

export const VolumeSlider = () => {
	const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const audio = document.getElementById("audio") as HTMLAudioElement;
		const target = e.target as HTMLInputElement;

		audio.volume = Number(target.value);
	};
	return (
		<div className={styles.iconAndProp}>
			<Volume2 size={20} />
			<input
				className={styles.volumeSlider}
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
