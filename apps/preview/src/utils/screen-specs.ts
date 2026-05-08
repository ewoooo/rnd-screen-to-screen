import {
	activeRenderableScreenSpecs,
	activeScreenSpecs,
	getRenderableScreenSpecIssues,
	getScreenSpecIssues,
	type RenderableScreenSpecV1,
	type ScreenSpecV2,
} from "@screen/specs";

const screenSpecsById = activeScreenSpecs as Record<string, ScreenSpecV2>;
const renderableScreenSpecsById = activeRenderableScreenSpecs as Record<
	string,
	RenderableScreenSpecV1
>;

export function getScreenSpecById(id: string) {
	return screenSpecsById[id];
}

export function getRenderableScreenSpecById(id: string) {
	return renderableScreenSpecsById[id];
}

export function getScreenSpecEntries() {
	return Object.entries(screenSpecsById);
}

export function getRenderableScreenSpecEntries() {
	return Object.entries(renderableScreenSpecsById);
}

export function getScreenSpecIssueSummary(spec?: ScreenSpecV2) {
	if (!spec) return [];
	return getScreenSpecIssues(spec);
}

export function getRenderableScreenSpecIssueSummary(
	spec?: RenderableScreenSpecV1,
) {
	if (!spec) return [];
	return getRenderableScreenSpecIssues(spec);
}
