import { GlobalSearch } from "@pxds/pxds-components/shared/global";
import {
	SearchPromoBlock,
	SearchResultList,
	SearchSuggestionChips,
} from "@pxds/pxds-components/search";

import { searchResultFixture } from "./_mock";

export default function SearchResultPage() {
	const f = searchResultFixture;

	return (
		<GlobalSearch
			query={f.query}
			tabs={f.tabs}
			activeTab={f.activeTab}
		>
			<SearchSuggestionChips
				label={f.suggestions.label}
				items={f.suggestions.items}
			/>
			<SearchPromoBlock
				badge={f.promo.badge}
				text={f.promo.text}
				action={f.promo.action}
			/>
			<SearchResultList
				label={f.results.label}
				title={f.results.title}
				countText={f.results.countText}
				items={f.results.items}
			/>
		</GlobalSearch>
	);
}
