"use client";

import { IconButton } from "@wanteddev/wds";
import { IconSearch } from "@wanteddev/wds-icon";

// Figma btn-search (atom) → WDS IconButton + IconSearch
// Source: data/binding/overrides/btn-search.json
export function BtnSearchPilot({ onClick }: { onClick?: () => void }) {
	return (
		<IconButton variant="normal" size="medium" onClick={onClick}>
			<IconSearch width={24} height={24} />
		</IconButton>
	);
}
