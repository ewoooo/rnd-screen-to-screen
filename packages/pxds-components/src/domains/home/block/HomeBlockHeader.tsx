import { VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";

type Gap = 4 | 8;

type Props = {
	label?: string;
	title?: string;
	sub?: string;
	/** label · title · sub 사이 세로 gap (CSS var --spacing-N). 기본 4. */
	gap?: Gap;
};

/**
 * HomeBlock 안 헤더 묶음 — section-label + heading-20 (+ optional list-sub).
 * 5화면 공통 패턴. 빈 슬롯은 렌더 생략.
 */
export function HomeBlockHeader({ label, title, sub, gap = 4 }: Props) {
	return (
		<VStack
			style={{
				gap: `var(--spacing-${gap})`,
			}}
		>
			{label !== undefined ? (
				<TextBlock
					variant="sectionLabel"
					text={label}
					color="semantic.label.neutral"
					maxLines={1}
					overflow="truncate"
				/>
			) : null}
			{title !== undefined ? (
				<TextBlock variant="contentTitle" text={title} maxLines={2} overflow="truncate" />
			) : null}
			{sub !== undefined ? (
				<TextBlock
					variant="supportText"
					text={sub}
					color="semantic.label.alternative"
					maxLines={2}
					overflow="truncate"
				/>
			) : null}
		</VStack>
	);
}
