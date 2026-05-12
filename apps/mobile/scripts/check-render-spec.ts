import { componentRegistry } from "@pxds/pxds-components/registry";
import {
	activeRenderScreenSpecs,
	validateRenderScreenSpec,
	type RenderScreenSpec,
	type RenderScreenSpecIssue,
} from "../src/screens";

type FileIssue = RenderScreenSpecIssue & {
	file: string;
};

const entries = Object.entries(activeRenderScreenSpecs as Record<string, RenderScreenSpec>);
const issues: FileIssue[] = [];

for (const [screenId, spec] of entries) {
	issues.push(
		...validateRenderScreenSpec(spec, componentRegistry).map((issue) => ({
			...issue,
			file: `src/app/${screenId}/render.ts`,
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
