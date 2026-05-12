"use client";

import type { ReactNode } from "react";

import { ComponentRegistryProvider } from "@/contexts/component-registry-context";
import { ScreenRegistryProvider } from "@/contexts/screen-registry-context";

export function PreviewProviders({ children }: { children: ReactNode }) {
	return (
		<ScreenRegistryProvider>
			<ComponentRegistryProvider>{children}</ComponentRegistryProvider>
		</ScreenRegistryProvider>
	);
}
