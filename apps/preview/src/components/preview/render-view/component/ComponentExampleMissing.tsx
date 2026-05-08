type ComponentExampleMissingProps = {
	componentName: string;
};

export function ComponentExampleMissing({
	componentName,
}: ComponentExampleMissingProps) {
	return (
		<div className="max-w-xs text-center">
			<p className="text-base font-medium text-neutral-800">
				컴포넌트는 있으나 <br /> 프리뷰가 준비되지 않았습니다.
			</p>
			<p className="mt-2 text-sm leading-5 text-neutral-500">
				{componentName}
			</p>
		</div>
	);
}
