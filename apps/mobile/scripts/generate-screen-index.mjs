#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const appDir = path.resolve(import.meta.dirname, "..");
const routeDir = path.join(appDir, "src", "app");
const outputPath = path.join(appDir, "src", "registry", "screen-registry.ts");
const isCheck = process.argv.includes("--check");

const preferredGroupOrder = ["membership"];

function readScreenRoute(routeFolder) {
	const configPath = path.join(routeDir, routeFolder, "Screen.config.ts");
	if (!existsSync(configPath)) {
		throw new Error(`Missing screen config: ${path.relative(appDir, configPath)}`);
	}
	const configSource = readFileSync(configPath, "utf8");
	return {
		id: readConfigString(configSource, "id", configPath),
		route: readConfigString(configSource, "route", configPath),
		label:
			readOptionalConfigString(configSource, "label") ??
			readConfigString(configSource, "name", configPath),
		group: readConfigString(configSource, "group", configPath),
		status: readConfigString(configSource, "status", configPath),
		createdAt: readConfigString(configSource, "createdAt", configPath),
	};
}

function readConfigString(source, key, filePath) {
	const value = readOptionalConfigString(source, key);
	if (value === undefined) {
		throw new Error(`Missing ${key} in screen config: ${path.relative(appDir, filePath)}`);
	}
	return value;
}

