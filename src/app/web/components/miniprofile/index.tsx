"use client";

import styles from "./miniprofile.module.css";
import Image from "next/image";
import defaultProfile from "@/assets/images/default-profile.jpg";
import { IDRequest } from "@/app/api/user/id/route";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export const MiniProfile = () => {
	const [fullName, setFullName] = useState("");
	const [profilePhoto, setProfilePhotoUrl] = useState(null);

	const loadProfile = async () => {
		const token = localStorage.getItem("token");
		let connectedID = localStorage.getItem("connectedID");

		if (!token) {
			return redirect("/auth");
		}

		if (!connectedID) {
			const idFetch = await fetch(`/api/user/id`, {
				headers: {
					authorization: token,
				},
			});
			const id: IDRequest = await idFetch.json();
			if (id.id) {
				connectedID = id.id;
				localStorage.setItem("connectedID", id.id);
			} else {
				alert("There was an error returning your ID.");
			}
		}

		let cachedProfile = localStorage.getItem(
			`${connectedID}:cachedProfile`
		);

		if (!cachedProfile) {
			const profileFetch = await fetch(`/api/user/${connectedID}`, {
				headers: {
					authorization: token,
				},
			});
			const profile = await profileFetch.json();
			if (profileFetch.status == 200) {
				cachedProfile = profile;
				localStorage.setItem(
					`${connectedID}:cachedProfile`,
					JSON.stringify(profile)
				);

				setProfilePhotoUrl(profile.profilePhoto);
				setFullName(profile.name);
			} else {
				alert("There was an error returning your profile.");
			}
		} else {
			setProfilePhotoUrl(JSON.parse(cachedProfile).profilePhoto);
			setFullName(JSON.parse(cachedProfile).name);
		}
	};

	useEffect(() => {
		loadProfile();
	}, []);

	return (
		<section className={styles.miniProfile}>
			{profilePhoto && (
				<Image
					src={defaultProfile}
					alt={"Your profile photo"}
					width={24}
					height={24}
				/>
			)}
			<p>{fullName}</p>
		</section>
	);
};
