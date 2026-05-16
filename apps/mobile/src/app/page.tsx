import { Box, HStack, VStack } from "@pxds/cx-layout/primitives";
import Link from "next/link";
import {
  isLegacyScreenId,
  isReferenceScreenId,
  type ScreenRoute,
  screenRoutes,
} from "@/scripts/screen-routes";

const referenceScreenRoutes = screenRoutes.filter((screen) =>
  isReferenceScreenId(screen.id),
);
const legacyScreenRoutes = screenRoutes.filter((screen) =>
  isLegacyScreenId(screen.id),
);

const sections = [
  {
    id: "reference",
    label: "MBR Reference",
    routes: referenceScreenRoutes,
  },
  {
    id: "legacy",
    label: "Membership Legacy",
    routes: legacyScreenRoutes,
  },
] as const satisfies readonly {
  id: string;
  label: string;
  routes: readonly ScreenRoute[];
}[];

export default function Home() {
  return (
    <VStack as="main" p="var(--semantic-spacing-block)" gap="var(--semantic-spacing-block)">
      <Box>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
          PXDX · mobile
        </h1>
        <p
          style={{
            color: "var(--semantic-label-alternative)",
            fontSize: 12,
            margin: "4px 0 0",
          }}
        >
          MBR {referenceScreenRoutes.length}개 · Membership{" "}
          {legacyScreenRoutes.length}개
        </p>
      </Box>

      {sections.map((section) => (
        <VStack as="section" key={section.id} gap="var(--semantic-spacing-inline)">
          <h2
            style={{
              fontSize: 12,
              fontWeight: 600,
              margin: 0,
              color: "var(--semantic-label-assistive)",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {section.label}
          </h2>
          <VStack as="nav" gap="var(--semantic-spacing-inline)">
            {section.routes.map((s) => (
              <Link
                key={s.id}
                href={s.route}
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: "var(--atomic-coolNeutral-10)",
                  color: "var(--semantic-static-white)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                <HStack justify="space-between" gap="var(--semantic-spacing-stack)">
                  <span>{s.label}</span>
                  <span
                    style={{
                      opacity: 0.5,
                      fontSize: 11,
                      fontFamily: "ui-monospace, SFMono-Regular, monospace",
                      textAlign: "right",
                    }}
                  >
                    /{s.id}
                  </span>
                </HStack>
              </Link>
            ))}
          </VStack>
        </VStack>
      ))}
    </VStack>
  );
}
