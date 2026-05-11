import {
  GlobalNavigationBar,
  GlobalNavigationHeader,
} from "@pxds/pxds-components/shared/global";
import {
  Banner,
  HomeActionPairBlock,
  HomeHeroBlock,
  HomeInfoBlock,
  MyEditButton,
  StatBadge,
} from "@pxds/pxds-components/home";
import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { Placeholder } from "@pxds/pxds-components/atoms/feedback";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import { homeDeviceChangeFixture } from "./_mock";
export default function HomeDeviceChangePage() {
  const f = homeDeviceChangeFixture;
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <GlobalNavigationHeader />
      </AppScreen.Header>
      <AppScreen.Content>
        <Banner
          variant="top"
          text={f.topBanner.text}
          imageSize={{
            w: 62,
            h: 94,
          }}
          imageLabel="iPhone"
        />
        <HomeHeroBlock
          label={f.hero.label}
          title={f.hero.headline}
          ai={{
            icon: <Placeholder w={18} h={18} label="ai" />,
            text: f.hero.aiText,
          }}
          cta={{
            text: f.hero.ctaText,
          }}
        />
        {f.stats.slice(0, 2).map((s) => (
          <HomeInfoBlock
            key={s.id}
            label={s.label}
            title={s.value}
            badge={s.badge ? <StatBadge>{s.badge}</StatBadge> : undefined}
            aside={s.graphic ? <Placeholder {...s.graphic} /> : undefined}
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
          text={f.galaxyBanner.text}
          imageSize={{
            w: 72,
            h: 62,
          }}
          imageLabel="phone"
        />
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
        {f.stats.slice(2).map((s) => (
          <HomeInfoBlock
            key={s.id}
            label={s.label}
            title={s.value}
            badge={s.badge ? <StatBadge>{s.badge}</StatBadge> : undefined}
            aside={s.graphic ? <Placeholder {...s.graphic} /> : undefined}
          />
        ))}
        <MyEditButton />
      </AppScreen.Content>
      <AppScreen.Bottom>
        <GlobalNavigationBar />
      </AppScreen.Bottom>
    </AppScreen>
  );
}
