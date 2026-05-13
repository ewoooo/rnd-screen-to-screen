import type { ComponentProps } from "react";

import type { InfoList } from "./InfoList";

export type {
	InfoListItem,
	InfoListTrailingKind,
	InfoListTrailingTone,
} from "./InfoList";
export type InfoListProps = ComponentProps<typeof InfoList>;
