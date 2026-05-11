import { PromoBlock } from "../../../molecules";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

type Props = {
	badge: string;
	text: string;
	action: string;
};

export function SearchPromoBlock({ badge, text, action }: Props) {
	return (
		<ContentSection>
			<PromoBlock
				badge={badge}
				text={text}
				action={action}
				mediaLabel="search"
			/>
		</ContentSection>
	);
}
