import { SectionMessage } from "@pxds/pxds-components/core";
import { Button } from "@pxds/cx-components";
import { VStack } from "@pxds/pxds-layout/primitives";
import type { SectionMessageEntryBranchProps } from "./SectionMessageEntryBranch.config";

export function SectionMessageEntryBranch({
	visible = false,
}: SectionMessageEntryBranchProps) {
	if (!visible) return null;

	return (
		<VStack gap="var(--semantic-spacing-block)">
			<SectionMessage
				variant="cautionary"
				description="로그인 화면으로 이동해 주세요."
			>
				이미 가입된 회원
			</SectionMessage>
			<Button variant="secondary" size="large">
				로그인하기
			</Button>
		</VStack>
	);
}
