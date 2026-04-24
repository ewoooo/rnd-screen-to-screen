"use client";

import type { ReactNode } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@wanteddev/wds";

// Figma accordion-option (atom) → WDS Accordion + Summary + Details
// Source: data/binding/overrides/accordion-option.json
export function AccordionOptionPilot({
	summary,
	details,
	defaultExpanded,
	priority = 1,
}: {
	summary: string;
	details?: ReactNode;
	defaultExpanded?: boolean;
	priority?: 1 | 2;
}) {
	return (
		<Accordion defaultExpanded={defaultExpanded} divider>
			<AccordionSummary>
				<Typography
					variant={priority === 1 ? "body1" : "body2"}
					weight={priority === 1 ? "bold" : "medium"}
				>
					{summary}
				</Typography>
			</AccordionSummary>
			{details && <AccordionDetails>{details}</AccordionDetails>}
		</Accordion>
	);
}
