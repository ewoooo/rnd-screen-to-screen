"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { componentRegistry } from "@pxds/pxds-components/registry";

import { getComponentPreviewExample } from "@/components/preview/examples/component-preview-examples";
import {
	getComponentGroups,
	getComponentLayers,
	groupComponentsByGroup,
	groupComponentsByLayer,
	toPreviewComponentRegistry,
	type ComponentGroups,
	type ComponentLayerGroups,
	type PreviewComponentRegistryEntry,
} from "@/utils/component-registry";

const previewableRegistry = componentRegistry.filter(
	(c) => getComponentPreviewExample(c.id) !== undefined,
);

type ComponentRegistryContextValue = {
	components: readonly PreviewComponentRegistryEntry[];
	componentGroups: ReturnType<typeof getComponentGroups>;
	componentsByGroup: ComponentGroups;
	componentLayers: ReturnType<typeof getComponentLayers>;
	componentsByLayer: ComponentLayerGroups;
	componentCount: number;
	selectedComponent: PreviewComponentRegistryEntry | null;
	selectComponent: (id: string) => void;
};

const ComponentRegistryContext =
	createContext<ComponentRegistryContextValue | null>(null);

export function ComponentRegistryProvider({
	children,
}: {
	children: ReactNode;
}) {
	const components = toPreviewComponentRegistry(previewableRegistry);
	const router = useRouter();

	const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
		components[0]?.id ?? null,
	);

	useEffect(() => {
		const id = new URLSearchParams(window.location.search).get("id");
		if (id && components.find((c) => c.id === id)) {
			setSelectedComponentId(id);
		}
	}, []);

	const selectedComponent =
		components.find((c) => c.id === selectedComponentId) ?? null;

	const selectComponent = (id: string) => {
		setSelectedComponentId(id);
		router.replace(`/components?id=${id}`, { scroll: false });
	};

	return (
		<ComponentRegistryContext.Provider
			value={{
				components,
				componentGroups: getComponentGroups(components),
				componentsByGroup: groupComponentsByGroup(components),
				componentLayers: getComponentLayers(components),
				componentsByLayer: groupComponentsByLayer(components),
				componentCount: components.length,
				selectedComponent,
				selectComponent,
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
