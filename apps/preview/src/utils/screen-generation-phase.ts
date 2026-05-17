import type { ScreenRoute } from "@screen/mobile/screens";

type ScreenGenerationPhase = {
	step: 1 | 2 | 3 | 4 | 5;
	label: "Extract" | "Map" | "Diagram" | "Build" | "Register";
};

export function getScreenGenerationPhase(
	route: ScreenRoute,
): ScreenGenerationPhase {
	if (route.status === "active") {
		return { step: 5, label: "Register" };
	}

	if (route.generation?.buildSelections?.length) {
		return { step: 4, label: "Build" };
	}

	if (route.generation) {
		return { step: 3, label: "Diagram" };
	}

	return { step: 1, label: "Extract" };
}
