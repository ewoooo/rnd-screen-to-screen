"use client";

import { Accordion, Badge, Divider, Text } from "@pxds/cx-components";
import { Box, HStack, VStack } from "@pxds/cx-layout/primitives";
import { Fragment } from "react";

type TermDocument = {
	id: string;
	title: string;
	required: boolean;
	body: string;
};

// SB ogn-mbr-term-list: 업무별 최신 약관 목록을 서버 조회해 표시한다.
// 정책 갭: POL-MBR-TERM-001-01 / -001-02 / -001-10 은 policy-core 미작성이라
// 표시 항목·순서·버전 기준은 SB 원문(SB-MBR-UC01_02-0513)만 근거로 둔다.
const TERM_DOCUMENTS: readonly TermDocument[] = [
	{
		id: "service",
		title: "서비스 이용약관",
		required: true,
		body: "회원 가입 및 서비스 이용을 위한 기본 약관입니다. 서비스 제공 범위, 회원 의무, 이용 제한 사유를 포함합니다.",
	},
	{
		id: "privacy",
		title: "개인정보 수집·이용",
		required: true,
		body: "이름·연락처 등 회원 정보를 가입 처리와 본인확인 목적으로 수집·이용합니다.",
	},
	{
		id: "marketing",
		title: "마케팅 정보 수신",
		required: false,
		body: "혜택·이벤트 안내를 받기 위한 선택 동의 항목입니다. 동의하지 않아도 가입할 수 있습니다.",
	},
];

export function TermList() {
	return (
		<VStack data-section-id="terms" gap="var(--semantic-spacing-gap-loose)">
			<Box
				background="var(--component-card-bg-default)"
				borderColor="var(--component-card-border-default)"
				borderRadius="var(--semantic-radius-lg)"
				borderWidth="1px"
				overflow="hidden"
				style={{ borderStyle: "solid" }}
			>
				{TERM_DOCUMENTS.map((term, index) => (
					<Fragment key={term.id}>
						{index > 0 ? <Divider type="contents" /> : null}
						<Box
							px="var(--semantic-spacing-inset-lg)"
							py="var(--semantic-spacing-inset-sm)"
						>
							<Accordion
								title={
									<HStack
										align="center"
										gap="var(--semantic-spacing-gap-tight)"
									>
										<Badge type={term.required ? "blue" : "gray"}>
											{term.required ? "필수" : "선택"}
										</Badge>
										<Text variant="listTitle">{term.title}</Text>
									</HStack>
								}
							>
								<Text variant="helper">{term.body}</Text>
							</Accordion>
						</Box>
					</Fragment>
				))}
			</Box>
		</VStack>
	);
}
