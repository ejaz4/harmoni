import LogoLight from "@/assets/images/harmoni-light.svg";
import { SearchBar } from "../search";
import styles from "./header.module.css";
import { MiniProfile } from "../miniprofile";

export const Header = () => {
	return (
		<header className={styles.header}>
			<section>
				<LogoLight />
				<SearchBar />
			</section>

			<section>
				<MiniProfile />
			</section>
		</header>
	);
};
