import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const appRoot = path.join(repoRoot, "apps", "mobile", "src", "app");
const requiredFiles = [
	"index.ts",
	"page.tsx",
	"Screen.config.ts",
	"Screen.diagram.html",
	"Screen.tsx",
];
const pageFolderSignals = [...requiredFiles, "Screen.diagram.md"];
const ignoredDirectories = new Set([".next", "node_modules"]);

const violations = [];

await scanDirectory(appRoot);

for (const violation of violations) {
	console.log(
		violation.message ?? `${violation.dir}: missing ${violation.files.join(", ")}`,
	);
}

if (violations.length > 0) {
	process.exitCode = 1;
} else {
	console.log("mobile page folder contract check passed.");
}

async function scanDirectory(dir) {
	let entries;
	try {
		entries = await readdir(dir, { withFileTypes: true });
	} catch {
		return;
	}

	const entryNames = new Set(entries.map((entry) => entry.name));
	if (dir !== appRoot && isPageFolder(entryNames)) {
		const missingFiles = requiredFiles.filter((file) => !entryNames.has(file));
		if (missingFiles.length > 0) {
			violations.push({
				dir: path.relative(repoRoot, dir),
				files: missingFiles,
			});
		}
		if (entryNames.has("Screen.config.ts")) {
			await validateScreenGroup(dir);
		}
	}

	for (const entry of entries) {
		if (!entry.isDirectory() || ignoredDirectories.has(entry.name)) continue;
		await scanDirectory(path.join(dir, entry.name));
	}
}

function isPageFolder(entryNames) {
	return pageFolderSignals.some((file) => entryNames.has(file));
}

async function validateScreenGroup(screenDir) {
	const routeGroup = findRouteGroup(screenDir);
	const configSource = await readFile(path.join(screenDir, "Screen.config.ts"), "utf8");
	const configuredGroup = configSource.match(/group:\s*"([^"]+)"/)?.[1];
	if (configuredGroup && routeGroup && configuredGroup !== routeGroup) {
		violations.push({
			message: `${path.relative(repoRoot, screenDir)}: Screen.config.ts group "${configuredGroup}" should be "${routeGroup}"`,
		});
	}
}

function findRouteGroup(screenDir) {
	const relativeParts = path.relative(appRoot, screenDir).split(path.sep);
	const routeGroup = relativeParts.find(
		(part) => part.startsWith("(") && part.endsWith(")"),
	);
	return routeGroup?.slice(1, -1) ?? null;
}
