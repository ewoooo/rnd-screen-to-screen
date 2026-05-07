"use client";

import {
	InfoList,
	type InfoListItem,
	NoticeBlock,
	PrimaryCTABar,
} from "@/components/molecules";
import { ProgressTopBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type { RenderableScreenSpecV1 } from "@screen/screens";

type ListData = { title: string; rows: readonly InfoListItem[] };
type PermissionData = {
	tone: "info" | "warning" | "critical";
	title: string;
	text: string;
};
type CtaData = { primary: { id: string; label: string } };

export function BillingStatementScreen({
	spec,
}: {
	spec: RenderableScreenSpecV1;
}) {
	const list = readData<ListData>(spec, "list");
	const permission = readData<PermissionData>(spec, "permission");
	const cta = readData<CtaData>(spec, "cta");

	return (
		<AppScreen
			top={<ProgressTopBar title="요금안내서" leading="back" />}
			bottom={<PrimaryCTABar primaryLabel={cta.primary.label} />}
		>
			<InfoList
				items={list.rows.map((r) => ({
					id: r.id,
					title: r.title,
					sub: r.sub ?? "",
					trailingLabel: r.trailingLabel,
				}))}
			/>
			<NoticeBlock
				tone={permission.tone}
				badge={permission.title}
				text={permission.text}
			/>
		</AppScreen>
	);
}

function readData<T>(spec: RenderableScreenSpecV1, key: string): T {
	const v = spec.data[key];
	if (!v || typeof v !== "object" || Array.isArray(v)) {
		throw new Error(`billing-statement spec missing data.${key}`);
	}
	return v as unknown as T;
}
