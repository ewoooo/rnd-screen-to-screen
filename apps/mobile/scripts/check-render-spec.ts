import { componentRegistry } from "@pxds/pxds-components/registry";
import {
	activeRenderScreenSpecs,
	screenRenderRegistry,
	validateRenderScreenSpec,
	type RenderScreenSpec,
	type RenderScreenSpecIssue,
} from "../src/registry/screen-registry";

type FileIssue = RenderScreenSpecIssue & {
	file: string;
};

const entries = Object.entries(activeRenderScreenSpecs as Record<string, RenderScreenSpec>);
const renderRegistry = [...componentRegistry, ...screenRenderRegistry];
const issues: FileIssue[] = [];

for (const [screenId, spec] of entries) {
	issues.push(
		...validateRenderScreenSpec(spec, renderRegistry).map((issue) => ({
			...issue,
			file: `src/app/${screenId}/render-tree.ts`,
		})),
	);
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
		`render spec check passed (${entries.length} render specs, ${warnings.length} warnings).`,
	);
}
