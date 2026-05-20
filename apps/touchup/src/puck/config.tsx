"use client";

import type { Config } from "@puckeditor/core";
import {
  Accordion,
  AccordionList,
  ActionButton,
  AppBar,
  Badge,
  BadgeIcon,
  BannerHorizontal,
  Bottomsheet,
  Button,
  Callout,
  Checkbox,
  ChipItem,
  Chips,
  Divider,
  FilterSorting,
  Footer,
  Handle,
  IconButton,
  Indicator,
  ListSelected,
  ListText,
  PageStackList,
  Popup,
  RadioButton,
  RQRCard,
  RQRContentsDetail,
  RQRListOption,
  RQRNotice,
  SearchBar,
  SectionItem,
  StatusBar,
  Tab,
  TabItem,
  Text,
  TextField,
  TitleBottomSheet,
  TitleContents,
  TitleMain,
  TitleSection,
  Tooltip,
  UnderlineTab,
} from "@pxds/cx-components";

const sel = (options: string[]) =>
  options.map((value) => ({ label: value, value }));

const boolRadio = (label: string) => ({
  type: "radio" as const,
  label,
  options: [
    { label: "true", value: true },
    { label: "false", value: false },
  ],
});

export const puckConfig: Config = {
  root: {
    fields: {},
    render: ({ children }) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "24px",
          background: "#f0f0f0",
          minHeight: "100dvh",
        }}
      >
        <div className="mobile-shell">{children}</div>
      </div>
    ),
  },

  components: {
    // ── 텍스트 / 제목 ──────────────────────────────────
    TitleMain: {
      fields: {
        title: { type: "text", label: "제목" },
        subTitle: { type: "text", label: "부제목" },
      },
      defaultProps: { title: "제목" },
      render: ({ title, subTitle }) => (
        <TitleMain title={title} subTitle={subTitle} />
      ),
    },
    TitleSection: {
      fields: {
        title: { type: "text", label: "제목" },
      },
      defaultProps: { title: "섹션 제목" },
      render: ({ title }) => <TitleSection title={title} />,
    },
    TitleContents: {
      fields: {
        title: { type: "text", label: "제목" },
        subTitle: { type: "text", label: "부제목" },
      },
      defaultProps: { title: "콘텐츠 제목" },
      render: ({ title, subTitle }) => (
        <TitleContents title={title} subTitle={subTitle} />
      ),
    },
    TitleBottomSheet: {
      fields: {
        title: { type: "text", label: "제목" },
        subTitle: { type: "text", label: "부제목" },
      },
      defaultProps: { title: "바텀시트 제목" },
      render: ({ title, subTitle }) => (
        <TitleBottomSheet title={title} subTitle={subTitle} />
      ),
    },
    Text: {
      fields: {
        text: { type: "text", label: "텍스트" },
      },
      defaultProps: { text: "텍스트" },
      render: ({ text }) => <Text>{text}</Text>,
    },

    // ── 내비게이션 ────────────────────────────────────
    AppBar: {
      fields: {
        title: { type: "text", label: "제목" },
        showTitle: boolRadio("제목 표시"),
        showLeftItem: boolRadio("좌측 아이템"),
        showRightItem: boolRadio("우측 아이템"),
        leftLabel: { type: "text", label: "좌측 레이블" },
      },
      defaultProps: { title: "페이지 제목", showTitle: true, showLeftItem: true, showRightItem: false, leftLabel: "" },
      render: ({ title, showTitle, showLeftItem, showRightItem, leftLabel }) => (
        <AppBar title={title} showTitle={showTitle} showLeftItem={showLeftItem} showRightItem={showRightItem} leftLabel={leftLabel || undefined} />
      ),
    },
    StatusBar: {
      fields: {},
      defaultProps: {},
      render: () => <StatusBar />,
    },
    Tab: {
      fields: {
        label: { type: "text", label: "레이블" },
        value: { type: "text", label: "값" },
        disabled: boolRadio("비활성"),
      },
      defaultProps: { label: "탭", value: "tab", disabled: false },
      render: ({ label, value, disabled }) => (
        <Tab label={label} value={value} disabled={disabled} />
      ),
    },
    TabItem: {
      fields: {
        label: { type: "text", label: "레이블" },
        value: { type: "text", label: "값" },
      },
      defaultProps: { label: "탭 아이템", value: "item" },
      render: ({ label, value }) => <TabItem label={label} value={value} />,
    },
    UnderlineTab: {
      fields: {},
      defaultProps: {},
      render: () => <UnderlineTab />,
    },
    Footer: {
      fields: {},
      defaultProps: {},
      render: () => <Footer />,
    },

    // ── 버튼 ──────────────────────────────────────────
    Button: {
      fields: {
        label: { type: "text", label: "레이블" },
        variant: {
          type: "select",
          label: "Variant",
          options: sel(["primary", "secondary", "disabled"]),
        },
        size: {
          type: "select",
          label: "Size",
          options: sel(["small", "medium", "large", "xlarge"]),
        },
        fullWidth: boolRadio("Full width"),
        disabled: boolRadio("비활성"),
      },
      defaultProps: { label: "버튼", variant: "primary", size: "medium", fullWidth: false, disabled: false },
      render: ({ label, variant, size, fullWidth, disabled }) => (
        <Button variant={variant as "primary"} size={size as "medium"} fullWidth={fullWidth} disabled={disabled}>
          {label}
        </Button>
      ),
    },
    ActionButton: {
      fields: {
        label: { type: "text", label: "레이블" },
        variant: {
          type: "select",
          label: "Variant",
          options: sel(["primary", "secondary", "disabled"]),
        },
        disabled: boolRadio("비활성"),
      },
      defaultProps: { label: "액션 버튼", variant: "primary", disabled: false },
      render: ({ label, variant, disabled }) => (
        <ActionButton
          actions={[{ label, variant: variant as "primary", disabled }]}
        />
      ),
    },
    IconButton: {
      fields: {},
      defaultProps: {},
      render: () => <IconButton />,
    },

    // ── 입력 ──────────────────────────────────────────
    TextField: {
      fields: {
        label: { type: "text", label: "레이블" },
        defaultValue: { type: "text", label: "기본값" },
        placeholder: { type: "text", label: "Placeholder" },
        helperText: { type: "text", label: "도움말" },
        state: {
          type: "select",
          label: "State",
          options: sel(["default", "typed", "disabled"]),
        },
        disabled: boolRadio("비활성"),
      },
      defaultProps: { label: "", defaultValue: "", placeholder: "", helperText: "", state: "default", disabled: false },
      render: ({ label, defaultValue, placeholder, helperText, state, disabled }) => (
        <TextField
          label={label || undefined}
          defaultValue={defaultValue || undefined}
          placeholder={placeholder || undefined}
          helperText={helperText || undefined}
          state={state as "default"}
          disabled={disabled}
        />
      ),
    },
    Checkbox: {
      fields: {
        label: { type: "text", label: "레이블" },
        checked: boolRadio("체크"),
        disabled: boolRadio("비활성"),
      },
      defaultProps: { label: "체크박스", checked: false, disabled: false },
      render: ({ label, checked, disabled }) => (
        <Checkbox label={label} checked={checked} disabled={disabled} onCheckedChange={() => {}} />
      ),
    },
    RadioButton: {
      fields: {
        label: { type: "text", label: "레이블" },
        checked: boolRadio("선택"),
        disabled: boolRadio("비활성"),
      },
      defaultProps: { label: "라디오", checked: false, disabled: false },
      render: ({ label, checked, disabled }) => (
        <RadioButton label={label} checked={checked} disabled={disabled} />
      ),
    },
    SearchBar: {
      fields: {
        label: { type: "text", label: "레이블" },
        placeholder: { type: "text", label: "Placeholder" },
        disabled: boolRadio("비활성"),
      },
      defaultProps: { label: "검색", placeholder: "검색어를 입력하세요", disabled: false },
      render: ({ label, placeholder, disabled }) => (
        <SearchBar label={label} placeholder={placeholder} disabled={disabled} />
      ),
    },

    // ── 리스트 / 카드 ─────────────────────────────────
    ListText: {
      fields: {
        text: { type: "text", label: "텍스트" },
        showRightItem: boolRadio("우측 아이템"),
        showDivider: boolRadio("구분선"),
      },
      defaultProps: { text: "리스트 텍스트", showRightItem: false, showDivider: false },
      render: ({ text, showRightItem, showDivider }) => (
        <ListText text={text} showRightItem={showRightItem} showDivider={showDivider} />
      ),
    },
    ListSelected: {
      fields: {},
      defaultProps: {},
      render: () => <ListSelected />,
    },
    SectionItem: {
      fields: {
        text: { type: "text", label: "텍스트" },
      },
      defaultProps: { text: "섹션 아이템" },
      render: ({ text }) => <SectionItem>{text}</SectionItem>,
    },
    PageStackList: {
      fields: {},
      defaultProps: {},
      render: () => <PageStackList />,
    },
    Accordion: {
      fields: {
        title: { type: "text", label: "제목" },
        disabled: boolRadio("비활성"),
      },
      defaultProps: { title: "아코디언", disabled: false },
      render: ({ title, disabled }) => (
        <Accordion title={title} disabled={disabled} />
      ),
    },
    AccordionList: {
      fields: {},
      defaultProps: {},
      render: () => <AccordionList items={[]} />,
    },
    RQRCard: {
      fields: {},
      defaultProps: {},
      render: () => <RQRCard />,
    },
    RQRContentsDetail: {
      fields: {},
      defaultProps: {},
      render: () => <RQRContentsDetail rows={[]} />,
    },
    RQRListOption: {
      fields: {},
      defaultProps: {},
      render: () => <RQRListOption />,
    },

    // ── 피드백 / 상태 ─────────────────────────────────
    Badge: {
      fields: {
        text: { type: "text", label: "텍스트" },
        type: {
          type: "select",
          label: "Type",
          options: sel(["default", "primary", "secondary", "success", "warning", "error"]),
        },
      },
      defaultProps: { text: "배지", type: "default" },
      render: ({ text, type }) => <Badge text={text} type={type as "default"} />,
    },
    BadgeIcon: {
      fields: {},
      defaultProps: {},
      render: () => <BadgeIcon />,
    },
    Indicator: {
      fields: {},
      defaultProps: {},
      render: () => <Indicator />,
    },
    Callout: {
      fields: {
        title: { type: "text", label: "제목" },
      },
      defaultProps: { title: "Callout 제목" },
      render: ({ title }) => <Callout title={title} />,
    },
    Notice: {
      fields: {},
      defaultProps: {},
      render: () => <RQRNotice />,
    },
    BannerHorizontal: {
      fields: {},
      defaultProps: {},
      render: () => <BannerHorizontal />,
    },
    Popup: {
      fields: {},
      defaultProps: {},
      render: () => <Popup />,
    },
    Tooltip: {
      fields: {},
      defaultProps: {},
      render: () => <Tooltip />,
    },
    Chips: {
      fields: {},
      defaultProps: {},
      render: () => <Chips />,
    },
    ChipItem: {
      fields: {},
      defaultProps: {},
      render: () => <ChipItem />,
    },
    FilterSorting: {
      fields: {},
      defaultProps: {},
      render: () => <FilterSorting />,
    },

    // ── 구조 / 기타 ───────────────────────────────────
    Divider: {
      fields: {},
      defaultProps: {},
      render: () => <Divider />,
    },
    Handle: {
      fields: {},
      defaultProps: {},
      render: () => <Handle />,
    },
    Bottomsheet: {
      fields: {},
      defaultProps: {},
      render: () => <Bottomsheet />,
    },
  },

  categories: {
    "텍스트 / 제목": {
      components: ["TitleMain", "TitleSection", "TitleContents", "TitleBottomSheet", "Text"],
      defaultExpanded: true,
    },
    "내비게이션": {
      components: ["AppBar", "StatusBar", "Tab", "TabItem", "UnderlineTab", "Footer"],
      defaultExpanded: false,
    },
    "버튼": {
      components: ["Button", "ActionButton", "IconButton"],
      defaultExpanded: true,
    },
    "입력": {
      components: ["TextField", "Checkbox", "RadioButton", "SearchBar"],
      defaultExpanded: true,
    },
    "리스트 / 카드": {
      components: ["ListText", "ListSelected", "SectionItem", "PageStackList", "Accordion", "AccordionList", "RQRCard", "RQRContentsDetail", "RQRListOption"],
      defaultExpanded: false,
    },
    "피드백 / 상태": {
      components: ["Badge", "BadgeIcon", "Indicator", "Callout", "Notice", "BannerHorizontal", "Popup", "Tooltip", "Chips", "ChipItem", "FilterSorting"],
      defaultExpanded: false,
    },
    "구조 / 기타": {
      components: ["Divider", "Handle", "Bottomsheet"],
      defaultExpanded: false,
    },
  },
};
