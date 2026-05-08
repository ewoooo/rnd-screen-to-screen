import {
	getRenderableScreenSpecById,
	getRenderableScreenSpecEntries,
	getRenderableScreenSpecIssueSummary,
	getScreenSpecById,
	getScreenSpecEntries,
	getScreenSpecIssueSummary,
} from "@/utils/screen-specs";

type UseScreenSpecsOptions = {
	selectedId?: string;
};

export function useScreenSpecs(options: UseScreenSpecsOptions = {}) {
	const selectedSpec = options.selectedId
		? getScreenSpecById(options.selectedId)
		: undefined;
	const selectedRenderableSpec = options.selectedId
		? getRenderableScreenSpecById(options.selectedId)
		: undefined;

	return {
		specEntries: getScreenSpecEntries(),
		renderableSpecEntries: getRenderableScreenSpecEntries(),
		specCount: getScreenSpecEntries().length,
		renderableSpecCount: getRenderableScreenSpecEntries().length,
		selectedSpec,
		selectedRenderableSpec,
		selectedSpecIssues: getScreenSpecIssueSummary(selectedSpec),
		selectedRenderableSpecIssues:
			getRenderableScreenSpecIssueSummary(selectedRenderableSpec),
		getScreenSpecById,
		getRenderableScreenSpecById,
	};
}
