import { Notice } from "@pxds/cx-components";
import { VStack } from "@pxds/cx-layout/primitives";
import type { EntryCheckProps } from "./EntryCheck.config";

// SB ogn-mbr-entry-check: 기본 hidden, 기존 회원 식별 시에만 안내 영역으로 노출.
// SB 근거 POL-MBR-INFO-003-07/-08/-09 (policy-core 미작성, Screen.map.md System-Break gap).
export function EntryCheck({ visible = false }: EntryCheckProps) {
	if (!visible) return null;

	return (
		<VStack data-section-id="entryCheck" gap="var(--semantic-spacing-block)">
			<Notice tone="cautionary" title="이미 가입된 계정이에요">
				로그인하거나 내 정보를 확인해 주세요
			</Notice>
		</VStack>
	);
}
