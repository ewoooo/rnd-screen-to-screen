import { StatusBattery, StatusSignal, StatusWifi } from "@/components/atoms/icon";

import { HStack } from "@/components/atoms/layout";

/**
 * iOS 상태바 row — 시계 + 신호/WiFi/배터리.
 * h=44 단순 row. absolute / backdrop-blur는 호출자(예: Shell)가 책임.
 * 아이콘은 components/atoms/icon 의 React SVG 컴포넌트 — currentColor 상속.
 */
export function StatusBar() {
	return (
		<HStack
			as="header"
			width="100%"
			height={44}
			px="inset"
			align="center"
			justify="space-between"
			background="var(--semantic-background-normal-normal)"
			style={{
				fontSize: 15,
				fontWeight: 600,
				color: "var(--semantic-label-normal)",
			}}
		>
			<span>7:28</span>
			<HStack align="center" gap="row">
				<StatusSignal height={12} />
				<StatusWifi height={12} />
				<StatusBattery height={12} />
			</HStack>
		</HStack>
	);
}
