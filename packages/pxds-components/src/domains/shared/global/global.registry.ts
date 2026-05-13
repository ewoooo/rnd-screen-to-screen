import { flowHeroRegistryEntry } from "./flow-hero/registry";
import { flowNoticeRegistryEntry } from "./flow-notice/registry";
import { flowSummaryCardRegistryEntry } from "./flow-summary-card/registry";
import { progressTopBarRegistryEntry } from "./progress-top-bar/registry";

export const globalRegistryEntries = [
	progressTopBarRegistryEntry,
	flowHeroRegistryEntry,
	flowNoticeRegistryEntry,
	flowSummaryCardRegistryEntry,
] as const;
