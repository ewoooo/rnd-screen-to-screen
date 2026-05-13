type UseScreenSpecsOptions = {
	selectedId?: string;
};

export function useScreenSpecs(_options: UseScreenSpecsOptions = {}) {
	const selectedSpec = undefined;
	const selectedRenderableSpec = undefined;
	const specEntries: readonly [] = [];
	const renderableSpecEntries: readonly [] = [];

	return {
		specEntries,
		renderableSpecEntries,
		specCount: specEntries.length,
		renderableSpecCount: renderableSpecEntries.length,
		selectedSpec,
		selectedRenderableSpec,
		selectedSpecIssues: selectedSpec ? getScreenSpecIssues(selectedSpec) : [],
		selectedRenderableSpecIssues: selectedRenderableSpec
			? []
			: [],
		getScreenSpecById: (_id: string) => undefined,
		getRenderableScreenSpecById: (_id: string) => undefined,
	};
}
