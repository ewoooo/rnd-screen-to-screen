import { defineComponentConfig } from "@pxds/cx-spec";

export type EntryCheckVariant = "existing" | "dormant" | "withdrawn";

export type EntryCheckProps = {
	/**
	 * Server-controlled visibility. Default false → renders null (zero spacing).
	 * INFO-003 정책 부재로 default 화면에 표면화하지 않는다.
	 */
	visible?: boolean;
	/** 진입 조건 분기 종류. copy 자체는 서버 응답(정책 부재, 발명 금지). */
	variant?: EntryCheckVariant;
	/** 서버가 제공하는 안내 본문. 미제공 시 렌더하지 않는다. */
	message?: string;
};

export const entryCheckConfig = defineComponentConfig<EntryCheckProps>({
	id: "ogn-mbr-entry-check",
	name: "EntryCheck",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "Legacy OGN / MBR-FP / Entry Check",
	},
});
