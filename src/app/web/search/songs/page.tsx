import styles from "./songs.module.css";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { SearchServices } from "@/lib/search";
import { OtherSongResult, TopSongResult } from "./components/results";
import { Song } from "@/const/metadata";

const SongsResultsPage = ({
	searchParams,
}: {
	searchParams: { q: string };
}) => {
	return (
		<div className={styles.searchResultContainer}>
			<Suspense fallback={<SongResultsSkeleton />}>
				<SongResults q={searchParams.q} />
			</Suspense>

			<div></div>
		</div>
	);
};

const SongResults = async ({ q }: { q: string }) => {
	const search = new SearchServices();
	const searchResults = (await search.song(q)) as Song[];

	const [topSong, otherSongs]: [Song, Song[]] = [
		searchResults[0],
		searchResults.slice(1),
	];

	return (
		<section className={styles.songsResults}>
			{topSong && (
				<>
					<h3>Most Relevant</h3>
					<TopSongResult
						thumbnailUrl={topSong.thumbnailUrl}
						title={topSong.title}
						artists={topSong.artists}
						explicit={topSong.isExplicit}
						time={topSong.duration?.label}
						id={topSong.youtubeId}
					/>
				</>
			)}

			{otherSongs.length != 0 && (
				<>
					<h3>Other songs</h3>
					<section className={styles.otherSongsResults}>
						{otherSongs.map((song: Song) => (
							<OtherSongResult
								key={song.youtubeId}
								thumbnailUrl={song.thumbnailUrl}
								title={song.title}
								artists={song.artists}
								explicit={song.isExplicit}
								time={song.duration?.label}
								id={song.youtubeId}
							/>
						))}
					</section>
				</>
			)}

			{searchResults.length == 0 && (
				<>
					<h3>No results found</h3>
					<p>Try removing words or phrases to broaden your search.</p>
				</>
			)}
		</section>
	);
};

const SongResultsSkeleton = () => {
	return (
		<section className={styles.songsResults}>
			<Skeleton
				baseColor="#424242"
				highlightColor="#909090"
				height={30}
				width={150}
			/>
			<div className={styles.result}>
				{/* <Image src={thumbnailUrl} alt={""} width={120} height={120} /> */}
				<Skeleton
					baseColor="#424242"
					highlightColor="#909090"
					height={120}
					width={120}
				/>
				<div className={styles.bigResult}>
					<div>
						<Skeleton
							baseColor="#424242"
							highlightColor="#909090"
							height={24}
							width={150}
						/>
						<Skeleton
							baseColor="#424242"
							highlightColor="#909090"
							height={18}
							width={60}
						/>
					</div>

					<Skeleton
						baseColor="#424242"
						highlightColor="#909090"
						height={18}
						width={40}
					/>
				</div>
			</div>

			<Skeleton
				baseColor="#424242"
				highlightColor="#909090"
				height={30}
				width={130}
			/>
			<section className={styles.otherSongsResults}>
				{[...Array(10)].map((song: Song, _) => (
					<div key={_} className={styles.result}>
						<Skeleton
							baseColor="#424242"
							highlightColor="#909090"
							height={60}
							width={60}
						/>
						<div className={styles.smallResult}>
							<div>
								<Skeleton
									baseColor="#424242"
									highlightColor="#909090"
									height={24}
									width={150}
								/>
								<Skeleton
									baseColor="#424242"
									highlightColor="#909090"
									height={18}
									width={60}
								/>
							</div>

							<Skeleton
								baseColor="#424242"
								highlightColor="#909090"
								height={18}
								width={40}
							/>
						</div>
					</div>
				))}
			</section>
		</section>
	);
};

export default SongsResultsPage;
