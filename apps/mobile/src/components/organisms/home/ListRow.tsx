import type { ReactNode } from "react";

import { HStack, VStack } from "@/components/atoms/layout";
import { Placeholder } from "@/components/atoms/feedback";
import { TextBlock } from "@/components/atoms/typography";

import { PillChip } from "./Badges";

type Props = {
	thumb: { w: number; h: number; label: string };
	title: string;
	sub: string;
	pill?: string;
	trailing?: ReactNode;
};

/**
 * 썸네일 + 타이틀/서브 + 우측 pill(또는 커스텀 trailing) 행.
 * 혜택(영화·쿠폰), 비로그인(구독상품) 등에서 재사용.
 */
export function ListRow({ thumb, title, sub, pill, trailing }: Props) {
	return (
		<HStack
			align="center"
			width="100%"
			gap="stack"
		>
			<HStack
				align="center"
				grow={1}
				minWidth={0}
				gap="stack"
			>
				<Placeholder w={thumb.w} h={thumb.h} label={thumb.label} />
				<VStack grow={1} minWidth={0} gap="row">
					<TextBlock
						variant="listTitle"
						text={title}
						maxLines={1}
						overflow="truncate"
					/>
					<TextBlock
						variant="supportText"
						text={sub}
						color="semantic.label.alternative"
						maxLines={1}
						overflow="truncate"
					/>
				</VStack>
			</HStack>
			{trailing ?? (pill ? <PillChip>{pill}</PillChip> : null)}
		</HStack>
	);
}
