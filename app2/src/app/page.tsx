import Link from "next/link";

import registry from "@/generated/screen-version-registry.json";
import type { Registry } from "@/types/registry";

const typed = registry as Registry;

export default function Home() {
	const totalVersions = typed.screens.reduce(
		(n, s) => n + s.versions.length,
		0,
	);

	return (
		<main
			style={{
				padding: 24,
				display: "flex",
				flexDirection: "column",
				gap: 16,
			}}
		>
			<div>
				<h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
					Screen-to-Screen · app2
				</h1>
				<p
					style={{
						color: "#6b7280",
						fontSize: 12,
						margin: "4px 0 0",
					}}
				>
					home-kit 기반 · {typed.screens.length}개 화면 · {totalVersions}개 버전
				</p>
			</div>
			<nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				{typed.screens.map((screen) => (
					<section
						key={screen.id}
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 8,
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "baseline",
								justifyContent: "space-between",
							}}
						>
							<Link
								href={screen.route}
								style={{
									fontSize: 14,
									fontWeight: 600,
									color: "#111827",
									textDecoration: "none",
								}}
							>
								{screen.id}
							</Link>
							<span style={{ fontSize: 11, color: "#9ca3af" }}>
								latest · {screen.latest}
							</span>
						</div>
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: 6,
							}}
						>
							{screen.versions.map((v) => (
								<Link
									key={v.id}
									href={v.route}
									style={{
										padding: "8px 12px",
										borderRadius: 10,
										background: "#111827",
										color: "#fff",
										textDecoration: "none",
										fontSize: 12,
										fontWeight: 500,
									}}
								>
									{v.label}
								</Link>
							))}
						</div>
					</section>
				))}
			</nav>
		</main>
	);
}
