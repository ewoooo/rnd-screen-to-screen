export type FigmaRendererTokenIssue = {
	path: string;
	count: number;
};

export type FigmaRendererTokenValidationResult = {
	refs: readonly string[];
	missing: readonly FigmaRendererTokenIssue[];
};

export function collectFigmaRendererTokenRefs(value: unknown): string[] {
	const refs: string[] = [];
	collectTokenRefs(value, refs);
	return refs;
}

export function validateFigmaRendererTokens(
	value: unknown,
	tokens: unknown,
): FigmaRendererTokenValidationResult {
	const refs = collectFigmaRendererTokenRefs(value);
	const missingCounts = new Map<string, number>();

	for (const ref of refs) {
		if (getTokenNode(tokens, ref)) continue;
		missingCounts.set(ref, (missingCounts.get(ref) ?? 0) + 1);
	}

	return {
		refs,
		missing: Array.from(missingCounts, ([path, count]) => ({ path, count })),
	};
}

function collectTokenRefs(value: unknown, refs: string[]) {
	if (typeof value === "string") {
		const match = value.match(/^\{(.+)\}$/);
		if (match) refs.push(match[1]);
		return;
	}

	if (Array.isArray(value)) {
		for (const item of value) collectTokenRefs(item, refs);
		return;
	}

	if (!value || typeof value !== "object") return;

	for (const item of Object.values(value)) {
		collectTokenRefs(item, refs);
	}
}

function getTokenNode(tokens: unknown, path: string): unknown {
	return getTokenNodeByParts(tokens, parseTokenPath(path)) ?? getTokenNodeByParts(tokens, parseTokenPath(toColorTokenPath(path)));
}

function getTokenNodeByParts(tokens: unknown, parts: readonly string[]): unknown {
	let node = tokens;

	for (const part of parts) {
		if (!node || typeof node !== "object") return undefined;
		node = (node as Record<string, unknown>)[part];
	}

	return node;
}

function toColorTokenPath(path: string) {
	if (path.startsWith("semantic.")) return `color.${path}`;
	if (path.startsWith("atomic.")) return `color.${path}`;
	return path;
}

function parseTokenPath(path: string): string[] {
	const parts: string[] = [];
	let current = "";

	for (let i = 0; i < path.length; i++) {
		const char = path[i];

		if (char === ".") {
			if (current) {
				parts.push(current);
				current = "";
			}
			continue;
		}

		if (char === "[") {
			if (current) {
				parts.push(current);
				current = "";
			}

			const quote = path[++i];
			let bracketValue = "";

			if (quote !== "\"" && quote !== "'") {
				while (i < path.length && path[i] !== "]") {
					bracketValue += path[i++];
				}
				parts.push(bracketValue);
				continue;
			}

			for (i++; i < path.length; i++) {
				const bracketChar = path[i];
				if (bracketChar === "\\" && i + 1 < path.length) {
					bracketValue += path[++i];
					continue;
				}
				if (bracketChar === quote && path[i + 1] === "]") {
					i++;
					break;
				}
				bracketValue += bracketChar;
			}

			parts.push(bracketValue);
			continue;
		}

		current += char;
	}

	if (current) parts.push(current);
	return parts;
}
