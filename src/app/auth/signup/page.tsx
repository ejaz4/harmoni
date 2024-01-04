"use client";

import Link from "next/link";
import { AuthenticationCard } from "../components/card";
import styles from "./form.module.css";

import { ChevronRight } from "lucide-react";
import { FormEvent, useEffect, useRef } from "react";

const SignUpPage = () => {
	const formRef = useRef(null);

	const fullNameRef = useRef(null);
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);

	const submit = (e: FormEvent) => {
		e.preventDefault();

		if (!fullNameRef.current) return;
		const fullName = (fullNameRef.current as HTMLInputElement).value;

		if (!usernameRef.current) return;
		const username = (usernameRef.current as HTMLInputElement).value;

		if (!passwordRef.current) return;
		const password = (passwordRef.current as HTMLInputElement).value;

		if (!fullName || !username || !password) return;

		fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: fullName,
				username,
				password,
			}),
		}).then((res) => {
			if (res.status == 200) {
				res.json().then((res) => {
					if (res.error) {
						alert(res.error);
					} else {
						alert("Account created successfully!");
					}
				});
			} else {
				alert("An error occurred while creating your account.");
			}
		});
	};

	return (
		<>
			<AuthenticationCard>
				<div className={styles.loginContent}>
					<div className={styles.loginText}>
						<h3>Sign up to this Harmoni</h3>

						<p>
							Get access to this server and your music library by
							signing up.
						</p>
					</div>

					<form
						ref={formRef}
						onSubmit={submit}
						className={styles.form}
					>
						<input
							type="text"
							name=""
							placeholder="Full Name"
							ref={fullNameRef}
						/>

						<input
							type="text"
							name=""
							placeholder="Username"
							ref={usernameRef}
						/>
						<input
							type="password"
							name=""
							placeholder="Password"
							ref={passwordRef}
						/>

						<button type="submit">
							Create this account <ChevronRight size={20} />
						</button>
					</form>
				</div>
			</AuthenticationCard>
			<div>
				<Link
					href={{
						pathname: "/auth/login",
					}}
				>
					Log in instead
				</Link>
			</div>
		</>
	);
};

export default SignUpPage;
