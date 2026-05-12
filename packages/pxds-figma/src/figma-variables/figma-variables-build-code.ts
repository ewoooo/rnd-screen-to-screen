import { FIGMA_VARIABLES_SYNC_RUNTIME_SOURCE } from "./runtime/figma-variables-sync-runtime-source";

export type PxdsFigmaVariablesSyncCodeOptions = {
	collectionName?: string;
	includeTextStyles?: boolean;
	runtimeSource?: string;
	sourceLabel?: string;
	textStylePrefix?: string;
};

export type PxdsFigmaVariablesSyncPayload = {
	version: 1;
	tokenTree: unknown;
	options: Required<PxdsFigmaVariablesSyncCodeOptions>;
};

const DEFAULT_OPTIONS = {
	collectionName: "PXDS",
	includeTextStyles: true,
	runtimeSource: FIGMA_VARIABLES_SYNC_RUNTIME_SOURCE,
	sourceLabel: "PXDS Figma Variables sync",
	textStylePrefix: "PXDS",
} satisfies Required<PxdsFigmaVariablesSyncCodeOptions>;

export function createPxdsFigmaVariablesSyncPayload(
	tokenTree: unknown,
	options: PxdsFigmaVariablesSyncCodeOptions = {},
): PxdsFigmaVariablesSyncPayload {
	return {
		version: 1,
		tokenTree,
		options: {
			...DEFAULT_OPTIONS,
			...options,
		},
	};
}

export function createPxdsFigmaVariablesSyncCode(
	tokenTree: unknown,
	options?: PxdsFigmaVariablesSyncCodeOptions,
): string {
	const payload = createPxdsFigmaVariablesSyncPayload(tokenTree, options);
	const generatedAt = new Date().toISOString();
	const banner = [
		"// =============================================",
		"// AUTO-GENERATED — DO NOT EDIT",
		`// source: ${payload.options.sourceLabel}`,
		`// generated at: ${generatedAt}`,
		"// Paste into Figma plugin JSON → Figma tab → Run",
		"// Creates/updates PXDS Figma Variables directly.",
		"// Token SSOT remains @pxds/pxds-tokens/registry/wds-token-registry.json.",
		"// =============================================",
		"",
	].join("\n");

	return [
		banner,
		`const DS_TOKENS = ${JSON.stringify(payload.tokenTree, null, 2)};`,
		"",
		`const PXDS_FIGMA_VARIABLES_SYNC_OPTIONS = ${JSON.stringify(
			{
				collectionName: payload.options.collectionName,
				includeTextStyles: payload.options.includeTextStyles,
				textStylePrefix: payload.options.textStylePrefix,
			},
			null,
			2,
		)};`,
		"",
		payload.options.runtimeSource,
		"",
		"// ---------- Entry ----------",
		"syncPxdsFigmaVariables().catch(function (error) {",
		"  console.error('PXDS figma variables sync error:', error);",
		"  figma.notify('PXDS figma variables sync error: ' + (error && error.message ? error.message : error), { error: true });",
		"});",
		"",
	].join("\n");
}
