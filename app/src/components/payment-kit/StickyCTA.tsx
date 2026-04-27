import { GNB_BORDER, PAGE_BG_SEMI, T_BRAND_SHADOW } from "@/components/home-kit/tokens";
import { ButtonCallToActionPilot } from "@/components/pilot-kit/ButtonCallToActionPilot";

export function StickyCTA({ text }: { text: string }) {
	return (
		<div
			style={{
				background: PAGE_BG_SEMI,
				backdropFilter: "blur(4px)",
				WebkitBackdropFilter: "blur(4px)",
				borderTop: `1px solid ${GNB_BORDER}`,
				padding: "var(--spacing-12) var(--spacing-20) var(--spacing-24)",
				boxShadow: T_BRAND_SHADOW,
			}}
		>
			<ButtonCallToActionPilot text={text} />
		</div>
	);
}
