import type { ReactNode } from "react";

import { BUBBLE_USER_BG } from "./tokens";

type Props = {
	side: "user" | "ai";
	children: ReactNode;
};

/**
 * 채팅 말풍선 — user 는 회색 배경 우측 정렬, ai 는 배경 없이 좌측.
 * search step 10, 11 에서 사용.
 */
export function BubbleChatPilot({ side, children }: Props) {
	if (side === "user") {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					padding: "var(--spacing-4) 0",
				}}
			>
				<div
					style={{
						maxWidth: "80%",
						padding: "var(--spacing-12) var(--spacing-16)",
						borderRadius: 20,
						background: BUBBLE_USER_BG,
						fontSize: 14,
						fontWeight: 500,
						color: "var(--semantic-label-normal)",
						letterSpacing: "-0.56px",
						lineHeight: 1.4,
					}}
				>
					{children}
				</div>
			</div>
		);
	}
	return (
		<div
			style={{
				fontSize: 14,
				fontWeight: 400,
				color: "var(--semantic-label-normal)",
				letterSpacing: "-0.56px",
				lineHeight: 1.5,
				padding: "var(--spacing-8) 0",
			}}
		>
			{children}
		</div>
	);
}
