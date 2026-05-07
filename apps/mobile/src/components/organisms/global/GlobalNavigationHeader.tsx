import { TopNavigation, TopNavigationButton } from "@pxds/pxds-components/core";
import {
	IconBusinessBag,
	IconCode,
	IconClose,
	IconMenu,
	IconSearch,
} from "@pxds/pxds-components/core";
import type { ReactNode } from "react";

import { Logo } from "@/components/atoms/icon";
import { Box } from "@/components/atoms/layout";
import { StatusBar } from "@/components/templates/app-screen";

const ICON_SIZE = 24;

const DEFAULT_ACTIONS = (
	<>
		<TopNavigationButton variant="icon">
			<IconCode width={ICON_SIZE} height={ICON_SIZE} />
		</TopNavigationButton>
		<TopNavigationButton variant="icon">
			<IconBusinessBag width={ICON_SIZE} height={ICON_SIZE} />
		</TopNavigationButton>
		<TopNavigationButton variant="icon">
			<IconMenu width={ICON_SIZE} height={ICON_SIZE} />
		</TopNavigationButton>
	</>
);

/** v2 시안 아이콘 set — 검색 / 장바구니 / 메뉴. SPEC-MAIN-10 바코드 OFF 케이스 */
export const DiscoveryActions = (
	<>
		<TopNavigationButton variant="icon">
			<IconSearch width={ICON_SIZE} height={ICON_SIZE} />
		</TopNavigationButton>
		<TopNavigationButton variant="icon">
			<IconBusinessBag width={ICON_SIZE} height={ICON_SIZE} />
		</TopNavigationButton>
		<TopNavigationButton variant="icon">
			<IconMenu width={ICON_SIZE} height={ICON_SIZE} />
		</TopNavigationButton>
	</>
);

const LogoSlot = (
	<TopNavigationButton variant="icon">
		<Logo width={32} height={32} />
	</TopNavigationButton>
);

/**
 * T 앱 글로벌 헤더 — StatusBar + WDS TopNavigation(floating).
 * forced migration(2026-04-29): 자체 absolute/blur 제거, WDS floating gradient 채택.
 * 아이콘은 wds-icon 패키지 직접 사용. 바코드는 WDS에 없어 IconCode 로 근사.
 */
export function GlobalNavigationHeader({
	actions = DEFAULT_ACTIONS,
}: {
	actions?: ReactNode;
	/** @deprecated forced migration 이후 무시. WDS floating 기본 배경 사용 */
	background?: string;
}) {
	return (
		<Box
			as="header"
			style={{
				minHeight: 106,
			}}
		>
			<StatusBar />
			<TopNavigation
				variant="floating"
				leadingContent={LogoSlot}
				trailingContent={actions}
			/>
		</Box>
	);
}

export function GlobalCloseHeader() {
	return (
		<>
			<StatusBar />
			<TopNavigation
				variant="normal"
				leadingContent={
					<TopNavigationButton
						variant="icon"
						color="assistive"
						aria-label="닫기"
					>
						<IconClose width={ICON_SIZE} height={ICON_SIZE} />
					</TopNavigationButton>
				}
				background
			/>
		</>
	);
}
