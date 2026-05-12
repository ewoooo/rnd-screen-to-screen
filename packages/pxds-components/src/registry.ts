import {
	dividerRegistryEntry,
	placeholderRegistryEntry,
} from "./atoms/feedback/shared.registry";
import {
	checkListRegistryEntry,
	chipGroupRegistryEntry,
	consentListRegistryEntry,
	descriptionListRegistryEntry,
	filterTabsRegistryEntry,
	formControlsRegistryEntry,
	formFieldRegistryEntry,
	infoListRegistryEntry,
	infoSectionRegistryEntry,
	mediaBlockRegistryEntry,
	noticeBlockRegistryEntry,
	primaryCtaBarRegistryEntry,
	promoBlockRegistryEntry,
	queryBarRegistryEntry,
	sectionCardRegistryEntry,
	selectFieldRegistryEntry,
	selectableListRegistryEntry,
	stickyActionBarRegistryEntry,
	summaryCardRegistryEntry,
	textFieldListRegistryEntry,
} from "./molecules/molecules.registry";
import { globalRegistryEntries } from "./domains/shared/global/global.registry";
import { homeRegistryEntries } from "./domains/home/home.registry";
import { mbrRegistryEntries } from "./domains/mbr/mbr.registry";
import { ncSimpleRegistryEntries } from "./domains/nc-simple/nc-simple.registry";
import { productRegistryEntries } from "./domains/product/product.registry";
import { searchRegistryEntries } from "./domains/search/search.registry";
import { tuRegistryEntries } from "./domains/tu/tu.registry";
import { textBlockRegistryEntry } from "./atoms/typography/text-block/text-block.registry";
import { wdsCoreRegistryEntries } from "./core/core.registry";
import {
	flexFigmaSpec,
	hStackFigmaSpec,
	vStackFigmaSpec,
} from "@pxds/pxds-layout/primitives";

import type {
	ComponentRegistryExportMode,
	ComponentRenderContract,
} from "./schema";
import type { ComponentRenderReact } from "./render-react";

export type ComponentLayer = "atom" | "molecule" | "organism" | "template";

export type ComponentLifecycleStatus =
	| "active"
	| "experimental"
	| "deprecated";

export type ComponentOwner =
	| "@pxds/pxds-components"
	| "@pxds/pxds-icons"
	| "@pxds/pxds-layout"
	| "@screen/mobile";

export type ComponentGroup =
	| "feedback"
	| "form"
	| "global"
	| "home"
	| "layout"
	| "media"
	| "mbr"
	| "navigation"
	| "product"
	| "search"
	| "selection"
	| "template"
	| "typography"
	| "billing-html"
	| "nc-simple"
	| "tu";

export type PolicySlotBinding =
	| "policy.copy.requirement"
	| "policy.copy.error";

/**
 * Component-level vocabulary record.
 *
 * The stable fields are for discovery and ownership. Optional export fields
 * connect the entry to a component-owned render contract without moving layout
 * or instance details into the central registry table.
 */
export type ComponentRegistryEntry = {
	id: string;
	name: string;
	layer: ComponentLayer;
	owner: ComponentOwner;
	importPath: string;
	group: ComponentGroup;
	status: ComponentLifecycleStatus;
	createdAt: `${number}-${number}-${number}`;
	/**
	 * Major atom/core/molecule component ids used to judge whether a component can
	 * be reused. This is intentionally not a full implementation graph.
	 */
	composedOf?: readonly string[];
	/**
	 * External vocabulary aliases — Storyboard/Montage component names that map
	 * to this entry. Used by the SB importer to resolve incoming part references.
	 */
	sbAliases?: readonly string[];
	/**
	 * Declares which slots of the component are automatically filled by policy
	 * copy. The slot key matches the prop the component exposes (e.g. `hint`,
	 * `error`); the value names the policy field bound to it.
	 */
	policySlots?: Readonly<Record<string, PolicySlotBinding>>;
	/**
	 * Optional Figma component spec owned by the component folder. Kept as a
	 * getter so discovery metadata can remain cheap and side-effect light.
	 */
	figmaSpec?: () => unknown;
	/**
	 * Declares whether this component exports as a concrete instance or expands
	 * into a render tree. Older entries omit this until their folder owns a
	 * render.ts contract.
	 */
	exportMode?: ComponentRegistryExportMode;
	/**
	 * Optional render contract owned by the component folder. Page/organism
	 * entries typically expand through render-tree; molecule/atom entries can use
	 * instance contracts.
	 */
	render?: () => ComponentRenderContract;
	/**
	 * Optional React renderer owned by the component folder. The screen renderer
	 * calls this without knowing component-specific props.
	 */
	renderReact?: ComponentRenderReact;
};

