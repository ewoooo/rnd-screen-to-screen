"use client";

import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import {
	ConsentList,
	PrimaryCTABar,
	SelectableList,
	TextFieldList,
	type SelectableItem,
	type TextFieldListField,
} from "@pxds/pxds-components/molecules";
import {
	FlowHero,
	FlowNotice,
	FlowSummaryCard,
	type FlowSummaryItem,
} from "@pxds/pxds-components/shared/global";
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

export function MembershipHeroSection({
	titleLines,
	description,
}: {
	titleLines: readonly string[];
	description: string;
}) {
	return <FlowHero titleLines={titleLines} description={description} />;
}

export function MembershipNoticeSection({
	badge,
	text,
	action,
	tone,
}: {
	badge: string;
	text: string;
	action?: string;
	tone?: "info" | "warning" | "critical";
}) {
	return <FlowNotice badge={badge} text={text} action={action} tone={tone} />;
}

export function MembershipSummarySection({
	label,
	title,
	items,
}: {
	label: string;
	title: string;
	items: readonly FlowSummaryItem[];
}) {
	return <FlowSummaryCard label={label} title={title} items={items} />;
}

export function MembershipSelectableSection({
	name,
	items,
	value,
	selectionMode,
	selectedIds,
}: {
	name: string;
	items: readonly SelectableItem[];
	value?: string;
	selectionMode?: "single" | "multi";
	selectedIds?: readonly string[];
}) {
	if (selectionMode === "multi") {
		return (
			<MembershipContentSection inset="bleed" rail="inset">
				<SelectableList
					name={name}
					items={items}
					selectionMode="multi"
					selectedIds={selectedIds ?? []}
				/>
			</MembershipContentSection>
		);
	}

	return (
		<MembershipContentSection inset="bleed" rail="inset">
			<SelectableList name={name} items={items} value={value} />
		</MembershipContentSection>
	);
}

export function MembershipFormSection({
	fields,
}: {
	fields: readonly TextFieldListField[];
}) {
	return (
		<MembershipContentSection>
			<TextFieldList fields={fields} values={{}} onChange={() => undefined} />
		</MembershipContentSection>
	);
}

export function MembershipTermsSection() {
	return (
		<MembershipContentSection>
			<TextBlock variant="sectionTitle" text="필수 약관" />
			<ConsentList
				allLabel="전체 동의"
				allCaption="선택 약관까지 한 번에 동의"
				items={[
					{
						id: "service",
						title: "T 우주 서비스 이용약관",
						caption: "v3.2",
						required: true,
						defaultChecked: true,
					},
					{
						id: "privacy",
						title: "개인정보 수집 및 이용 동의",
						caption: "v5.1",
						required: true,
						defaultChecked: true,
					},
					{
						id: "marketing",
						title: "혜택·이벤트 정보 수신 동의",
						caption: "동의하지 않아도 가입 가능",
						required: false,
						defaultChecked: false,
					},
				]}
			/>
		</MembershipContentSection>
	);
}

export function MembershipPrimaryActionBar({
	primaryLabel,
	secondaryLabel,
	disabled,
}: {
	primaryLabel: string;
	secondaryLabel?: string;
	disabled?: boolean;
}) {
	return (
		<PrimaryCTABar
			primaryLabel={primaryLabel}
			secondaryLabel={secondaryLabel}
			disabled={disabled}
		/>
	);
}
