import { redirect } from "next/navigation";

const SearchPage = ({ searchParams }: { searchParams: { q: string } }) => {
	redirect(`/web/search/songs?q=${searchParams.q}`);
};

export default SearchPage;
