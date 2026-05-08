"use client";

import type { ReactNode } from "react";

import { ComponentRegistryProvider } from "@/contexts/component-registry-context";
import { PageRegistryProvider } from "@/contexts/page-registry-context";

export function PreviewProviders({ children }: { children: ReactNode }) {
	return (
		<PageRegistryProvider>
			<ComponentRegistryProvider>{children}</ComponentRegistryProvider>
		</PageRegistryProvider>
	);
}
