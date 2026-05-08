import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "./globals.css";

export const metadata: Metadata = {
	title: "Screen Preview",
	description: "shadcn preview shell for WDS mobile screens",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body>{children}</body>
		</html>
	);
}
