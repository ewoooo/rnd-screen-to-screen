export type TokenNode = {
	$type?: string;
	$value?: unknown;
	$description?: string;
	$extensions?: Record<string, unknown>;
} & Record<string, unknown>;

export type TokenLeaf = {
	path: string[];
	type: string;
	value: unknown;
	raw: TokenNode;
};

const HEX_NAME_PATTERN = /^[0-9a-fA-F]{6}( \d+%)?$/;

/**
 * Walks a Tokens Studio object tree and yields every leaf token.
 * Leaves are nodes that have $type or $value. Branches are plain
 * objects. Skips the Tokens Studio hex-name noise tokens (e.g. "E42939",
 * "FFFFFF 50%") that cx-tokens emit pipeline drops.
 */
export function* walkTokens(
	node: TokenNode,
	path: string[] = [],
): Generator<TokenLeaf, void, unknown> {
	if (node == null || typeof node !== "object") return;
	if (
		Object.hasOwn(node, "$type") ||
		Object.hasOwn(node, "$value")
	) {
		yield {
			path,
			type: String(node.$type ?? ""),
			value: node.$value,
			raw: node,
		};
		return;
	}
	for (const [key, child] of Object.entries(node)) {
		if (key.startsWith("$")) continue;
		if (HEX_NAME_PATTERN.test(key)) continue;
		if (key === "guide") continue;
		yield* walkTokens(child as TokenNode, [...path, key]);
	}
}

/**
 * Resolves a Tokens Studio reference like "{color.blue.500}" against the
 * provided sources. Looks through each source object in order, supporting
 * nested chains (a semantic token that references another semantic token).
 * Returns the first non-reference primitive value or the original string
 * if no resolution is possible.
 */
export function resolveTokenValue(
	value: unknown,
	sources: TokenNode[],
	seen: Set<string> = new Set(),
): unknown {
	if (typeof value !== "string") return value;
	const refMatch = value.match(/^\{([^}]+)\}$/);
	if (!refMatch) return value;
	const refPath = refMatch[1];
	if (seen.has(refPath)) return value;
	seen.add(refPath);
	for (const source of sources) {
		const resolved = lookupPath(source, refPath.split("."));
		if (resolved && (resolved.$value !== undefined || resolved.value !== undefined)) {
			const inner = resolved.$value ?? (resolved as { value?: unknown }).value;
			return resolveTokenValue(inner, sources, seen);
		}
	}
	return value;
}

function lookupPath(source: TokenNode, segments: string[]): TokenNode | undefined {
	let cursor: unknown = source;
	for (const segment of segments) {
		if (cursor == null || typeof cursor !== "object") return undefined;
		cursor = (cursor as Record<string, unknown>)[segment];
	}
	return cursor as TokenNode | undefined;
}

/**
 * Reads a dimension value like "12px" or "0" and returns a number of pixels.
 */
export function readPx(value: unknown): number {
	if (typeof value === "number") return value;
	if (typeof value === "string") {
		const match = value.match(/^(-?\d+(?:\.\d+)?)/);
		if (match) return Number(match[1]);
	}
	return 0;
}
