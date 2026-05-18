import type { ReactElement } from "react";
import {
	resolveTokenValue,
	type TokenLeaf,
	type TokenNode,
	walkTokens,
} from "./token-utils";

type ColorSwatchGridProps = {
	source: TokenNode;
	resolveAgainst?: TokenNode[];
	heading?: string;
	emptyHint?: string;
};

function isColor(leaf: TokenLeaf) {
	return leaf.type === "color" || typeof leaf.value === "string";
}

export function ColorSwatchGrid({
	source,
	resolveAgainst = [],
	heading,
	emptyHint = "표시할 색상 토큰이 없습니다.",
}: ColorSwatchGridProps): ReactElement {
	const items: ColorEntry[] = [];
	for (const leaf of walkTokens(source)) {
		if (!isColor(leaf)) continue;
		const resolved = resolveTokenValue(leaf.value, [source, ...resolveAgainst]);
		const hex = typeof resolved === "string" ? resolved : String(leaf.value ?? "");
		items.push({
			path: leaf.path.join("."),
			rawValue: typeof leaf.value === "string" ? leaf.value : JSON.stringify(leaf.value),
			resolved: hex,
			description: leaf.raw.$description,
		});
	}

	return (
		<section style={{ marginBottom: 32 }}>
			{heading ? <h3 style={{ margin: "16px 0 8px" }}>{heading}</h3> : null}
			{items.length === 0 ? (
				<p style={{ color: "#666" }}>{emptyHint}</p>
			) : (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
						gap: 12,
					}}
				>
					{items.map((item) => (
						<SwatchCard key={item.path} entry={item} />
					))}
				</div>
			)}
		</section>
	);
}

type ColorEntry = {
	path: string;
	rawValue: string;
	resolved: string;
	description?: string;
};

function SwatchCard({ entry }: { entry: ColorEntry }) {
	const showsReference = entry.rawValue !== entry.resolved;
	return (
		<div
			style={{
				border: "1px solid var(--component-divider-default, #e5e5e5)",
				borderRadius: 8,
				overflow: "hidden",
				background: "var(--component-card-bg-default, #fff)",
			}}
		>
			<div
				role="img"
				aria-label={`Swatch for ${entry.path}`}
				style={{
					height: 72,
					background: entry.resolved,
					borderBottom: "1px solid rgba(0,0,0,0.05)",
				}}
			/>
			<div style={{ padding: "8px 10px", fontSize: 12, lineHeight: 1.4 }}>
				<div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11 }}>
					{entry.path}
				</div>
				<div style={{ color: "#666", marginTop: 2 }}>{entry.resolved}</div>
				{showsReference ? (
					<div style={{ color: "#888", marginTop: 2 }}>← {entry.rawValue}</div>
				) : null}
				{entry.description ? (
					<div style={{ color: "#444", marginTop: 4 }}>{entry.description}</div>
				) : null}
			</div>
		</div>
	);
}
