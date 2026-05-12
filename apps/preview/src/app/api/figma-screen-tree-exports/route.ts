import { NextResponse } from "next/server";
import {
	componentFigmaSpecRegistry,
	createPageFigmaBuildCode,
	createPageFigmaExportSpecFromScreenTree,
	createPxdsFigmaTokenTree,
} from "@pxds/pxds-figma";
import tokenRegistry from "@pxds/pxds-tokens/registry/wds-token-registry.json";

const figmaTokenTree = createPxdsFigmaTokenTree(tokenRegistry);
const registeredComponentIds = componentFigmaSpecRegistry.map(
	(entry) => entry.componentId,
);

type ScreenTreeExportRequest = {
	id?: string;
	name?: string;
	route?: string;
	tree?: unknown;
};

export async function POST(request: Request) {
	const input = (await request.json()) as ScreenTreeExportRequest;

	if (!input.id) {
		return NextResponse.json({ error: "id is required." }, { status: 400 });
	}
	if (!input.name) {
		return NextResponse.json({ error: "name is required." }, { status: 400 });
	}
	if (!input.route) {
		return NextResponse.json({ error: "route is required." }, { status: 400 });
	}
	if (!input.tree || typeof input.tree !== "object") {
		return NextResponse.json({ error: "tree is required." }, { status: 400 });
	}

	try {
		const spec = createPageFigmaExportSpecFromScreenTree(
			input.tree as Parameters<typeof createPageFigmaExportSpecFromScreenTree>[0],
			{
				id: input.id,
				name: input.name,
				route: input.route,
				registeredComponentIds,
			},
		);
		const code = createPageFigmaBuildCode(spec, {
			componentSpecs: componentFigmaSpecRegistry,
			dsTokens: figmaTokenTree,
			sourceLabel: `PXDS screen tree export: ${input.id}`,
		});

		return NextResponse.json({ code, spec });
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Screen tree Figma export failed.",
			},
			{ status: 500 },
		);
	}
}
