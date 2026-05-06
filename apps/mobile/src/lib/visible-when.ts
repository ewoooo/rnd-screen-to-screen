// 1차 read-only 정책 — spec value 기준으로 1회 평가. 사용자 토글은 후속 차수.
// 지원 구문:
//   "field = value"           — equality (boolean/string)
//   "field IN (a, b, c)"      — membership

export function evalVisibleWhen(
	expr: string | undefined,
	values: Record<string, unknown>,
): boolean {
	if (!expr) return true;

	const eqMatch = expr.match(/^(\w+)\s*=\s*(.+)$/);
	if (eqMatch) {
		const [, field, rawValue] = eqMatch;
		const expected = parseLiteral(rawValue.trim());
		return values[field] === expected;
	}

	const inMatch = expr.match(/^(\w+)\s+IN\s*\(([^)]+)\)$/i);
	if (inMatch) {
		const [, field, listRaw] = inMatch;
		const list = listRaw.split(",").map((s) => s.trim());
		return list.includes(String(values[field]));
	}

	return true;
}

function parseLiteral(raw: string): unknown {
	if (raw === "true") return true;
	if (raw === "false") return false;
	if (raw === "null") return null;
	if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
	return raw.replace(/^["']|["']$/g, "");
}