export const componentRegistry = [
	textBlockRegistryEntry,
	dividerRegistryEntry,
	placeholderRegistryEntry,
	{
		id: "layout-primitives",
		name: "Box/Flex/Float/Grid/HStack/VStack",
		layer: "atom",
		owner: "@pxds/pxds-layout",
		importPath: "@pxds/pxds-layout/primitives",
		group: "layout",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "flex",
		name: "Flex",
		layer: "atom",
		owner: "@pxds/pxds-layout",
		importPath: "@pxds/pxds-layout/primitives",
		group: "layout",
		status: "active",
		createdAt: "2026-04-30",
		figmaSpec: () => flexFigmaSpec,
	},
	{
		id: "h-stack",
		name: "HStack",
		layer: "atom",
		owner: "@pxds/pxds-layout",
		importPath: "@pxds/pxds-layout/primitives",
		group: "layout",
		status: "active",
		createdAt: "2026-04-30",
		figmaSpec: () => hStackFigmaSpec,
	},
	{
		id: "v-stack",
		name: "VStack",
		layer: "atom",
		owner: "@pxds/pxds-layout",
		importPath: "@pxds/pxds-layout/primitives",
		group: "layout",
		status: "active",
		createdAt: "2026-04-30",
		figmaSpec: () => vStackFigmaSpec,
	},
	{
		id: "frame-icons",
		name: "Logo/Status*",
		layer: "atom",
		owner: "@pxds/pxds-icons",
		importPath: "@pxds/pxds-icons",
		group: "navigation",
		status: "active",
		createdAt: "2026-04-30",
	},
	...wdsCoreRegistryEntries.filter((entry) => entry.layer === "atom"),
	mediaBlockRegistryEntry,
	queryBarRegistryEntry,
	filterTabsRegistryEntry,
	formFieldRegistryEntry,
	selectFieldRegistryEntry,
	formControlsRegistryEntry,
	...wdsCoreRegistryEntries.filter((entry) => entry.layer === "molecule"),
	checkListRegistryEntry,
	infoListRegistryEntry,
	infoSectionRegistryEntry,
	selectableListRegistryEntry,
	consentListRegistryEntry,
	descriptionListRegistryEntry,
	noticeBlockRegistryEntry,
	promoBlockRegistryEntry,
	sectionCardRegistryEntry,
	summaryCardRegistryEntry,
	chipGroupRegistryEntry,
	primaryCtaBarRegistryEntry,
	stickyActionBarRegistryEntry,
	textFieldListRegistryEntry,
	...wdsCoreRegistryEntries.filter((entry) => entry.layer === "organism"),
	...globalRegistryEntries,
	...homeRegistryEntries,
	...productRegistryEntries,
	...searchRegistryEntries,
	...ncSimpleRegistryEntries,
	...mbrRegistryEntries,
	{
		id: "billing-html-screen",
		name: "BillingHtmlScreen",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "/mobile/app/billing-html",
		group: "billing-html",
		status: "experimental",
		createdAt: "2026-05-07",
	},
	...tuRegistryEntries,
	{
		id: "app-screen",
		name: "AppScreen",
		layer: "template",
		owner: "@pxds/pxds-layout",
		importPath: "@pxds/pxds-layout/app-screen",
		group: "template",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "app-screen-root",
		name: "AppScreenRoot",
		layer: "template",
		owner: "@pxds/pxds-layout",
		importPath: "@pxds/pxds-layout/app-screen",
		group: "template",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "content-outlet",
		name: "ContentOutlet",
		layer: "template",
		owner: "@pxds/pxds-layout",
		importPath: "@pxds/pxds-layout/app-screen",
		group: "template",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "content-list",
		name: "ContentList",
		layer: "template",
		owner: "@pxds/pxds-layout",
		importPath: "@pxds/pxds-layout/app-screen",
		group: "template",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "content-section",
		name: "ContentSection",
		layer: "template",
		owner: "@pxds/pxds-layout",
		importPath: "@pxds/pxds-layout/app-screen",
		group: "template",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "content-rail",
		name: "ContentRail",
		layer: "template",
		owner: "@pxds/pxds-layout",
		importPath: "@pxds/pxds-layout/app-screen",
		group: "template",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "bottom-sheet",
		name: "BottomSheet",
		layer: "template",
		owner: "@pxds/pxds-layout",
		importPath: "@pxds/pxds-layout/bottom-sheet",
		group: "template",
		status: "active",
		createdAt: "2026-04-30",
	},
] as const satisfies readonly ComponentRegistryEntry[];

export type ComponentId = (typeof componentRegistry)[number]["id"];

export const componentCount = componentRegistry.length;


export type ComponentRegistry = readonly ComponentRegistryEntry[];
export type ComponentRegistryPatch = Partial<Omit<ComponentRegistryEntry, "id">>;
export type ComponentReferenceRegistryEntry = {
	id: ComponentId;
	referencedBy: readonly ComponentId[];
};

