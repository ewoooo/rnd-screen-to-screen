"use client";

import { Button, RadioButton, Text, TextField } from "@pxds/cx-components";
import { SectionMessage } from "@pxds/pxds-components/core";
import { VStack } from "@pxds/pxds-layout/primitives";
import { useState } from "react";
import { MbrOgnSectionLayout } from "../_layout";

const AUTH_METHODS = [
	{ id: "phone", title: "휴대폰 인증" },
	{ id: "pass", title: "PASS 인증" },
	{ id: "cert", title: "공동인증서" },
] as const;

export function ListCellAuthMethod() {
	const [authMethod, setAuthMethod] = useState("phone");

	return (
		<MbrOgnSectionLayout inset="bleed" rail="inset">
			<TextField
				label="인증번호"
				value=""
				placeholder="6자리 숫자"
				helperText="유효시간 3분"
				readOnly
			/>
			<VStack gap="var(--semantic-light-spacing-gap-comfortable)">
				{AUTH_METHODS.map((item) => (
					<RadioButton
						key={item.id}
						name="auth-method"
						value={item.id}
						label={item.title}
						checked={authMethod === item.id}
						onCheckedChange={(checked) => {
							if (checked) setAuthMethod(item.id);
						}}
					/>
				))}
			</VStack>
			<Text variant="caption" as="p">
				남은 시간 02:48
			</Text>
			<Button variant="primary" size="large">
				인증번호 요청
			</Button>
			<Button variant="secondary" size="large">
				재요청
			</Button>
			<SectionMessage
				variant="negative"
				description="10분 후 다시 시도해 주세요"
			>
				인증 실패 한도 초과
			</SectionMessage>
		</MbrOgnSectionLayout>
	);
}
