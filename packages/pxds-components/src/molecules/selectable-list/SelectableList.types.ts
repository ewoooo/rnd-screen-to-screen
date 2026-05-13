import type { ComponentProps } from "react";

import type { SelectableList } from "./SelectableList";

export type {
	SelectableDensity,
	SelectableItem,
	SelectionMode,
} from "./SelectableList";
export type SelectableListProps = ComponentProps<typeof SelectableList>;
