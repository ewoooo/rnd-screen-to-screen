import { PromoBlock } from "@/components/patterns";

type Props = {
	text: string;
	badge: string;
	action: string;
};

export function ProductPromoBanner({ text, badge, action }: Props) {
	return (
		<PromoBlock
			text={text}
			badge={badge}
			action={action}
			mediaLabel="coupon"
		/>
	);
}
