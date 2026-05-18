"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { SocialButton } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "brand",
    title: "Brand theme",
    description:
      "Each provider rendered in its own brand color. The default theme.",
    preview: (
      <div className="flex flex-col gap-2">
        <SocialButton social="google">Sign in with Google</SocialButton>
        <SocialButton social="facebook">Sign in with Facebook</SocialButton>
        <SocialButton social="apple">Sign in with Apple</SocialButton>
        <SocialButton social="twitter">Sign in with X</SocialButton>
        <SocialButton social="figma">Sign in with Figma</SocialButton>
        <SocialButton social="dribble">Sign in with Dribbble</SocialButton>
      </div>
    ),
    code: `<SocialButton social="google">Sign in with Google</SocialButton>
<SocialButton social="facebook">Sign in with Facebook</SocialButton>
<SocialButton social="apple">Sign in with Apple</SocialButton>
<SocialButton social="twitter">Sign in with X</SocialButton>
<SocialButton social="figma">Sign in with Figma</SocialButton>
<SocialButton social="dribble">Sign in with Dribbble</SocialButton>`,
  },
  {
    id: "color",
    title: "Color theme",
    description:
      "Neutral surface, full-color provider logo. Lower visual weight than brand.",
    preview: (
      <div className="flex flex-col gap-2">
        <SocialButton social="google" theme="color">
          Sign in with Google
        </SocialButton>
        <SocialButton social="facebook" theme="color">
          Sign in with Facebook
        </SocialButton>
        <SocialButton social="apple" theme="color">
          Sign in with Apple
        </SocialButton>
      </div>
    ),
    code: `<SocialButton social="google" theme="color">Sign in with Google</SocialButton>
<SocialButton social="facebook" theme="color">Sign in with Facebook</SocialButton>
<SocialButton social="apple" theme="color">Sign in with Apple</SocialButton>`,
  },
  {
    id: "gray",
    title: "Gray theme",
    description: "Neutral surface, monochrome logo. The most restrained option.",
    preview: (
      <div className="flex flex-col gap-2">
        <SocialButton social="google" theme="gray">
          Sign in with Google
        </SocialButton>
        <SocialButton social="figma" theme="gray">
          Sign in with Figma
        </SocialButton>
        <SocialButton social="dribble" theme="gray">
          Sign in with Dribbble
        </SocialButton>
      </div>
    ),
    code: `<SocialButton social="google" theme="gray">Sign in with Google</SocialButton>
<SocialButton social="figma" theme="gray">Sign in with Figma</SocialButton>
<SocialButton social="dribble" theme="gray">Sign in with Dribbble</SocialButton>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "md and lg. Default is lg.",
    preview: (
      <div className="flex flex-col gap-2">
        <SocialButton social="google" size="md">
          Continue with Google
        </SocialButton>
        <SocialButton social="google" size="lg">
          Continue with Google
        </SocialButton>
      </div>
    ),
    code: `<SocialButton social="google" size="md">Continue with Google</SocialButton>
<SocialButton social="google" size="lg">Continue with Google</SocialButton>`,
  },
  {
    id: "icon-only",
    title: "Icon only",
    description: "Omit children for a square icon-only button.",
    preview: (
      <>
        <SocialButton social="google" />
        <SocialButton social="apple" />
        <SocialButton social="dribble" />
      </>
    ),
    code: `<SocialButton social="google" />
<SocialButton social="apple" />
<SocialButton social="dribble" />`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Non-interactive, 50% opacity.",
    preview: (
      <SocialButton social="google" disabled>
        Sign in with Google
      </SocialButton>
    ),
    code: `<SocialButton social="google" disabled>Sign in with Google</SocialButton>`,
  },
];

export default function SocialButtonPage() {
  return (
    <ComponentDocLayout
      name="SocialButton"
      tagline={
        <>
          OAuth provider sign-in. Six providers &times; three themes (brand /
          color / gray) &times; two sizes, plus icon-only.{" "}
          <code>asChild</code> for link rendering. Provider brand colors are
          mode-independent by design.
        </>
      }
      install={{
        usage: `import { SocialButton } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Gray bg / border", value: "--color-bg / border" },
        { label: "Gray hover bg", value: "--color-bg-tertiary" },
        { label: "Brand fills", value: "black · #1877F2 · #EA4C89" },
        { label: "Radius", value: "--radius-lg" },
        { label: "Focus ring", value: "brand-500/22" },
        { label: "Disabled fg", value: "--color-fg-disabled" },
      ]}
    />
  );
}
