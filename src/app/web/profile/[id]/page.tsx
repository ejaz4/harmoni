"use client";
import React from "react";
import { useParams } from "next/navigation";
import styles from "./profile.module.css";
import { ProfileHeader } from "./profile";

const ProfilePage = () => {
	const { id } = useParams() as { id: string };

	return (
		<section className={styles.profile}>
			<ProfileHeader profileId={id} />
		</section>
	);
};

export default ProfilePage;
