/**
 * Layout primitive 전용 spacing 어휘.
 *
 * WDS atomic `--spacing-N`을 의미축으로 묶은 7 슬롯. 화면에서 px·키 직접 입력을
 * 막아 spacing 일관성 strain test 신호를 선명하게 한다.
 *
 * 이름은 "왜 이 값을 골랐는가"의 의도. 화면이 새 슬롯을 강요하면 strain 깨짐.
 */
export type SpacingToken =
	| "row" //     4px — 텍스트 행 / 라벨-값 사이
	| "inline" //  8px — 인라인 요소 (icon+text, chip 사이)
	| "stack" //  12px — 블록 내 요소 세로 stack 기본
	| "group" //  16px — 관련 묶음 사이
	| "inset" //  20px — 카드 안쪽 padding 표준
	| "block" //  24px — 블록과 블록 사이
	| "section"; // 32px — 큰 섹션 분할

const SPACING_PX: Record<SpacingToken, number> = {
	row: 4,
	inline: 8,
	stack: 12,
	group: 16,
	inset: 20,
	block: 24,
	section: 32,
};

export const spacingVar = (t: SpacingToken): string =>
	`var(--spacing-${SPACING_PX[t]})`;
