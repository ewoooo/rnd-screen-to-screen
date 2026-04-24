"use client";

import { useState, type ReactNode } from "react";

import {
	Card,
	Heading20,
	ListRow,
	ListSub,
	MonoCaption,
	PillChip,
	Placeholder,
	SectionLabel,
	StatBadge,
	T_BRAND,
	T_BRAND_SHADOW,
} from "@/components/home-kit";
import {
	CARD_BG,
	GNB_BORDER,
	PAGE_BG,
	PAGE_BG_SEMI,
} from "@/components/home-kit/tokens";
import { mockProducts, type MockProduct } from "@/fixtures/products";

// product-detail v1-homekit — 상품상세(비로그인 단독상품)을 home-kit 톤으로 풀어낸 첫 구현.
// 데이터: data/screens/TU-DSP-PRDD-MO-06-PG-001-1.json (16개 SPEC)
// home-kit 의 Shell 은 GNB 가 있어 상세 페이지와 안 맞아, 셸은 인라인으로 구성하고
// 본문은 Card / SectionLabel / Heading20 / ListRow / Placeholder 로 통일한다.

const krw = (n: number) => `${n.toLocaleString("ko-KR")}원`;

const product = mockProducts[0];
const recommended = mockProducts.slice(1, 6);

const CARD_RADIUS = 24;

export default function ProductDetailV1HomekitPage() {
	const [tab, setTab] = useState<"info" | "usage">("info");
	const [liked, setLiked] = useState(false);

	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				background: PAGE_BG,
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<TopBar liked={liked} onToggleLike={() => setLiked((v) => !v)} />

			<div
				style={{
					flex: 1,
					overflowY: "auto",
					padding: "100px var(--spacing-12) 120px",
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-4)",
				}}
			>
				{/* SPEC-01 공지 배너 (snack-bar) */}
				<NoticeBanner
					notices={[
						"4/30(수) 02:00~04:00 결제 시스템 점검 안내",
						"가정의 달 프로모션 — 첫 구독 시 최대 50% 할인",
					]}
				/>

				{/* SPEC-02 상품 기본 정보: 이미지 + 페이지네이션 + 가격 */}
				<ProductHero product={product} />

				{/* SPEC-03 쿠폰 받기 */}
				<CouponCard />

				{/* SPEC-05 / SPEC-06 최대 할인 구독가 (tooltip + accordion) */}
				<DiscountAccordion />

				{/* SPEC-07 배송 정보 */}
				<Accordion title="배송 정보" sub="조건부 무료 / 평일 14시 이전 결제">
					<ListRow
						thumb={{ w: 32, h: 32, label: "ship" }}
						title="택배 배송"
						sub="3,000원 (5만원 이상 무료)"
					/>
					<ListRow
						thumb={{ w: 32, h: 32, label: "time" }}
						title="평일 14시 이전 결제 시 당일 출고"
						sub="주말·공휴일 제외"
					/>
				</Accordion>

				{/* SPEC-08 추천 프로모션 배너 */}
				<PromoBanner
					label="추천 프로모션"
					headline={"첫 구독 시\n5,000원 즉시 할인"}
					cta="자세히"
				/>

				{/* SPEC-09 / SPEC-10 탭 (상품정보 / 사용방법) */}
				<TabCard tab={tab} onChange={setTab} />

				{/* SPEC-11 추천 상품 리스트 */}
				<RecommendedCard products={recommended} />

				{/* SPEC-12 상품 문의 */}
				<Accordion title="상품 문의" sub="등록된 문의 8건">
					<ListRow
						thumb={{ w: 32, h: 32, label: "Q" }}
						title="배송이 얼마나 걸리나요?"
						sub="2026.04.20 · 답변완료"
						pill="답변"
					/>
					<ListRow
						thumb={{ w: 32, h: 32, label: "Q" }}
						title="구독 해지는 어디서 하나요?"
						sub="2026.04.18 · 답변완료"
						pill="답변"
					/>
				</Accordion>

				{/* SPEC-13 기타 정보 (상품 정보 고시) */}
				<Accordion title="상품 정보 고시" sub="법적 고지사항 포함">
					<MetaRow label="품명" value="넷플릭스 스탠다드 디지털 구독권" />
					<MetaRow label="제조사" value="Netflix Inc." />
					<MetaRow label="이용 기간" value="결제일로부터 30일" />
					<MetaRow label="환불 규정" value="구독 후 7일 이내, 미사용 시 가능" />
				</Accordion>
			</div>

			{/* SPEC-14 / SPEC-15 / SPEC-16 스티키 CTA 풋터 */}
			<StickyFooter />
		</div>
	);
}

