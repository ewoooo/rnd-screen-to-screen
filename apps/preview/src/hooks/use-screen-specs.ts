import {
	activeRenderableScreenSpecs,
	activeRenderScreenSpecs,
	activeScreenSpecs,
	activeSduiScreenSpecs,
	getRenderableScreenSpecIssues,
	getSduiScreenIssues,
	getScreenSpecIssues,
	screenRenderRegistry,
	validateRenderScreenSpec,
	type RenderScreenSpec,
	type RenderableScreenSpecV1,
	type ScreenSpecV2,
	type SduiScreen,
} from "@screen/mobile/screens";
import { componentRegistry } from "@pxds/pxds-components/registry";

const screenSpecsById = activeScreenSpecs as Record<string, ScreenSpecV2>;
const renderableScreenSpecsById = activeRenderableScreenSpecs as Record<
	string,
	RenderableScreenSpecV1
>;
const sduiScreenSpecsById = activeSduiScreenSpecs as Record<string, SduiScreen>;
const renderScreenSpecsById = activeRenderScreenSpecs as Record<
	string,
	RenderScreenSpec
>;
const renderSpecRegistry = [...componentRegistry, ...screenRenderRegistry];
type PreviewRenderableScreenSpec = RenderScreenSpec | RenderableScreenSpecV1 | SduiScreen;
const previewRenderableScreenSpecsById: Record<string, PreviewRenderableScreenSpec> =
	{
		...renderableScreenSpecsById,
		...sduiScreenSpecsById,
		...renderScreenSpecsById,
	};

type UseScreenSpecsOptions = {
	selectedId?: string;
};

export function useScreenSpecs(options: UseScreenSpecsOptions = {}) {
	const selectedSpec = options.selectedId
		? screenSpecsById[options.selectedId]
		: undefined;
	const selectedRenderableSpec = options.selectedId
		? previewRenderableScreenSpecsById[options.selectedId]
		: undefined;

	const specEntries = Object.entries(screenSpecsById);
	const renderableSpecEntries = Object.entries(previewRenderableScreenSpecsById);

	return {
		specEntries,
		renderableSpecEntries,
		specCount: specEntries.length,
		renderableSpecCount: renderableSpecEntries.length,
		selectedSpec,
		selectedRenderableSpec,
		selectedSpecIssues: selectedSpec ? getScreenSpecIssues(selectedSpec) : [],
		selectedRenderableSpecIssues: selectedRenderableSpec
			? getPreviewRenderableSpecIssues(selectedRenderableSpec)
			: [],
		getScreenSpecById: (id: string) => screenSpecsById[id],
		getRenderableScreenSpecById: (id: string) =>
			previewRenderableScreenSpecsById[id],
	};
}

function getPreviewRenderableSpecIssues(spec: PreviewRenderableScreenSpec) {
	if (isRenderScreenSpec(spec)) {
		return validateRenderScreenSpec(spec, renderSpecRegistry);
	}
	return isSduiScreenSpec(spec)
		? getSduiScreenIssues(spec)
		: getRenderableScreenSpecIssues(spec);
}

function isSduiScreenSpec(spec: PreviewRenderableScreenSpec): spec is SduiScreen {
	return "schemaVersion" in spec && spec.schemaVersion === "sdui-v1";
}

function isRenderScreenSpec(
	spec: PreviewRenderableScreenSpec,
): spec is RenderScreenSpec {
	return "schemaVersion" in spec && spec.schemaVersion === "render-spec-v1";
}
