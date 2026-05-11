import { Button, Card } from "@pxds/pxds-components/core";
import type { CSSProperties, ReactNode } from "react";

import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { Divider } from "@pxds/pxds-components/atoms/feedback";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";

import { AiAnnotation } from "../ai-annotation";
import { HomeBlockHeader } from "./HomeBlockHeader";

/**
 * Home 화면의 의미 블록 시스템.
 * Root/Header/Body/Action 같은 제한된 compound 슬롯 위에
 * HomeHeroBlock, HomeInfoBlock, HomeActionPairBlock preset을 얹는다.
 */

type Slot = { icon: ReactNode; label: string };
type AiSlot = { icon?: ReactNode; text: string };
type CtaSlot = { text: string; onClick?: () => void };
type HeaderGap = 4 | 8;

type CommonProps = { style?: CSSProperties };

type RootProps = CommonProps & {
	children: ReactNode;
};

type HeaderProps = {
	label: string;
	title?: string;
	sub?: string;
	gap?: HeaderGap;
	children?: ReactNode;
};

type BodyProps = {
	children: ReactNode;
	gap?: number;
	style?: CSSProperties;
};

type ActionProps = {
	text: string;
	onClick?: () => void;
};

type ActionPairProps = CommonProps & {
	left: Slot;
	right: Slot;
};

type InfoProps = CommonProps & {
	label: string;
	title?: string;
	badge?: ReactNode;
	body?: ReactNode;
	aside?: ReactNode;
};

type HeroProps = CommonProps & {
	label: string;
	title: string;
	ai?: AiSlot;
	cta: CtaSlot;
};

const homeCardSurface: CSSProperties = {
	background: "var(--pxds-surface-card-background)",
	border: "1px solid var(--pxds-surface-card-border)",
	borderRadius: "var(--pxds-surface-card-radius)",
	boxShadow: "var(--pxds-surface-card-shadow)",
	boxSizing: "border-box",
};

function Root({ children, style }: RootProps) {
	return (
		<Card
			platform="mobile"
			width="100%"
			style={{
				...homeCardSurface,
				padding: "var(--spacing-32)",
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-24)",
				...style,
			}}
		>
			{children}
		</Card>
	);
}

function Header({ label, title, sub, gap, children }: HeaderProps) {
	return (
		<HStack align="center" justify="space-between" gap="inline">
			<HomeBlockHeader label={label} title={title} sub={sub} gap={gap} />
			{children}
		</HStack>
	);
}

function Body({ children, gap = 24, style }: BodyProps) {
	return (
		<VStack
			style={{
				gap: `var(--spacing-${gap})`,
				...style,
			}}
		>
			{children}
		</VStack>
	);
}

function Action({ text, onClick }: ActionProps) {
	return (
		<Button size="small" variant="solid" color="primary" onClick={onClick}>
			{text}
		</Button>
	);
}

export function HomeActionPairBlock({ left, right, style }: ActionPairProps) {
	return (
		<HomeBlock.Root
			style={{
				height: 64,
				padding: 0,
				display: "flex",
				flexDirection: "row",
				alignItems: "stretch",
				...style,
			}}
		>
			<L1Slot {...left} />
			<Divider orientation="vertical" inset="block" />
			<L1Slot {...right} />
		</HomeBlock.Root>
	);
}

function L1Slot({ icon, label }: Slot) {
	return (
		<HStack
			align="center"
			justify="center"
			grow={1}
			gap="row"
		>
			{icon}
			<TextBlock
				variant="listTitle"
				text={label}
				maxLines={1}
				overflow="truncate"
			/>
		</HStack>
	);
}

export function HomeInfoBlock({ label, title, badge, body, aside, style }: InfoProps) {
	if (aside !== undefined) {
		return (
			<HomeBlock.Root
				style={{
					height: 112,
					padding: "var(--spacing-32)",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					...style,
				}}
			>
				<VStack gap="row">
					<TextBlock
						variant="sectionLabel"
						text={label}
						color="semantic.label.neutral"
						maxLines={1}
						overflow="truncate"
					/>
					<HStack align="center" gap="inline">
						{title !== undefined ? (
							<TextBlock
								variant="contentTitle"
								text={title}
								maxLines={1}
								overflow="truncate"
							/>
						) : null}
						{badge}
					</HStack>
				</VStack>
				{aside}
			</HomeBlock.Root>
		);
	}
	return (
		<HomeBlock.Root style={style}>
			<HomeBlockHeader label={label} title={title} />
			{body}
		</HomeBlock.Root>
	);
}

export function HomeHeroBlock({ label, title, ai, cta, style }: HeroProps) {
	return (
		<HomeBlock.Root
			style={{
				alignItems: "flex-end",
				...style,
			}}
		>
			<VStack gap="group" width="100%">
				<HomeBlockHeader label={label} title={title} gap={8} />
				{ai ? <AiAnnotation icon={ai.icon} text={ai.text} /> : null}
			</VStack>
			<HomeBlock.Action text={cta.text} onClick={cta.onClick} />
		</HomeBlock.Root>
	);
}

export const HomeBlock = {
	Root,
	Header,
	Body,
	Action,
} as const;
