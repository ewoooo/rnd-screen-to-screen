"use client";

import {
	Button,
	Divider,
	RadioButton,
	Text,
	TextField,
} from "@pxds/cx-components";
import { Box, HStack, VStack } from "@pxds/cx-layout/primitives";
import { Fragment, useState } from "react";

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

	return (
		<VStack
			data-section-id="authMethods"
			gap="var(--semantic-spacing-section-gap)"
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

			<VStack gap="var(--semantic-spacing-stack)">
				<TextField
					label="인증번호"
					value=""
					placeholder="6자리 숫자"
					helperText="유효시간 02:48"
					inputMode="numeric"
					maxLength={6}
					readOnly
				/>
				<HStack
					display="grid"
					gap="var(--semantic-spacing-inline)"
					style={{ gridTemplateColumns: "1fr 1fr" }}
				>
					<Button variant="secondary" size="large" fullWidth>
						재요청
					</Button>
					<Button variant="primary" size="large" fullWidth>
						인증번호 요청
					</Button>
				</HStack>
			</VStack>
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
