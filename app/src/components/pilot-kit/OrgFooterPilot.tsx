"use client";

import { FlexBox, Typography } from "@wanteddev/wds";

import { BtnTextPilot } from "./BtnTextPilot";

export type CompanyInfoEntry = { label: string; value: string };

const InfoLine = ({ label, value }: CompanyInfoEntry) => (
	<Typography
		variant="caption1"
		weight="medium"
		sx={{ fontSize: 12, lineHeight: "14px", color: "#6c6c6c" }}
	>
		{`${label}  ${value}`}
	</Typography>
);

const VDivider = () => (
	<div style={{ width: 1, height: 8, background: "#eee", flexShrink: 0 }} />
);

// Figma .org/footer (360×~522) — 화면 하단 footer (SK텔레콤 정보 + 약관 + 패밀리)
// Source: data/binding/overrides/org-footer.json
export function OrgFooterPilot({
	showFamilySite = true,
	companyName = "SK텔레콤(주)",
	companyInfo = [
		{ label: "대표이사/사장", value: "정재헌" },
		{ label: "주소", value: "서울 특별시 중구 을지로 65(을지로2가)" },
		{ label: "사업자등록번호", value: "104-81-37225" },
		{ label: "판매허가번호", value: "중구 02923호" },
	],
	disclaimer = "제 3자가 판매하는 상품 및 거래의 경우 SK텔레콤(주)은 통신 판매 중개자이며, 통신판매의 당사자가 아닙니다. 따라서 상품 및 거래에 관한 의무와 책임은 판매자에게 있습니다.",
	legalLinksRow1 = ["이용약관", "개인정보처리방침", "청소년보호정책"],
	legalLinksRow2 = ["사업자정보확인", "분쟁조정"],
	familySites = ["T world", "T deal", "T 우주", "Wave"],
	copyright = "SK telecom., LTD",
}: {
	showFamilySite?: boolean;
	companyName?: string;
	companyInfo?: readonly CompanyInfoEntry[];
	disclaimer?: string;
	legalLinksRow1?: readonly string[];
	legalLinksRow2?: readonly string[];
	familySites?: readonly string[];
	copyright?: string;
}) {
	return (
		<FlexBox
			flexDirection="column"
			gap={30}
			alignItems="center"
			sx={{
				width: 360,
				background: "#f6f6f6",
				paddingBottom: 70,
			}}
		>
			<div style={{ width: "100%", height: 10, background: "#f2f2f2" }} />

			<FlexBox flexDirection="column" gap={20} alignItems="center">
				<FlexBox flexDirection="column" gap={20} alignItems="flex-start" sx={{ width: 312 }}>
					<Typography
						variant="body1"
						weight="bold"
						sx={{ fontSize: 16, lineHeight: "20px", color: "#000" }}
					>
						{companyName}
					</Typography>

					<FlexBox flexDirection="column" gap={9}>
						{companyInfo.map((entry) => (
							<InfoLine key={entry.label} label={entry.label} value={entry.value} />
						))}
						<FlexBox flexDirection="row" gap={1} alignItems="center">
							<Typography
								variant="caption1"
								weight="medium"
								sx={{ fontSize: 12, lineHeight: "14px", color: "#6c6c6c" }}
							>
								고객센터  국번없이
							</Typography>
							<BtnTextPilot text="1599-0011" type="line" weight="medium" />
							<Typography
								variant="caption1"
								weight="medium"
								sx={{ fontSize: 12, lineHeight: "14px", color: "#6c6c6c" }}
							>
								(유료/유선, 타사고객)
							</Typography>
						</FlexBox>
						<FlexBox flexDirection="row" alignItems="center">
							<BtnTextPilot text="114" type="line" weight="medium" />
							<Typography
								variant="caption1"
								weight="medium"
								sx={{ fontSize: 12, lineHeight: "14px", color: "#6c6c6c" }}
							>
								(무료/SK텔레콤 휴대폰)
							</Typography>
						</FlexBox>
					</FlexBox>

					<Typography
						variant="caption1"
						weight="medium"
						sx={{
							fontSize: 12,
							lineHeight: "14px",
							color: "#6c6c6c",
							width: 312,
							whiteSpace: "pre-wrap",
						}}
					>
						{disclaimer}
					</Typography>

					<FlexBox flexDirection="column" gap={24} alignItems="flex-start">
						<FlexBox flexDirection="row" gap={8} alignItems="center">
							{legalLinksRow1.map((label, i) => (
								<FlexBox key={label} flexDirection="row" gap={8} alignItems="center">
									<BtnTextPilot text={label} type="line" weight="bold" />
									{i < legalLinksRow1.length - 1 && <VDivider />}
								</FlexBox>
							))}
						</FlexBox>
						<FlexBox flexDirection="row" gap={8} alignItems="center">
							{legalLinksRow2.map((label, i) => (
								<FlexBox key={label} flexDirection="row" gap={8} alignItems="center">
									<BtnTextPilot text={label} type="line" weight="bold" />
									{i < legalLinksRow2.length - 1 && <VDivider />}
								</FlexBox>
							))}
						</FlexBox>
					</FlexBox>
				</FlexBox>

				{showFamilySite && (
					<FlexBox flexDirection="column" gap={20} alignItems="center">
						<div style={{ width: 312, height: 1, background: "#eee" }} />
						<FlexBox flexDirection="column" gap={30} alignItems="flex-start" sx={{ width: 312 }}>
							<FlexBox flexDirection="column" gap={24} alignItems="flex-start">
								<Typography
									variant="caption1"
									weight="medium"
									sx={{ fontSize: 12, lineHeight: "14px", color: "#6c6c6c" }}
								>
									패밀리 사이트
								</Typography>
								<FlexBox flexDirection="row" gap={12} alignItems="center">
									{familySites.map((label, i) => (
										<FlexBox key={label} flexDirection="row" gap={12} alignItems="center">
											<Typography
												variant="caption1"
												weight="medium"
												sx={{ fontSize: 12, lineHeight: "14px", color: "#1a1a1a" }}
											>
												{label}
											</Typography>
											{i < familySites.length - 1 && <VDivider />}
										</FlexBox>
									))}
								</FlexBox>
							</FlexBox>
							<Typography
								variant="caption1"
								weight="medium"
								sx={{ fontSize: 12, lineHeight: "14px", color: "#6c6c6c" }}
							>
								{copyright}
							</Typography>
						</FlexBox>
					</FlexBox>
				)}
			</FlexBox>
		</FlexBox>
	);
}
