import { Chips, FilterSorting, type ChipsItem } from "@pxds/cx-components";
import { ContentSection } from "@pxds/cx-layout/components";
import { VStack } from "@pxds/cx-layout/components/primitives";

const filterItems: ChipsItem[] = [
	{ value: "all", label: "전체" },
	{ value: "unlimited", label: "데이터 무제한" },
	{ value: "under-70000", label: "7만원 이하" },
];

export type PlanFilterProps = {
	totalCount: number;
};

export function PlanFilter({ totalCount }: PlanFilterProps) {
	return (
		<VStack data-ogn-id="ogn-chg-plan-filter" gap="var(--spacing-0)">
			<ContentSection inset="bleed">
				<Chips
					ariaLabel="요금제 필터"
					items={filterItems}
					defaultValue="all"
				/>
			</ContentSection>
			<ContentSection inset="bleed">
				<FilterSorting
					totalLabel="변경 가능"
					totalCount={totalCount}
					totalUnit="개"
					orderLabel="추천순"
					filterLabel="필터"
				/>
			</ContentSection>
		</VStack>
	);
}
