"use client";

import {
	ContentRail,
	ContentSection,
	type ContentRailKind,
	type ContentSectionInset,
} from "@pxds/pxds-layout/app-screen";
import { VStack } from "@pxds/pxds-layout/primitives";

type MembershipSectionProps = {
	children: React.ReactNode;
	inset?: ContentSectionInset;
	rail?: ContentRailKind;
};

export function MembershipContentSection({
	children,
	inset = "inherit",
	rail = "inset",
}: MembershipSectionProps) {
	return (
		<ContentSection inset={inset}>
			<ContentRail rail={rail}>
				<VStack gap="var(--semantic-spacing-block)">{children}</VStack>
			</ContentRail>
		</ContentSection>
	);
}
