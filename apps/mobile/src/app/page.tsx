import Link from "next/link";
import {
	screenRoutes,
	type ScreenGroup,
	type ScreenRoute,
} from "@screen/registry";

import { Box, HStack, VStack } from "@pxds/pxds-layout/primitives";

const GROUPS = [
	"nc-full",
	"nc-simple",
	"membership",
	"tu",
	"product",
	"search",
	"billing",
	"billing-html",
	"home",
] as const satisfies readonly ScreenGroup[];

const GROUP_LABEL: Record<ScreenGroup, string> = {
	home: "Home",
	membership: "Membership",
	product: "Product",
	search: "Search",
	billing: "Billing",
	"billing-html": "BILLING-HTML",
	tu: "TU",
	"nc-full": "NC Full",
	"nc-simple": "NC Simple",
};

export default function Home() {
	const grouped = screenRoutes.reduce<Record<ScreenGroup, ScreenRoute[]>>(
		(acc, s) => {
			(acc[s.group] ??= []).push(s);
			return acc;
		},
		{
			home: [],
			membership: [],
			product: [],
			search: [],
			billing: [],
			"billing-html": [],
			tu: [],
			"nc-full": [],
			"nc-simple": [],
		},
	);

	return (
		<VStack as="main" p="block" gap="block">
			<Box>
				<h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
					PXDX · mobile
				</h1>
				<p
					style={{
						color: "var(--semantic-label-alternative)",
						fontSize: 12,
						margin: "4px 0 0",
					}}
				>
					총 {screenRoutes.length}개
				</p>
			</Box>

			{GROUPS.map((group) => (
				<VStack as="section" key={group} gap="inline">
					<h2
						style={{
							fontSize: 12,
							fontWeight: 600,
							margin: 0,
							color: "var(--semantic-label-assistive)",
							textTransform: "uppercase",
							letterSpacing: 0.5,
						}}
					>
						{GROUP_LABEL[group]}
					</h2>
					<VStack as="nav" gap="inline">
						{grouped[group].map((s) => (
							<Link
								key={s.id}
								href={s.route}
								style={{
									padding: "12px 16px",
									borderRadius: 10,
									background:
										group === "tu"
											? "var(--atomic-coolNeutral-20)"
											: "var(--atomic-coolNeutral-10)",
									color: "var(--semantic-static-white)",
									textDecoration: "none",
									fontSize: 14,
									fontWeight: 500,
								}}
							>
								<HStack justify="space-between" gap="stack">
									<span>{s.label}</span>
									<span
										style={{
											opacity: 0.5,
											fontSize: 11,
											fontFamily:
												"ui-monospace, SFMono-Regular, monospace",
											textAlign: "right",
										}}
									>
										/{s.id}
									</span>
								</HStack>
							</Link>
						))}
					</VStack>
				</VStack>
			))}
		</VStack>
	);
}
