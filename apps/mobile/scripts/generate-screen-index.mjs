#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const appDir = path.resolve(import.meta.dirname, "..");
const repoRoot = path.resolve(appDir, "..", "..");
const routeDir = path.join(appDir, "src", "app");
const outputPath = path.join(appDir, "src", "screens", "index.ts");
const sduiSchemaRef = "../../../../../sdui.schema.json";
const sduiSchemaPath = path.join(repoRoot, "sdui.schema.json");
const isCheck = process.argv.includes("--check");

const preferredGroupOrder = [
	"home",
	"product",
	"membership",
	"nc-full",
	"nc-simple",
	"search",
	"tu",
	"billing",
	"billing-html",
];

function readScreenRoute(routeFolder) {
	const metaPath = path.join(routeDir, routeFolder, "meta.json");
	if (existsSync(metaPath)) {
		const meta = readJson(metaPath);
		return {
			id: meta.id,
			route: meta.route,
			label: meta.name,
			group: meta.group ?? meta.domain,
			status: meta.status,
			createdAt: meta.createdAt,
		};
	}

	const registryPath = path.join(routeDir, routeFolder, "registry.ts");
	const source = readFileSync(registryPath, "utf8");
	const match = source.match(/export\s+const\s+screenRoute\s*=\s*(\{[\s\S]*?\})\s*as\s+const\s*;/);
	if (!match) throw new Error(`Invalid screen registry shape: ${registryPath}`);
	return JSON.parse(match[1]);
}

function readJson(filePath) {
	return JSON.parse(readFileSync(filePath, "utf8"));
}

function assertSduiSchemaReference(filePath, spec) {
	if (!existsSync(sduiSchemaPath)) {
		throw new Error(`Missing root SDUI schema: ${path.relative(repoRoot, sduiSchemaPath)}`);
	}
	if (spec.$schema !== sduiSchemaRef) {
		throw new Error(
			`SDUI spec must reference root schema: ${path.relative(appDir, filePath)} expected ${sduiSchemaRef}`,
		);
	}
}

function isCompactSduiScreenSpec(spec) {
	return spec.schemaVersion === "sdui-v1" && typeof spec.screen_id === "string" && Boolean(spec.slots);
}

function toIdentifier(id, suffix) {
	const parts = id.split(/[^a-zA-Z0-9]+/).filter(Boolean);
	const name = parts
		.map((part, index) => {
			const lower = part.toLowerCase();
			if (index === 0) return lower;
			return lower.charAt(0).toUpperCase() + lower.slice(1);
		})
		.join("");
	return `${name}${suffix}`;
}

function quote(value) {
	return JSON.stringify(value);
}

function assertUnique(entries, key) {
	const seen = new Map();
	for (const entry of entries) {
		const value = entry.route[key];
		if (!seen.has(value)) {
			seen.set(value, entry.folder);
			continue;
		}
		throw new Error(`Duplicate screen ${key}: ${value} (${seen.get(value)}, ${entry.folder})`);
	}
}

