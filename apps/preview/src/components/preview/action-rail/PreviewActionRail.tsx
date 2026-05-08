"use client";

import { AlertCircleIcon, CheckIcon, UploadIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
	createPxdsFigmaTokens,
	getComponentFigmaSpec,
	useFigmaPluginExport,
} from "@pxds/pxds-figma";
import tokenRegistry from "@pxds/pxds-tokens/registry/wds-token-registry.json";

import { Button } from "@/components/ui/button";

const figmaTokens = createPxdsFigmaTokens(tokenRegistry);

export function PreviewActionRail() {
	const pathname = usePathname();
	const componentId = getComponentIdFromPath(pathname);
	const figmaSpec = getComponentFigmaSpec(componentId);
	const exportLabel = figmaSpec
		? "Figma 플러그인 코드 복사"
		: "이 컴포넌트의 Figma 스펙이 아직 없습니다";
	const { exportToFigma, isCopying, isCopied, status, error } =
		useFigmaPluginExport({
			spec: figmaSpec,
			dsTokens: figmaTokens,
			sourceLabel: componentId
				? `PXDS preview: ${componentId}`
				: "PXDS preview",
		});

	return (
		<aside
			aria-label="Preview actions"
			className="flex border-t border-neutral-200 bg-neutral-50 p-2 sm:sticky sm:top-0 sm:h-dvh sm:flex-col sm:items-center sm:border-l sm:border-t-0"
		>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="h-10 w-10 justify-center px-0"
				aria-label={error ?? exportLabel}
				title={error ?? exportLabel}
				disabled={!figmaSpec || isCopying}
				onClick={() => void exportToFigma()}
			>
				{status === "error" ? (
					<AlertCircleIcon aria-hidden="true" />
				) : isCopied ? (
					<CheckIcon aria-hidden="true" />
				) : (
					<UploadIcon aria-hidden="true" />
				)}
			</Button>
		</aside>
	);
}

function getComponentIdFromPath(pathname: string) {
	const match = pathname.match(/^\/components\/([^/]+)/);
	return match?.[1] ?? null;
}
