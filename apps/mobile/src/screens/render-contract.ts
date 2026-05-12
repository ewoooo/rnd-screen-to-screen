import type { ComponentRenderContract } from "@pxds/pxds-components/schema";
import type { RenderChildContract } from "@pxds/pxds-components/schema";

import type {
	RenderPropValue,
	RenderScreenSpec,
	RenderSectionLayout,
	RenderSpecNode,
} from "./render-spec";
import { RENDER_SPEC_SCHEMA_VERSION } from "./render-spec";

export const SCREEN_RENDER_CONTRACT_SCHEMA_VERSION =
	"screen-render-contract-v1";

export type ScreenRenderSource = {
	useCaseIds?: readonly string[];
	ognSpecIds?: readonly string[];
	policyRefs?: readonly string[];
};

export type ScreenRenderNodeContract = {
	component: string;
	section?: RenderSectionLayout;
	props?: Readonly<Record<string, RenderPropValue>>;
	children?: readonly ScreenRenderNodeContract[];
	render?: ComponentRenderContract;
};

export type ScreenRenderContract = {
	schemaVersion: typeof SCREEN_RENDER_CONTRACT_SCHEMA_VERSION;
	screen: RenderScreenSpec["screen"];
	source?: ScreenRenderSource;
	slots: {
		systemHeader?: boolean;
		header?: ScreenRenderNodeContract | false;
		content?: readonly ScreenRenderNodeContract[];
		bottom?: readonly ScreenRenderNodeContract[] | false;
	};
};

export function createRenderTree(
	contract: ScreenRenderContract,
): RenderScreenSpec {
	return {
		schemaVersion: RENDER_SPEC_SCHEMA_VERSION,
		screen: contract.screen,
		slots: {
			systemHeader: contract.slots.systemHeader,
			header: contract.slots.header
				? toRenderSpecNode(contract.slots.header)
				: contract.slots.header,
			content: contract.slots.content?.map(toRenderSpecNode),
			bottom: Array.isArray(contract.slots.bottom)
				? contract.slots.bottom.map(toRenderSpecNode)
				: contract.slots.bottom,
		},
	};
}

function toRenderSpecNode(node: ScreenRenderNodeContract): RenderSpecNode {
	const children = node.children?.map(toRenderSpecNode) ?? renderChildren(node.render);
	return {
		component: node.component,
		section: node.section,
		props: node.props,
		children,
	};
}

function renderChildren(
	render: ComponentRenderContract | undefined,
): RenderSpecNode[] | undefined {
	if (!render?.children || render.children.length === 0) return undefined;
	return render.children.map(renderChildToRenderSpecNode);
}

function renderChildToRenderSpecNode(child: RenderChildContract): RenderSpecNode {
	return {
		component: child.component,
		section: toRenderSectionLayout(child.layout),
		props: toRenderProps(child.props),
	};
}

function toRenderSectionLayout(
	layout: RenderChildContract["layout"],
): RenderSectionLayout | undefined {
	const section = layout?.section;
	if (!section) return undefined;
	return {
		inset: section.inset === "bleed" ? "bleed" : "inherit",
		rail: section.rail,
		measure:
			section.measure === "wide"
				? "title"
				: section.measure === "form"
					? "body"
					: section.measure,
	};
}

function toRenderProps(
	props: Readonly<Record<string, unknown>> | undefined,
): Readonly<Record<string, RenderPropValue>> | undefined {
	if (!props) return undefined;
	return Object.fromEntries(
		Object.entries(props).flatMap(([key, value]) => {
			const renderValue = toRenderPropValue(value);
			return renderValue === undefined ? [] : [[key, renderValue]];
		}),
	);
}

function toRenderPropValue(value: unknown): RenderPropValue | undefined {
	if (
		value === null ||
		typeof value === "string" ||
		typeof value === "number" ||
		typeof value === "boolean"
	) {
		return value;
	}
	if (Array.isArray(value)) {
		return value
			.map(toRenderPropValue)
			.filter((item): item is RenderPropValue => item !== undefined);
	}
	if (value && typeof value === "object") {
		return Object.fromEntries(
			Object.entries(value).flatMap(([key, nested]) => {
				const renderValue = toRenderPropValue(nested);
				return renderValue === undefined ? [] : [[key, renderValue]];
			}),
		);
	}
	return undefined;
}
