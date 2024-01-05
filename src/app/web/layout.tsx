import { Header } from "./components/header";
import styles from "./web.module.css";

export const WebUIRoute = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.app}>
			<Header />
			<div>{children}</div>
		</div>
	);
};

export default WebUIRoute;
