export {
	componentPreviewExamples,
	cxComponentPreviewExamples,
} from "./examples";
export { cxComponentPreviewRegistry } from "./registry";
export type {
	ComponentPreviewExample,
	CxComponentPreviewCase,
	CxComponentPreviewEntry,
	CxComponentPreviewExample,
	CxComponentPreviewGroup,
	CxComponentPreviewLayer,
	CxComponentPreviewOwner,
	CxComponentPreviewStatus,
} from "./types";

import { cxComponentPreviewExamples } from "./examples";
import { cxComponentPreviewRegistry } from "./registry";

export function getCxComponentPreviewById(componentId: string) {
	return cxComponentPreviewRegistry.find((component) => component.id === componentId);
}

export function getCxComponentPreviewExample(componentId: string) {
	return cxComponentPreviewExamples.find(
		(example) => example.componentId === componentId,
	);
}

export function getDefaultCxComponentPreviewId() {
	return cxComponentPreviewRegistry[0]?.id;
}
