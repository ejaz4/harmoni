import type { Metadata } from "next";
import "./globals.css";

import "react-loading-skeleton/dist/skeleton.css";
import { TouchEventHandler } from "react";

export const metadata: Metadata = {
	title: "Harmoni Web",
	description: "Harmoni is a self-hosted music streaming service.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body>{children}</body>
		</html>
	);
}
