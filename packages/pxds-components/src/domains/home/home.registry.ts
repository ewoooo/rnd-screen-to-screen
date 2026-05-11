import { aiAnnotationRegistryEntry } from "./ai-annotation/registry";
import { homeBannerRegistryEntry } from "./banner/registry";
import { homeBlockRegistryEntry } from "./block/registry";
import { homeListRowRegistryEntry } from "./list-row/registry";
import { myEditButtonRegistryEntry } from "./my-edit-button/registry";

export const homeRegistryEntries = [
	homeBlockRegistryEntry,
	homeBannerRegistryEntry,
	homeListRowRegistryEntry,
	aiAnnotationRegistryEntry,
	myEditButtonRegistryEntry,
] as const;
