const SCREEN_EXPORT_NODE_ATTR = "data-pxds-screen-node";

type ScreenExportAttributeInput = {
	type: string;
	id?: string;
	slot?: string;
	props?: Record<string, unknown>;
};

export function createScreenExportAttributes({
	type,
	id,
	slot,
	props,
}: ScreenExportAttributeInput) {
	return {
		[SCREEN_EXPORT_NODE_ATTR]: "true",
		"data-pxds-screen-type": type,
		...(id ? { "data-pxds-screen-id": id } : null),
		...(slot ? { "data-pxds-screen-slot": slot } : null),
		...(props ? { "data-pxds-screen-props": JSON.stringify(props) } : null),
	};
}
