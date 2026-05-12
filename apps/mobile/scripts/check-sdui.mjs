import { readFile, readdir } from "node:fs/promises";

const APP_DIR = new URL("../src/app/", import.meta.url);
const SDUI_SCHEMA_REF = "../../../../../sdui.schema.json";
const SDUI_SCHEMA_VERSION = "sdui-v1";

const files = await findSduiFiles(APP_DIR);
const issues = [];

for (const file of files) {
	const json = JSON.parse(await readFile(file, "utf8"));
	if (json?.schemaVersion !== SDUI_SCHEMA_VERSION) continue;
	issues.push(...getSduiIssues(json).map((issue) => ({ ...issue, file })));
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
		`canonical SDUI check passed (${files.length} sdui files, ${warnings.length} warnings).`,
	);
}

async function findSduiFiles(dirUrl) {
	const result = [];
	for (const entry of await readdir(dirUrl, { withFileTypes: true })) {
		const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, dirUrl);
		if (entry.isDirectory()) {
			result.push(...await findSduiFiles(entryUrl));
		} else if (entry.name === "sdui.json") {
			result.push(entryUrl.pathname);
		}
	}
	return result.sort();
}

function getSduiIssues(spec) {
	const issues = [];
	const slots = isRecord(spec.slots) ? spec.slots : {};
	const content = Array.isArray(slots.content) ? slots.content : [];
	const bottom = Array.isArray(slots.bottom) ? slots.bottom : [];

	if (!isSduiSchemaRef(spec.$schema)) {
		issues.push({
			severity: "error",
			message: `$schema must reference ${SDUI_SCHEMA_REF}.`,
		});
	}
	if (spec.schemaVersion !== SDUI_SCHEMA_VERSION) {
		issues.push({
			severity: "error",
			message: `schemaVersion must be ${SDUI_SCHEMA_VERSION}.`,
		});
	}
	if (typeof spec.screen_id !== "string" || spec.screen_id.length === 0) {
		issues.push({ severity: "error", message: "screen_id is required." });
	}
	if (spec.shell !== "app-screen") {
		issues.push({ severity: "error", message: "shell must be app-screen." });
	}
	if (typeof slots.system_header !== "boolean") {
		issues.push({
			severity: "error",
			message: "slots.system_header must be an explicit boolean.",
		});
	}
	if (!Object.hasOwn(slots, "header")) {
		issues.push({
			severity: "error",
			message: "slots.header is required. Use false when absent.",
		});
	}
	if (!Array.isArray(slots.content)) {
		issues.push({
			severity: "error",
			message: "slots.content must be an explicit node array.",
		});
	}
	if (!Object.hasOwn(slots, "bottom")) {
		issues.push({
			severity: "error",
			message: "slots.bottom is required. Use false when absent.",
		});
	}
	if (Array.isArray(slots.bottom) && bottom.length === 0) {
		issues.push({
			severity: "error",
			message: "slots.bottom must be false or a non-empty node array.",
		});
	}
	if (slots.header === false && content.length === 0) {
		issues.push({
			severity: "warning",
			message: "screen should define header or content slot.",
		});
	}

	if (isRecord(slots.header)) visitNode(slots.header, "slots.header", issues);
	for (const [index, node] of content.entries()) {
		visitNode(node, `slots.content[${index}]`, issues);
	}
	for (const [index, node] of bottom.entries()) {
		visitNode(node, `slots.bottom[${index}]`, issues);
	}

	return issues;
}

function visitNode(node, path, issues) {
	if (!isRecord(node)) {
		issues.push({ severity: "error", message: `${path} must be an object node.` });
		return;
	}
	if (typeof node.component !== "string" || node.component.length === 0) {
		issues.push({ severity: "error", message: `${path}.component is required.` });
	}
	if (isRecord(node.props) && Object.hasOwn(node.props, "slot")) {
		issues.push({
			severity: "warning",
			message: `${path}.props.slot is not allowed; slot ownership belongs to slots.*.`,
		});
	}
	validateSection(node.section, path, issues);
	if (node.children !== undefined && !Array.isArray(node.children)) {
		issues.push({ severity: "error", message: `${path}.children must be an array.` });
		return;
	}
	for (const [index, child] of (node.children ?? []).entries()) {
		visitNode(child, `${path}.children[${index}]`, issues);
	}
}

function isRecord(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validateSection(section, path, issues) {
	if (section === undefined) return;
	if (!isRecord(section)) {
		issues.push({ severity: "error", message: `${path}.section must be an object.` });
		return;
	}
	for (const key of Object.keys(section)) {
		if (!["inset", "rail", "measure"].includes(key)) {
			issues.push({
				severity: "error",
				message: `${path}.section.${key} is not allowed.`,
			});
		}
	}
	if (section.inset !== undefined && !["inherit", "bleed"].includes(section.inset)) {
		issues.push({
			severity: "error",
			message: `${path}.section.inset must be inherit or bleed.`,
		});
	}
	if (
		section.rail !== undefined &&
		!["none", "inset", "measure", "full"].includes(section.rail)
	) {
		issues.push({
			severity: "error",
			message: `${path}.section.rail must be none, inset, measure, or full.`,
		});
	}
	if (
		section.measure !== undefined &&
		!["caption", "body", "title"].includes(section.measure)
	) {
		issues.push({
			severity: "error",
			message: `${path}.section.measure must be caption, body, or title.`,
		});
	}
	if (section.measure !== undefined && section.rail !== "measure") {
		issues.push({
			severity: "warning",
			message: `${path}.section.measure requires section.rail="measure".`,
		});
	}
	if (section.inset === "inherit" && section.rail === "full") {
		issues.push({
			severity: "warning",
			message: `${path}.section.rail="full" requires section.inset="bleed".`,
		});
	}
}

function isSduiSchemaRef(value) {
	return (
		value === SDUI_SCHEMA_REF ||
		value === "sdui-v1" ||
		(typeof value === "string" && value.endsWith("/sdui.schema.json"))
	);
}
