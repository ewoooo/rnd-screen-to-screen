import { readFile, readdir } from "node:fs/promises";

const APP_DIR = new URL("../src/app/", import.meta.url);
const COMPONENTS_DIR = new URL("../../../packages/pxds-components/src/", import.meta.url);
const RENDER_SPEC_VERSION = "render-spec-v1";

const registryEntries = await collectRegistryEntries(COMPONENTS_DIR);
const files = await findRenderSpecFiles(APP_DIR);
const issues = [];

for (const file of files) {
	const spec = JSON.parse(await readFile(file, "utf8"));
	if (spec?.schemaVersion !== RENDER_SPEC_VERSION) continue;
	issues.push(...getRenderSpecIssues(spec, registryEntries).map((issue) => ({ ...issue, file })));
}

const errors = issues.filter((issue) => issue.severity === "error");
const warnings = issues.filter((issue) => issue.severity === "warning");

for (const issue of issues) {
	const prefix = issue.severity === "error" ? "error" : "warning";
	console.log(`${issue.file}\n  ${prefix}: ${issue.message}`);
}

if (errors.length > 0) {
	process.exitCode = 1;
} else {
	console.log(
		`render spec check passed (${files.length} render specs, ${warnings.length} warnings).`,
	);
}

async function findRenderSpecFiles(dirUrl) {
	const result = [];
	for (const entry of await readdir(dirUrl, { withFileTypes: true })) {
		const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, dirUrl);
		if (entry.isDirectory()) {
			result.push(...await findRenderSpecFiles(entryUrl));
		} else if (entry.name === "render.json") {
			result.push(entryUrl.pathname);
		}
	}
	return result.sort();
}

async function collectRegistryEntries(dirUrl) {
	const files = await findRegistryFiles(dirUrl);
	const entries = new Map();
	for (const file of files) {
		const source = await readFile(file, "utf8");
		const objectMatches = source.matchAll(/\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?\}/g);
		for (const match of objectMatches) {
			const id = normalizeComponentId(match[1]);
			const body = match[0];
			entries.set(id, {
				id,
				hasFigmaSpec: body.includes("figmaSpec"),
			});
		}
	}
	return entries;
}

async function findRegistryFiles(dirUrl) {
	const result = [];
	for (const entry of await readdir(dirUrl, { withFileTypes: true })) {
		const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, dirUrl);
		if (entry.isDirectory()) {
			result.push(...await findRegistryFiles(entryUrl));
		} else if (entry.name.endsWith(".registry.ts") || entry.name === "registry.ts") {
			result.push(entryUrl.pathname);
		}
	}
	return result;
}

function getRenderSpecIssues(spec, registryEntries) {
	const issues = [];
	const nodes = collectNodes(spec);

	if (spec.schemaVersion !== RENDER_SPEC_VERSION) {
		issues.push({
			severity: "error",
			message: `schemaVersion must be ${RENDER_SPEC_VERSION}.`,
		});
	}
	if (!isRecord(spec.screen)) {
		issues.push({ severity: "error", message: "screen is required." });
	}
	if (!isRecord(spec.slots)) {
		issues.push({ severity: "error", message: "slots is required." });
		return issues;
	}

	for (const node of nodes) {
		const componentId = normalizeComponentId(node.component);
		const registryEntry = registryEntries.get(componentId);
		if (!registryEntry) {
			issues.push({
				severity: "error",
				message: `component is not registered: ${node.component}.`,
			});
			continue;
		}
		if (!registryEntry.hasFigmaSpec) {
			issues.push({
				severity: "error",
				message: `component has no figmaSpec: ${componentId}.`,
			});
		}
	}

	if (spec.screen?.id === "NOVA-MBR-PG-005-0") {
		const hasDecomposedCompletionCopy = (spec.slots.content ?? []).some(
			(node) =>
				normalizeComponentId(node.component) === "text-block" &&
				typeof node.props?.text === "string" &&
				(node.props.text.includes("가입이 완료") ||
					node.props.text.includes("가입 후 이용 안내")),
		);
		if (hasDecomposedCompletionCopy) {
			issues.push({
				severity: "error",
				message:
					"NOVA-MBR-PG-005-0 completion copy must stay inside ogn-mbr-section-message-join-complete-view.",
			});
		}
		const bottom = Array.isArray(spec.slots.bottom) ? spec.slots.bottom : [];
		const homeCta = bottom.find(
			(node) => normalizeComponentId(node.component) === "primary-cta-bar",
		);
		if (homeCta?.props?.primaryLabel !== "홈으로 이동") {
			issues.push({
				severity: "error",
				message: "NOVA-MBR-PG-005-0 bottom primary-cta-bar must keep primaryLabel='홈으로 이동'.",
			});
		}
	}

	return issues;
}

function collectNodes(spec) {
	const nodes = [];
	const visit = (node) => {
		if (!isRecord(node)) return;
		nodes.push(node);
		for (const child of node.children ?? []) visit(child);
	};
	if (isRecord(spec.slots?.header)) visit(spec.slots.header);
	for (const child of spec.slots?.content ?? []) visit(child);
	if (Array.isArray(spec.slots?.bottom)) {
		for (const child of spec.slots.bottom) visit(child);
	}
	return nodes;
}

function normalizeComponentId(componentId) {
	return String(componentId ?? "").replace(/_/g, "-").toLowerCase();
}

function isRecord(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
