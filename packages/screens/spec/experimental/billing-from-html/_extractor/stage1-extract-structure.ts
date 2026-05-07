/**
 * Stage 1: HTML → intermediate.json
 *
 * billing 정책서 HTML을 구조 단위로 추출:
 *   - heading tree (h1~h6 nested by level)
 *   - 모든 table을 {headers, rows[]} 형태로 정규화
 *   - UC index: US-BIL-* ID → process steps 표 (PR-* IDs)
 *   - 기능 index: section 5에서 기능명/ID → 본문
 *   - 정책 index: section 6에서 정책명/ID → 본문
 *
 * 입력:  docs/정책서-Full-청구관리및요금수납_정책서.html
 * 출력:  ./intermediate.json
 */
import { parse, HTMLElement } from "node-html-parser";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../../../../../..");

type Heading = {
	level: number;
	text: string;
	id: string;
	pos: number;
};

type Table = {
	caption?: string;
	headers: string[];
	rows: Record<string, string>[];
	rowsRaw: string[][];
	prevHeading?: { level: number; text: string };
};

type ProcessStep = {
	processId: string;
	name: string;
	description: string;
	relatedFunctions: string[];
	relatedPolicies: string[];
};

type UseCase = {
	ucId: string;
	title: string;
	rawHeading: string;
	steps: ProcessStep[];
	rawTablesCount: number;
};

type Intermediate = {
	source: { docs: string; sha: string; chars: number };
	headings: Heading[];
	tables: Table[];
	useCases: UseCase[];
	functions: { id: string; name: string; section: string }[];
	policies: { id: string; name: string; section: string }[];
};

const DOC_PATH = resolve(REPO_ROOT, "docs/정책서-Full-청구관리및요금수납_정책서.html");
const OUT_PATH = resolve(__dirname, "intermediate.json");

const cleanText = (s: string): string =>
	s
		.replace(/ /g, " ")
		.replace(/\s+/g, " ")
		.trim();

const splitCellList = (s: string): string[] =>
	s
		.split(/\n/g)
		.map((line) => line.trim())
		.filter(Boolean);

function extractHeadings(root: HTMLElement, html: string): Heading[] {
	const headings: Heading[] = [];
	for (const el of root.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
		const level = Number(el.tagName.substring(1));
		const text = cleanText(el.text);
		if (!text) continue;
		// pos: index in source HTML for ordering (best effort)
		const tag = `<${el.tagName.toLowerCase()}`;
		const id = el.getAttribute("id") ?? "";
		headings.push({ level, text, id, pos: html.indexOf(tag, headings.length) });
	}
	return headings;
}

function cellText(cell: HTMLElement): string {
	// Preserve <br> as a list delimiter before HTML→text collapse.
	const html = cell.innerHTML.replace(/<br\s*\/?>/gi, "\n");
	const stripped = html.replace(/<[^>]+>/g, "");
	return stripped
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.split(/\n/)
		.map((s) => s.replace(/[\t ]+/g, " ").trim())
		.filter(Boolean)
		.join("\n");
}

function extractTable(table: HTMLElement): Table | null {
	// Collect cell text by row, treating th and td uniformly
	const trs = table.querySelectorAll("tr");
	if (trs.length === 0) return null;

	const grid: string[][] = trs.map((tr) =>
		tr.querySelectorAll("th, td").map((c) => cellText(c))
	);
	if (grid.length === 0) return null;

	const headers = grid[0]!;
	const dataRows = grid.slice(1).filter((r) => r.some((c) => c.length > 0));
	const rows = dataRows.map((r) => {
		const obj: Record<string, string> = {};
		headers.forEach((h, i) => {
			obj[h || `col${i}`] = r[i] ?? "";
		});
		return obj;
	});
	return { headers, rows, rowsRaw: dataRows };
}

