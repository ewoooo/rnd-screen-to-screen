type ComponentExampleMissingProps = {
	componentName: string;
};

export function ComponentExampleMissing({
	componentName,
}: ComponentExampleMissingProps) {
	return (
		<div className="max-w-xs text-center">
			<p className="text-sm font-medium text-neutral-800">
				Preview not connected
			</p>
			<p className="mt-2 text-sm leading-5 text-neutral-500">
				{componentName}은 registry에는 있지만 아직 canvas renderer에 샘플이
				연결되지 않았습니다.
			</p>
		</div>
	);
}
