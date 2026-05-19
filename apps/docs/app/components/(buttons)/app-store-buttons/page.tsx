"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  AppGalleryButton,
  AppGalleryOutlineButton,
  AppStoreButton,
  AppStoreOutlineButton,
  GalaxyStoreButton,
  GalaxyStoreOutlineButton,
  GooglePlayButton,
  GooglePlayOutlineButton,
  MacAppStoreButton,
  MacAppStoreOutlineButton,
} from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "brand",
    title: "Brand badges",
    description:
      "Official store artwork (Figma Style=Brand). The whole badge is one inline SVG — never recolored (brand guidelines). Pass an href to the store listing.",
    preview: (
      <div className="flex flex-wrap gap-3">
        <GooglePlayButton href="#" />
        <AppStoreButton href="#" />
        <GalaxyStoreButton href="#" />
        <AppGalleryButton href="#" />
      </div>
    ),
    code: `<GooglePlayButton href="https://play.google.com/store/apps/details?id=…" />
<AppStoreButton href="https://apps.apple.com/app/id…" />
<GalaxyStoreButton href="…" />
<AppGalleryButton href="…" />`,
  },
  {
    id: "outline",
    title: "Outline badges",
    description:
      "Figma Style=Outline. Theme-adaptive — logo and border follow text-fg, so the badge reads on both light and dark surfaces.",
    preview: (
      <div className="flex flex-wrap gap-3">
        <GooglePlayOutlineButton href="#" />
        <AppStoreOutlineButton href="#" />
        <GalaxyStoreOutlineButton href="#" />
        <AppGalleryOutlineButton href="#" />
      </div>
    ),
    code: `<GooglePlayOutlineButton href="#" />
<AppStoreOutlineButton href="#" />
<GalaxyStoreOutlineButton href="#" />
<AppGalleryOutlineButton href="#" />`,
  },
  {
    id: "mac",
    title: "Mac App Store",
    description:
      "No MIT source in untitledui-react — extracted from the licensed Figma reference. Brand (solid black) and Outline (theme-adaptive).",
    preview: (
      <div className="flex flex-wrap items-center gap-3">
        <MacAppStoreButton href="#" />
        <MacAppStoreOutlineButton href="#" />
      </div>
    ),
    code: `<MacAppStoreButton href="https://apps.apple.com/app/id…" />
<MacAppStoreOutlineButton href="#" />`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Two sizes — md (40px tall) and lg (44px tall). Default is md.",
    preview: (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
          <GooglePlayButton href="#" size="md" />
          <AppStoreButton href="#" size="md" />
        </div>
        <div className="flex flex-wrap gap-3">
          <GooglePlayButton href="#" size="lg" />
          <AppStoreButton href="#" size="lg" />
        </div>
      </div>
    ),
    code: `<GooglePlayButton href="#" size="md" />
<AppStoreButton href="#" size="md" />

<GooglePlayButton href="#" size="lg" />
<AppStoreButton href="#" size="lg" />`,
  },
];

export default function AppStoreButtonsPage() {
  return (
    <ComponentDocLayout
      name="App Store Buttons"
      tagline={
        <>
          Official download badges — Google&nbsp;Play, App&nbsp;Store,
          Galaxy&nbsp;Store, AppGallery. Brand-mandated artwork, two sizes,
          native <code>&lt;a&gt;</code>.
        </>
      }
      install={{
        usage: `import { GooglePlayButton, AppStoreButton } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Badge background", value: "black (brand-mandated)" },
        { label: "Edge ring", value: "white/10 inset" },
        { label: "Radius", value: "7px (badge spec)" },
        { label: "Focus ring", value: "brand-500/22" },
      ]}
    />
  );
}
