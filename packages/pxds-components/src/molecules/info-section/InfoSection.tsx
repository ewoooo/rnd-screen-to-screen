import { ContentSection } from "@pxds/pxds-layout/components/chrome";
import type { ReactNode } from "react";
import { InfoList, type InfoListItem } from "../info-list";
import { SectionCard } from "../section-card";

type Props = {
	label: ReactNode;
	title: ReactNode;
	trailingText?: ReactNode;
	items: readonly InfoListItem[];
};

export function InfoSection({ label, title, trailingText, items }: Props) {
	return (
		<ContentSection>
			<SectionCard label={label} title={title} trailingText={trailingText}>
				<InfoList items={items} />
			</SectionCard>
		</ContentSection>
	);
}
