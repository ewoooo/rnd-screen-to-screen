import type { TextBlockProps } from "./text-block";

export const textBlockPreviewMocks = [
	{
		variant: "sectionLabel",
		text: "PXDS TYPOGRAPHY",
	},
	{
		variant: "headline",
		text: "멤버십 혜택을 한눈에 확인하세요",
	},
	{
		variant: "bodySubtle",
		text: "모바일 화면에서 사용하는 줄바꿈과 강조 규칙을 함께 확인합니다.",
		color: "semantic.label.alternative",
	},
] as const satisfies readonly TextBlockProps[];
