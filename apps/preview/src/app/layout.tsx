import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "@pxds/cx-tokens/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
	title: "Screen Preview",
	description: "shadcn preview shell for WDS mobile screens",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<head>
				<script
					src="https://mcp.figma.com/mcp/html-to-design/capture.js"
					async
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
