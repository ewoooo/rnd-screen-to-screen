import {
	SearchFilterTabs,
	SearchPromoBlock,
	SearchResultList,
	SearchShell,
	SearchSuggestionChips,
} from "@/components/search-kit";
import { MobileScreen } from "@/components/system";

import { searchResultFixture } from "./_mock";

export default function SearchResultPage() {
	const f = searchResultFixture;

	return (
		<MobileScreen>
			<SearchShell query={f.query}>
				<SearchFilterTabs tabs={f.tabs} activeId={f.activeTab} />
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
			</SearchShell>
		</MobileScreen>
	);
}