function getScreenEntries() {
	const entries = readdirSync(routeDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.filter(
			(folder) =>
				existsSync(path.join(routeDir, folder, "registry.ts")) ||
				existsSync(path.join(routeDir, folder, "meta.json")),
		)
		.map((folder) => {
			const hasMeta = existsSync(path.join(routeDir, folder, "meta.json"));
			const route = readScreenRoute(folder);
			const specPath = path.join(routeDir, folder, "spec.json");
			const renderablePath = path.join(routeDir, folder, "sdui.json");
			const renderTsPath = path.join(routeDir, folder, "render.ts");
			const renderJsonPath = path.join(routeDir, folder, "render.json");
			const renderableSpec = existsSync(renderablePath) ? readJson(renderablePath) : undefined;
			const hasRenderSpec = existsSync(renderTsPath) || existsSync(renderJsonPath);
			if (route.id !== folder) {
				throw new Error(`Screen route id must match folder name: ${folder} received ${route.id}`);
			}
			if (route.route !== `/${folder}`) {
				throw new Error(`Screen route path must match folder name: ${folder} received ${route.route}`);
			}
			if (!existsSync(specPath)) {
				throw new Error(`Missing screen spec: ${path.relative(appDir, specPath)}`);
			}
			if (renderableSpec) {
				assertSduiSchemaReference(renderablePath, renderableSpec);
			}
			return {
				folder,
				route,
				hasMeta,
				hasRenderableSpec: Boolean(renderableSpec),
				isSduiScreenSpec: renderableSpec ? isCompactSduiScreenSpec(renderableSpec) : false,
				routeName: toIdentifier(route.id, "Route"),
				specName: toIdentifier(route.id, "Spec"),
				renderableName: toIdentifier(route.id, "RenderableSpec"),
				renderName: toIdentifier(route.id, "RenderSpec"),
				renderImportKind: existsSync(renderTsPath) ? "named" : "default",
				hasRenderSpec,
			};
		});

	assertUnique(entries, "id");
	assertUnique(entries, "route");

	return entries.sort((a, b) => {
		const groupA = preferredGroupOrder.indexOf(a.route.group);
		const groupB = preferredGroupOrder.indexOf(b.route.group);
		const normalizedGroupA = groupA === -1 ? preferredGroupOrder.length : groupA;
		const normalizedGroupB = groupB === -1 ? preferredGroupOrder.length : groupB;
		if (normalizedGroupA !== normalizedGroupB) return normalizedGroupA - normalizedGroupB;
		return a.route.id.localeCompare(b.route.id);
	});
}

function renderIndex(entries) {
	const groups = [...new Set(entries.map((entry) => entry.route.group))];
	const statuses = [...new Set(entries.map((entry) => entry.route.status))];
	const imports = entries.flatMap((entry) => {
		const lines = [`import ${entry.specName} from "../app/${entry.folder}/spec.json";`];
		if (!entry.hasMeta) {
			lines.unshift(`import { screenRoute as ${entry.routeName} } from "../app/${entry.folder}/registry";`);
		}
		if (entry.hasRenderableSpec) {
			lines.push(`import ${entry.renderableName} from "../app/${entry.folder}/sdui.json";`);
		}
		if (entry.hasRenderSpec) {
			if (entry.renderImportKind === "named") {
				lines.push(`import { RENDER_SPEC as ${entry.renderName} } from "../app/${entry.folder}/render";`);
			} else {
				lines.push(`import ${entry.renderName} from "../app/${entry.folder}/render.json";`);
			}
		}
		return lines;
	});
	const routeDeclarations = entries
		.filter((entry) => entry.hasMeta)
		.map(
			(entry) => `const ${entry.routeName} = {
\tid: ${quote(entry.route.id)},
\troute: ${quote(entry.route.route)},
\tlabel: ${quote(entry.route.label)},
\tgroup: ${quote(entry.route.group)},
\tstatus: ${quote(entry.route.status)},
\tcreatedAt: ${quote(entry.route.createdAt)},
} as const;`,
		)
		.join("\n");

	const routeItems = entries.map((entry) => `\t${entry.routeName},`).join("\n");
	const specItems = entries
		.map((entry) => `\t${quote(entry.route.id)}: asScreenSpec(${entry.specName}),`)
		.join("\n");
	const renderableItems = entries
		.filter((entry) => entry.hasRenderableSpec && !entry.isSduiScreenSpec)
		.map((entry) => `\t${quote(entry.route.id)}: asRenderableScreenSpec(${entry.renderableName}),`)
		.join("\n");
	const sduiItems = entries
		.filter((entry) => entry.isSduiScreenSpec)
		.map((entry) => `\t${quote(entry.route.id)}: asSduiScreenSpec(${entry.renderableName}),`)
		.join("\n");
	const renderItems = entries
		.filter((entry) => entry.hasRenderSpec)
		.map((entry) => `\t${quote(entry.route.id)}: asRenderScreenSpec(${entry.renderName}),`)
		.join("\n");

	return `${imports.join("\n")}
${routeDeclarations ? `\n${routeDeclarations}\n` : ""}

export type ScreenGroup =
${groups.map((group) => `\t| ${quote(group)}`).join("\n")};

export type ScreenLifecycleStatus = ${statuses.map((status) => quote(status)).join(" | ")};

export type ScreenRoute = {
\tid: string;
\troute: \`/${"${string}"}\`;
\tlabel: string;
\tgroup: ScreenGroup;
\tstatus: ScreenLifecycleStatus;
\tcreatedAt: \`${"${number}"}-${"${number}"}-${"${number}"}\`;
};

export const screenRoutes = [
${routeItems}
] as const satisfies readonly ScreenRoute[];

export type ScreenId = (typeof screenRoutes)[number]["id"];
export type ScreenRoutePath = (typeof screenRoutes)[number]["route"];
export const screenCount = screenRoutes.length;

import type { RenderableScreenSpecV1, ScreenSpecV2 } from "./spec";
import type { RenderScreenSpec } from "./render-spec";
import type { SduiScreen } from "./sdui";
const asScreenSpec = (spec: unknown) => spec as ScreenSpecV2;
const asRenderableScreenSpec = (spec: unknown) => spec as RenderableScreenSpecV1;
const asRenderScreenSpec = (spec: unknown) => spec as RenderScreenSpec;
${sduiItems ? "const asSduiScreenSpec = (spec: unknown) => spec as SduiScreen;" : ""}

export const activeScreenSpecs = {
${specItems}
} as const satisfies Partial<Record<ScreenId, ScreenSpecV2>>;

export const activeRenderableScreenSpecs = {
${renderableItems}
} as const satisfies Partial<Record<ScreenId, RenderableScreenSpecV1>>;

export const activeSduiScreenSpecs = {
${sduiItems}
} as const satisfies Partial<Record<ScreenId, SduiScreen>>;

export const activeRenderScreenSpecs = {
${renderItems}
} as const satisfies Partial<Record<ScreenId, RenderScreenSpec>>;

export type ActiveScreenSpecId = keyof typeof activeScreenSpecs;
export type ActiveRenderableScreenSpecId = keyof typeof activeRenderableScreenSpecs;
export type ActiveRenderScreenSpecId = keyof typeof activeRenderScreenSpecs;

export type {
\tRenderComponentId,
\tRenderPropValue,
\tRenderScreenSpec,
\tRenderScreenSpecIssue,
\tRenderSpecNode,
} from "./render-spec";
export {
\tcollectRenderSpecNodes,
\tisRenderScreenSpec,
\tvalidateRenderScreenSpec,
} from "./render-spec";

export type ScreenRouteRegistry = readonly ScreenRoute[];
export type ScreenRoutePatch = Partial<Omit<ScreenRoute, "id">>;

function assertUniqueScreenRoute(registry: ScreenRouteRegistry, entry: ScreenRoute, ignoreId?: string) {
\tconst duplicateId = registry.find((screen) => screen.id === entry.id && screen.id !== ignoreId);
\tif (duplicateId) throw new Error(\`Screen route id already exists: ${"${entry.id}"}\`);
\tconst duplicateRoute = registry.find((screen) => screen.route === entry.route && screen.id !== ignoreId);
\tif (duplicateRoute) throw new Error(\`Screen route path already exists: ${"${entry.route}"}\`);
}

export function findScreenRouteById(registry: ScreenRouteRegistry, id: ScreenId | string) {
\treturn registry.find((screen) => screen.id === id);
}

export function findScreenRouteByRoute(registry: ScreenRouteRegistry, route: ScreenRoutePath | \`/${"${string}"}\`) {
\treturn registry.find((screen) => screen.route === route);
}

export function getScreenRouteById(id: ScreenId | string) {
\treturn findScreenRouteById(screenRoutes, id);
}

export function getScreenRouteByRoute(route: ScreenRoutePath | \`/${"${string}"}\`) {
\treturn findScreenRouteByRoute(screenRoutes, route);
}

export function createScreenRoute(registry: ScreenRouteRegistry, entry: ScreenRoute) {
\tassertUniqueScreenRoute(registry, entry);
\treturn [...registry, entry];
}

export function updateScreenRoute(registry: ScreenRouteRegistry, id: ScreenId | string, patch: ScreenRoutePatch) {
\tlet didUpdate = false;
\tconst next = registry.map((screen) => {
\t\tif (screen.id !== id) return screen;
\t\tdidUpdate = true;
\t\tconst updated = { ...screen, ...patch };
\t\tassertUniqueScreenRoute(registry, updated, screen.id);
\t\treturn updated;
\t});
\tif (!didUpdate) throw new Error(\`Screen route not found: ${"${id}"}\`);
\treturn next;
}

export function deleteScreenRoute(registry: ScreenRouteRegistry, id: ScreenId | string) {
\tconst next = registry.filter((screen) => screen.id !== id);
\tif (next.length === registry.length) throw new Error(\`Screen route not found: ${"${id}"}\`);
\treturn next;
}

export function upsertScreenRoute(registry: ScreenRouteRegistry, entry: ScreenRoute) {
\treturn findScreenRouteById(registry, entry.id) ? updateScreenRoute(registry, entry.id, entry) : createScreenRoute(registry, entry);
}

export {
\tgetRenderableScreenSpecIssues,
\tgetScreenSpecIssues,
} from "./spec";
export { getSduiScreenIssues, isSduiScreen } from "./sdui";

export type {
\tDesignException,
\tDesignSystemContract,
\tPolicyExtract,
\tRenderableScreenSpecV1,
\tScreenAreaContract,
\tScreenBenchmarkTrace,
\tScreenLayoutContract,
\tScreenSlotContract,
\tScreenSpecIssue,
\tScreenSpecIssueSeverity,
\tScreenSpecV2,
\tSDUIJsonValue,
\tSDUINode,
} from "./spec";

export type {
\tSduiComponentId,
\tSduiNode,
\tSduiPrimitiveValue,
\tSduiPropValue,
\tSduiScreen,
\tSduiScreenIssue,
\tSduiScreenIssueSeverity,
\tSduiScreenShell,
\tSduiScreenSlots,
} from "./sdui";
`;
}

const entries = getScreenEntries();
const nextIndex = renderIndex(entries);

if (isCheck) {
	const currentIndex = readFileSync(outputPath, "utf8");
	if (currentIndex !== nextIndex) {
		console.error("Screen index is out of date. Run `npm run generate:screens -w @screen/mobile`.");
		process.exit(1);
	}
	console.log(`Screen index is up to date (${entries.length} routes).`);
} else {
	writeFileSync(outputPath, nextIndex);
	console.log(`Generated ${path.relative(process.cwd(), outputPath)} (${entries.length} routes).`);
}
