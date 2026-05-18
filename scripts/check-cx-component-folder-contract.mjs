import { readdir } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const componentsRoot = path.join(
	repoRoot,
	"packages",
	"cx-components",
	"src",
	"components",
);
const specialComponentContracts = new Map([
	["icon", ["index.ts", "icon.readme.md"]],
]);

const violations = [];

let componentDirectories = [];
try {
	componentDirectories = await readdir(componentsRoot, { withFileTypes: true });
} catch {
	componentDirectories = [];
}

for (const entry of componentDirectories) {
	if (!entry.isDirectory()) continue;
	const componentDir = path.join(componentsRoot, entry.name);
	const files = new Set(await readdir(componentDir));
	const requiredFiles =
		specialComponentContracts.get(entry.name) ?? requiredFilesFor(entry.name);
	const missingFiles = requiredFiles.filter((file) => !files.has(file));
	if (missingFiles.length > 0) {
		violations.push({
			dir: path.relative(repoRoot, componentDir),
			files: missingFiles,
		});
	}
}

for (const violation of violations) {
	console.log(`${violation.dir}: missing ${violation.files.join(", ")}`);
}

if (violations.length > 0) {
	process.exitCode = 1;
} else {
	console.log("cx component folder contract check passed.");
}

function requiredFilesFor(componentDirectoryName) {
	const componentName = kebabToPascal(componentDirectoryName);
	return [
		"index.ts",
		`${componentName}.tsx`,
		`${componentName}.types.ts`,
		`${componentDirectoryName}.variants.ts`,
		`${componentDirectoryName}.readme.md`,
	];
}

function kebabToPascal(value) {
	return value
		.split("-")
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");
}