function readOptionalConfigString(source, key) {
	const match = source.match(new RegExp(`\\b${key}:\\s*"([^"]+)"`));
	return match?.[1];
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
		.filter((folder) => existsSync(path.join(routeDir, folder, "Screen.config.ts")))
		.map((folder) => {
			const route = readScreenRoute(folder);
			const renderTsPath = path.join(routeDir, folder, "render-tree.ts");
			const renderJsonPath = path.join(routeDir, folder, "render.json");
			const hasRenderSpec = existsSync(renderTsPath) || existsSync(renderJsonPath);
			if (route.id !== folder) {
				throw new Error(`Screen route id must match folder name: ${folder} received ${route.id}`);
			}
			if (route.route !== `/${folder}`) {
				throw new Error(`Screen route path must match folder name: ${folder} received ${route.route}`);
			}
			return {
				folder,
				route,
				routeName: toIdentifier(route.id, "Route"),
				renderName: toIdentifier(route.id, "RenderTree"),
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
	const imports = [
		...entries.map(
			(entry) =>
				`import { screenConfig as ${entry.routeName} } from "../app/${entry.folder}/Screen.config";`,
		),
		...entries.flatMap((entry) => {
		const lines = [];
		if (entry.hasRenderSpec) {
			if (entry.renderImportKind === "named") {
				lines.push(`import { RENDER_TREE as ${entry.renderName} } from "../app/${entry.folder}/render-tree";`);
			} else {
				lines.push(`import ${entry.renderName} from "../app/${entry.folder}/render.json";`);
			}
		}
		return lines;
		}),
	];
	const routeItems = entries.map((entry) => `\t${entry.routeName},`).join("\n");
	const renderItems = entries
		.filter((entry) => entry.hasRenderSpec)
		.map((entry) => `\t${quote(entry.route.id)}: ${entry.renderName} as RenderScreenSpec,`)
		.join("\n");

	return `${imports.join("\n")}

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
const referenceScreenIdPrefix = "NOVA-MBR-PG-" as const;

export function isReferenceScreenId(id: ScreenId | string) {
\treturn id.startsWith(referenceScreenIdPrefix);
}

export function isLegacyScreenId(id: ScreenId | string) {
\treturn !isReferenceScreenId(id);
}

export const referenceScreenRoutes = screenRoutes.filter((screen) =>
\tisReferenceScreenId(screen.id),
);
export const legacyScreenRoutes = screenRoutes.filter((screen) => isLegacyScreenId(screen.id));
export const referenceScreenCount = referenceScreenRoutes.length;
export const legacyScreenCount = legacyScreenRoutes.length;

import type { RenderScreenSpec } from "../scripts/render-spec";
import {
\tcreateScreenRoute,
\tdeleteScreenRoute,
\tfindScreenRouteById,
\tfindScreenRouteByRoute,
\tupdateScreenRoute,
\tupsertScreenRoute,
\ttype ScreenRoutePatch as GenericScreenRoutePatch,
\ttype ScreenRouteRegistry as GenericScreenRouteRegistry,
} from "../scripts/registry";

export type SDUIJsonValue =
\t| string
\t| number
\t| boolean
\t| null
\t| readonly SDUIJsonValue[]
\t| { readonly [key: string]: SDUIJsonValue };
export type SduiPrimitiveValue = string | number | boolean | null;
export type SduiPropValue = SDUIJsonValue;
export type SduiComponentId = string;
export type SDUINode = { readonly [key: string]: SDUIJsonValue };
export type SduiNode = SDUINode;
export type ScreenSpecIssueSeverity = "error" | "warning";
export type SduiScreenIssueSeverity = ScreenSpecIssueSeverity;
export type ScreenSpecIssue = {
\treadonly severity: ScreenSpecIssueSeverity;
\treadonly message: string;
};
export type SduiScreenIssue = ScreenSpecIssue;
export type DesignException = { readonly [key: string]: SDUIJsonValue };
export type DesignSystemContract = { readonly [key: string]: SDUIJsonValue };
export type PolicyExtract = { readonly [key: string]: SDUIJsonValue };
export type ScreenAreaContract = { readonly [key: string]: SDUIJsonValue };
export type ScreenBenchmarkTrace = { readonly [key: string]: SDUIJsonValue };
export type ScreenLayoutContract = { readonly [key: string]: SDUIJsonValue };
export type ScreenSlotContract = { readonly [key: string]: SDUIJsonValue };
export type ScreenSpecV2 = {
\treadonly meta: { readonly [key: string]: SDUIJsonValue };
\treadonly screen: { readonly domain: string; readonly [key: string]: SDUIJsonValue };
\treadonly screen_contract: ScreenAreaContract;
\treadonly design_system?: DesignSystemContract;
\treadonly render_tree?: readonly SDUINode[];
\treadonly [key: string]: SDUIJsonValue | undefined;
};
export type RenderableScreenSpecV1 = {
\treadonly meta?: { readonly [key: string]: SDUIJsonValue };
\treadonly screen_id?: string;
\treadonly data?: { readonly [key: string]: SDUIJsonValue };
\treadonly x_screenContract?: ScreenAreaContract;
\treadonly [key: string]: SDUIJsonValue | undefined;
};
export type SduiScreenShell = "app-screen";
export type SduiScreenSlots = { readonly [key: string]: SDUIJsonValue };
export type SduiScreen = {
\treadonly schemaVersion: "sdui-v1";
\treadonly screen_id: string;
\treadonly shell: SduiScreenShell;
\treadonly slots: SduiScreenSlots;
};

export const activeScreenSpecs = {
} as const satisfies Partial<Record<ScreenId, ScreenSpecV2>>;

export const activeRenderableScreenSpecs = {
} as const satisfies Partial<Record<ScreenId, RenderableScreenSpecV1>>;

export const activeSduiScreenSpecs = {
} as const satisfies Partial<Record<ScreenId, SduiScreen>>;

export const activeRenderScreenSpecs = {
${renderItems}
} as const satisfies Partial<Record<ScreenId, RenderScreenSpec>>;

export const screenRenderRegistry = [
] as const;

export type ActiveScreenSpecId = keyof typeof activeScreenSpecs;
export type ActiveRenderableScreenSpecId = keyof typeof activeRenderableScreenSpecs;
export type ActiveRenderScreenSpecId = keyof typeof activeRenderScreenSpecs;

export type {
\tRenderComponentId,
\tRenderPropValue,
\tRenderScreenSpec,
\tRenderScreenSpecIssue,
\tRenderSpecNode,
} from "../scripts/render-spec";
export {
\tcollectRenderSpecNodes,
\tisRenderScreenSpec,
\tvalidateRenderScreenSpec,
} from "../scripts/render-spec";

export type ScreenRouteRegistry = GenericScreenRouteRegistry<ScreenRoute>;
export type ScreenRoutePatch = GenericScreenRoutePatch<ScreenRoute>;

export {
\tcreateScreenRoute,
\tdeleteScreenRoute,
\tfindScreenRouteById,
\tfindScreenRouteByRoute,
\tupdateScreenRoute,
\tupsertScreenRoute,
};

export function getScreenRouteById(id: ScreenId | string) {
\treturn findScreenRouteById(screenRoutes, id);
}

export function getScreenRouteByRoute(route: ScreenRoutePath | \`/${"${string}"}\`) {
\treturn findScreenRouteByRoute(screenRoutes, route);
}

export function getScreenSpecIssues(_spec: ScreenSpecV2): ScreenSpecIssue[] {
\treturn [];
}

export function getRenderableScreenSpecIssues(
\t_spec: RenderableScreenSpecV1,
): ScreenSpecIssue[] {
\treturn [];
}

export function getSduiScreenIssues(_spec: SduiScreen): SduiScreenIssue[] {
\treturn [];
}

export function isSduiScreen(_value: unknown): _value is SduiScreen {
\treturn false;
}
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
