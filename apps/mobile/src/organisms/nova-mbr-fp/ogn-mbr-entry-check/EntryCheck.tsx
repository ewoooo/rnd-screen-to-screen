import { Notice } from "@pxds/cx-components";
import type { EntryCheckProps, EntryCheckVariant } from "./EntryCheck.config";

/**
 * ogn-mbr-entry-check — NEW conditional / out-of-state organism.
 *
 * Reserved/out-of-state OGN for the 가입 진입 조건 분기 (기존 정상회원 / 휴면 /
 * 탈퇴). INFO-003 도메인 정책이 policy-core에 부재(Screen.map.md B-2)하므로
 * 안내 문안·분기 의미를 정책으로 확정할 수 없다.
 *
 * - `visible` default false → renders null (zero spacing, 레이아웃 점프 방지).
 * - copy는 서버 응답으로만 전달(`message`). 정책 무근거 copy를 발명하지 않는다.
 * - `message` 미제공 시 렌더하지 않는다 (placeholder/빈 surface 노출 금지).
 * - blocked-from-config: Screen.config generation.policyRefs 비포함,
 *   generation.ognIds 에만 포함.
 */

const TONE_BY_VARIANT: Record<
	EntryCheckVariant,
	"cautionary" | "info"
> = {
	existing: "cautionary",
	dormant: "cautionary",
	withdrawn: "info",
};

export function EntryCheck({
	visible = false,
	variant = "existing",
	message,
}: EntryCheckProps = {}) {
	if (!visible || !message) return null;

	return (
		<Notice tone={TONE_BY_VARIANT[variant]} data-section-id="entryCheck">
			{message}
		</Notice>
	);
}
