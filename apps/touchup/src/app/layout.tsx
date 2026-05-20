import type { PropsWithChildren } from "react";

import "@pxds/cx-tokens/style.css";
import "@pxds/cx-layout/styles.css";
import "@pxds/cx-components/styles.css";
import "@screen/mobile/organisms/chg-styles";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="ko" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
    <head>
      <title>PXDX · Puck Editor</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      <link
        rel="stylesheet"
        as="style"
        crossOrigin="anonymous"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-jp-dynamic-subset.css"
      />
      <link
        rel="stylesheet"
        as="style"
        crossOrigin="anonymous"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
      />
    </head>
    <body><TooltipProvider>{children}</TooltipProvider></body>
  </html>
);

export default RootLayout;
