import styles from "./miniprofile.module.css";
import Image from "next/image";
import defaultProfile from "@/assets/images/default-profile.jpg";

export const MiniProfile = () => {
	return (
		<section className={styles.miniProfile}>
			<Image
				src={defaultProfile}
				alt={"Your profile photo"}
				width={24}
				height={24}
			/>
			<p>Ejaz Ali</p>
		</section>
	);
};
