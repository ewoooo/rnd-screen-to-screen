"use client";

import { PushBadge, TopNavigation, TopNavigationButton } from "@wanteddev/wds";
import { IconBusinessBag, IconSearch } from "@wanteddev/wds-icon";

// Figma header (C1) → WDS TopNavigation 매핑
// Source: data/binding/overrides/header.json
export function HeaderPilot({ badgeCount = 1 }: { badgeCount?: number }) {
	return (
		<TopNavigation
			variant="floating"
			background
			trailingContent={
				<>
					<TopNavigationButton variant="icon" color="assistive">
						<IconSearch width={24} height={24} />
					</TopNavigationButton>
					<TopNavigationButton variant="icon" color="assistive">
						<PushBadge
							variant="number"
							count={badgeCount}
							position="top-right"
						>
							<IconBusinessBag width={24} height={24} />
						</PushBadge>
					</TopNavigationButton>
				</>
			}
		/>
	);
}
