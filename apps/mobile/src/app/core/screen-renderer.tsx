"use client";

import { Fragment, type ReactNode } from "react";
import { componentRegistry } from "@pxds/pxds-components/registry";
import type { RenderReactNode } from "@pxds/pxds-components/render-react";
import type { RenderTreeChild } from "@pxds/pxds-components/schema";
import {
	AppScreen,
	ContentRail,
	ContentSection,
} from "@pxds/pxds-layout/app-screen";
import { VStack } from "@pxds/pxds-layout/primitives";

import type {
	RenderPropValue,
	RenderScreenSpec,
	RenderSectionLayout,
	RenderSpecNode,
} from "@/scripts/render-spec";
import { normalizeComponentId } from "@/scripts/render-spec";
import { mbrRegistryEntries } from "@/organisms/mbr/module.registry";
import type { RenderableRegistryEntry } from "@/type/organism-registry";

type Props = {
	spec: RenderScreenSpec;
};

const componentById = new Map(
	[
		...(componentRegistry as readonly RenderableRegistryEntry[]),
		...(mbrRegistryEntries as readonly RenderableRegistryEntry[]),
	].map((entry) => [normalizeComponentId(entry.id), entry]),
);

export function RenderScreen({ spec }: Props) {
	const { slots } = spec;

	return (
		<AppScreen>
			{slots.systemHeader === false ? null : <AppScreen.SystemHeader />}
			{slots.header ? (
				<AppScreen.Header>{renderNode(slots.header, "header")}</AppScreen.Header>
			) : null}
			<AppScreen.Content>
				{(slots.content ?? []).map((node, index) =>
					renderNode(node, `content-${index}`),
				)}
			</AppScreen.Content>
			{Array.isArray(slots.bottom) && slots.bottom.length > 0 ? (
				<AppScreen.Bottom>
					{slots.bottom.map((node, index) => renderNode(node, `bottom-${index}`))}
				</AppScreen.Bottom>
			) : null}
		</AppScreen>
	);
}

function renderNode(node: RenderSpecNode, key: string): ReactNode {
	const componentId = normalizeComponentId(node.component);
	const entry = componentById.get(componentId);

	if (!entry?.renderReact) {
		if (node.props?.visible === false) return null;
		const children =
			node.children ??
			renderTreeChildrenToNodes(entry?.render?.().children, node.props);
		if (!children || children.length === 0) {
			throw new Error(`Component has no React renderer: ${node.component}`);
		}

		return (
			<Fragment key={key}>
				{renderTreeNode(
					node,
					children.map((child, index) => renderNode(child, `${key}-${index}`)),
				)}
			</Fragment>
		);
	}

	const rendered = (
		<Fragment key={key}>
			{entry.renderReact({
				node: node as RenderReactNode,
				renderChildren: () =>
					node.children?.map((child, index) => renderNode(child, `${key}-${index}`)),
			})}
		</Fragment>
	);

	if (!node.section) return rendered;
	return (
		<Fragment key={key}>
			{renderTreeNode(node, rendered)}
		</Fragment>
	);
}

function renderTreeNode(node: RenderSpecNode, children: ReactNode) {
	const content = node.section ? (
		<ContentSection inset={node.section.inset}>
			<ContentRail
				rail={node.section.rail === "none" ? undefined : node.section.rail}
				measure={node.section.measure}
			>
				<VStack gap="block">{children}</VStack>
			</ContentRail>
		</ContentSection>
	) : (
		<VStack gap="block" style={{ width: "100%" }}>
			{children}
		</VStack>
	);

	return content;
}

function renderTreeChildrenToNodes(
	children: readonly RenderTreeChild[] | undefined,
	parentProps: Readonly<Record<string, RenderPropValue>> | undefined,
): RenderSpecNode[] | undefined {
	if (!children || children.length === 0) return undefined;
	return children.map((child) => ({
		component: child.component,
		section: toRenderSectionLayout(child.layout),
		props: toRenderProps(
			{
				...(child.variant ? { variant: child.variant } : null),
				...child.props,
			},
			parentProps,
		),
	}));
}

function toRenderSectionLayout(
	layout: RenderTreeChild["layout"],
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
	parentProps?: Readonly<Record<string, RenderPropValue>>,
): Readonly<Record<string, RenderPropValue>> | undefined {
	if (!props) return undefined;
	return Object.fromEntries(
		Object.entries(props).flatMap(([key, value]) => {
			const renderValue = toRenderPropValue(value, parentProps);
			return renderValue === undefined ? [] : [[key, renderValue]];
		}),
	);
}

function toRenderPropValue(
	value: unknown,
	parentProps?: Readonly<Record<string, RenderPropValue>>,
): RenderPropValue | undefined {
	if (typeof value === "string" && value.startsWith("$props.")) {
		return parentProps?.[value.slice("$props.".length)];
	}
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
			.map((item) => toRenderPropValue(item, parentProps))
			.filter((item): item is RenderPropValue => item !== undefined);
	}
	if (value && typeof value === "object") {
		return Object.fromEntries(
			Object.entries(value).flatMap(([key, nested]) => {
				const renderValue = toRenderPropValue(nested, parentProps);
				return renderValue === undefined ? [] : [[key, renderValue]];
			}),
		);
	}
	return undefined;
}
