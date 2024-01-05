"use client";

import { FormEvent, Suspense, use, useRef } from "react";
import { AuthenticationCard } from "../components/card";
import styles from "./form.module.css";

import { ChevronRight } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
	const router = useRouter();
	const formRef = useRef(null);
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);

	const submit = async (e: FormEvent) => {
		e.preventDefault();

		if (!usernameRef.current || !passwordRef.current) return;
		const username = (usernameRef.current as HTMLInputElement).value.trim();
		const password = (passwordRef.current as HTMLInputElement).value;

		if (!username || !password) return;

		const loginRequest = await fetch("/api/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		if (loginRequest.status == 200) {
			const loginResponse = await loginRequest.json();
			const { token } = loginResponse;

			if (!token) return;

			localStorage.setItem("token", token);
			router.push("/web/home");
		}
	};

	return (
		<>
			<AuthenticationCard>
				<div className={styles.loginContent}>
					<div className={styles.loginText}>
						<h3>Sign in to Harmoni</h3>

						<p>
							Get access to this server and your music library by
							signing in.
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
							id=""
							placeholder="Username"
							ref={usernameRef}
						/>
						<input
							type="password"
							name=""
							id=""
							placeholder="Password"
							ref={passwordRef}
						/>

						<button type="submit">
							Continue with combination <ChevronRight size={20} />
						</button>
					</form>
				</div>
			</AuthenticationCard>
			<div>
				<Link
					href={{
						pathname: "/auth/signup",
					}}
				>
					Sign up instead
				</Link>
			</div>
		</>
	);
};

export default LoginPage;
