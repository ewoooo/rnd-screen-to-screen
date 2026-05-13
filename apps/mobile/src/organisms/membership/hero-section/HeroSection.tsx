"use client";

import { FlowHero } from "@pxds/pxds-components/shared/global";
import type { HeroSectionProps } from "./HeroSection.config";

export function MembershipHeroSection({
	titleLines,
	description,
}: HeroSectionProps) {
	return <FlowHero titleLines={titleLines} description={description} />;
}