/* ──────────────── shell parts ──────────────── */

function TopBar({
	liked,
	onToggleLike,
}: {
	liked: boolean;
	onToggleLike: () => void;
}) {
	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 10,
				background: PAGE_BG_SEMI,
				backdropFilter: "blur(7px)",
				WebkitBackdropFilter: "blur(7px)",
			}}
		>
			<div
				style={{
					height: 44,
					display: "flex",
					alignItems: "center",
					padding: "0 var(--spacing-20)",
					justifyContent: "space-between",
					fontSize: 15,
					fontWeight: 600,
					color: "var(--semantic-label-normal)",
				}}
			>
				<span>7:28</span>
				<Placeholder w={56} h={14} label="status" />
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "var(--spacing-10) var(--spacing-24) var(--spacing-16)",
				}}
			>
				<Placeholder w={24} h={24} label="back" />
				<div style={{ display: "flex", gap: "var(--spacing-20)" }}>
					<Placeholder w={24} h={24} label="share" />
					<button
						type="button"
						onClick={onToggleLike}
						style={{
							background: "transparent",
							border: "none",
							padding: 0,
							cursor: "pointer",
						}}
					>
						<Placeholder
							w={24}
							h={24}
							label={liked ? "♥" : "heart"}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

function StickyFooter() {
	return (
		<div
			style={{
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
				background: PAGE_BG_SEMI,
				backdropFilter: "blur(4px)",
				WebkitBackdropFilter: "blur(4px)",
				borderTop: `1px solid ${GNB_BORDER}`,
				padding:
					"var(--spacing-12) var(--spacing-20) var(--spacing-24)",
				display: "flex",
				gap: "var(--spacing-12)",
				alignItems: "center",
			}}
		>
			<button
				type="button"
				style={{
					height: 52,
					padding: "0 var(--spacing-20)",
					borderRadius: 14,
					border: "1px solid var(--semantic-line-normal-normal)",
					background: "transparent",
					fontSize: 13,
					fontWeight: 700,
					color: "var(--semantic-label-normal)",
					cursor: "pointer",
				}}
			>
				선물하기
			</button>
			<button
				type="button"
				style={{
					flex: 1,
					height: 52,
					borderRadius: 14,
					border: "none",
					background: T_BRAND,
					color: "#fff",
					fontSize: 15,
					fontWeight: 700,
					letterSpacing: "-0.6px",
					boxShadow: T_BRAND_SHADOW,
					cursor: "pointer",
				}}
			>
				구독하기
			</button>
		</div>
	);
}

/* ──────────────── content cards ──────────────── */

