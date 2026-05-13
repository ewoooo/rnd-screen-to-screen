import type { ReactNode } from "react";
import {
	BottomNavigation,
	BottomNavigationItem,
	Button,
	Card,
	CardContent,
	CardTitle,
	Checkbox,
	Chip,
	ContentBadge,
	IconButton,
	List,
	ListCell,
	ListCellContent,
	Modal,
	ModalContainer,
	ModalContent,
	ModalDimmer,
	ProgressIndicator,
	RadioGroup,
	RadioGroupItem,
	SectionMessage,
	TextButton,
	Thumbnail,
	TopNavigation,
	TopNavigationButton,
	Typography,
} from "./wds-adapter";

export type CorePreviewExample = {
	componentId: string;
	description: string;
	render: () => ReactNode;
};

function DemoIcon({ label }: { label: string }) {
	return (
		<span aria-hidden className="inline-grid h-5 w-5 place-items-center text-xs">
			{label}
		</span>
	);
}

export const wdsCorePreviewExamples = [
	{
		componentId: "wds-typography",
		description: "WDS typography primitive imported through PXDS core.",
		render: () => (
			<div className="grid gap-2">
				<Typography variant="caption1" weight="medium" color="semantic.primary.normal">
					WDS TYPOGRAPHY
				</Typography>
				<Typography variant="headline1" weight="bold">
					기본 텍스트 계층
				</Typography>
				<Typography variant="body2-reading" color="semantic.label.alternative">
					PXDS core 경계에서 WDS Typography를 그대로 확인합니다.
				</Typography>
			</div>
		),
	},
	{
		componentId: "wds-button",
		description: "WDS button primitive imported through PXDS core.",
		render: () => (
			<div className="flex gap-2">
				<Button size="medium" color="primary">
					확인
				</Button>
				<Button size="medium" variant="outlined" color="assistive">
					취소
				</Button>
			</div>
		),
	},
	{
		componentId: "wds-icon-button",
		description: "Icon-only WDS action button.",
		render: () => (
			<IconButton variant="outlined" size="medium">
				<DemoIcon label="!" />
			</IconButton>
		),
	},
	{
		componentId: "wds-text-button",
		description: "Text-only WDS action button.",
		render: () => <TextButton color="primary">자세히 보기</TextButton>,
	},
	{
		componentId: "wds-checkbox",
		description: "WDS checkbox primitive.",
		render: () => <Checkbox defaultChecked size="medium" />,
	},
	{
		componentId: "wds-radio-group-item",
		description: "WDS radio item primitive inside its required group context.",
		render: () => (
			<RadioGroup defaultValue="basic">
				<RadioGroupItem value="basic" />
			</RadioGroup>
		),
	},
	{
		componentId: "wds-chip",
		description: "WDS chip primitive.",
		render: () => (
			<div className="flex gap-2">
				<Chip active>전체</Chip>
				<Chip>인기</Chip>
			</div>
		),
	},
	{
		componentId: "wds-content-badge",
		description: "WDS content badge primitive.",
		render: () => (
			<ContentBadge variant="solid" color="accent" size="small">
				안내
			</ContentBadge>
		),
	},
	{
		componentId: "wds-thumbnail",
		description: "WDS thumbnail primitive.",
		render: () => (
			<Thumbnail width={104} ratio="1:1" border radius>
				<div className="grid h-full place-items-center text-neutral-400">
					<DemoIcon label="img" />
				</div>
			</Thumbnail>
		),
	},
	{
		componentId: "wds-progress-indicator",
		description: "WDS progress indicator primitive.",
		render: () => (
			<div className="w-80 max-w-full">
				<ProgressIndicator percent={42} />
			</div>
		),
	},
	{
		componentId: "wds-card",
		description: "WDS card surface.",
		render: () => (
			<Card width={280} platform="mobile">
				<CardContent>
					<CardTitle variant="headline2" weight="bold">
						카드 표면
					</CardTitle>
				</CardContent>
			</Card>
		),
	},
	{
		componentId: "wds-card-content",
		description: "WDS card content layout area.",
		render: () => (
			<Card width={280} platform="mobile">
				<CardContent>
					<Typography variant="body2">콘텐츠 영역</Typography>
					<Typography variant="caption1" color="semantic.label.alternative">
						Card 내부 조합 단위입니다.
					</Typography>
				</CardContent>
			</Card>
		),
	},
	{
		componentId: "wds-card-title",
		description: "WDS card title typography.",
		render: () => (
			<CardTitle variant="headline1" weight="bold">
				카드 제목
			</CardTitle>
		),
	},
	{
		componentId: "wds-list",
		description: "WDS list composition.",
		render: () => (
			<List className="w-80 max-w-full">
				<ListCell textProps={{ children: "첫 번째 항목" }} />
				<ListCell textProps={{ children: "두 번째 항목" }} divider />
			</List>
		),
	},
	{
		componentId: "wds-list-cell",
		description: "WDS list cell composition.",
		render: () => (
			<List className="w-80 max-w-full">
				<ListCell
					textProps={{
						children: "리스트 셀",
						caption: "leading/trailing 영역을 함께 확인합니다.",
					}}
					leadingContent={
						<ListCellContent variant="icon">
							<DemoIcon label="i" />
						</ListCellContent>
					}
					trailingContent={<ListCellContent variant="chevron" chevron />}
				/>
			</List>
		),
	},
	{
		componentId: "wds-list-cell-content",
		description: "WDS list cell content slot.",
		render: () => (
			<ListCellContent variant="icon">
				<DemoIcon label="i" />
			</ListCellContent>
		),
	},
	{
		componentId: "wds-radio-group",
		description: "WDS radio group composition.",
		render: () => (
			<RadioGroup className="flex gap-4" defaultValue="basic">
				<RadioGroupItem value="basic" />
				<RadioGroupItem value="premium" />
			</RadioGroup>
		),
	},
	{
		componentId: "wds-section-message",
		description: "WDS section message feedback block.",
		render: () => (
			<div className="w-80 max-w-full">
				<SectionMessage variant="info" description="상태 안내를 한 줄로 전달합니다.">
					안내
				</SectionMessage>
			</div>
		),
	},
	{
		componentId: "wds-top-navigation",
		description: "WDS top navigation organism.",
		render: () => (
			<div className="w-[390px] max-w-full bg-white">
				<TopNavigation
					leadingContent={
						<TopNavigationButton variant="icon">
							<DemoIcon label="x" />
						</TopNavigationButton>
					}
					trailingContent={
						<TopNavigationButton variant="icon">
							<DemoIcon label="m" />
						</TopNavigationButton>
					}
				>
					회원가입
				</TopNavigation>
			</div>
		),
	},
	{
		componentId: "wds-top-navigation-button",
		description: "WDS top navigation button.",
		render: () => (
			<TopNavigationButton variant="icon">
				<DemoIcon label="x" />
			</TopNavigationButton>
		),
	},
	{
		componentId: "wds-bottom-navigation",
		description: "WDS bottom navigation organism.",
		render: () => (
			<div className="w-[390px] max-w-full bg-white">
				<BottomNavigation defaultValue="home">
					<BottomNavigationItem value="home" label="홈" icon={<DemoIcon label="H" />} />
					<BottomNavigationItem value="search" label="검색" icon={<DemoIcon label="S" />} />
					<BottomNavigationItem value="my" label="MY" icon={<DemoIcon label="M" />} />
				</BottomNavigation>
			</div>
		),
	},
	{
		componentId: "wds-bottom-navigation-item",
		description: "WDS bottom navigation item inside its required navigation context.",
		render: () => (
			<BottomNavigation defaultValue="home">
				<BottomNavigationItem value="home" label="홈" icon={<DemoIcon label="H" />} />
			</BottomNavigation>
		),
	},
	{
		componentId: "wds-modal",
		description: "WDS modal context with a mounted container.",
		render: () => (
			<Modal open>
				<ModalContainer variant="popup" size="small" disablePortal>
					<ModalContent>
						<Typography variant="headline2" weight="bold">
							모달
						</Typography>
						<Typography variant="body2" color="semantic.label.alternative">
							컨텍스트와 컨테이너를 함께 렌더합니다.
						</Typography>
					</ModalContent>
				</ModalContainer>
			</Modal>
		),
	},
	{
		componentId: "wds-modal-container",
		description: "WDS modal container inside modal context.",
		render: () => (
			<Modal open>
				<ModalContainer variant="popup" size="small" disablePortal>
					<ModalContent>
						<Typography variant="body2">모달 컨테이너</Typography>
					</ModalContent>
				</ModalContainer>
			</Modal>
		),
	},
	{
		componentId: "wds-modal-content",
		description: "WDS modal content inside modal container.",
		render: () => (
			<Modal open>
				<ModalContainer variant="popup" size="small" disablePortal>
					<ModalContent>
						<Typography variant="body2">모달 콘텐츠</Typography>
					</ModalContent>
				</ModalContainer>
			</Modal>
		),
	},
	{
		componentId: "wds-modal-dimmer",
		description: "WDS modal dimmer inside modal container.",
		render: () => (
			<Modal open>
				<ModalContainer
					variant="popup"
					size="small"
					disablePortal
					dimmer={<ModalDimmer />}
				>
					<ModalContent>
						<Typography variant="body2">Dimmer 포함 모달</Typography>
					</ModalContent>
				</ModalContainer>
			</Modal>
		),
	},
] as const satisfies readonly CorePreviewExample[];
