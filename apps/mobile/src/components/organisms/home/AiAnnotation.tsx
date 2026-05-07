import type { ReactNode } from "react";

import { HStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/typography";

type Props = {
	icon: ReactNode;
	text: string;
	/** 본문 줄바꿈(\n) 보존 — 다중행 ai 메시지일 때 true */
	multiline?: boolean;
};

/**
 * `<icon> <ai-text>` composite — Card L3 / HomeBlock Hero / Info body 등에서 반복되던
 * "AI 첨자 + 본문 텍스트" 패턴을 흡수한다.
 *
 * 내부 gap은 spacing-2(어휘 밖). icon-text "거의 붙어 있음" 의도. 화면 코드에 노출되지 않도록
 * 컴포넌트가 보유한다.
 */
export function AiAnnotation({ icon, text, multiline }: Props) {
	return (
		<HStack
			align={multiline ? "flex-start" : "center"}
			gap="row"
		>
			{icon}
			{multiline ? (
				<TextBlock
					variant="assistive"
					color="semantic.primary.normal"
					lines={text.split("\n")}
				/>
			) : (
				<TextBlock
					variant="assistive"
					color="semantic.primary.normal"
					text={text}
				/>
			)}
		</HStack>
	);
}
