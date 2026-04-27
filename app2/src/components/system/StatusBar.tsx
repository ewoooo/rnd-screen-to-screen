import iconBattery from "@/assets/icons/system/status_battery.svg";
import iconSignal from "@/assets/icons/system/status_signal.svg";
import iconWifi from "@/assets/icons/system/status_wifi.svg";

import { Icon } from "./Icon";

/**
 * iOS 상태바 row — 시계 + 신호/WiFi/배터리.
 * h=44 단순 row. absolute / backdrop-blur는 호출자(예: Shell)가 책임.
 */
export function StatusBar() {
	return (
		<div
			style={{
				height: 44,
				display: "flex",
				alignItems: "center",
				padding: "0 var(--spacing-20)",
				justifyContent: "space-between",
				fontSize: 15,
				fontWeight: 600,
				color: "var(--semantic-label-normal)",
			}}
		>
			<span>7:28</span>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "var(--spacing-4)",
				}}
			>
				<Icon src={iconSignal} height={12} color="var(--semantic-label-normal)" />
				<Icon src={iconWifi} height={12} color="var(--semantic-label-normal)" />
				<Icon
					src={iconBattery}
					height={12}
					color="var(--semantic-label-normal)"
				/>
			</div>
		</div>
	);
}