function findUseCases(html: string, allTables: Table[]): UseCase[] {
	// Match h4 with US-BIL-XXX-### pattern
	const ucPattern = /<h4[^>]*>([^<]*US-BIL-[A-Z]+-\d+[^<]*)<\/h4>/g;
	const ucs: { id: string; title: string; rawHeading: string; start: number; end: number }[] = [];
	const matches = [...html.matchAll(ucPattern)];

	matches.forEach((m, i) => {
		const raw = cleanText(m[1] ?? "");
		const idMatch = raw.match(/US-BIL-[A-Z]+-\d+/);
		if (!idMatch) return;
		const start = m.index!;
		const end = i + 1 < matches.length ? matches[i + 1]!.index! : html.length;
		const titleMatch = raw.match(/^\d+\)\s*(.+?)\s*\(US-BIL-/);
		ucs.push({
			id: idMatch[0],
			title: titleMatch ? titleMatch[1]! : raw,
			rawHeading: raw,
			start,
			end,
		});
	});

	return ucs.map((uc) => {
		// Find tables whose source position falls within this UC slice
		const ucHtml = html.substring(uc.start, uc.end);
		// Re-parse the slice to extract its tables and reuse same logic
		const subRoot = parse(ucHtml);
		const subTables = subRoot
			.querySelectorAll("table")
			.map((t) => extractTable(t))
			.filter((t): t is Table => t !== null);

		// First process detail table: headers include 프로세스 ID
		const procTable = subTables.find((t) =>
			t.headers.some((h) => h.replace(/\s+/g, "").includes("프로세스ID"))
		);

		const steps: ProcessStep[] = [];
		if (procTable) {
			for (const row of procTable.rows) {
				const idKey = procTable.headers.find((h) => h.replace(/\s+/g, "").includes("프로세스ID"))!;
				const nameKey = procTable.headers.find((h) => h.includes("프로세스명")) ?? procTable.headers[1]!;
				const descKey = procTable.headers.find((h) => h.includes("설명")) ?? procTable.headers[2]!;
				const fnKey = procTable.headers.find((h) => h.includes("관련 기능") || h.includes("관련기능"));
				const polKey = procTable.headers.find((h) => h.includes("관련 정책") || h.includes("관련정책"));
				const processId = cleanText(row[idKey] ?? "");
				if (!processId) continue;
				steps.push({
					processId,
					name: cleanText(row[nameKey] ?? ""),
					description: cleanText(row[descKey] ?? ""),
					relatedFunctions: fnKey ? splitCellList(row[fnKey] ?? "") : [],
					relatedPolicies: polKey ? splitCellList(row[polKey] ?? "") : [],
				});
			}
		}

		return {
			ucId: uc.id,
			title: uc.title,
			rawHeading: uc.rawHeading,
			steps,
			rawTablesCount: subTables.length,
		};
	});
}

function findFunctionsOrPolicies(
	html: string,
	sectionHeading: string,
	prefix: "기능" | "정책"
): { id: string; name: string; section: string }[] {
	// Section 5 / 6: each function/policy is an h4 with name. ID may be inside body.
	const sectionStart = html.search(new RegExp(`<h2[^>]*>${sectionHeading}`));
	if (sectionStart === -1) return [];
	const nextH2 = html.indexOf("<h2", sectionStart + 4);
	const section = html.substring(sectionStart, nextH2 === -1 ? html.length : nextH2);
	const root = parse(section);
	const result: { id: string; name: string; section: string }[] = [];
	for (const h4 of root.querySelectorAll("h4")) {
		const name = cleanText(h4.text);
		if (!name) continue;
		// Functions/policies headings often look like "1) <name> (FN-BIL-...) " or just name
		const idMatch = name.match(/(?:FN|FUNC|FUN|PO|POL)-BIL-[A-Z0-9-]+/i);
		const cleanName = name.replace(/\(.*?\)/g, "").replace(/^\d+\)\s*/, "").trim();
		result.push({ id: idMatch ? idMatch[0].toUpperCase() : "", name: cleanName, section: name });
	}
	return result;
}

async function main() {
	const html = readFileSync(DOC_PATH, "utf8");
	const root = parse(html);

	const headings = extractHeadings(root, html);
	const tables = root
		.querySelectorAll("table")
		.map((t) => extractTable(t))
		.filter((t): t is Table => t !== null);

	const useCases = findUseCases(html, tables);
	const functions = findFunctionsOrPolicies(html, "5\\. 기능 정의", "기능");
	const policies = findFunctionsOrPolicies(html, "6\\. 정책 정의", "정책");

	const out: Intermediate = {
		source: {
			docs: DOC_PATH,
			sha: "",
			chars: html.length,
		},
		headings,
		tables,
		useCases,
		functions,
		policies,
	};

	writeFileSync(OUT_PATH, JSON.stringify(out, null, "\t"));

	console.log("=== Stage 1 결과 ===");
	console.log(`source chars      : ${html.length}`);
	console.log(`headings          : ${headings.length}`);
	console.log(`tables            : ${tables.length}`);
	console.log(`useCases          : ${useCases.length}`);
	console.log(`functions index   : ${functions.length}`);
	console.log(`policies index    : ${policies.length}`);
	console.log(`\nUC steps summary:`);
	for (const uc of useCases) {
		console.log(`  ${uc.ucId.padEnd(18)} ${String(uc.steps.length).padStart(2)} steps  — ${uc.title}`);
	}
	console.log(`\nwrote ${OUT_PATH}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
