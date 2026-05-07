import { STATUS_BAR_FONT_SIZE } from "@pxds/pxds-tokens";

import { StatusBattery, StatusSignal, StatusWifi } from "../status-icons";

/**
 * iOS 상태바 row — 시계 + 신호/WiFi/배터리.
 * h=44 단순 row. absolute / backdrop-blur는 호출자(예: Shell)가 책임.
 */
export function StatusBar() {
	return (
		<header
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
				height: 44,
				paddingInline: "var(--spacing-12)",
				background: "var(--semantic-background-normal-normal)",
				fontSize: STATUS_BAR_FONT_SIZE,
				fontWeight: 600,
				color: "var(--semantic-label-normal)",
			}}
		>
			<span>7:28</span>
			<span
				aria-hidden="true"
				style={{
					display: "inline-flex",
					alignItems: "center",
					gap: 8,
				}}
			>
				<StatusSignal height={12} />
				<StatusWifi height={12} />
				<StatusBattery height={12} />
			</span>
		</header>
	);
}
