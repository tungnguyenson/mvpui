/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/buttons/social-button.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn.js";
import {
  AppleLogo,
  DribbleLogo,
  FacebookLogo,
  FigmaLogo,
  FigmaLogoOutlined,
  GoogleLogo,
  TwitterLogo,
} from "./social-logos.js";

/* ==========================================================================
   SocialButton — OAuth provider sign-in button. Divergences from Untitled:
     1. Native <button> + Radix `Slot` (asChild) instead of react-aria
        Button/Link split — matches Button, defers react-aria (plan A1).
     2. No `text-alpha-black` token in MVP — theme="color" Apple/Twitter
        marks use `text-fg` instead (resolves dark in light mode, same
        visual intent).
   Provider brand fills (black / #1877F2 / #EA4C89) are brand-mandated and
   mode-independent — kept raw with `dark-ok` (plan A11 / dark-safe policy).
   ========================================================================== */

type Social = "google" | "facebook" | "apple" | "twitter" | "figma" | "dribble";
type Theme = "brand" | "color" | "gray";
type Size = "md" | "lg";

const ROOT =
  "group relative inline-flex h-max cursor-pointer items-center justify-center font-semibold whitespace-nowrap outline-none transition-all duration-100 ease-linear before:absolute focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-fg-disabled aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:text-fg-disabled aria-disabled:pointer-events-none";

const SIZES: Record<Size, { root: string; icon: string }> = {
  md: {
    root: "gap-2 rounded-lg px-3.5 py-2.5 text-sm before:rounded-[7px] data-[icon-only=true]:p-3",
    icon: "size-4",
  },
  lg: {
    root: "gap-2.5 rounded-lg px-4 py-2.5 text-md before:rounded-[7px] data-[icon-only=true]:p-3",
    icon: "size-5",
  },
};

const SKEUO_BORDER =
  "before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0%"; // dark-ok: inner bevel on a colored fill

const COLORS = {
  gray: {
    root: "bg-bg text-fg-secondary shadow-xs ring-1 ring-border ring-inset hover:enabled:bg-bg-tertiary hover:enabled:text-fg focus-visible:ring-brand-500/22",
    icon: "text-muted-fg group-hover:text-fg-tertiary",
  },
  black: {
    root: `bg-black text-white shadow-xs ring-1 ring-transparent ring-inset focus-visible:ring-brand-500/22 ${SKEUO_BORDER}`, // dark-ok: brand-mandated solid (Apple/Twitter/Figma)
    icon: "",
  },
  facebook: {
    root: `bg-[#1877F2] text-white shadow-xs ring-1 ring-transparent ring-inset hover:enabled:bg-[#0C63D4] focus-visible:ring-brand-500/22 ${SKEUO_BORDER}`, // dark-ok: Facebook brand hex
    icon: "",
  },
  dribble: {
    root: `bg-[#EA4C89] text-white shadow-xs ring-1 ring-transparent ring-inset hover:enabled:bg-[#E62872] focus-visible:ring-brand-500/22 ${SKEUO_BORDER}`, // dark-ok: Dribbble brand hex
    icon: "",
  },
} as const;

const SOCIAL_TO_COLOR: Record<Social, keyof typeof COLORS> = {
  google: "gray",
  facebook: "facebook",
  apple: "black",
  twitter: "black",
  figma: "black",
  dribble: "dribble",
};

export interface SocialButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** Provider. Selects the logo and (in `brand` theme) the fill color. */
  social: Social;
  /** `brand` = provider color · `color` = full-color logo on neutral · `gray` = monochrome on neutral. */
  theme?: Theme;
  size?: Size;
  /** Render styles onto the child element via Radix Slot (e.g. an `<a>`). */
  asChild?: boolean;
}

export const SocialButton = forwardRef<
  HTMLButtonElement,
  SocialButtonProps
>(
  (
    {
      social,
      theme = "brand",
      size = "lg",
      asChild = false,
      className,
      children,
      disabled,
      type,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isIconOnly = !children;

    const colorStyles =
      theme === "brand" ? COLORS[SOCIAL_TO_COLOR[social]] : COLORS.gray;

    const logos = {
      google: GoogleLogo,
      facebook: FacebookLogo,
      apple: AppleLogo,
      twitter: TwitterLogo,
      figma: theme === "gray" ? FigmaLogoOutlined : FigmaLogo,
      dribble: DribbleLogo,
    } as const;

    const Logo = logos[social];

    const logoTone =
      theme === "gray"
        ? colorStyles.icon
        : theme === "brand" &&
            (social === "facebook" ||
              social === "apple" ||
              social === "twitter")
          ? "text-white" // dark-ok: on a colored brand fill
          : theme === "color" && (social === "apple" || social === "twitter")
            ? "text-fg" // diverge: no alpha-black token; text-fg matches intent
            : "";

    const colorful =
      (theme === "brand" && (social === "google" || social === "figma")) ||
      (theme === "color" &&
        (social === "google" ||
          social === "facebook" ||
          social === "figma" ||
          social === "dribble"));

    return (
      <Comp
        ref={ref}
        data-icon-only={isIconOnly ? "true" : undefined}
        className={cn(
          ROOT,
          SIZES[size].root,
          colorStyles.root,
          className
        )}
        {...(asChild
          ? { "aria-disabled": disabled || undefined }
          : { type: type ?? "button", disabled })}
        {...props}
      >
        <Logo
          className={cn(
            "pointer-events-none shrink-0",
            SIZES[size].icon,
            logoTone
          )}
          colorful={colorful}
        />
        {children}
      </Comp>
    );
  }
);

SocialButton.displayName = "SocialButton";
