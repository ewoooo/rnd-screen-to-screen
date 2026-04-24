"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import registry from "@/generated/screen-version-registry.json";
import type { Registry } from "@/types/registry";

const typed = registry as Registry;

const HOME_KIT_COMPONENTS = [
	"Shell",
	"Card",
	"HeroCard",
	"StatCard",
	"BarcodeCard",
	"OfferingBanner",
	"DualMenuCard",
	"TopBanner",
	"ListRow",
	"MyEditButton",
	"Placeholder",
	"SectionLabel",
	"Heading20",
	"AiText",
	"ListTitle",
	"ListSub",
	"MonoCaption",
	"StatBadge",
	"PillChip",
] as const;

const SEARCH_KIT_COMPONENTS = [
	"DetailShell",
	"SearchField",
	"SearchPill",
	"RecentChip",
	"SuggestionChip",
	"SuggestionRow",
	"CategoryTabs",
	"CategoryHeader",
	"ProductCardWide",
	"ProductCardPrice",
	"InfoCard",
	"AiSuggestions",
	"ChatBubble",
	"KeyboardPlaceholder",
] as const;

// pilot-kit 카탈로그 — /pilot-kit/page.tsx 와 slug 동일. 추가/제거 시 양쪽 동기화.
const PILOT_KIT_CATEGORIES = [
	{ slug: "atoms-buttons", title: "Atoms / Buttons" },
	{ slug: "atoms-badges", title: "Atoms / Badges" },
	{ slug: "atoms-form", title: "Atoms / Form" },
	{ slug: "atoms-display", title: "Atoms / Display" },
	{ slug: "atoms-misc", title: "Atoms / Misc" },
	{ slug: "molecules-cards", title: "Molecules / Cards" },
	{ slug: "molecules-misc", title: "Molecules / Misc" },
	{ slug: "organisms-section-product", title: "Organisms / Section-product" },
	{ slug: "organisms-card-product", title: "Organisms / Card-product" },
	{ slug: "organisms-card-product-pass", title: "Organisms / Card-product-pass" },
	{ slug: "organisms-card-product-info", title: "Organisms / Card-product-info" },
	{ slug: "organisms-card-product-barcode", title: "Organisms / Card-product-barcode" },
	{ slug: "organisms-card-product-recommand", title: "Organisms / Card-product-recommand" },
	{ slug: "organisms-bottomsheet-list", title: "Organisms / Bottomsheet-list" },
	{ slug: "organisms-extras", title: "Organisms / Extras (header/tabbar/footer)" },
	{ slug: "header", title: "Organisms / Header (Pilot 검증)" },
] as const;

const parseRoute = (pathname: string) => {
	const match = pathname.match(/^\/([^/]+)(?:\/([^/]+))?/);
	if (!match) return { screenId: null, versionId: null };
	const screenId = match[1];
	const maybeVersion = match[2] ?? null;
	const versionId = maybeVersion && /^v\d+-/.test(maybeVersion) ? maybeVersion : null;
	return { screenId, versionId };
};

export const GlobalVersionNav = () => {
	const pathname = usePathname() ?? "/";
	const { screenId: currentScreen, versionId: currentVersion } = parseRoute(pathname);
	const pilotKitActiveSlug = pathname.startsWith("/pilot-kit/")
		? pathname.split("/")[2] ?? null
		: null;
	const pilotKitIndexActive = pathname === "/pilot-kit" || pathname === "/pilot-kit/";

	return (
		<aside style={styles.panel} aria-label="버전 네비게이션">
			<div style={styles.top}>
				<header style={styles.header}>
					<Link href="/" style={styles.title}>
						Pages
					</Link>
				</header>

				{typed.screens.map((screen) => {
					const isCurrentScreen = screen.id === currentScreen;
					return (
						<section key={screen.id} style={styles.section}>
							<div style={styles.sectionHead}>
								<Link
									href={screen.route}
									style={{
										...styles.screenTitle,
										...(isCurrentScreen ? styles.screenTitleActive : null),
									}}
								>
									{screen.id}
								</Link>
								<span style={styles.latestBadge}>latest · {screen.latest}</span>
							</div>
							<div style={styles.versionList}>
								{screen.versions.map((v) => {
									const isActive = isCurrentScreen && v.id === currentVersion;
									return (
										<Link
											key={v.id}
											href={v.route}
											style={{
												...styles.versionLink,
												...(isActive ? styles.active : null),
											}}
										>
											{v.label}
										</Link>
									);
								})}
							</div>
						</section>
					);
				})}
			</div>

			<div style={styles.divider} />

			<div style={styles.bottom}>
				<header style={styles.header}>
					<Link
						href="/pilot-kit"
						style={{
							...styles.title,
							...(pilotKitIndexActive ? styles.screenTitleActive : null),
						}}
					>
						Components
					</Link>
				</header>
				<div style={styles.componentList}>
					{PILOT_KIT_CATEGORIES.map((c) => {
						const isActive = c.slug === pilotKitActiveSlug;
						return (
							<Link
								key={c.slug}
								href={`/pilot-kit/${c.slug}`}
								style={{
									...styles.componentLink,
									...(isActive ? styles.componentLinkActive : null),
								}}
							>
								{c.title}
							</Link>
						);
					})}
				</div>

				<Link
					href="/home-kit"
					style={{
						...styles.kitGroupLabel,
						...(pathname === "/home-kit" ? styles.kitGroupLabelActive : null),
					}}
				>
					home-kit
				</Link>
				<div style={styles.kitList}>
					{HOME_KIT_COMPONENTS.map((name) => (
						<Link key={name} href={`/home-kit#${name}`} style={styles.kitItem}>
							{name}
						</Link>
					))}
				</div>

				<Link
					href="/search-kit"
					style={{
						...styles.kitGroupLabel,
						...(pathname === "/search-kit" ? styles.kitGroupLabelActive : null),
					}}
				>
					search-kit
				</Link>
				<div style={styles.kitList}>
					{SEARCH_KIT_COMPONENTS.map((name) => (
						<Link key={name} href={`/search-kit#${name}`} style={styles.kitItem}>
							{name}
						</Link>
					))}
				</div>
			</div>
		</aside>
	);
};

