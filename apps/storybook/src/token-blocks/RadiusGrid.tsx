import type { ReactElement } from "react";
import { readPx, type TokenNode, walkTokens } from "./token-utils";

type RadiusGridProps = {
	source: TokenNode;
	heading?: string;
};

export function RadiusGrid({ source, heading }: RadiusGridProps): ReactElement {
	const entries = Array.from(walkTokens(source))
		.filter((leaf) => leaf.type === "dimension" || typeof leaf.value === "string")
		.map((leaf) => ({
			path: leaf.path.join("."),
			value: leaf.value,
			px: readPx(leaf.value),
		}))
		.sort((a, b) => a.px - b.px);

	return (
		<section style={{ marginBottom: 32 }}>
			{heading ? <h3 style={{ margin: "16px 0 8px" }}>{heading}</h3> : null}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
					gap: 16,
				}}
			>
				{entries.map((entry) => (
					<div
						key={entry.path}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 8,
						}}
					>
						<div
							style={{
								width: 96,
								height: 96,
								background: "var(--semantic-color-brand-solid, #3617ce)",
								borderRadius: Math.max(entry.px, 0),
							}}
							aria-hidden
						/>
						<div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}>
							{entry.path}
						</div>
						<div style={{ fontSize: 12, color: "#666" }}>{String(entry.value)}</div>
					</div>
				))}
			</div>
		</section>
	);
}
