import styles from "./sidebar.module.css";

export const Sidebar = () => {
	return (
		<section>
			<BrowseSection />
		</section>
	);
};

const BrowseSection = () => {
	return (
		<section>
			<p>Browse</p>
			<div>
				<SidebarButton name="For You" href="/home/foryou" />
				<SidebarButton name="Trending" href="/home/trending" />
				<SidebarButton name="Nearby" href="/home/nearby=" />
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
	return (
		<div className={styles.buttonActive}>
			{symbol && <symbol />}
			<label>{name}</label>
		</div>
	);
};
