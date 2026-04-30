import type { ComponentProps } from "react";

import { AppScreenContent } from "./AppScreenContent";
import { AppScreenRoot } from "./AppScreenRoot";

type Props = ComponentProps<typeof AppScreenContent>;

export function AppScreen({ children, ...contentProps }: Props) {
	return (
		<AppScreenRoot>
			<AppScreenContent {...contentProps}>{children}</AppScreenContent>
		</AppScreenRoot>
	);
}
