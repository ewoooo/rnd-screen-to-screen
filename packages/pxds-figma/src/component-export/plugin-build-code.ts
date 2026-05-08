import type { ComponentSpecDraft } from "../component-spec/types";
import { FIGMA_GENERATOR_CORE_SOURCE } from "./generator/generator-core-source";

export type ComponentFigmaExportSpecInput =
	| ComponentSpecDraft
	| readonly ComponentSpecDraft[];

export type ComponentFigmaBuildCodeOptions = {
	dsTokens?: unknown;
	generatorCoreSource?: string;
	sourceLabel?: string;
};

export type ComponentFigmaExportPayload = {
	version: 1;
	specs: readonly ComponentSpecDraft[];
	options: Required<Omit<ComponentFigmaBuildCodeOptions, "dsTokens">> & {
		dsTokens: unknown;
	};
};

const DEFAULT_OPTIONS: Required<Omit<ComponentFigmaBuildCodeOptions, "dsTokens">> =
	{
		generatorCoreSource: FIGMA_GENERATOR_CORE_SOURCE,
		sourceLabel: "PXDS preview",
	};

export function normalizeComponentFigmaExportSpecs(
	input: ComponentFigmaExportSpecInput,
): readonly ComponentSpecDraft[] {
	return isComponentSpecList(input) ? input : [input];
}

export function createComponentFigmaExportPayload(
	input: ComponentFigmaExportSpecInput,
	options: ComponentFigmaBuildCodeOptions = {},
): ComponentFigmaExportPayload {
	return {
		version: 1,
		specs: normalizeComponentFigmaExportSpecs(input),
		options: {
			...DEFAULT_OPTIONS,
			...options,
			dsTokens: options.dsTokens ?? {},
		},
	};
}

export function createComponentFigmaBuildCode(
	input: ComponentFigmaExportSpecInput,
	options?: ComponentFigmaBuildCodeOptions,
): string {
	const payload = createComponentFigmaExportPayload(input, options);
	const specs = payload.specs;
	const generatedAt = new Date().toISOString();
	const banner = [
		"// =============================================",
		"// AUTO-GENERATED — DO NOT EDIT",
		`// source: ${payload.options.sourceLabel}`,
		`// generated at: ${generatedAt}`,
		"// Paste into Figma plugin JSON → Figma tab → Run",
		"// Requires: PXDS token sync first for Variable binding; raw fallback still works.",
		"// =============================================",
		"",
	].join("\n");

	if (specs.length === 1) {
		return [
			banner,
			`const DS_TOKENS = ${JSON.stringify(payload.options.dsTokens, null, 2)};`,
			"",
			`const COMPONENT_SPEC = ${JSON.stringify(specs[0], null, 2)};`,
			"",
			`const SPEC_REGISTRY = ${JSON.stringify(createSpecRegistryMeta(specs), null, 2)};`,
			"",
			payload.options.generatorCoreSource,
			"",
			"// ---------- Entry ----------",
			"generateComponentSet(COMPONENT_SPEC, DS_TOKENS).catch(function (e) {",
			"  console.error('에러:', e);",
			"  figma.notify('에러: ' + (e && e.message ? e.message : e), { error: true });",
			"});",
			"",
		].join("\n");
	}

	return [
		banner,
		`const DS_TOKENS = ${JSON.stringify(payload.options.dsTokens, null, 2)};`,
		"",
		`const ALL_SPECS = ${JSON.stringify(specs, null, 2)};`,
		"",
		`const SPEC_REGISTRY = ${JSON.stringify(createSpecRegistryMeta(specs), null, 2)};`,
		"",
		payload.options.generatorCoreSource,
		"",
		"// ---------- Entry ----------",
		"async function runPxdsComponentExportBatch() {",
		"  let ok = 0;",
		"  let fail = 0;",
		"  const failed = [];",
		"  for (let i = 0; i < ALL_SPECS.length; i++) {",
		"    const spec = ALL_SPECS[i];",
		"    try {",
		"      await generateComponentSet(spec, DS_TOKENS);",
		"      ok++;",
		"    } catch (e) {",
		"      fail++;",
		"      failed.push(spec.name + ' — ' + (e && e.message ? e.message : e));",
		"      console.error('실패:', spec.name, e);",
		"    }",
		"  }",
		"  if (failed.length) console.log('실패 목록:', failed);",
		"  figma.notify('PXDS export: ' + ok + ' ok / ' + fail + ' failed');",
		"}",
		"",
		"runPxdsComponentExportBatch().catch(function (e) {",
		"  console.error('에러:', e);",
		"  figma.notify('에러: ' + (e && e.message ? e.message : e), { error: true });",
		"});",
		"",
	].join("\n");
}

function isComponentSpecList(
	input: ComponentFigmaExportSpecInput,
): input is readonly ComponentSpecDraft[] {
	return Array.isArray(input);
}

function createSpecRegistryMeta(specs: readonly ComponentSpecDraft[]) {
	return Object.fromEntries(
		specs.map((spec) => [
			spec.name,
			{
				width: spec.base.layout?.width ?? null,
				height: spec.base.layout?.height ?? null,
			},
		]),
	);
}

export type { ComponentSpecDraft };
