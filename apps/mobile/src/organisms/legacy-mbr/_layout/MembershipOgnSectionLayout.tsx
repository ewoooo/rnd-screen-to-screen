"use client";

import {
	ContentRail,
	type ContentRailKind,
	ContentSection,
	type ContentSectionInset,
} from "@pxds/pxds-layout/components/chrome";
import { VStack } from "@pxds/pxds-layout/primitives";

type MembershipOgnSectionLayoutProps = {
	children: React.ReactNode;
	inset?: ContentSectionInset;
	rail?: ContentRailKind;
};

export function MembershipOgnSectionLayout({
	children,
	inset = "inherit",
	rail = "inset",
}: MembershipOgnSectionLayoutProps) {
	return (
		<ContentSection inset={inset}>
			<ContentRail rail={rail}>
				<VStack gap="var(--semantic-spacing-block)">{children}</VStack>
			</ContentRail>
		</ContentSection>
	);
}
