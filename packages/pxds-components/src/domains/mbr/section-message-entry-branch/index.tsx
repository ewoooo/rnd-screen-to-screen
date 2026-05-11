import { VStack } from "@pxds/pxds-layout/primitives";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

import { Button, SectionMessage } from "../../../core";

export type EntryBranchKind =
	| "existing-member"
	| "dormant"
	| "rejoin-blocked";

type Props = {
	visible?: boolean;
	kind?: EntryBranchKind;
};

const COPY: Readonly<
	Record<
		EntryBranchKind,
		{ title: string; description: string; action: string }
	>
> = {
	"existing-member": {
		title: "이미 가입된 회원",
		description: "로그인 화면으로 이동해 주세요.",
		action: "로그인하기",
	},
	dormant: {
		title: "휴면 회원",
		description: "휴면 해제 후 다시 시도해 주세요.",
		action: "휴면 해제하기",
	},
	"rejoin-blocked": {
		title: "재가입 제한 대상",
		description: "재가입 가능 일자에 다시 시도해 주세요.",
		action: "안내 보기",
	},
};

export function SectionMessageEntryBranch({
	visible = false,
	kind = "existing-member",
}: Props) {
	if (!visible) return null;
	const copy = COPY[kind];
	return (
		<ContentSection>
			<VStack gap="block">
				<SectionMessage variant="cautionary" description={copy.description}>
					{copy.title}
				</SectionMessage>
				<Button variant="outlined">{copy.action}</Button>
			</VStack>
		</ContentSection>
	);
}
