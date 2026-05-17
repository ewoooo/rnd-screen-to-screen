"use client";

import {
	ActionButton,
	AppBar,
	Icon,
	RQRContentsDetail,
	StatusBar,
	TitleMain,
} from "@pxds/cx-components";
import {
	AppScreen,
	PageStackContents,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";

const completionRows = [
	{ id: "changed-plan", label: "변경한 요금제", value: "5GX 프라임" },
	{ id: "request-status", label: "신청 결과", value: "변경 신청 완료" },
	{ id: "effective-date", label: "적용 시점", value: "2026.05.18" },
	{ id: "monthly-price", label: "월정액", value: "89,000원" },
] as const;

export function Screen() {
	return (
		<div data-theme="light">
			<AppScreen
				headerPreset="standard"
				background="var(--semantic-color-bg-default)"
			>
				<AppScreen.SystemHeader>
					<StatusBar />
				</AppScreen.SystemHeader>
				<AppScreen.Header>
					<AppBar
						title="요금제 변경"
						showLeftItem
						showTitle
						leftIcon={<Icon type="close" size={24} aria-label="닫기" />}
						leftLabel="닫기"
					/>
				</AppScreen.Header>
				<AppScreen.Content>
					<PageStackContents
						title={
							<TitleMain
								type="complete"
								title="요금제 변경 신청이 완료되었어요"
								subTitle="변경된 요금제는 안내된 적용 시점부터 이용할 수 있어요."
							/>
						}
					>
						<RQRContentsDetail title="변경 신청 정보" rows={completionRows} />
					</PageStackContents>
				</AppScreen.Content>
				<AppScreen.Bottom preset="primary-cta">
					<SinglePrimaryAction>
						<ActionButton
							type="default"
							buttonCount={2}
							actions={[
								{ label: "홈으로 이동", variant: "secondary" },
								{ label: "변경내역 보기", variant: "primary" },
							]}
						/>
					</SinglePrimaryAction>
				</AppScreen.Bottom>
			</AppScreen>
		</div>
	);
}
