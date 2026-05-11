import {
	dividerRegistryEntry,
	placeholderRegistryEntry,
} from "./feedback/shared.registry";
import {
	filterTabsRegistryEntry,
	formControlsRegistryEntry,
	formFieldRegistryEntry,
	mediaBlockRegistryEntry,
	queryBarRegistryEntry,
	selectFieldRegistryEntry,
} from "./patterns/shared.registry";
import { textBlockRegistryEntry } from "./typography/text-block/text-block.registry";
import { wdsCoreRegistryEntries } from "./core/core.registry";

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
	| "navigation"
	| "product"
	| "search"
	| "selection"
	| "template"
	| "typography"
	| "billing-html"
	| "nc-simple"
	| "tu";

/**
 * Component-level vocabulary record.
 *
 * This table is for component discovery and ownership only. It intentionally
 * does not define props, variants, token values, screen usage, or evaluation
 * notes; those belong to component APIs, DESIGN.md, specs, and evaluation.
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
	{
		id: "info-list",
		name: "InfoList",
		layer: "molecule",
		owner: "@screen/mobile",
		importPath: "@/components/molecules/info-list",
		group: "layout",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "selectable-list",
		name: "SelectableList",
		layer: "molecule",
		owner: "@screen/mobile",
		importPath: "@/components/molecules/selectable-list",
		group: "selection",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "consent-list",
		name: "ConsentList",
		layer: "molecule",
		owner: "@screen/mobile",
		importPath: "@/components/molecules/consent-list",
		group: "selection",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "notice-block",
		name: "NoticeBlock",
		layer: "molecule",
		owner: "@screen/mobile",
		importPath: "@/components/molecules/notice-block",
		group: "feedback",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "promo-block",
		name: "PromoBlock",
		layer: "molecule",
		owner: "@screen/mobile",
		importPath: "@/components/molecules/promo-block",
		group: "media",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "section-card",
		name: "SectionCard",
		layer: "molecule",
		owner: "@screen/mobile",
		importPath: "@/components/molecules/section-card",
		group: "layout",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "summary-card",
		name: "SummaryCard",
		layer: "molecule",
		owner: "@screen/mobile",
		importPath: "@/components/molecules/summary-card",
		group: "layout",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "chip-group",
		name: "ChipGroup",
		layer: "molecule",
		owner: "@screen/mobile",
		importPath: "@/components/molecules/chip-group",
		group: "selection",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "primary-cta-bar",
		name: "PrimaryCTABar",
		layer: "molecule",
		owner: "@screen/mobile",
		importPath: "@/components/molecules/cta-bar",
		group: "navigation",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "sticky-action-bar",
		name: "StickyActionBar",
		layer: "molecule",
		owner: "@screen/mobile",
		importPath: "@/components/molecules/cta-bar",
		group: "navigation",
		status: "active",
		createdAt: "2026-04-30",
	},
	...wdsCoreRegistryEntries.filter((entry) => entry.layer === "organism"),
	{
		id: "global-navigation-header",
		name: "GlobalNavigationHeader",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "global",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "global-navigation-bar",
		name: "GlobalNavigationBar",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "global",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "global-search",
		name: "GlobalSearch",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "search",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "progress-top-bar",
		name: "ProgressTopBar",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "global",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "flow-hero",
		name: "FlowHero",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "global",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "flow-notice",
		name: "FlowNotice",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "global",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "flow-summary-card",
		name: "FlowSummaryCard",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "global",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "terms-agreement-group",
		name: "TermsAgreementGroup",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "global",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "flow-personal-info-form",
		name: "FlowPersonalInfoForm",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "global",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "flow-reason-form",
		name: "FlowReasonForm",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "global",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "flow-continue-bar",
		name: "FlowContinueBar",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "global",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "flow-result-actions",
		name: "FlowResultActions",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/global",
		group: "global",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "home-block",
		name: "HomeBlock",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/home",
		group: "home",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "home-banner",
		name: "Banner",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/home",
		group: "home",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "home-list-row",
		name: "ListRow",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/home",
		group: "home",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "ai-annotation",
		name: "AiAnnotation",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/home",
		group: "home",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "my-edit-button",
		name: "MyEditButton",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/home",
		group: "home",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "product-shell",
		name: "ProductShell",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/product",
		group: "product",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "product-summary-card",
		name: "ProductSummaryCard",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/product",
		group: "product",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "product-option-selector",
		name: "ProductOptionSelector",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/product",
		group: "product",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "product-promo-banner",
		name: "ProductPromoBanner",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/product",
		group: "product",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "product-benefit-list",
		name: "ProductBenefitList",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/product",
		group: "product",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "product-purchase-bar",
		name: "ProductPurchaseBar",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/product",
		group: "product",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "search-result-tabs",
		name: "SearchResultTabs",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/search",
		group: "search",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "search-result-list",
		name: "SearchResultList",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/search",
		group: "search",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "search-promo-block",
		name: "SearchPromoBlock",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/search",
		group: "search",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "search-suggestion-chips",
		name: "SearchSuggestionChips",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/search",
		group: "search",
		status: "active",
		createdAt: "2026-04-30",
	},
	{
		id: "auth-method-selector",
		name: "AuthMethodSelector",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/nc-simple",
		group: "nc-simple",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "login-form",
		name: "LoginForm",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/nc-simple",
		group: "nc-simple",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "leave-impact-checklist",
		name: "LeaveImpactChecklist",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/nc-simple",
		group: "nc-simple",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "final-consent-row",
		name: "FinalConsentRow",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/nc-simple",
		group: "nc-simple",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "reused-info-list",
		name: "ReusedInfoList",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/nc-simple",
		group: "nc-simple",
		status: "active",
		createdAt: "2026-05-07",
	},
	{
		id: "billing-html-screen",
		name: "BillingHtmlScreen",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/billing-html",
		group: "billing-html",
		status: "experimental",
		createdAt: "2026-05-07",
	},
	{
		id: "tu-organisms",
		name: "organisms/tu",
		layer: "organism",
		owner: "@screen/mobile",
		importPath: "@/components/organisms/tu",
		group: "tu",
		status: "experimental",
		createdAt: "2026-04-30",
	},
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
