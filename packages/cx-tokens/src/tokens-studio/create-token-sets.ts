import type { TokensStudioTokenTree } from "./types";

/**
 * Returns the Tokens Studio single-file token tree.
 *
 * The registry SSOT is already in Tokens Studio format (3 Sets:
 * foundation/semantic/project + $metadata + $themes + DTCG $type/$value
 * leaves), so this exporter is a passthrough — registry shape is the export
 * shape. Per-category map-* helpers are now unused and slated for removal in
 * the next cx-tokens cleanup pass.
 */
export function createPxdsTokensStudioTokenSets(
	registry: Record<string, unknown>,
): TokensStudioTokenTree {
	return registry as TokensStudioTokenTree;
}
