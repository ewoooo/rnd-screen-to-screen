import type { ScreenFigmaExportSpec } from "./types";
import { SCREEN_GENERATOR_RUNTIME_SOURCE } from "./runtime/screen-generator-runtime-source";
import { FIGMA_GENERATOR_CORE_SOURCE } from "../component-export/generator/generator-core-source";
import {
	createScreenComponentAssembly,
	type FigmaRendererComponentRegistry,
	validateFigmaRendererTokens,
} from "../renderer";

export type ScreenFigmaBuildCodeOptions = {
	dsTokens?: unknown;
	componentSpecs?: FigmaRendererComponentRegistry;
	componentGeneratorSource?: string;
	generatorSource?: string;
	sourceLabel?: string;
};

export type ScreenFigmaExportPayload = {
	version: 1;
	spec: ScreenFigmaExportSpec;
	options: Required<
		Omit<ScreenFigmaBuildCodeOptions, "componentSpecs" | "dsTokens">
	> & {
		dsTokens: unknown;
		componentSpecs?: FigmaRendererComponentRegistry;
	};
};

const DEFAULT_OPTIONS: Required<
	Omit<ScreenFigmaBuildCodeOptions, "componentSpecs" | "dsTokens">
> = {
	componentGeneratorSource: FIGMA_GENERATOR_CORE_SOURCE,
	generatorSource: SCREEN_GENERATOR_RUNTIME_SOURCE,
	sourceLabel: "PXDS screen preview",
};

export function createScreenFigmaExportPayload(
	spec: ScreenFigmaExportSpec,
	options: ScreenFigmaBuildCodeOptions = {},
): ScreenFigmaExportPayload {
	return {
		version: 1,
		spec,
		options: {
			...DEFAULT_OPTIONS,
			...options,
			dsTokens: options.dsTokens ?? {},
		},
	};
}

export function createScreenFigmaBuildCode(
	spec: ScreenFigmaExportSpec,
	options?: ScreenFigmaBuildCodeOptions,
): string {
	const payload = createScreenFigmaExportPayload(spec, options);
	const assembly = createScreenComponentAssembly(payload.spec, {
		componentSpecs: payload.options.componentSpecs,
	});

	if (assembly.missingComponentIds.length > 0) {
		throw new Error(
			[
				"PXDS screen export component specs missing:",
				...assembly.missingComponentIds.map((componentId) => `  - ${componentId}`),
			].join("\n"),
		);
	}

	const tokenValidation = validateFigmaRendererTokens(
		[assembly.screenSpec, ...assembly.requiredComponentSpecs],
		payload.options.dsTokens,
	);

	if (tokenValidation.missing.length > 0) {
		throw new Error(
			[
				"PXDS screen export token missing:",
				...tokenValidation.missing.map(
					(issue) => `  - ${issue.path} (${issue.count})`,
				),
			].join("\n"),
		);
	}

	const generatedAt = new Date().toISOString();
	const banner = [
		"// =============================================",
		"// AUTO-GENERATED — DO NOT EDIT",
		`// source: ${payload.options.sourceLabel}`,
		`// generated at: ${generatedAt}`,
		"// Paste into Figma plugin JSON → Figma tab → Run",
		"// Creates a PXDS screen from registered component instances.",
		"// Run PXDS Variables sync first to preserve token bindings; raw values are only fallbacks.",
		"// =============================================",
		"",
	].join("\n");

	return [
		banner,
		`const DS_TOKENS = ${JSON.stringify(payload.options.dsTokens, null, 2)};`,
		"",
		`const SCREEN_SPEC = ${JSON.stringify(payload.spec, null, 2)};`,
		"",
		`const REQUIRED_COMPONENT_SPECS = ${JSON.stringify(assembly.requiredComponentSpecs, null, 2)};`,
		"",
		`const SCREEN_COMPONENT_SPEC = ${JSON.stringify(assembly.screenSpec, null, 2)};`,
		"",
		`const SPEC_REGISTRY = ${JSON.stringify(createSpecRegistryMeta([assembly.screenSpec, ...assembly.requiredComponentSpecs]), null, 2)};`,
		"",
		payload.options.componentGeneratorSource,
		"",
		"// ---------- Entry ----------",
		"async function runPxdsScreenAssemblyExport() {",
		"  for (let i = 0; i < REQUIRED_COMPONENT_SPECS.length; i++) {",
		"    await generateComponentSet(REQUIRED_COMPONENT_SPECS[i], DS_TOKENS);",
		"  }",
		"  await generateComponentSet(SCREEN_COMPONENT_SPEC, DS_TOKENS);",
		"  figma.notify('PXDS screen assembly export: ' + SCREEN_COMPONENT_SPEC.name);",
		"}",
		"",
		"runPxdsScreenAssemblyExport().catch(function (error) {",
		"  console.error('PXDS screen export error:', error);",
		"  figma.notify('PXDS screen export error: ' + (error && error.message ? error.message : error), { error: true });",
		"});",
		"",
	].join("\n");
}

function createSpecRegistryMeta(specs: readonly { name: string; base: { layout?: { width?: unknown; height?: unknown } } }[]) {
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
