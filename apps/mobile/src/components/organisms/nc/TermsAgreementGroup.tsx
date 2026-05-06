import {
	ConsentList,
	SectionCard,
	type ConsentListItem,
	type ConsentListState,
} from "@/components/molecules";
import { ContentSection } from "@/components/templates/app-screen";

export type TermsAgreementItem = ConsentListItem;
export type TermsAgreementState = ConsentListState;

type Props = {
	label?: string;
	title: string;
	allLabel: string;
	allCaption: string;
	items: readonly TermsAgreementItem[];
	onStateChange?: (state: TermsAgreementState) => void;
};

export function TermsAgreementGroup({
	label,
	title,
	allLabel,
	allCaption,
	items,
	onStateChange,
}: Props) {
	return (
		<ContentSection>
			<SectionCard label={label} title={title}>
				<ConsentList
					allLabel={allLabel}
					allCaption={allCaption}
					items={items}
					onStateChange={onStateChange}
				/>
			</SectionCard>
		</ContentSection>
	);
}