function NoticeBanner({ notices }: { notices: string[] }) {
	const [idx, setIdx] = useState(0);
	const cur = notices[idx];

	return (
		<button
			type="button"
			onClick={() => setIdx((i) => (i + 1) % notices.length)}
			style={{
				background: CARD_BG,
				border: `1px solid var(--semantic-line-normal-normal)`,
				borderRadius: CARD_RADIUS,
				padding: "var(--spacing-16) var(--spacing-20)",
				display: "flex",
				alignItems: "center",
				gap: "var(--spacing-12)",
				width: "100%",
				cursor: "pointer",
				textAlign: "left",
			}}
		>
			<StatBadge>공지</StatBadge>
			<span
				style={{
					flex: 1,
					minWidth: 0,
					fontSize: 13,
					fontWeight: 600,
					color: "var(--semantic-label-normal)",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				{cur}
			</span>
			<MonoCaption>
				{idx + 1}/{notices.length}
			</MonoCaption>
		</button>
	);
}

function ProductHero({ product }: { product: MockProduct }) {
	const [page, setPage] = useState(0);
	const total = 4;

	return (
		<Card
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-20)",
				padding: "var(--spacing-20)",
			}}
		>
			<div style={{ position: "relative" }}>
				<Placeholder w="100%" h={320} label={product.brand} />
				<div
					style={{
						position: "absolute",
						bottom: 12,
						left: "50%",
						transform: "translateX(-50%)",
						display: "flex",
						gap: 6,
					}}
				>
					{Array.from({ length: total }).map((_, i) => (
						<button
							type="button"
							key={i}
							onClick={() => setPage(i)}
							style={{
								width: i === page ? 16 : 6,
								height: 6,
								borderRadius: 3,
								border: "none",
								padding: 0,
								background:
									i === page
										? T_BRAND
										: "var(--semantic-fill-normal)",
								cursor: "pointer",
								transition: "width 0.2s",
							}}
							aria-label={`이미지 ${i + 1}`}
						/>
					))}
				</div>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-8)",
					padding: "0 var(--spacing-12)",
				}}
			>
				<div style={{ display: "flex", gap: "var(--spacing-6)" }}>
					{product.tags?.map((t) => (
						<StatBadge key={t}>{t}</StatBadge>
					))}
					{product.badge && <PillChip>{product.badge}</PillChip>}
				</div>
				<SectionLabel>{product.brand}</SectionLabel>
				<Heading20>{product.title}</Heading20>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-4)",
					padding: "0 var(--spacing-12)",
				}}
			>
				<span
					style={{
						fontSize: 12,
						fontWeight: 600,
						color: "var(--semantic-label-alternative)",
						textDecoration: "line-through",
					}}
				>
					{krw(15000)}
				</span>
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						gap: "var(--spacing-8)",
					}}
				>
					{product.discountRate ? (
						<span
							style={{
								fontSize: 22,
								fontWeight: 800,
								color: T_BRAND,
								letterSpacing: "-1px",
							}}
						>
							{product.discountRate}%
						</span>
					) : null}
					<span
						style={{
							fontSize: 22,
							fontWeight: 800,
							color: "var(--semantic-label-normal)",
							letterSpacing: "-1px",
						}}
					>
						{krw(product.priceKrw)}
					</span>
					<span
						style={{
							fontSize: 12,
							fontWeight: 600,
							color: "var(--semantic-label-alternative)",
						}}
					>
						/ 1개월
					</span>
				</div>
			</div>
		</Card>
	);
}

function CouponCard() {
	return (
		<Card
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "var(--spacing-12)",
				padding: "var(--spacing-20) var(--spacing-24)",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-4)",
					minWidth: 0,
				}}
			>
				<SectionLabel>적용 가능한 쿠폰 3장</SectionLabel>
				<span
					style={{
						fontSize: 16,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
						letterSpacing: "-0.64px",
					}}
				>
					최대 5,000원 할인
				</span>
			</div>
			<button
				type="button"
				style={{
					height: 40,
					padding: "0 var(--spacing-16)",
					borderRadius: 12,
					border: "none",
					background: T_BRAND,
					color: "#fff",
					fontSize: 13,
					fontWeight: 700,
					letterSpacing: "-0.52px",
					boxShadow: T_BRAND_SHADOW,
					cursor: "pointer",
					whiteSpace: "nowrap",
				}}
			>
				쿠폰 받기
			</button>
		</Card>
	);
}

function DiscountAccordion() {
	const [open, setOpen] = useState(true);
	const [tipOpen, setTipOpen] = useState(false);

	return (
		<Card
			style={{
				display: "flex",
				flexDirection: "column",
				gap: open ? "var(--spacing-20)" : 0,
				padding: "var(--spacing-20) var(--spacing-24)",
			}}
		>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				style={{
					background: "transparent",
					border: "none",
					padding: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					cursor: "pointer",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "var(--spacing-6)",
						minWidth: 0,
					}}
				>
					<span
						style={{
							fontSize: 15,
							fontWeight: 700,
							color: "var(--semantic-label-normal)",
							letterSpacing: "-0.6px",
						}}
					>
						최대 할인 구독가
					</span>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							setTipOpen((v) => !v);
						}}
						style={{
							background: "transparent",
							border: "none",
							padding: 0,
							cursor: "pointer",
						}}
						aria-label="할인 정보"
					>
						<Placeholder w={16} h={16} label="i" />
					</button>
				</div>
				<MonoCaption brand>{open ? "접기" : "펼치기"}</MonoCaption>
			</button>

			{tipOpen && (
				<div
					style={{
						background: "var(--semantic-fill-normal)",
						borderRadius: 12,
						padding: "var(--spacing-12) var(--spacing-16)",
						fontSize: 12,
						fontWeight: 600,
						color: "var(--semantic-label-normal)",
						lineHeight: 1.4,
					}}
				>
					구독 약정 기간과 결합 상품에 따라 산정된 최대 할인가입니다.
				</div>
			)}

			{open && (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-12)",
					}}
				>
					<DiscountRow label="기본가" value="13,500원" />
					<DiscountRow label="첫 달 할인" value="-2,000원" accent />
					<DiscountRow label="장기 약정 (12개월)" value="-1,500원" accent />
					<DiscountRow label="쿠폰 최대" value="-5,000원" accent />
					<div
						style={{
							borderTop: "1px solid var(--semantic-line-normal-normal)",
							paddingTop: "var(--spacing-12)",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<span
							style={{
								fontSize: 14,
								fontWeight: 700,
								color: "var(--semantic-label-normal)",
							}}
						>
							최대 할인가
						</span>
						<span
							style={{
								fontSize: 16,
								fontWeight: 800,
								color: T_BRAND,
								letterSpacing: "-0.64px",
							}}
						>
							5,000원
						</span>
					</div>
				</div>
			)}
		</Card>
	);
}

