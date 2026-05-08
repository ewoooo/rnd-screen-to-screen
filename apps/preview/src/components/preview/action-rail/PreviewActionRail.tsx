import { UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PreviewActionRail() {
	return (
		<aside
			aria-label="Preview actions"
			className="flex border-t border-neutral-200 bg-neutral-50 p-2 sm:sticky sm:top-0 sm:h-dvh sm:flex-col sm:items-center sm:border-l sm:border-t-0"
		>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="h-10 w-10 justify-center px-0"
				aria-label="Figma로 내보내기"
				title="Figma로 내보내기"
			>
				<UploadIcon aria-hidden="true" />
			</Button>
		</aside>
	);
}
