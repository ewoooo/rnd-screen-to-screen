"use client";

import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { createScreenExportAttributes } from "@pxds/pxds-layout/screen-export";
import {
	ContentRail,
	ContentSection,
	type ContentRailKind,
	type ContentRailMeasure,
	type ContentSectionInset,
} from "@pxds/pxds-layout/app-screen";

import { Button, SectionMessage } from "../../../core";
import { TextField } from "../../../molecules/form-controls";
import { FormField } from "../../../molecules/form-field";
import {
	SelectableList,
	type SelectableItem,
} from "../../../molecules/selectable-list";
import { TextBlock } from "../../../atoms/typography";
import { PrimaryCTABar } from "../../../molecules/cta-bar";

type SnapshotState = "default" | "loading" | "error" | "blocked";
type SlotFilter = "content" | "bottom";

const AUTH_METHODS: readonly SelectableItem[] = [
	{ id: "phone", title: "휴대폰 인증" },
	{ id: "pass", title: "PASS 인증" },
	{ id: "cert", title: "공동인증서" },
];

type Props = {
	state?: SnapshotState;
	slot?: SlotFilter;
	section?: {
		inset?: ContentSectionInset;
		rail?: ContentRailKind;
		measure?: ContentRailMeasure;
	};
};

export function ListCellAuthMethod({
	state = "default",
	slot = "content",
	section,
}: Props) {
	const errorVisible = state === "error";
	const blocked = state === "blocked";

	if (slot === "bottom") {
		return (
			<div
				{...createScreenExportAttributes({
					type: "ListCellAuthMethod",
					id: "list-cell-auth-method-bottom",
					slot: "bottom",
					props: {
						componentId: "ogn-mbr-list-cell-auth-method",
						primaryLabel: "인증 완료",
						state,
					},
				})}
				style={{ width: "100%" }}
			>
				<PrimaryCTABar primaryLabel="인증 완료" disabled />
			</div>
		);
	}

	return (
		<ContentSection
			inset={section?.inset}
			exportNode={{
				type: "ListCellAuthMethod",
				id: "list-cell-auth-method",
				props: {
					componentId: "ogn-mbr-list-cell-auth-method",
					state,
				},
			}}
		>
			<ContentRail
				rail={section?.rail ?? "inset"}
				measure={section?.measure ?? "body"}
			>
				<VStack gap="block">
					<SelectableList
						name="auth-method"
						items={AUTH_METHODS}
						value="phone"
						onChange={() => undefined}
						density="compact"
					/>
					<FormField
						label="인증번호"
						required
						helperText="유효시간 3분"
						errorText={errorVisible ? "인증번호가 일치하지 않습니다" : undefined}
					>
						<TextField
							value=""
							placeholder="6자리 숫자"
							invalid={errorVisible}
							maxLength={6}
							readOnly
						/>
					</FormField>
					<TextBlock variant="caption" text="남은 시간 02:48" />
					<HStack gap="block">
						<Button variant="solid" disabled={blocked}>
							인증번호 요청
						</Button>
						<Button variant="outlined" disabled={blocked}>
							재요청
						</Button>
					</HStack>
					{blocked ? (
						<SectionMessage
							variant="cautionary"
							description="10분 후 다시 시도해 주세요"
						>
							인증 실패 한도 초과
						</SectionMessage>
					) : null}
				</VStack>
			</ContentRail>
		</ContentSection>
	);
}
