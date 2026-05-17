"use client";

import { Accordion, Divider, Notice, RQRCard, Text } from "@pxds/cx-components";
import { Box, HStack, VStack } from "@pxds/cx-layout/primitives";
import { Fragment } from "react";
import type { TermListProps } from "./TermList.config";

type TermItem = {
	id: string;
	prefix: string;
	name: string;
};

// SB-only 구조 행(absent policy-core). 정책 copy 단정 아님 — 약관 항목 구조 표시만.
const TERM_ITEMS: readonly TermItem[] = [
	{ id: "service", prefix: "필수", name: "서비스 이용약관" },
	{ id: "privacy", prefix: "필수", name: "개인정보 수집·이용 동의" },
	{ id: "marketing", prefix: "선택", name: "마케팅 정보 수신 동의" },
];

// skeleton 행은 실제 약관 항목과 동일 레이아웃(LOD_2) — 항목 id로 안정 key 유지.
const SKELETON_KEYS = TERM_ITEMS.map((item) => item.id);

export function TermList({ state = "ready" }: TermListProps) {
	return (
		<VStack
			data-section-id="term-list"
			gap="var(--semantic-spacing-gap-comfortable)"
		>
			<Card>
				{state === "loading" ? (
					SKELETON_KEYS.map((key, index) => (
						<Fragment key={`term-skeleton-${key}`}>
							{index > 0 ? <Divider type="contents" /> : null}
							<SkeletonRow />
						</Fragment>
					))
				) : state === "error" ? (
					<Box
						px="var(--semantic-spacing-inset-lg)"
						py="var(--semantic-spacing-inset-lg)"
					>
						<Notice tone="negative">
							약관을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
						</Notice>
					</Box>
				) : (
					TERM_ITEMS.map((item, index) => (
						<Fragment key={item.id}>
							{index > 0 ? <Divider type="contents" /> : null}
							<TermRow prefix={item.prefix} name={item.name} />
						</Fragment>
					))
				)}
			</Card>
			{/* 약관 전문: SB-only 구조 part. 기본 접힘 — 본문 copy 발명 금지. */}
			<Card>
				<Accordion title="약관 전문 보기">
					<Box
						px="var(--semantic-spacing-inset-lg)"
						pb="var(--semantic-spacing-inset-lg)"
					>
						<Text variant="bodySubtle">
							약관 전문은 화면 진입 시 불러옵니다.
						</Text>
					</Box>
				</Accordion>
			</Card>
		</VStack>
	);
}

// card surface = RQRCard 후보 (DESIGN_PATTERNS §13.1 — component-owned
// padding/radius). vocabularyGap resolved: rqr-card.
function Card({ children }: { children: React.ReactNode }) {
	return <RQRCard>{children}</RQRCard>;
}

function TermRow({ prefix, name }: { prefix: string; name: string }) {
	return (
		<HStack
			align="center"
			justify="space-between"
			gap="var(--semantic-spacing-gap-comfortable)"
			px="var(--semantic-spacing-inset-lg)"
			py="var(--semantic-spacing-inset-lg)"
		>
			<HStack
				align="center"
				gap="var(--semantic-spacing-gap-tight)"
				minWidth={0}
			>
				<Text variant="bodySubtle">{prefix}</Text>
				<Text variant="listTitle">{name}</Text>
			</HStack>
			<Text variant="bodySubtle" aria-hidden="true">
				〉
			</Text>
		</HStack>
	);
}

function SkeletonRow() {
	return (
		<HStack
			align="center"
			gap="var(--semantic-spacing-gap-tight)"
			px="var(--semantic-spacing-inset-lg)"
			py="var(--semantic-spacing-inset-lg)"
			aria-hidden="true"
		>
			<Box
				background="var(--semantic-color-bg-alt)"
				borderRadius="var(--semantic-radius-sm)"
				height="20px"
				width="80%"
			/>
		</HStack>
	);
}
