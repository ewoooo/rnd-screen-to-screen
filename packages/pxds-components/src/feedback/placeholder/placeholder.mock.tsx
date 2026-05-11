import { Placeholder } from "../Placeholder";

export const placeholderPreviewExample = {
	componentId: "placeholder",
	description: "WDS Thumbnail based empty media surface.",
	render: () => <Placeholder w={104} h={104} label="IMG" />,
} as const;
