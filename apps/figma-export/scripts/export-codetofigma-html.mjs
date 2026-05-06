import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceUrl = process.env.CODETOFIGMA_SOURCE_URL ?? "http://127.0.0.1:3002/";
const outFile =
	process.env.CODETOFIGMA_OUT_FILE ??
	path.resolve(process.cwd(), "apps/figma-export/codetofigma-nc-full-simple.html");

async function fetchText(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
	}
	return response.text();
}

function escapeStyleClose(css) {
	return css.replaceAll("</style", "<\\/style");
}

function removeScripts(html) {
	return html
		.replace(/<script\b[\s\S]*?<\/script>/gi, "")
		.replace(/<script\b[^>]*\/>/gi, "");
}

function removePreloadLinks(html) {
	return html.replace(/<link\b(?=[^>]*\brel=["']preload["'])[^>]*>/gi, "");
}

async function inlineStylesheets(html) {
	const stylesheetLinkPattern =
		/<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi;
	const replacements = [];
	let match;

	while ((match = stylesheetLinkPattern.exec(html)) !== null) {
		const [tag, href] = match;
		const cssUrl = new URL(href, sourceUrl).toString();
		const css = await fetchText(cssUrl);
		replacements.push({
			tag,
			style: `<style data-inline-source="${cssUrl}">\n${escapeStyleClose(css)}\n</style>`,
		});
	}

	let nextHtml = html;
	for (const replacement of replacements) {
		nextHtml = nextHtml.replace(replacement.tag, replacement.style);
	}
	return nextHtml;
}

function addCodetofigmaMeta(html) {
	const meta = [
		'<meta name="codetofigma-export" content="NC Full / NC Simple batch export">',
		'<meta name="codetofigma-source" content="' + sourceUrl + '">',
		`<style data-codetofigma-font-override>
*:not(svg):not(path) {
	font-family: Pretendard, "Pretendard JP", -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif !important;
}
</style>`,
	].join("");

	return html.replace("</head>", `${meta}</head>`);
}

function normalizeHtml(html) {
	return [
		"<!DOCTYPE html>",
		html
			.replace(/^<!DOCTYPE html>/i, "")
			.replace(/\sdata-nextjs[^=]*="[^"]*"/gi, "")
			.replace(/\snonce="[^"]*"/gi, "")
			.trim(),
	].join("");
}

let html = await fetchText(sourceUrl);
html = await inlineStylesheets(html);
html = removePreloadLinks(html);
html = removeScripts(html);
html = addCodetofigmaMeta(html);
html = normalizeHtml(html);

await mkdir(path.dirname(outFile), { recursive: true });
await writeFile(outFile, html, "utf8");

console.log(`Wrote ${outFile}`);
