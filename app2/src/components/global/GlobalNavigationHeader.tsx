import iconBarcode from "@/assets/icons/ico_barcode.svg";
import iconShopLine from "@/assets/icons/ico_line_shop.svg";
import iconMenu from "@/assets/icons/ico_menu.svg";
import logo from "@/assets/icons/Logo.svg";

import { PAGE_BG_SEMI } from "@/components/home-kit";
import { Icon, StatusBar } from "@/components/system";

const HEADER_ICON_COLOR = "var(--semantic-label-normal)";

/**
 * T 앱 글로벌 헤더 — 상단 absolute.
 * StatusBar + 앱 헤더 row(Logo + 아이콘 3개).
 * backdrop-blur 반투명 배경.
 */
export function GlobalNavigationHeader() {
	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 10,
				background: PAGE_BG_SEMI,
				backdropFilter: "blur(7px)",
				WebkitBackdropFilter: "blur(7px)",
			}}
		>
			<StatusBar />
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding:
						"var(--spacing-10) var(--spacing-24) var(--spacing-16)",
				}}
			>
				<Icon src={logo} alt="T" width={32} height={32} />
				<div style={{ display: "flex", gap: "var(--spacing-20)" }}>
					<Icon
						src={iconBarcode}
						alt="바코드"
						width={24}
						height={24}
						color={HEADER_ICON_COLOR}
					/>
					<Icon
						src={iconShopLine}
						alt="쇼핑"
						width={24}
						height={24}
						color={HEADER_ICON_COLOR}
					/>
					<Icon
						src={iconMenu}
						alt="메뉴"
						width={24}
						height={24}
						color={HEADER_ICON_COLOR}
					/>
				</div>
			</div>
		</div>
	);
}
