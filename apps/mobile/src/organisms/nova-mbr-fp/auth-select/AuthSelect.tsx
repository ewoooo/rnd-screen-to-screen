"use client";

import { Divider, RadioButton, Text } from "@pxds/cx-components";
import { Box, HStack, VStack } from "@pxds/cx-layout/primitives";
import { Fragment, useState } from "react";

type AuthMethod = {
	id: string;
	title: string;
	caption: string;
};

// SB ogn-mbr-auth-select: 업무별 허용 인증수단 목록 표시 및 선택 처리.
// POL-MBR-AUTH-002-01(허용 인증수단), POL-MBR-AUTH-002-05(기본 노출 3종),
// POL-MBR-AUTH-002-09(고정 노출 순서 휴대폰 → PASS → 공동인증서) 가시 계약.
const AUTH_METHODS: readonly AuthMethod[] = [
	{
		id: "phone",
		title: "휴대폰",
		caption: "본인 명의 휴대폰으로 인증해요",
	},
	{
		id: "pass",
		title: "PASS",
		caption: "통신사 PASS 앱으로 인증해요",
	},
	{
		id: "cert",
		title: "공동인증서",
		caption: "공동·금융인증서로 인증해요",
	},
];

export function AuthSelect() {
	const [authMethod, setAuthMethod] = useState<string>("phone");

	return (
		<VStack
			data-section-id="authMethod"
			gap="var(--semantic-spacing-gap-loose)"
		>
			<Box
				background="var(--component-card-bg-default)"
				borderColor="var(--component-card-border-default)"
				borderRadius="var(--semantic-radius-lg)"
				borderWidth="1px"
				overflow="hidden"
				style={{ borderStyle: "solid" }}
			>
				{AUTH_METHODS.map((item, index) => (
					<Fragment key={item.id}>
						{index > 0 ? <Divider type="contents" /> : null}
						<AuthMethodRow
							title={item.title}
							caption={item.caption}
							checked={authMethod === item.id}
							onSelect={() => setAuthMethod(item.id)}
						/>
					</Fragment>
				))}
			</Box>
			<Text variant="helper">휴대폰, PASS, 공동인증서로 인증할 수 있어요</Text>
		</VStack>
	);
}

function AuthMethodRow({
	title,
	caption,
	checked,
	onSelect,
}: {
	title: string;
	caption: string;
	checked: boolean;
	onSelect: () => void;
}) {
	return (
		<HStack
			align="flex-start"
			gap="var(--semantic-spacing-gap-comfortable)"
			onClick={onSelect}
			px="var(--semantic-spacing-inset-lg)"
			py="var(--semantic-spacing-inset-lg)"
		>
			<RadioButton
				name="auth-method"
				checked={checked}
				onCheckedChange={(next) => {
					if (next) onSelect();
				}}
			/>
			<VStack minWidth={0} gap="var(--semantic-spacing-gap-tight)">
				<Text variant="listTitle">{title}</Text>
				<Text variant="helper">{caption}</Text>
			</VStack>
		</HStack>
	);
}
