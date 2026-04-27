import type { PropsWithChildren } from "react";

/**
 * 디바이스 프레임 (375 × 80vh, rounded). 화면 page.tsx가 직접 감싼다.
 * 콘텐츠 셸(Statusbar/Header/GNB)은 안쪽 <Shell>이 담당.
 */
export function MobileScreen({ children }: PropsWithChildren) {
	return (
		<div className="mobile-stage">
			<div className="mobile-frame">{children}</div>
		</div>
	);
}
