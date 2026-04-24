"use client";

import { useState, type ReactNode } from "react";
import { FlexBox, Typography } from "@wanteddev/wds";

import { AccordionOptionPilot } from "@/components/pilot-kit/AccordionOptionPilot";
import { DropdownListPilot } from "@/components/pilot-kit/DropdownListPilot";
import { InputDefaultPilot } from "@/components/pilot-kit/InputDefaultPilot";
import { ProductProgressBarPilot } from "@/components/pilot-kit/ProductProgressBarPilot";

function Row({
	title,
	figmaName,
	children,
}: {
	title: string;
	figmaName: string;
	children: ReactNode;
}) {
	return (
		<FlexBox flexDirection="column" gap={8} sx={{ paddingBottom: 16 }}>
			<FlexBox flexDirection="column" gap={2}>
				<Typography variant="body2" weight="bold">
					{title}
				</Typography>
				<Typography variant="caption1" weight="medium">
					Figma: {figmaName}
				</Typography>
			</FlexBox>
			<FlexBox flexDirection="column" gap={12}>
				{children}
			</FlexBox>
		</FlexBox>
	);
}

const PLAN_OPTIONS = [
	{ value: "basic", label: "베이직 — 9,900원" },
	{ value: "standard", label: "스탠다드 — 13,500원" },
	{ value: "premium", label: "프리미엄 — 17,900원" },
];

export default function AtomsFormPreviewPage() {
	const [text, setText] = useState("");
	const [plan, setPlan] = useState<string>();

	return (
		<FlexBox
			flexDirection="column"
			gap={16}
			sx={{ padding: 20, width: "100%", maxWidth: 360 }}
		>
			<FlexBox flexDirection="column" gap={2}>
				<Typography variant="title3" weight="bold">
					Atoms · Form / Input
				</Typography>
				<Typography variant="caption1" weight="medium">
					Figma 04_ADP_P3-T1_Library / atom 섹션 (143:8046) · 4종
				</Typography>
			</FlexBox>

			<Row title="InputDefaultPilot" figmaName="input/default (304×42)">
				<InputDefaultPilot
					placeholder="이메일을 입력하세요"
					value={text}
					onChange={setText}
				/>
				<InputDefaultPilot placeholder="에러 상태" invalid />
				<InputDefaultPilot placeholder="비활성" disabled />
			</Row>

			<Row title="DropdownListPilot" figmaName="dropdown-list (state default/disabled)">
				<DropdownListPilot
					options={PLAN_OPTIONS}
					value={plan}
					onChange={setPlan}
					placeholder="플랜을 선택하세요"
				/>
				<DropdownListPilot options={PLAN_OPTIONS} disabled placeholder="비활성" />
			</Row>

			<Row title="AccordionOptionPilot" figmaName="accordion-option (3 states)">
				<AccordionOptionPilot
					summary="배송 정책 (priority 1)"
					details={
						<Typography variant="body2">
							결제 완료 후 평일 기준 1~2일 내 발송됩니다.
						</Typography>
					}
					priority={1}
					defaultExpanded
				/>
				<AccordionOptionPilot
					summary="자주 묻는 질문 (priority 2)"
					details={
						<Typography variant="body2">
							FAQ 본문이 여기에 노출됩니다.
						</Typography>
					}
					priority={2}
				/>
			</Row>

			<Row title="ProductProgressBarPilot" figmaName="product-progress-bar (288×37)">
				<ProductProgressBarPilot percent={30} />
				<ProductProgressBarPilot percent={70} label="구독 진행률" />
				<ProductProgressBarPilot percent={100} label="완료" />
			</Row>
		</FlexBox>
	);
}
