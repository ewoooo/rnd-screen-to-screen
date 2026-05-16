import { StatusBattery, StatusSignal, StatusWifi } from "@pxds/cx-icons";

/**
 * iOS 상태바 row — 시계 + 신호/WiFi/배터리.
 * h=44 단순 row. absolute / backdrop-blur는 호출자(예: Shell)가 책임.
 */
export function StatusBar() {
	return (
		<header
			data-figma-render="layout"
			data-figma-component-id="status-bar"
			data-figma-layout-kind="chrome"
			data-figma-layout-layer="system-header"
			data-figma-layout-auto="true"
			data-figma-layout-direction="horizontal"
			data-figma-layout-align="center"
			data-figma-layout-justify="space-between"
			data-figma-layout-sizing="fill"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
				height: 44,
				paddingInline: "var(--spacing-12)",
				background: "var(--semantic-background-normal-normal)",
				fontSize: "var(--pxds-typography-status-bar-font-size)",
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
