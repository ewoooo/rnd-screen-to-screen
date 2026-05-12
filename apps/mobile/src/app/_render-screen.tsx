"use client";

import { Fragment, type ReactNode } from "react";
import {
	componentRegistry,
	type ComponentRegistryEntry,
} from "@pxds/pxds-components/registry";
import type { RenderReactNode } from "@pxds/pxds-components/render-react";
import {
	AppScreen,
	ContentRail,
	ContentSection,
} from "@pxds/pxds-layout/app-screen";
import { VStack } from "@pxds/pxds-layout/primitives";

import type { RenderScreenSpec, RenderSpecNode } from "@/screens/render-spec";
import { normalizeComponentId } from "@/screens/render-spec";

type Props = {
	spec: RenderScreenSpec;
};

const componentById = new Map(
	(componentRegistry as readonly ComponentRegistryEntry[]).map((entry) => [
		normalizeComponentId(entry.id),
		entry,
	]),
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
		if (!node.children || node.children.length === 0) {
			throw new Error(`Component has no React renderer: ${node.component}`);
		}

		return (
			<Fragment key={key}>
				{renderTreeNode(
					node,
					node.children.map((child, index) => renderNode(child, `${key}-${index}`)),
				)}
			</Fragment>
		);
	}

	return (
		<Fragment key={key}>
			{entry.renderReact({
				node: node as RenderReactNode,
				renderChildren: () =>
					node.children?.map((child, index) => renderNode(child, `${key}-${index}`)),
			})}
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
