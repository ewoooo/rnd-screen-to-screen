import type { ReactNode } from "react";

import { VStack } from "@/components/atoms/layout";

type Props = {
	children: ReactNode;
};

export function ContentList({ children }: Props) {
	return (
		<VStack
			style={{
				gap: "var(--spacing-4)",
			}}
		>
			{children}
		</VStack>
	);
}
