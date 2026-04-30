"use client";

import { useState, type ReactNode } from "react";
import { FlexBox, Typography } from "@wanteddev/wds";
import { IconHome, IconList, IconPerson } from "@wanteddev/wds-icon";

import { BannerPilot } from "@/components/pilot-kit/BannerPilot";
import { ButtonSelectProductPilot } from "@/components/pilot-kit/ButtonSelectProductPilot";
import { ButtonSurveyOptionPilot } from "@/components/pilot-kit/ButtonSurveyOptionPilot";
import { ButtonTabbarPilot } from "@/components/pilot-kit/ButtonTabbarPilot";

function Row({
	title,
	figmaName,
	children,
}: {
	title: string;
	figmaName: string;
	children: ReactNode;
}) {
	return (
		<FlexBox flexDirection="column" gap={8} sx={{ paddingBottom: 16 }}>
			<FlexBox flexDirection="column" gap={2}>
				<Typography variant="body2" weight="bold">
					{title}
				</Typography>
				<Typography variant="caption1" weight="medium">
					Figma: {figmaName}
				</Typography>
			</FlexBox>
			<FlexBox flexDirection="column" gap={12}>
				{children}
			</FlexBox>
		</FlexBox>
	);
}

export default function AtomsMiscPreviewPage() {
	const [tab, setTab] = useState("home");
	const [survey, setSurvey] = useState<string>();
	const [plan, setPlan] = useState<string>();

	return (
		<FlexBox
			flexDirection="column"
			gap={16}
			sx={{ padding: 20, width: "100%", maxWidth: 360 }}
		>
			<FlexBox flexDirection="column" gap={2}>
				<Typography variant="title3" weight="bold">
					Atoms · Misc (4종)
				</Typography>
				<Typography variant="caption1" weight="medium">
					button-tabbar / button-survey-option / button-select-product / banner
				</Typography>
			</FlexBox>

			<Row title="ButtonTabbarPilot" figmaName="button-tabbar (state select/default, 68×64)">
				<FlexBox flexDirection="row" gap={0} alignItems="center">
					<ButtonTabbarPilot
						label="발견"
						icon={<IconHome width={24} height={24} />}
						state={tab === "home" ? "select" : "default"}
						onClick={() => setTab("home")}
					/>
					<ButtonTabbarPilot
						label="카테고리"
						icon={<IconList width={24} height={24} />}
						state={tab === "list" ? "select" : "default"}
						onClick={() => setTab("list")}
					/>
					<ButtonTabbarPilot
						label="나의 구독"
						icon={<IconPerson width={24} height={24} />}
						state={tab === "person" ? "select" : "default"}
						onClick={() => setTab("person")}
					/>
				</FlexBox>
			</Row>

			<Row title="ButtonSurveyOptionPilot" figmaName="button-survey-option (336×50)">
				{["전혀 그렇지 않다", "보통이다", "매우 그렇다"].map((opt) => (
					<ButtonSurveyOptionPilot
						key={opt}
						text={opt}
						selected={survey === opt}
						onClick={() => setSurvey(opt)}
					/>
				))}
				<ButtonSurveyOptionPilot text="비활성 옵션" disabled />
			</Row>

			<Row title="ButtonSelectProductPilot" figmaName="button-select-product (336×60)">
				{[
					{ id: "basic", title: "베이직", price: "9,900원" },
					{ id: "standard", title: "스탠다드", price: "13,500원" },
					{ id: "premium", title: "프리미엄", price: "17,900원" },
				].map((p) => (
					<ButtonSelectProductPilot
						key={p.id}
						title={p.title}
						price={p.price}
						selected={plan === p.id}
						onClick={() => setPlan(p.id)}
					/>
				))}
			</Row>

			<Row title="BannerPilot" figmaName="banner (size=midium 336×162 / small 360×78)">
				<BannerPilot
					title={"봄맞이 구독 페스타\n최대 50% 할인"}
					subTitle="기간 한정 프로모션"
					size="midium"
					imageSrc="https://picsum.photos/seed/banner-midium/672/324"
				/>
				<BannerPilot
					title="신규 가입 혜택"
					size="small"
					imageSrc="https://picsum.photos/seed/banner-small/720/156"
				/>
			</Row>
		</FlexBox>
	);
}