const SIDEBAR_WIDTH = 240;

const styles = {
	panel: {
		flex: `0 0 ${SIDEBAR_WIDTH}px`,
		width: SIDEBAR_WIDTH,
		position: "sticky",
		top: 0,
		alignSelf: "flex-start",
		height: "100vh",
		padding: 16,
		background: "rgba(17, 17, 17, 0.96)",
		color: "#f5f5f5",
		fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
		fontSize: 12,
		lineHeight: 1.4,
		borderRight: "1px solid rgba(255, 255, 255, 0.08)",
		display: "flex",
		flexDirection: "column",
		boxSizing: "border-box",
	},
	top: {
		flex: "1 1 auto",
		minHeight: 0,
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
		gap: 16,
	},
	bottom: {
		flex: "0 1 40%",
		minHeight: 0,
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
		gap: 12,
	},
	divider: {
		height: 1,
		background: "rgba(255, 255, 255, 0.08)",
		margin: "12px 0",
		flex: "0 0 auto",
	},
	componentList: {
		display: "flex",
		flexDirection: "column",
		gap: 2,
	},
	componentLink: {
		padding: "5px 8px",
		borderRadius: 6,
		color: "#d4d4d4",
		textDecoration: "none",
		background: "transparent",
	},
	componentLinkActive: {
		background: "#3b82f6",
		color: "#ffffff",
	},
	kitGroupLabel: {
		marginTop: 12,
		fontSize: 11,
		fontWeight: 600,
		letterSpacing: 0.5,
		color: "#9ca3af",
		textTransform: "uppercase" as const,
		textDecoration: "none",
	},
	kitGroupLabelActive: {
		color: "#60a5fa",
	},
	kitList: {
		display: "flex",
		flexWrap: "wrap" as const,
		gap: 4,
	},
	kitItem: {
		padding: "3px 7px",
		borderRadius: 5,
		background: "rgba(255, 255, 255, 0.05)",
		color: "#a3a3a3",
		fontSize: 11,
		textDecoration: "none",
	},
	header: {
		display: "flex",
		alignItems: "center",
		paddingBottom: 8,
		borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
	},
	title: {
		fontWeight: 600,
		letterSpacing: 0.5,
		color: "#f5f5f5",
		textDecoration: "none",
	},
	section: { display: "flex", flexDirection: "column", gap: 6 },
	sectionHead: {
		display: "flex",
		alignItems: "baseline",
		justifyContent: "space-between",
		gap: 8,
	},
	screenTitle: {
		fontSize: 13,
		fontWeight: 600,
		color: "#f5f5f5",
		textDecoration: "none",
		letterSpacing: 0.3,
	},
	screenTitleActive: {
		color: "#60a5fa",
	},
	latestBadge: {
		fontSize: 10,
		opacity: 0.5,
		letterSpacing: 0.4,
	},
	versionList: {
		display: "flex",
		flexWrap: "wrap" as const,
		gap: 4,
	},
	versionLink: {
		alignSelf: "flex-start",
		padding: "3px 8px",
		borderRadius: 6,
		color: "#d4d4d4",
		textDecoration: "none",
		fontWeight: 500,
		background: "rgba(255, 255, 255, 0.06)",
	},
	active: { background: "#3b82f6", color: "#ffffff" },
} as const satisfies Record<string, React.CSSProperties>;
