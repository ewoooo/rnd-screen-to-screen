import { PrimaryCTABar } from "@/components/molecules";
import { GlobalCloseHeader } from "@/components/organisms/global";
import {
  PermissionIntro,
  PermissionList,
  PermissionNotice,
} from "@/components/organisms/tu";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import { permissionGuideFixture } from "./_mock";

/**
 * TU-DSP-MAIN-MO-02-PG-002 · 접근권한 안내 (v2.1 톤)
 *
 * 글로벌: AppScreen + 닫기만 있는 minimal top
 * bottom slot으로 sticky CTA 흡수.
 */
export default function PermissionGuidePage() {
  const f = permissionGuideFixture;
  return (
    <AppScreen background="var(--semantic-surface-page-normal)">
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <GlobalCloseHeader />
      </AppScreen.Header>
      <AppScreen.Content>
        <PermissionIntro
          title={`앱 이용에\n필요한 권한을\n안내드려요`}
          description={f.description}
        />
        <PermissionList label="필수 접근 권한" items={f.required} />
        <PermissionList label="선택 접근 권한" items={f.optional} />
        <PermissionNotice>{f.footnote}</PermissionNotice>
      </AppScreen.Content>
      <AppScreen.Bottom>
        <PrimaryCTABar primaryLabel={f.primaryAction} />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