export type ComponentReferenceRegistry =
	readonly ComponentReferenceRegistryEntry[];

export function createComponentReferenceRegistry(
	registry: ComponentRegistry,
): ComponentReferenceRegistry {
	const componentIds = new Set(registry.map((component) => component.id));
	const referencedBy = new Map<string, ComponentId[]>();

	for (const component of registry) {
		for (const referenceId of component.composedOf ?? []) {
			if (!componentIds.has(referenceId)) continue;

			const references = referencedBy.get(referenceId) ?? [];
			if (!references.includes(component.id as ComponentId)) {
				references.push(component.id as ComponentId);
			}
			referencedBy.set(referenceId, references);
		}
	}

	return [...referencedBy.entries()].map(([id, references]) => ({
		id: id as ComponentId,
		referencedBy: references,
	}));
}

export const componentReferenceRegistry =
	createComponentReferenceRegistry(componentRegistry);

export function findComponentBySbAlias(
	registry: ComponentRegistry,
	alias: string,
) {
	return registry.find((component) =>
		component.sbAliases?.includes(alias),
	);
}

export function getComponentBySbAlias(alias: string) {
	return findComponentBySbAlias(componentRegistry, alias);
}

function assertUniqueSbAliases(registry: ComponentRegistry) {
	const seen = new Map<string, string>();
	for (const component of registry) {
		for (const alias of component.sbAliases ?? []) {
			const existing = seen.get(alias);
			if (existing && existing !== component.id) {
				throw new Error(
					`SB alias "${alias}" is claimed by both "${existing}" and "${component.id}"`,
				);
			}
			seen.set(alias, component.id);
		}
	}
}

assertUniqueSbAliases(componentRegistry);

function assertUniqueComponent(
	registry: ComponentRegistry,
	entry: ComponentRegistryEntry,
	ignoreId?: string,
) {
	const duplicateId = registry.find(
		(component) => component.id === entry.id && component.id !== ignoreId,
	);
	if (duplicateId) {
		throw new Error(`Component id already exists: ${entry.id}`);
	}
}

export function findComponentById(
	registry: ComponentRegistry,
	id: ComponentId | string,
) {
	return registry.find((component) => component.id === id);
}

export function findComponentsByLayer(
	registry: ComponentRegistry,
	layer: ComponentLayer,
) {
	return registry.filter((component) => component.layer === layer);
}

export function findComponentsByGroup(
	registry: ComponentRegistry,
	group: ComponentGroup,
) {
	return registry.filter((component) => component.group === group);
}

export function findComponentsByOwner(
	registry: ComponentRegistry,
	owner: ComponentOwner,
) {
	return registry.filter((component) => component.owner === owner);
}

export function findComponentsReferencing(
	registry: ComponentRegistry,
	componentId: ComponentId | string,
) {
	return registry.filter((component) =>
		component.composedOf?.includes(componentId),
	);
}

export function getComponentById(id: ComponentId | string) {
	return findComponentById(componentRegistry, id);
}

export function getComponentsByLayer(layer: ComponentLayer) {
	return findComponentsByLayer(componentRegistry, layer);
}

export function getComponentsByGroup(group: ComponentGroup) {
	return findComponentsByGroup(componentRegistry, group);
}

export function getComponentsByOwner(owner: ComponentOwner) {
	return findComponentsByOwner(componentRegistry, owner);
}

export function getComponentsReferencing(componentId: ComponentId | string) {
	return findComponentsReferencing(componentRegistry, componentId);
}

export function createComponent(
	registry: ComponentRegistry,
	entry: ComponentRegistryEntry,
) {
	assertUniqueComponent(registry, entry);
	return [...registry, entry];
}

export function updateComponent(
	registry: ComponentRegistry,
	id: ComponentId | string,
	patch: ComponentRegistryPatch,
) {
	let didUpdate = false;
	const next = registry.map((component) => {
		if (component.id !== id) {
			return component;
		}

		didUpdate = true;
		const updated = { ...component, ...patch };
		assertUniqueComponent(registry, updated, component.id);
		return updated;
	});

	if (!didUpdate) {
		throw new Error(`Component not found: ${id}`);
	}

	return next;
}

export function deleteComponent(
	registry: ComponentRegistry,
	id: ComponentId | string,
) {
	const next = registry.filter((component) => component.id !== id);
	if (next.length === registry.length) {
		throw new Error(`Component not found: ${id}`);
	}

	return next;
}

export function upsertComponent(
	registry: ComponentRegistry,
	entry: ComponentRegistryEntry,
) {
	if (findComponentById(registry, entry.id)) {
		return updateComponent(registry, entry.id, entry);
	}

	return createComponent(registry, entry);
}
