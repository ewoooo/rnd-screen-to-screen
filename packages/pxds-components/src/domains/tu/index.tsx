import { Card, CardContent } from "@pxds/pxds-components/core";
import {
	IconBell,
	IconGlobe,
	IconImage,
	IconMobile,
} from "@pxds/pxds-icons";
import type { CSSProperties, ReactNode } from "react";

import { Placeholder } from "@pxds/pxds-components/atoms/feedback";
import { Box, HStack, VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import {
	InfoList,
	NoticeBlock,
	type InfoListItem,
	PromoBlock,
	SectionCard,
} from "../../molecules";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

export { tuRegistryEntries } from "./tu.registry";

export function TuDisplay({
	children,
	size = "lg",
}: {
	children: string;
	size?: "md" | "lg";
	as?: "h1" | "h2";
}) {
	return (
		<TextBlock
			variant={size === "lg" ? "displayTitle" : "hero"}
			lines={children.split("\n")}
		/>
	);
}

function TuEyebrow({ children }: { children: string }) {
	return (
		<TextBlock
			variant="sectionLabel"
			text={children}
			color="semantic.label.alternative"
		/>
	);
}

export function TuSub({ children }: { children: string }) {
	return (
		<TextBlock
			variant="bodySubtle"
			lines={children.split("\n")}
			color="semantic.label.alternative"
		/>
	);
}

export function TuHero({
	eyebrow,
	title,
	sub,
	style,
}: {
	eyebrow?: string;
	title: string;
	sub?: string;
	style?: CSSProperties;
}) {
	return (
		<ContentSection>
			<VStack
				as="header"
				gap="var(--semantic-spacing-inline)"
				pb="var(--semantic-spacing-section)"
				style={style}
			>
				{eyebrow ? <TuEyebrow>{eyebrow}</TuEyebrow> : null}
				<TuDisplay size="lg">{title}</TuDisplay>
				{sub ? <TuSub>{sub}</TuSub> : null}
			</VStack>
		</ContentSection>
	);
}

export function TuSection({
	title,
	more,
	children,
}: {
	title: string;
	more?: string;
	children: ReactNode;
}) {
	return (
		<ContentSection>
			<VStack gap="var(--semantic-spacing-group)" pb="var(--semantic-spacing-section)">
				<HStack align="baseline" justify="space-between" gap="var(--semantic-spacing-inline)">
					<TextBlock variant="cardTitle" text={title} />
					{more ? (
						<TextBlock
							variant="caption"
							text={more}
							color="semantic.label.alternative"
						/>
					) : null}
				</HStack>
				{children}
			</VStack>
		</ContentSection>
	);
}

function TuAmount({
	num,
	unit,
	accent,
}: {
	num: string | number;
	unit: string;
	accent?: boolean;
}) {
	return (
		<HStack as="span" align="baseline" gap="var(--semantic-spacing-row)">
			<TextBlock
				variant="listTitle"
				text={String(num)}
				color={accent ? "semantic.primary.normal" : "semantic.label.normal"}
			/>
			<TextBlock
				variant="supportText"
				text={unit}
				color="semantic.label.alternative"
			/>
		</HStack>
	);
}

export type TuCardItem = {
	id: string;
	rank: number;
	title: string;
	sub: string;
	num: string | number;
	unit: string;
	mediaTone?: "lilac" | "blue" | "peach";
};

export function TuCarousel({ items }: { items: TuCardItem[] }) {
	return (
		<ContentSection inset="bleed">
			<HStack
				gap="var(--semantic-spacing-stack)"
				style={{
					overflowX: "auto",
					padding: "4px var(--content-inline-inset, var(--spacing-12))",
					scrollbarWidth: "none",
				}}
			>
				{items.map((item) => (
					<Card
						as="article"
						key={item.id}
						platform="mobile"
						width={220}
						style={{ flex: "0 0 220px", boxShadow: "var(--pxds-surface-card-shadow)" }}
					>
						<Placeholder w="100%" h={132} label={`${item.rank}`} />
						<CardContent gap="var(--spacing-12)">
							<VStack gap="var(--semantic-spacing-row)">
								<TextBlock
									variant="listTitle"
									text={item.title}
									maxLines={1}
									overflow="truncate"
								/>
								<TextBlock
									variant="caption"
									text={item.sub}
									color="semantic.label.alternative"
									maxLines={1}
									overflow="truncate"
								/>
							</VStack>
							<TuAmount num={item.num} unit={item.unit} accent />
						</CardContent>
					</Card>
				))}
			</HStack>
		</ContentSection>
	);
}

export type TuRowItem = {
	id: string;
	rank: number;
	title: string;
	num: string | number;
	unit: string;
};

export function TuList({ items }: { items: TuRowItem[] }) {
	const listItems: InfoListItem[] = items.map((item) => ({
		id: item.id,
		title: item.title,
		sub: `${item.num}${item.unit}`,
		trailingLabel: `${item.rank}위`,
		mediaLabel: item.title,
	}));

	return (
		<SectionCard>
			<InfoList items={listItems} />
		</SectionCard>
	);
}

export function TuPromo({ title, sub }: { title: string; sub: string }) {
	return (
		<ContentSection>
			<Box pb="var(--semantic-spacing-section)">
				<PromoBlock
					badge="혜택"
					text={title}
					action={sub}
					mediaLabel="promo"
				/>
			</Box>
		</ContentSection>
	);
}

export function TuNotice({ children }: { children: ReactNode }) {
	return (
		<ContentSection>
			<Box pb="var(--semantic-spacing-section)">
				<NoticeBlock text={String(children)} tone="info" />
			</Box>
		</ContentSection>
	);
}

export type PermissionListItem = {
	id: string;
	title: string;
	purpose: string;
	required: boolean;
};

export function PermissionIntro({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<ContentSection>
			<VStack as="header" gap="var(--semantic-spacing-inline)" pb="var(--semantic-spacing-section)">
				<TuDisplay size="lg">{title}</TuDisplay>
				<TuSub>{description}</TuSub>
			</VStack>
		</ContentSection>
	);
}

export function PermissionList({
	label,
	items,
}: {
	label: string;
	items: readonly PermissionListItem[];
}) {
	const listItems: InfoListItem[] = items.map((item) => ({
		id: item.id,
		title: item.title,
		sub: item.purpose,
		trailingLabel: item.required ? "필수" : "선택",
		mediaLabel: item.title,
		mediaIcon: getPermissionIcon(item.id),
	}));

	return (
		<ContentSection>
			<VStack gap="var(--semantic-spacing-row)">
				<TextBlock variant="listTitle" text={label} />
				<SectionCard>
					<InfoList items={listItems} />
				</SectionCard>
			</VStack>
		</ContentSection>
	);
}

export function PermissionNotice({ children }: { children: ReactNode }) {
	return (
		<ContentSection>
			<NoticeBlock text={String(children)} tone="info" />
		</ContentSection>
	);
}

function getPermissionIcon(id: string): ReactNode {
	const iconProps = {
		width: 22,
		height: 22,
		color: "var(--semantic-label-alternative)",
		"aria-hidden": true,
	};

	switch (id) {
		case "device":
			return <IconMobile {...iconProps} />;
		case "network":
			return <IconGlobe {...iconProps} />;
		case "notification":
			return <IconBell {...iconProps} />;
		case "storage":
			return <IconImage {...iconProps} />;
		default:
			return null;
	}
}
