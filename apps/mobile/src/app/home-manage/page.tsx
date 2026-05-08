import {
  GlobalNavigationBar,
  GlobalNavigationHeader,
} from "@/components/organisms/global";
import {
  Banner,
  HomeActionPairBlock,
  HomeHeroBlock,
  HomeInfoBlock,
  MyEditButton,
  StatBadge,
} from "@/components/organisms/home";
import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { Placeholder } from "@pxds/pxds-components/feedback";
import { TextBlock } from "@pxds/pxds-components/typography";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import { homeManageFixture } from "./_mock";
const graphicSize: Record<
  (typeof homeManageFixture.stats)[number]["graphic"],
  {
    w: number;
    h: number;
    label: string;
  }
> = {
  family: {
    w: 48,
    h: 48,
    label: "family",
  },
  "progress-large": {
    w: 50,
    h: 50,
    label: "prog",
  },
  bill: {
    w: 48,
    h: 48,
    label: "bill",
  },
  "progress-small": {
    w: 40,
    h: 40,
    label: "prog",
  },
};
export default function HomeManagePage() {
  const f = homeManageFixture;
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <GlobalNavigationHeader />
      </AppScreen.Header>
      <AppScreen.Content>
        <Banner
          variant="top"
          text={f.headerBanner.text}
          imageSize={{
            w: 59,
            h: 47,
          }}
          imageLabel="gift"
        />
        <HomeHeroBlock
          label={f.diagnosis.label}
          title={f.diagnosis.headline}
          ai={{
            icon: <Placeholder w={18} h={18} label="ai" />,
            text: f.diagnosis.aiText,
          }}
          cta={{
            text: f.diagnosis.ctaText,
          }}
        />
        {f.stats.slice(0, 2).map((s) => (
          <HomeInfoBlock
            key={s.id}
            label={s.label}
            title={s.value}
            badge={s.badge ? <StatBadge>{s.badge}</StatBadge> : undefined}
            aside={<Placeholder {...graphicSize[s.graphic]} />}
          />
        ))}
        <HomeActionPairBlock
          left={{
            icon: <Placeholder w={20} h={20} label="ic" />,
            label: f.dualMenu[0].label,
          }}
          right={{
            icon: <Placeholder w={20} h={20} label="ic" />,
            label: f.dualMenu[1].label,
          }}
        />
        <Banner
          variant="offering"
          text={f.offeringBanner.text}
          imageSize={{
            w: 72,
            h: 62,
          }}
        />
        {f.stats.slice(2).map((s) => (
          <HomeInfoBlock
            key={s.id}
            label={s.label}
            title={s.value}
            badge={s.badge ? <StatBadge>{s.badge}</StatBadge> : undefined}
            aside={<Placeholder {...graphicSize[s.graphic]} />}
          />
        ))}
        <HomeInfoBlock
          label={f.barcode.label}
          body={
            <VStack gap="row">
              <Placeholder w="100%" h={48} label="barcode" />
              <HStack justify="space-between" align="center">
                <HStack gap="inline">
                  {f.barcode.digits.map((d) => (
                    <TextBlock
                      key={d}
                      variant="meta"
                      text={d}
                      color="semantic.label.alternative"
                    />
                  ))}
                </HStack>
                <TextBlock
                  variant="meta"
                  text={f.barcode.timerText}
                  color="semantic.primary.normal"
                />
              </HStack>
            </VStack>
          }
        />
        <MyEditButton />
      </AppScreen.Content>
      <AppScreen.Bottom>
        <GlobalNavigationBar />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
