/**
 * Re-export shim — 실체는 모두 pilot-kit/*Pilot.tsx.
 * Phase 1+A 마이그레이션: home-kit text atom 8종 → pilot-kit 이전.
 *
 * - SectionLabel/MonoCaption/Heading20/AiText/ListTitle/ListSub: 이름 동일
 * - PillChip → BadgePillChipPilot, StatBadge → BadgeStatPilot (Badge 컨벤션)
 */
export { AiTextPilot as AiText } from "@/components/pilot-kit/AiTextPilot";
export { BadgePillChipPilot as PillChip } from "@/components/pilot-kit/BadgePillChipPilot";
export { BadgeStatPilot as StatBadge } from "@/components/pilot-kit/BadgeStatPilot";
export { Heading20Pilot as Heading20 } from "@/components/pilot-kit/Heading20Pilot";
export { ListSubPilot as ListSub } from "@/components/pilot-kit/ListSubPilot";
export { ListTitlePilot as ListTitle } from "@/components/pilot-kit/ListTitlePilot";
export { MonoCaptionPilot as MonoCaption } from "@/components/pilot-kit/MonoCaptionPilot";
export { SectionLabelPilot as SectionLabel } from "@/components/pilot-kit/SectionLabelPilot";
