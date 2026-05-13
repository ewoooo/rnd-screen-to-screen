export type { ComponentConfig, ComponentLayer } from "./component";
export {
	defineComponentConfig,
	defineRegistry,
	defineScreenConfig,
} from "./define";
export {
	SPEC_KINDS,
	type SpecKind,
	type SpecKindArea,
	type SpecKindCode,
	type SpecKindId,
	type SpecKindName,
} from "./kind";
export type { NodeKind } from "./node";
export type { PropConfig } from "./prop";
export {
	createRegistryEntry,
	deleteRegistryEntry,
	findRegistryEntryById,
	findRegistryEntryByRoute,
	updateRegistryEntry,
	upsertRegistryEntry,
	type Registry,
	type RegistryEntryLike,
	type RegistryPatch,
	type RouteRegistryEntryLike,
} from "./registry";
export type {
	ScreenConfig,
	ScreenLifecycleStatus,
	ScreenRouteConfig,
	ScreenRouteLike,
} from "./screen";
