import { PromoBlock } from "@/components/molecules";
import { ContentSection } from "@/components/templates/app-screen";

type Props = {
	text: string;
	badge: string;
	action: string;
};

export function ProductPromoBanner({ text, badge, action }: Props) {
	return (
		<ContentSection>
			<PromoBlock
				text={text}
				badge={badge}
				action={action}
				mediaLabel="coupon"
			/>
		</ContentSection>
	);
}
