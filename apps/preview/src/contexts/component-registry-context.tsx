"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
	componentRegistry,
	type ComponentRegistryEntry,
} from "@pxds/component-registry";

import {
	getComponentGroups,
	getComponentLayers,
	groupComponentsByGroup,
	groupComponentsByLayer,
	type ComponentGroups,
	type ComponentLayerGroups,
} from "@/utils/component-registry";

type ComponentRegistryContextValue = {
	components: readonly ComponentRegistryEntry[];
	componentGroups: ReturnType<typeof getComponentGroups>;
	componentsByGroup: ComponentGroups;
	componentLayers: ReturnType<typeof getComponentLayers>;
	componentsByLayer: ComponentLayerGroups;
	componentCount: number;
};

const ComponentRegistryContext =
	createContext<ComponentRegistryContextValue | null>(null);

export function ComponentRegistryProvider({
	children,
}: {
	children: ReactNode;
}) {
	const components = componentRegistry;

	return (
		<ComponentRegistryContext.Provider
			value={{
				components,
				componentGroups: getComponentGroups(components),
				componentsByGroup: groupComponentsByGroup(components),
				componentLayers: getComponentLayers(components),
				componentsByLayer: groupComponentsByLayer(components),
				componentCount: components.length,
			}}
		>
			{children}
		</ComponentRegistryContext.Provider>
	);
}

export function useComponentRegistry() {
	const context = useContext(ComponentRegistryContext);

	if (!context) {
		throw new Error(
			"useComponentRegistry must be used within ComponentRegistryProvider.",
		);
	}

	return context;
}
