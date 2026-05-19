/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import {
  GoogleLogo, FigmaLogo, FigmaLogoOutlined, DribbleLogo, FacebookLogo,
  AppleLogo, TwitterLogo, GitHubLogo, DiscordLogo, LinkedInLogo,
  InstagramLogo, YouTubeLogo, RedditLogo, TikTokLogo,
} from "@mvp-ui/ui";
import React from "react";
import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & { colorful?: boolean };

const ALL_LOGOS: { name: string; Component: (p: LogoProps) => React.JSX.Element }[] = [
  { name: "GoogleLogo", Component: GoogleLogo },
  { name: "FigmaLogo", Component: FigmaLogo },
  { name: "FigmaLogoOutlined", Component: FigmaLogoOutlined },
  { name: "DribbleLogo", Component: DribbleLogo },
  { name: "FacebookLogo", Component: FacebookLogo },
  { name: "AppleLogo", Component: AppleLogo },
  { name: "TwitterLogo", Component: TwitterLogo },
  { name: "GitHubLogo", Component: GitHubLogo },
  { name: "DiscordLogo", Component: DiscordLogo },
  { name: "LinkedInLogo", Component: LinkedInLogo },
  { name: "InstagramLogo", Component: InstagramLogo },
  { name: "YouTubeLogo", Component: YouTubeLogo },
  { name: "RedditLogo", Component: RedditLogo },
  { name: "TikTokLogo", Component: TikTokLogo },
];

export default function SocialIconsPage() {
  return (
    <div className="space-y-10 p-8">
      <div>
        <h1 className="text-fg text-2xl font-semibold">Social Icons</h1>
        <p className="text-fg-secondary mt-1 text-sm">
          {ALL_LOGOS.length} social platform logos. Each accepts a{" "}
          <code className="text-fg-brand bg-bg-secondary rounded px-1 py-0.5 text-xs">colorful</code>{" "}
          prop for brand-color rendering.
        </p>
        <pre className="bg-bg-secondary text-fg-secondary mt-3 rounded-lg p-3 text-xs">
          {`import { GoogleLogo, GitHubLogo } from "@mvp-ui/ui";`}
        </pre>
      </div>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Monochrome</h2>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-7">
          {ALL_LOGOS.map(({ name, Component }) => (
            <div
              key={name}
              className="border-border bg-bg flex flex-col items-center gap-2 rounded-xl border p-4"
            >
              <Component className="size-6" />
              <span className="text-fg-tertiary text-center text-xs leading-tight">{name.replace("Logo", "")}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">
          Colorful{" "}
          <code className="text-fg-secondary bg-bg-secondary rounded px-1 py-0.5 text-sm font-normal">colorful</code>
        </h2>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-7">
          {ALL_LOGOS.map(({ name, Component }) => (
            <div
              key={name}
              className="border-border bg-bg flex flex-col items-center gap-2 rounded-xl border p-4"
            >
              <Component className="size-6" colorful />
              <span className="text-fg-tertiary text-center text-xs leading-tight">{name.replace("Logo", "")}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
