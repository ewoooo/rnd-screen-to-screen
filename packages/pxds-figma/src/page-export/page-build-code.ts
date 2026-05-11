import type { PageFigmaExportSpec } from "./types";
import { PAGE_GENERATOR_RUNTIME_SOURCE } from "./runtime/page-generator-runtime-source";
import { FIGMA_GENERATOR_CORE_SOURCE } from "../component-export/generator/generator-core-source";
import {
	createPageComponentAssembly,
	type FigmaRendererComponentRegistry,
	validateFigmaRendererTokens,
} from "@pxds/pxds-figma-renderer";

export type PageFigmaBuildCodeOptions = {
	dsTokens?: unknown;
	componentSpecs?: FigmaRendererComponentRegistry;
	componentGeneratorSource?: string;
	generatorSource?: string;
	sourceLabel?: string;
};

export type PageFigmaExportPayload = {
	version: 1;
	spec: PageFigmaExportSpec;
	options: Required<
		Omit<PageFigmaBuildCodeOptions, "componentSpecs" | "dsTokens">
	> & {
		dsTokens: unknown;
		componentSpecs?: FigmaRendererComponentRegistry;
	};
};

const DEFAULT_OPTIONS: Required<
	Omit<PageFigmaBuildCodeOptions, "componentSpecs" | "dsTokens">
> = {
	componentGeneratorSource: FIGMA_GENERATOR_CORE_SOURCE,
	generatorSource: PAGE_GENERATOR_RUNTIME_SOURCE,
	sourceLabel: "PXDS page preview",
};

export function createPageFigmaExportPayload(
	spec: PageFigmaExportSpec,
	options: PageFigmaBuildCodeOptions = {},
): PageFigmaExportPayload {
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

export function createPageFigmaBuildCode(
	spec: PageFigmaExportSpec,
	options?: PageFigmaBuildCodeOptions,
): string {
	const payload = createPageFigmaExportPayload(spec, options);
	const assembly = createPageComponentAssembly(payload.spec, {
		componentSpecs: payload.options.componentSpecs,
	});

	if (assembly.missingComponentIds.length > 0) {
		throw new Error(
			[
				"PXDS page export component specs missing:",
				...assembly.missingComponentIds.map((componentId) => `  - ${componentId}`),
			].join("\n"),
		);
	}

	const tokenValidation = validateFigmaRendererTokens(
		[assembly.pageSpec, ...assembly.requiredComponentSpecs],
		payload.options.dsTokens,
	);

	if (tokenValidation.missing.length > 0) {
		throw new Error(
			[
				"PXDS page export token missing:",
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
		"// Creates a PXDS page from registered component instances.",
		"// =============================================",
		"",
	].join("\n");

	return [
		banner,
		`const DS_TOKENS = ${JSON.stringify(payload.options.dsTokens, null, 2)};`,
		"",
		`const PAGE_SPEC = ${JSON.stringify(payload.spec, null, 2)};`,
		"",
		`const REQUIRED_COMPONENT_SPECS = ${JSON.stringify(assembly.requiredComponentSpecs, null, 2)};`,
		"",
		`const PAGE_COMPONENT_SPEC = ${JSON.stringify(assembly.pageSpec, null, 2)};`,
		"",
		`const SPEC_REGISTRY = ${JSON.stringify(createSpecRegistryMeta([assembly.pageSpec, ...assembly.requiredComponentSpecs]), null, 2)};`,
		"",
		payload.options.componentGeneratorSource,
		"",
		"// ---------- Entry ----------",
		"async function runPxdsPageAssemblyExport() {",
		"  for (let i = 0; i < REQUIRED_COMPONENT_SPECS.length; i++) {",
		"    await generateComponentSet(REQUIRED_COMPONENT_SPECS[i], DS_TOKENS);",
		"  }",
		"  await generateComponentSet(PAGE_COMPONENT_SPEC, DS_TOKENS);",
		"  figma.notify('PXDS page assembly export: ' + PAGE_COMPONENT_SPEC.name);",
		"}",
		"",
		"runPxdsPageAssemblyExport().catch(function (error) {",
		"  console.error('PXDS page export error:', error);",
		"  figma.notify('PXDS page export error: ' + (error && error.message ? error.message : error), { error: true });",
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
