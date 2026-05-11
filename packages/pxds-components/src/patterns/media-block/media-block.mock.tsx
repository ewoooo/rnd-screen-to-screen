import { MediaBadge, MediaBlock } from "./MediaBlock";

export const mediaBlockPreviewExample = {
	componentId: "media-block",
	description: "Reusable media surface with optional badge slot.",
	render: () => (
		<div className="w-56">
			<MediaBlock
				alt="preview media"
				ratio="4:3"
				badge={<MediaBadge text="NEW" />}
				border
			/>
		</div>
	),
} as const;
