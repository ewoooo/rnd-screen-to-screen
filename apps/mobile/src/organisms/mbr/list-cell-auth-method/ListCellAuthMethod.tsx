"use client";

import {
	Button,
	Divider,
	Notice,
	RadioButton,
	Text,
	TextField,
} from "@pxds/cx-components";
import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { useState } from "react";

const AUTH_METHODS = [
	{
		id: "phone",
		title: "휴대폰 인증",
		caption: "본인 명의 휴대폰으로 인증",
	},
	{
		id: "pass",
		title: "PASS 인증",
		caption: "통신사 PASS 앱으로 인증",
	},
	{
		id: "cert",
		title: "공동인증서",
		caption: "공동·금융인증서로 인증",
	},
] as const;

export function ListCellAuthMethod() {
	const [authMethod, setAuthMethod] = useState<string>("phone");
	const failed = false;

	return (
		<VStack gap="var(--semantic-spacing-block)">
			<VStack gap="var(--semantic-spacing-stack)">
				{AUTH_METHODS.map((item, index) => (
					<VStack key={item.id} gap="var(--semantic-spacing-stack)">
						<AuthMethodRow
							title={item.title}
							caption={item.caption}
							checked={authMethod === item.id}
							onCheckedChange={(next) => {
								if (next) setAuthMethod(item.id);
							}}
						/>
						{index < AUTH_METHODS.length - 1 ? (
							<Divider type="contents" />
						) : null}
					</VStack>
				))}
			</VStack>
			<TextField
				label="인증번호"
				value=""
				placeholder="6자리 숫자"
				helperText="유효시간 02:48"
				readOnly
			/>
			<HStack gap="var(--semantic-spacing-inline)">
				<Button variant="secondary" size="large" fullWidth>
					재요청
				</Button>
				<Button variant="primary" size="large" fullWidth>
					인증번호 요청
				</Button>
			</HStack>
			{failed ? (
				<Notice tone="negative" title="인증 실패 한도 초과">
					10분 후 다시 시도해 주세요.
				</Notice>
			) : null}
		</VStack>
	);
}

function AuthMethodRow({
	title,
	caption,
	checked,
	onCheckedChange,
}: {
	title: string;
	caption: string;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
}) {
	return (
		<HStack align="flex-start" gap="var(--semantic-spacing-stack)">
			<RadioButton
				name="auth-method"
				checked={checked}
				onCheckedChange={onCheckedChange}
			/>
			<VStack minWidth={0} gap="var(--semantic-spacing-row)">
				<Text variant="listTitle">{title}</Text>
				<Text variant="helper">{caption}</Text>
			</VStack>
		</HStack>
	);
}
