import Link from "next/link";
import { screens, type ScreenEntry, type ScreenGroup } from "@screen/screens";

import { Box, HStack, VStack } from "@/components/atoms/layout";

const GROUPS = [
	"nc-full",
	"nc-simple",
	"membership",
	"tu",
	"product",
	"search",
	"billing",
	"home",
] as const satisfies readonly ScreenGroup[];

const GROUP_LABEL: Record<ScreenGroup, string> = {
	home: "Home",
	membership: "Membership",
	product: "Product",
	search: "Search",
	billing: "Billing",
	tu: "TU",
	"nc-full": "NC Full",
	"nc-simple": "NC Simple",
};

export default function Home() {
	const grouped = screens.reduce<Record<ScreenGroup, ScreenEntry[]>>(
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
			tu: [],
			"nc-full": [],
			"nc-simple": [],
		},
	);

	return (
		<VStack as="main" p="block" gap="block">
			<Box>
				<h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
					Screen-to-Screen · mobile
				</h1>
				<p
					style={{
						color: "#6b7280",
						fontSize: 12,
						margin: "4px 0 0",
					}}
				>
					총 {screens.length}개
				</p>
			</Box>

			{GROUPS.map((group) => (
				<VStack as="section" key={group} gap="inline">
					<h2
						style={{
							fontSize: 12,
							fontWeight: 600,
							margin: 0,
							color: "#9ca3af",
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
								href={s.path}
								style={{
									padding: "12px 16px",
									borderRadius: 10,
									background: group === "tu" ? "#1f2937" : "#111827",
									color: "#fff",
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
