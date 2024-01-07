import { AudioBar } from "./components/audiocontrols";
import { Header } from "./components/header";
import styles from "./web.module.css";

const WebUIRoute = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.app}>
			<Header />
			<div className={styles.cover}>{children}</div>
			<AudioBar />
			<audio id="audio"></audio>
		</div>
	);
};

export default WebUIRoute;
