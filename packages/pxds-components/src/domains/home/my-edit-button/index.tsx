import { Button } from "@pxds/pxds-components/core";
import type { ReactNode } from "react";

import { HStack } from "@pxds/pxds-layout/primitives";

type Props = {
	children?: ReactNode;
	onClick?: () => void;
};

/**
 * 홈 화면 하단의 "MY 편집" 버튼. WDS Button(ghost) 위임.
 */
export function MyEditButton({ children = "MY 편집", onClick }: Props) {
	return (
		<HStack justify="center" pt="var(--semantic-spacing-inset)">
			<Button size="small" variant="outlined" color="assistive" onClick={onClick}>
				{children}
			</Button>
		</HStack>
	);
}
