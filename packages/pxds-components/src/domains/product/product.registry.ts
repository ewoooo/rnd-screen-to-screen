import { productBenefitListRegistryEntry } from "./product-benefit-list/registry";
import { productOptionSelectorRegistryEntry } from "./product-option-selector/registry";
import { productPromoBannerRegistryEntry } from "./product-promo-banner/registry";
import { productPurchaseBarRegistryEntry } from "./product-purchase-bar/registry";
import { productShellRegistryEntry } from "./product-shell/registry";
import { productSummaryCardRegistryEntry } from "./product-summary-card/registry";

export const productRegistryEntries = [
	productShellRegistryEntry,
	productSummaryCardRegistryEntry,
	productOptionSelectorRegistryEntry,
	productPromoBannerRegistryEntry,
	productBenefitListRegistryEntry,
	productPurchaseBarRegistryEntry,
] as const;
