import { Card, Placeholder, T_BRAND } from "@/components/home-kit";
import {
	ChatBubble,
	DetailShell,
	SearchField,
} from "@/components/search-kit";
import { chatFlow } from "@/fixtures/search-flow";

export default function Search11V1Kit() {
	const c = chatFlow.compensation;
	return (
		<DetailShell
			trailing={<Placeholder w={24} h={24} label="↻" />}
			bottom={<SearchField />}
		>
			<ChatBubble side="user">{chatFlow.userQuestion}</ChatBubble>
			<ChatBubble side="ai">{chatFlow.aiAnswer}</ChatBubble>

			<Card
				style={{
					padding: "var(--spacing-20) var(--spacing-24)",
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-16)",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<span
							style={{
								fontSize: 15,
								fontWeight: 700,
								color: "var(--semantic-label-normal)",
							}}
						>
							{chatFlow.device.title}
						</span>
						<span
							style={{
								fontSize: 12,
								color: "var(--semantic-label-alternative)",
							}}
						>
							{chatFlow.device.sub}
						</span>
					</div>
					<Placeholder w={40} h={48} label="phone" />
				</div>

				<div
					style={{
						borderTop: "1px solid var(--semantic-line-solid-alternative)",
						paddingTop: "var(--spacing-12)",
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-8)",
					}}
				>
					<span
						style={{
							fontSize: 12,
							fontWeight: 700,
							color: T_BRAND,
						}}
					>
						{c.label}
					</span>
					<span
						style={{
							fontSize: 24,
							fontWeight: 700,
							color: "var(--semantic-label-normal)",
						}}
					>
						{c.total}
					</span>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "var(--spacing-4)",
							marginTop: "var(--spacing-8)",
						}}
					>
						{c.rows.map((row) => (
							<div
								key={row.label}
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: 13,
									color: "var(--semantic-label-neutral)",
								}}
							>
								<span>{row.label}</span>
								<span style={{ fontWeight: 500 }}>{row.value}</span>
							</div>
						))}
					</div>
					<span
						style={{
							marginTop: "var(--spacing-8)",
							fontSize: 13,
							color: "var(--semantic-label-alternative)",
						}}
					>
						{c.footerLink}
					</span>
				</div>
			</Card>

			<ChatBubble side="ai">{chatFlow.afterCard}</ChatBubble>

			<div style={{ display: "flex", paddingTop: "var(--spacing-4)" }}>
				<button
					type="button"
					style={{
						background: "#fff",
						border: "1px solid var(--semantic-line-solid-alternative)",
						borderRadius: 999,
						padding: "var(--spacing-10) var(--spacing-20)",
						fontSize: 14,
						fontWeight: 600,
						color: "var(--semantic-label-normal)",
						cursor: "pointer",
					}}
				>
					{chatFlow.compareCtaText}
				</button>
			</div>
		</DetailShell>
	);
}
