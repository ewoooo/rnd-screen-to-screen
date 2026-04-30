import { Button, TextButton } from "@wanteddev/wds";

import { Checkbox } from "@/components/molecules";
import {
	DiscoveryActions,
	GlobalNavigationHeader,
} from "@/components/organisms/global";
import { Box, HStack, VStack } from "@/components/atoms/layout";
import { AppScreenRoot } from "@/components/templates/app-screen";
import { BottomSheet } from "@/components/templates/bottom-sheet";
import { TuDisplay, TuSub } from "@/components/organisms/tu";

import { agreementBottomSheetFixture } from "./_mock";

const PAGE_BG = "var(--semantic-surface-page-normal)";
const PAGE_BG_SEMI = "var(--semantic-surface-page-semi)";

/**
 * TU-MY-AGR-MO-02-BS-001 · 혜택·이벤트 약관동의 BS (v2.1 톤)
 *
 * 부모 화면(MAIN-001-2 발견_case2_로그인) 위에 떠 있는 BS.
 * 부모 silhouette은 시스템 GlobalNavigationHeader(DiscoveryActions) + TuHero/TuDisplay
 * 그대로 흐릿하게 깔아 컨텍스트 명시.
 */
export default function AgreementBottomSheetPage() {
	const f = agreementBottomSheetFixture;

	return (
		<AppScreenRoot>
			<Box
				position="relative"
				width="100%"
				height="100%"
				background={PAGE_BG}
				overflow="hidden"
			>
				{/* 부모 화면 silhouette */}
				<Box
					position="absolute"
					style={{
						inset: 0,
						opacity: 0.35,
						filter: "blur(2px)",
						pointerEvents: "none",
					}}
				>
					<GlobalNavigationHeader
						actions={DiscoveryActions}
						background={PAGE_BG_SEMI}
					/>
					<Box style={{ padding: "130px var(--spacing-24) 0" }}>
						<TuDisplay size="lg">{`최우성 님,\n오늘은 어떤 구독을\n만나볼까요?`}</TuDisplay>
					</Box>
				</Box>

				<BottomSheet open>
					<VStack as="header" gap="inline">
						<TuDisplay as="h2" size="md">
							{`맞춤형 소식,\n받아보실래요?`}
						</TuDisplay>
						<TuSub>{f.description}</TuSub>
					</VStack>

					<VStack>
						{f.items.map((item) => (
							<HStack
								as="label"
								key={item.id}
								align="center"
								gap="stack"
								style={{
									cursor: "pointer",
								}}
							>
								<Checkbox defaultChecked={item.defaultChecked} />
								<span>{item.title}</span>
							</HStack>
						))}
					</VStack>

					<Button size="large" variant="solid" color="primary" fullWidth>
						{f.primaryAction}
					</Button>

					<VStack align="center">
						<TextButton color="assistive">{f.dismissAction}</TextButton>
					</VStack>
				</BottomSheet>
			</Box>
		</AppScreenRoot>
	);
}
