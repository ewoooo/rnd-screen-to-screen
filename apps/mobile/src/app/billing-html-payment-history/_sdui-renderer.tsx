"use client";

import {
	ChipGroup,
	InfoList,
	type InfoListItem,
	PrimaryCTABar,
	SectionCard,
} from "@/components/molecules";
import { ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/specs";

type HistoryData = { title: string; rows: readonly InfoListItem[] };
type ReceiptTypesData = {
	title: string;
	chips: readonly { id: string; label: string; selected?: boolean }[];
};
type CtaData = { primary: { id: string; label: string } };

export function BillingPaymentHistoryScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const history = readData<HistoryData>(spec, "history");
	const receiptTypes = readData<ReceiptTypesData>(spec, "receiptTypes");
	const cta = readData<CtaData>(spec, "cta");

	const chipItems = receiptTypes.chips.map((c) => ({ id: c.id, label: c.label }));
	const selectedChipIds = receiptTypes.chips
		.filter((c) => c.selected)
		.map((c) => c.id);

	return (
		<AppScreen
			top={<ProgressTopBar title="납부 이력" leading="back" />}
			bottom={<PrimaryCTABar primaryLabel={cta.primary.label} />}
		>
			<InfoList
				items={history.rows.map((r) => ({
					id: r.id,
					title: r.title,
					sub: r.sub ?? "",
					trailingLabel: r.trailingLabel,
				}))}
			/>
			<SectionCard label={receiptTypes.title}>
				<ChipGroup items={chipItems} selectedIds={selectedChipIds} />
			</SectionCard>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const v = spec.data[key];
	if (!v || typeof v !== "object" || Array.isArray(v)) {
		throw new Error(`billing-payment-history spec missing data.${key}`);
	}
	return v as unknown as T;
}
