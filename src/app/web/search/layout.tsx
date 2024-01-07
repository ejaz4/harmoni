"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./search.module.css";
import { ListVideo, Mic2, Music } from "lucide-react";

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className={styles.searchContainer}>
			<div>
				<ButtonContainer />
			</div>
			<div className={styles.searchView}>{children}</div>
		</section>
	);
};

const ButtonContainer = () => {
	return (
		<div className={styles.buttonContainer}>
			<SidebarButton
				name="Songs"
				symbol={<Music size={20} />}
				href="/web/search/songs"
			/>
			<SidebarButton
				name="Artists"
				symbol={<Mic2 size={20} />}
				href="/web/search/artists"
			/>
			<SidebarButton
				symbol={<ListVideo size={20} />}
				name="Playlists"
				href="/web/search/playlists"
			/>
		</div>
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
	let className = styles.button;
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	if (pathname == href) {
		className = [styles.button, styles.buttonActive].join(" ");
	}

	return (
		<div
			onClick={() => {
				router.push(`${href}?q=${searchParams.get("q")}`);
			}}
			className={className}
		>
			{symbol && symbol}
			<label>{name}</label>
		</div>
	);
};

export default SearchLayout;
