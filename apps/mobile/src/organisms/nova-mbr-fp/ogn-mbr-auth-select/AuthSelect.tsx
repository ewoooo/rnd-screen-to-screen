"use client";

import {
	Divider,
	ListSelected,
	RQRCard,
	Text,
	TitleSection,
} from "@pxds/cx-components";
import { Box, VStack } from "@pxds/cx-layout/primitives";
import { Fragment, useState } from "react";

/**
 * ogn-mbr-auth-select (NEW)
 *
 * 본인인증 수단 단일 선택 OGN.
 * - POL-MBR-AUTH-002-01: 휴대폰 / PASS / 공동인증서 중 단일 선택(상호배타)
 * - POL-MBR-AUTH-002-05: 진입 시 3개 기본 노출 (loading = 동일 레이아웃 skeleton)
 * - POL-MBR-AUTH-002-09: 노출 순서 고정 1)휴대폰 2)PASS 3)공동인증서
 *
 * 레이아웃 계약: section title(TitleSection) + 단일 card surface 안에 3개
 * single-select row(ListSelected radio), 행 사이는 Divider(type="contents").
 * loading 상태는 동일 3행 레이아웃 skeleton (UXPT_LOD_2 — 레이아웃 점프 방지).
 */

export type AuthMethodId = "phone" | "pass" | "cert";

// 정책 고정 순서/어휘 (POL-MBR-AUTH-002-09 / POL-MBR-AUTH-002-01)
const AUTH_METHODS: ReadonlyArray<{ id: AuthMethodId; label: string }> = [
	{ id: "phone", label: "휴대폰" },
	{ id: "pass", label: "PASS" },
	{ id: "cert", label: "공동인증서" },
];

export type AuthSelectProps = {
	/** 현재 선택된 인증수단. 미선택 시 undefined. */
	selected?: AuthMethodId;
	/** 선택 변경 콜백. screen이 상태를 lift할 때 사용. */
	onSelect?: (method: AuthMethodId) => void;
	/** 목록 로딩 중. true면 동일 레이아웃 3행 skeleton 노출 (UXPT_LOD_2). */
	loading?: boolean;
	/**
	 * 목록 로드 실패 안내 (POL-MBR-AUTH-002-05.copy.error).
	 * "사용 가능한 인증수단을 불러오지 못했습니다"
	 */
	loadErrorText?: string;
};

export function AuthSelect({
	selected,
	onSelect,
	loading = false,
	loadErrorText,
}: AuthSelectProps) {
	// 비제어 사용 대비 내부 상태. screen이 selected/onSelect를 넘기면 그쪽이 SOT.
	const [internalSelected, setInternalSelected] = useState<
		AuthMethodId | undefined
	>(undefined);
	const resolvedSelected = selected ?? internalSelected;

	const handleSelect = (method: AuthMethodId) => {
		setInternalSelected(method);
		onSelect?.(method);
	};

	return (
		<VStack
			data-section-id="authSelect"
			data-ogn-id="ogn-mbr-auth-select"
			gap="var(--semantic-spacing-section-gap)"
		>
			<TitleSection title="본인인증 수단을 선택해 주세요" />

			{/* card surface = RQRCard 후보 (DESIGN_PATTERNS §13.1 — component-owned
			    padding/radius). vocabularyGap resolved: rqr-card. */}
			<RQRCard>
				{loading
					? AUTH_METHODS.map((method, index) => (
							<Fragment key={method.id}>
								{index > 0 ? <Divider type="contents" /> : null}
								<AuthMethodSkeletonRow />
							</Fragment>
						))
					: AUTH_METHODS.map((method, index) => (
							<Fragment key={method.id}>
								{index > 0 ? <Divider type="contents" /> : null}
								<ListSelected
									type="radio"
									label={method.label}
									checked={resolvedSelected === method.id}
									showListSelectedRightItem={false}
									showSubText={false}
									onChange={() => handleSelect(method.id)}
								/>
							</Fragment>
						))}
			</RQRCard>

			{!loading && loadErrorText ? (
				<Text variant="error">{loadErrorText}</Text>
			) : null}
		</VStack>
	);
}

// skeleton 행: 실제 ListSelected 행과 동일한 수직 리듬을 유지하는 placeholder.
function AuthMethodSkeletonRow() {
	return (
		<Box
			aria-hidden="true"
			py="var(--semantic-spacing-gap-default)"
			px="var(--semantic-spacing-inset-md)"
			data-skeleton-row=""
		>
			<Box
				background="var(--semantic-color-bg-alt)"
				borderRadius="var(--semantic-radius-sm)"
				height="20px"
				width="40%"
			/>
		</Box>
	);
}