function DiscountRow({
	label,
	value,
	accent,
}: {
	label: string;
	value: string;
	accent?: boolean;
}) {
	return (
		<div style={{ display: "flex", justifyContent: "space-between" }}>
			<span
				style={{
					fontSize: 13,
					fontWeight: 600,
					color: "var(--semantic-label-alternative)",
				}}
			>
				{label}
			</span>
			<span
				style={{
					fontSize: 13,
					fontWeight: 700,
					color: accent ? T_BRAND : "var(--semantic-label-normal)",
				}}
			>
				{value}
			</span>
		</div>
	);
}

function Accordion({
	title,
	sub,
	children,
}: {
	title: string;
	sub?: string;
	children: ReactNode;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Card
			style={{
				display: "flex",
				flexDirection: "column",
				gap: open ? "var(--spacing-20)" : 0,
				padding: "var(--spacing-20) var(--spacing-24)",
			}}
		>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				style={{
					background: "transparent",
					border: "none",
					padding: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					cursor: "pointer",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-2)",
						alignItems: "flex-start",
					}}
				>
					<span
						style={{
							fontSize: 15,
							fontWeight: 700,
							color: "var(--semantic-label-normal)",
							letterSpacing: "-0.6px",
						}}
					>
						{title}
					</span>
					{sub && <ListSub>{sub}</ListSub>}
				</div>
				<MonoCaption brand>{open ? "접기" : "펼치기"}</MonoCaption>
			</button>
			{open && (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-12)",
					}}
				>
					{children}
				</div>
			)}
		</Card>
	);
}

function MetaRow({ label, value }: { label: string; value: string }) {
	return (
		<div
			style={{
				display: "flex",
				gap: "var(--spacing-16)",
				alignItems: "flex-start",
			}}
		>
			<span
				style={{
					width: 96,
					flexShrink: 0,
					fontSize: 13,
					fontWeight: 600,
					color: "var(--semantic-label-alternative)",
				}}
			>
				{label}
			</span>
			<span
				style={{
					flex: 1,
					fontSize: 13,
					fontWeight: 600,
					color: "var(--semantic-label-normal)",
					lineHeight: 1.4,
				}}
			>
				{value}
			</span>
		</div>
	);
}

function PromoBanner({
	label,
	headline,
	cta,
}: {
	label: string;
	headline: string;
	cta: string;
}) {
	return (
		<Card
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "var(--spacing-16)",
				padding: "var(--spacing-20) var(--spacing-24)",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-4)",
					minWidth: 0,
				}}
			>
				<SectionLabel>{label}</SectionLabel>
				<Heading20>{headline}</Heading20>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "var(--spacing-8)",
				}}
			>
				<Placeholder w={64} h={64} label="gift" />
				<PillChip>{cta}</PillChip>
			</div>
		</Card>
	);
}

