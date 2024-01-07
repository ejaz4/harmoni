import { VolumeSlider } from "./volumeSlider";
import styles from "./audioSelection.module.css";

export const AudioSelection = () => {
	return (
		<div className={styles.audioSelection}>
			<VolumeSlider />
		</div>
	);
};
