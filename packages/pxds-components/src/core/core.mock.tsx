import type { ReactNode } from "react";
import {
	BottomNavigation,
	BottomNavigationItem,
	Button,
	Card,
	CardContent,
	CardThumbnail,
	CardTitle,
	Checkbox,
	Chip,
	ContentBadge,
	FormField,
	FormLabel,
	FormMessage,
	IconButton,
	List,
	ListCell,
	ListCellContent,
	Modal,
	ModalContainer,
	ModalContent,
	ModalDimmer,
	Option,
	OptionContent,
	OptionGroup,
	ProgressIndicator,
	RadioGroup,
	RadioGroupItem,
	SearchField,
	SectionMessage,
	Select,
	SelectContent,
	Switch,
	Tab,
	TabList,
	TabListItem,
	TextArea,
	TextAreaContent,
	TextButton,
	TextField,
	TextFieldButton,
	TextFieldContent,
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
	{
		componentId: "wds-card-thumbnail",
		description: "WDS card thumbnail media slot.",
		render: () => (
			<CardThumbnail width={160} ratio="16:9">
				<div className="grid h-full place-items-center text-neutral-400">
					<DemoIcon label="img" />
				</div>
			</CardThumbnail>
		),
	},
	{
		componentId: "wds-search-field",
		description: "WDS search field primitive.",
		render: () => (
			<div className="w-80 max-w-full">
				<SearchField placeholder="검색어를 입력하세요" />
			</div>
		),
	},
	{
		componentId: "wds-text-field",
		description: "WDS text field primitive.",
		render: () => (
			<div className="w-80 max-w-full">
				<TextField placeholder="입력하세요" />
			</div>
		),
	},
	{
		componentId: "wds-text-field-content",
		description: "WDS text field with leading/trailing content slots.",
		render: () => (
			<div className="w-80 max-w-full">
				<TextField>
					<TextFieldContent slot="leading">
						<DemoIcon label="@" />
					</TextFieldContent>
				</TextField>
			</div>
		),
	},
	{
		componentId: "wds-text-field-button",
		description: "WDS text field trailing action button.",
		render: () => (
			<div className="w-80 max-w-full">
				<TextField placeholder="입력하세요">
					<TextFieldButton slot="trailing">지우기</TextFieldButton>
				</TextField>
			</div>
		),
	},
	{
		componentId: "wds-text-area",
		description: "WDS text area primitive.",
		render: () => (
			<div className="w-80 max-w-full">
				<TextArea placeholder="내용을 입력하세요" />
			</div>
		),
	},
	{
		componentId: "wds-text-area-content",
		description: "WDS text area with content slot.",
		render: () => (
			<div className="w-80 max-w-full">
				<TextArea placeholder="내용을 입력하세요">
					<TextAreaContent slot="trailing">
						<Typography variant="caption1" color="semantic.label.alternative">
							0/200
						</Typography>
					</TextAreaContent>
				</TextArea>
			</div>
		),
	},
	{
		componentId: "wds-switch",
		description: "WDS switch toggle primitive.",
		render: () => (
			<div className="flex items-center gap-3">
				<Switch defaultChecked />
				<Switch />
			</div>
		),
	},
	{
		componentId: "wds-select",
		description: "WDS select dropdown composition.",
		render: () => (
			<div className="w-80 max-w-full">
				<Select>
					<SelectContent>
						<OptionGroup>
							<Option value="basic">기본 요금제</Option>
							<Option value="save">절약 요금제</Option>
							<Option value="premium">프리미엄 요금제</Option>
						</OptionGroup>
					</SelectContent>
				</Select>
			</div>
		),
	},
	{
		componentId: "wds-select-content",
		description: "WDS select content wrapper.",
		render: () => (
			<div className="w-80 max-w-full">
				<Select>
					<SelectContent>
						<Option value="a">옵션 A</Option>
						<Option value="b">옵션 B</Option>
					</SelectContent>
				</Select>
			</div>
		),
	},
	{
		componentId: "wds-option",
		description: "WDS select option item.",
		render: () => (
			<Select>
				<SelectContent>
					<Option value="example">선택 항목</Option>
				</SelectContent>
			</Select>
		),
	},
	{
		componentId: "wds-option-content",
		description: "WDS option with custom content slot.",
		render: () => (
			<Select>
				<SelectContent>
					<Option value="custom">
						<OptionContent>
							<DemoIcon label="★" />
							<span>프리미엄</span>
						</OptionContent>
					</Option>
				</SelectContent>
			</Select>
		),
	},
	{
		componentId: "wds-option-group",
		description: "WDS option group for grouping select items.",
		render: () => (
			<Select>
				<SelectContent>
					<OptionGroup title="요금제">
						<Option value="basic">기본</Option>
						<Option value="premium">프리미엄</Option>
					</OptionGroup>
				</SelectContent>
			</Select>
		),
	},
	{
		componentId: "wds-form-field",
		description: "WDS form field composition with label and message.",
		render: () => (
			<div className="w-80 max-w-full">
				<FormField>
					<FormLabel>이름</FormLabel>
					<TextField placeholder="홍길동" />
					<FormMessage>실명으로 입력해주세요.</FormMessage>
				</FormField>
			</div>
		),
	},
	{
		componentId: "wds-form-label",
		description: "WDS form label primitive.",
		render: () => <FormLabel>이름</FormLabel>,
	},
	{
		componentId: "wds-form-message",
		description: "WDS form hint/error message primitive.",
		render: () => (
			<div className="flex flex-col gap-2">
				<FormMessage>올바른 형식으로 입력해주세요.</FormMessage>
			</div>
		),
	},
	{
		componentId: "wds-tab",
		description: "WDS tab inside tab list context.",
		render: () => (
			<TabList defaultValue="all">
				<TabListItem value="all">
					<Tab>전체</Tab>
				</TabListItem>
				<TabListItem value="active">
					<Tab>진행중</Tab>
				</TabListItem>
			</TabList>
		),
	},
	{
		componentId: "wds-tab-list",
		description: "WDS tab list composition.",
		render: () => (
			<div className="w-[390px] max-w-full">
				<TabList defaultValue="all">
					<TabListItem value="all">
						<Tab>전체</Tab>
					</TabListItem>
					<TabListItem value="active">
						<Tab>진행중</Tab>
					</TabListItem>
					<TabListItem value="done">
						<Tab>완료</Tab>
					</TabListItem>
				</TabList>
			</div>
		),
	},
	{
		componentId: "wds-tab-list-item",
		description: "WDS tab list item slot.",
		render: () => (
			<TabList defaultValue="item">
				<TabListItem value="item">
					<Tab>항목</Tab>
				</TabListItem>
			</TabList>
		),
	},
] as const satisfies readonly CorePreviewExample[];