function TabCard({
	tab,
	onChange,
}: {
	tab: "info" | "usage";
	onChange: (t: "info" | "usage") => void;
}) {
	return (
		<Card
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-20)",
				padding: "var(--spacing-20) var(--spacing-24)",
			}}
		>
			<div
				style={{
					display: "flex",
					gap: "var(--spacing-12)",
					borderBottom: "1px solid var(--semantic-line-normal-normal)",
				}}
			>
				<TabButton
					active={tab === "info"}
					onClick={() => onChange("info")}
				>
					상품 정보
				</TabButton>
				<TabButton
					active={tab === "usage"}
					onClick={() => onChange("usage")}
				>
					사용 방법
				</TabButton>
			</div>

			{tab === "info" ? (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-12)",
					}}
				>
					<Placeholder w="100%" h={200} label="상품 정보 콘텐츠" />
					<ListSub>
						HD/FHD 화질 동시 1대 시청 가능 · 광고 없음 · 다운로드 지원
					</ListSub>
				</div>
			) : (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-12)",
					}}
				>
					<UsageStep n={1} text="구독하기 버튼을 눌러 결제를 완료해주세요" />
					<UsageStep n={2} text="발송된 이용권 안내 문자를 확인해주세요" />
					<UsageStep n={3} text="앱에서 이메일 인증 후 바로 시청할 수 있어요" />
				</div>
			)}
		</Card>
	);
}

function TabButton({
	active,
	onClick,
	children,
}: {
	active: boolean;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			style={{
				background: "transparent",
				border: "none",
				padding: "var(--spacing-8) var(--spacing-4)",
				marginBottom: -1,
				borderBottom: `2px solid ${active ? T_BRAND : "transparent"}`,
				fontSize: 14,
				fontWeight: 700,
				color: active ? T_BRAND : "var(--semantic-label-alternative)",
				letterSpacing: "-0.56px",
				cursor: "pointer",
			}}
		>
			{children}
		</button>
	);
}

function UsageStep({ n, text }: { n: number; text: string }) {
	return (
		<div
			style={{
				display: "flex",
				gap: "var(--spacing-12)",
				alignItems: "flex-start",
			}}
		>
			<div
				style={{
					width: 24,
					height: 24,
					borderRadius: 999,
					background: T_BRAND,
					color: "#fff",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: 12,
					fontWeight: 800,
					flexShrink: 0,
				}}
			>
				{n}
			</div>
			<span
				style={{
					fontSize: 13,
					fontWeight: 600,
					color: "var(--semantic-label-normal)",
					lineHeight: 1.4,
					paddingTop: 4,
				}}
			>
				{text}
			</span>
		</div>
	);
}

function RecommendedCard({ products }: { products: MockProduct[] }) {
	return (
		<Card
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-20)",
				padding: "var(--spacing-20) var(--spacing-24)",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-4)",
				}}
			>
				<SectionLabel>이 상품과 함께 보는</SectionLabel>
				<Heading20>{"비슷한 가격대\n다른 구독 상품"}</Heading20>
			</div>
			<div
				style={{
					display: "flex",
					gap: "var(--spacing-12)",
					overflowX: "auto",
					marginLeft: "calc(var(--spacing-24) * -1)",
					marginRight: "calc(var(--spacing-24) * -1)",
					paddingLeft: "var(--spacing-24)",
					paddingRight: "var(--spacing-24)",
					scrollbarWidth: "none",
				}}
			>
				{products.map((p) => (
					<div
						key={p.id}
						style={{
							width: 132,
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							gap: "var(--spacing-8)",
						}}
					>
						<Placeholder w={132} h={132} label={p.brand} />
						<span
							style={{
								fontSize: 11,
								fontWeight: 700,
								color: "var(--semantic-label-alternative)",
								letterSpacing: "-0.44px",
							}}
						>
							{p.brand}
						</span>
						<span
							style={{
								fontSize: 13,
								fontWeight: 600,
								color: "var(--semantic-label-normal)",
								letterSpacing: "-0.52px",
								lineHeight: 1.3,
								display: "-webkit-box",
								WebkitLineClamp: 2,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
							}}
						>
							{p.title}
						</span>
						<span
							style={{
								fontSize: 13,
								fontWeight: 700,
								color: "var(--semantic-label-normal)",
								letterSpacing: "-0.52px",
							}}
						>
							{p.discountRate ? (
								<span
									style={{ color: T_BRAND, marginRight: 4 }}
								>
									{p.discountRate}%
								</span>
							) : null}
							{krw(p.priceKrw)}
						</span>
					</div>
				))}
			</div>
		</Card>
	);
}
