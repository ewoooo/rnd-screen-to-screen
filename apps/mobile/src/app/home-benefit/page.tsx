import {
  GlobalNavigationBar,
  GlobalNavigationHeader,
} from "@/components/organisms/global";
import {
  Banner,
  HomeHeroBlock,
  HomeInfoBlock,
  ListRow,
  MyEditButton,
} from "@/components/organisms/home";
import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { Placeholder } from "@pxds/pxds-components/feedback";
import { TextBlock } from "@pxds/pxds-components/typography";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import { homeBenefitFixture } from "./_mock";
export default function HomeBenefitPage() {
  const f = homeBenefitFixture;
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
            w: 35,
            h: 56,
          }}
          imageLabel="card"
        />
        <HomeHeroBlock
          label={f.points.label}
          title={f.points.headline}
          ai={{
            icon: <Placeholder w={18} h={18} label="ai" />,
            text: `T 멤버십 사용 가능 포인트 ${f.points.availablePoints.toLocaleString()}P`,
          }}
          cta={{
            text: f.points.ctaText,
          }}
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
        <HomeInfoBlock
          label={f.brands.label}
          title={f.brands.countText}
          aside={<Placeholder w={40} h={40} label="icons" />}
        />
        <Banner
          variant="offering"
          text={f.offeringBanner.text}
          imageSize={{
            w: 72,
            h: 62,
          }}
        />
        <HomeInfoBlock
          label={f.movieSection.label}
          body={
            <VStack gap="stack">
              {f.movieSection.items.map((m) => (
                <ListRow
                  key={m.id}
                  thumb={{
                    w: 40,
                    h: 58,
                    label: "poster",
                  }}
                  title={m.title}
                  sub={m.subText}
                  pill="예매"
                />
              ))}
            </VStack>
          }
        />
        <HomeInfoBlock
          label={f.couponSection.label}
          title={f.couponSection.countText}
          body={
            <VStack gap="stack">
              {f.couponSection.items.map((c) => (
                <ListRow
                  key={c.id}
                  thumb={{
                    w: 40,
                    h: 40,
                    label: c.brand,
                  }}
                  title={c.title}
                  sub={c.subText}
                  pill="상세"
                />
              ))}
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
