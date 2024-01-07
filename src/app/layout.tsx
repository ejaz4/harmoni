import type { Metadata } from "next";
import "./globals.css";

import "react-loading-skeleton/dist/skeleton.css";

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
			<body>{children}</body>
		</html>
	);
}
