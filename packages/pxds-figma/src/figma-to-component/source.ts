export type FigmaToComponentSource = {
	fileKey: string;
	nodeId?: string;
	url: string;
};

const FIGMA_DESIGN_URL_PATTERN =
	/https:\/\/(?:www\.)?figma\.com\/(?:design|file)\/([^/?#]+)[^\s]*/;
const FIGMA_NODE_ID_PATTERN = /[?&]node-id=([^&]+)/;

export function parseFigmaSource(input: string): FigmaToComponentSource | null {
	const figmaUrl = input.match(FIGMA_DESIGN_URL_PATTERN)?.[0];
	if (!figmaUrl) return null;

	const fileKey = figmaUrl.match(FIGMA_DESIGN_URL_PATTERN)?.[1];
	if (!fileKey) return null;

	const nodeId = figmaUrl.match(FIGMA_NODE_ID_PATTERN)?.[1]?.replace("-", ":");

	return {
		fileKey,
		nodeId,
		url: figmaUrl,
	};
}
