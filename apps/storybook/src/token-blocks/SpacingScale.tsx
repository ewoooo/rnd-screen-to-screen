import type { ReactElement } from "react";
import { readPx, type TokenNode, walkTokens } from "./token-utils";

type SpacingScaleProps = {
	source: TokenNode;
	heading?: string;
};

export function SpacingScale({
	source,
	heading,
}: SpacingScaleProps): ReactElement {
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
			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					fontSize: 13,
				}}
			>
				<thead>
					<tr style={{ textAlign: "left" }}>
						<th style={th}>Token</th>
						<th style={th}>Value</th>
						<th style={th}>Sample</th>
					</tr>
				</thead>
				<tbody>
					{entries.map((entry) => (
						<tr key={entry.path}>
							<td style={td}>
								<code style={mono}>{entry.path}</code>
							</td>
							<td style={td}>{String(entry.value)}</td>
							<td style={td}>
								<div
									style={{
										height: 12,
										width: Math.max(entry.px, 1),
										background: "var(--semantic-color-brand-solid, #3617ce)",
										borderRadius: 2,
									}}
									aria-hidden
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

const th: React.CSSProperties = {
	padding: "6px 8px",
	borderBottom: "1px solid var(--component-divider-default, #e5e5e5)",
	fontWeight: 600,
};

const td: React.CSSProperties = {
	padding: "6px 8px",
	borderBottom: "1px solid var(--component-divider-default, #f1f1f1)",
	verticalAlign: "middle",
};

const mono: React.CSSProperties = {
	fontFamily: "ui-monospace, monospace",
	fontSize: 12,
};
