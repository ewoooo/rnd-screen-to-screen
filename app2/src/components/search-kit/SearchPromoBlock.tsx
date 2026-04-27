import { PromoBlock } from "@/components/patterns";

type Props = {
	badge: string;
	text: string;
	action: string;
};

export function SearchPromoBlock({ badge, text, action }: Props) {
	return (
		<PromoBlock
			badge={badge}
			text={text}
			action={action}
			mediaLabel="search"
		/>
	);
}
