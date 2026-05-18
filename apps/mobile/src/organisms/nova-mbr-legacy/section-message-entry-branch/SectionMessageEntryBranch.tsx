import { Button, Notice } from "@pxds/cx-components";
import { VStack } from "@pxds/cx-layout/primitives";
import type { SectionMessageEntryBranchProps } from "./SectionMessageEntryBranch.config";

export function SectionMessageEntryBranch({
	visible = false,
}: SectionMessageEntryBranchProps) {
	if (!visible) return null;

	return (
		<VStack gap="var(--semantic-spacing-block)">
			<Notice tone="cautionary" title="이미 가입된 회원">
				로그인 화면으로 이동해 주세요.
			</Notice>
			<Button variant="secondary" size="large">
				로그인하기
			</Button>
		</VStack>
	);
}
