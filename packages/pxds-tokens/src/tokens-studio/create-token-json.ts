import { createPxdsTokensStudioTokenSets } from "./create-token-sets";

export function createPxdsTokensStudioJson(
	registry: Record<string, unknown>,
	space = 2,
): string {
	return `${JSON.stringify(createPxdsTokensStudioTokenSets(registry), null, space)}\n`;
}
