"use client";

import { Suspense } from "react";
import { AuthenticationCard } from "../components/card";
import styles from "./form.module.css";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
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

					<div className={styles.form}>
						<input
							type="text"
							name=""
							id=""
							placeholder="Username"
						/>
						<input
							type="password"
							name=""
							id=""
							placeholder="Password"
						/>

						<button>
							Continue with combination <ChevronRight size={20} />
						</button>
					</div>
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
