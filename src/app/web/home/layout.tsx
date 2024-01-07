import { Sidebar } from "./components/sidebar";
import styles from "./home.module.css";

const HomeUIRoute = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className={styles.homeLayout}>
			<Sidebar />
			<section>{children}</section>
		</section>
	);
};

export default HomeUIRoute;
