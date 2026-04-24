"use client";

import { PageCounter } from "@wanteddev/wds";

// Figma pageindicator-number (atom) → WDS PageCounter
// Source: data/binding/overrides/pageindicator-number.json
export function PageIndicatorNumberPilot({
	currentPage,
	totalPages,
	alternative,
}: {
	currentPage: number;
	totalPages: number;
	alternative?: boolean;
}) {
	return (
		<PageCounter
			size="small"
			currentPage={currentPage}
			totalPages={totalPages}
			alternative={alternative}
		/>
	);
}
