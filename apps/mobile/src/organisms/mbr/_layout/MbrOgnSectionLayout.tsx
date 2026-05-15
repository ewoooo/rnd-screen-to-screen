import {
	ContentRail,
	type ContentRailKind,
	type ContentRailMeasure,
	ContentSection,
	type ContentSectionInset,
} from "@pxds/pxds-layout/components/chrome";
import { VStack } from "@pxds/pxds-layout/primitives";

type MbrOgnSectionLayoutProps = {
	children: React.ReactNode;
	inset?: ContentSectionInset;
	rail?: ContentRailKind;
	measure?: ContentRailMeasure;
};

export function MbrOgnSectionLayout({
	children,
	inset = "inherit",
	rail = "inset",
	measure = "body",
}: MbrOgnSectionLayoutProps) {
	return (
		<ContentSection inset={inset}>
			<ContentRail rail={rail} measure={measure}>
				<VStack gap="var(--semantic-spacing-block)">{children}</VStack>
			</ContentRail>
		</ContentSection>
	);
}
