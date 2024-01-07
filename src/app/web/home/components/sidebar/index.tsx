"use client";

import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import { Radio, Sparkles, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Sidebar = () => {
	return (
		<section className={styles.sidebar}>
			<BrowseSection />
			<LibrarySection />
		</section>
	);
};

const BrowseSection = () => {
	return (
		<section className={styles.sidebarSection}>
			<label>Browse Music</label>
			<div className={styles.sidebarButtons}>
				<SidebarButton
					name="For You"
					href="/web/home/foryou"
					symbol={<Sparkles size={20} />}
				/>
				<SidebarButton
					name="Trending"
					href="/web/home/trending"
					symbol={<TrendingUp size={20} />}
				/>
				<SidebarButton
					name="Nearby"
					href="/web/home/nearby"
					symbol={<Radio size={20} />}
				/>
			</div>
		</section>
	);
};

const LibrarySection = () => {
	return (
		<section className={styles.sidebarSection}>
			<label>Library</label>
			<div className={styles.sidebarButtons}>
				<SidebarButton
					name="Recently Played"
					href="/web/home/history"
				/>
				<SidebarButton name="Favourite Tracks" href="/web/home/liked" />
				<SidebarButton name="Friends" href="/web/home/friends" />
			</div>
		</section>
	);
};

const SidebarButton = ({
	name,
	href,
	symbol,
}: {
	name: string;
	href: string;
	symbol?: React.ReactNode;
}) => {
	const pathname = usePathname();
	const router = useRouter();

	let className = styles.button;

	if (pathname == href) {
		className = [styles.button, styles.buttonActive].join(" ");
	}

	return (
		<Link
			href={href}
			// onClick={() => {
			// 	router.push(href);
			// }}
			className={className}
		>
			{symbol && symbol}
			<label>{name}</label>
		</Link>
	);
};
