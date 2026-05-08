type SidePanelHeaderProps = {
	title: string;
	description: string;
};

export function SidePanelHeader({
	title,
	description,
}: SidePanelHeaderProps) {
	return (
		<div className="flex items-center gap-3 p-5">
			<div className="min-w-0">
				<h1 className="truncate text-xl font-semibold">{title}</h1>
				<p className="truncate text-xs text-neutral-500">{description}</p>
			</div>
		</div>
	);
}
