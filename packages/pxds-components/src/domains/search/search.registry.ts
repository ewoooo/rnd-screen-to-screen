import { searchPromoBlockRegistryEntry } from "./search-promo-block/registry";
import { searchResultListRegistryEntry } from "./search-result-list/registry";
import { searchResultTabsRegistryEntry } from "./search-result-tabs/registry";
import { searchSuggestionChipsRegistryEntry } from "./search-suggestion-chips/registry";

export const searchRegistryEntries = [
	searchResultTabsRegistryEntry,
	searchResultListRegistryEntry,
	searchPromoBlockRegistryEntry,
	searchSuggestionChipsRegistryEntry,
] as const;
