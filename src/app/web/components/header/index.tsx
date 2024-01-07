import LogoLight from "@/assets/images/harmoni-light.svg";
import { SearchBar } from "../search";
import styles from "./header.module.css";
import { MiniProfile } from "../miniprofile";
import Link from "next/link";

export const Header = () => {
	return (
		<header className={styles.header}>
			<section>
				<Link href="/web/home">
					<LogoLight />
				</Link>
				<SearchBar />
			</section>

			<section>
				<MiniProfile />
			</section>
		</header>
	);
};
