"use client";
import { FormEvent, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchBar = () => {
	const formRef = useRef(null);
	const router = useRouter();
	const searchQuery = useSearchParams().get("q");

	const search = (e: FormEvent) => {
		e.preventDefault();

		if (formRef.current) {
			const formData = new FormData(formRef.current);
			const query = formData.get("query");

			const encodedQuery = encodeURIComponent(query as string);

			router.push(`/web/search?q=${encodedQuery}`);
		}
	};

	return (
		<form ref={formRef} onSubmit={search}>
			<input
				defaultValue={searchQuery || ""}
				type="search"
				placeholder="Search"
				name="query"
			/>
		</form>
	);
};
