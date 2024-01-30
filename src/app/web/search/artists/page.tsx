import styles from "./artist.module.css";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { SearchServices } from "@/lib/search";
import { ArtistResult } from "./components/results";
import { ArtistResults, Song } from "@/const/metadata";

const ArtistResultsPage = ({
	searchParams,
}: {
	searchParams: { q: string };
}) => {
	return (
		<div className={styles.searchResultContainer}>
			<Suspense fallback={<SongResultsSkeleton />}>
				<ArtistResults q={searchParams.q} />
			</Suspense>

			<div></div>
		</div>
	);
};

const ArtistResults = async ({ q }: { q: string }) => {
	const search = new SearchServices();
	const searchResults = (await search.artist(q)) as ArtistResults[];

	return (
		<section className={styles.artistResults}>
			{searchResults.length != 0 && (
				<section className={styles.otherResults}>
					{searchResults.map(
						(artist: ArtistResults, index: number) => (
							<ArtistResult
								key={artist.artistId}
								name={artist.name}
								artistId={artist.artistId}
								thumbnailUrl={artist.thumbnailUrl}
								subscribers={artist.subscribers}
							/>
						)
					)}
				</section>
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

export default ArtistResultsPage;
