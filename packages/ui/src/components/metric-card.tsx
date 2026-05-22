/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";
import {
  Sparkline,
  type SparklinePoint,
  type SparklineTone,
} from "./sparkline.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type MetricTrend = "up" | "down" | "flat";

export type MetricChangeStyle = "badge" | "text";

export type MetricIconColor =
  | "brand"
  | "success"
  | "error"
  | "warning"
  | "gray";

export interface MetricCardProps
  extends Omit<HTMLAttributes<HTMLElement>, "prefix" | "title"> {
  /** Heading shown above the metric value. */
  label: string;
  /** Primary metric value. */
  value?: ReactNode;
  /** Visual size of the value text. `lg` (default, 30px), `md` (24px), `sm` (20px), `xs` (16px). */
  valueSize?: "xs" | "sm" | "md" | "lg";
  /** Color tone of the value text. Defaults to `default` (`text-fg`). */
  valueTone?: "default" | "brand" | "success" | "warning" | "error";
  /** Optional change indicator (e.g. `"12%"`, `"+0.6pp"`). */
  change?: string;
  /** Direction of change — drives icon + color. */
  trend?: MetricTrend;
  /** Visual style of the change indicator. `badge` (default) = outlined chip with arrow; `text` = plain colored text. */
  changeStyle?: MetricChangeStyle;
  /**
   * Card layout.
   * `flat` (default) = single panel.
   * `framed` = outer label strip + inner framed body (Untitled hero pattern).
   * `compact` = compact KPI tile with tinted background matching `featuredIconColor`,
   *   icon rendered direct (no chip), no border. `change`/`spark`/`footer` are not
   *   rendered. Pair with a horizontally scrolling parent for the mobile "tile row" pattern.
   */
  variant?: "flat" | "framed" | "compact";
  /** Comparison copy. For `text` style, defaults to `"vs last week"`. For `badge` style, only renders when explicitly passed. */
  changeLabel?: string;
  /** Caption shown under the value row. Renders independent of `change`/`trend`. */
  helpText?: ReactNode;
  /** Inline prefix rendered before the value (e.g. `"$"`). */
  prefix?: ReactNode;
  /** Inline suffix rendered after the value (e.g. `"%"`). */
  suffix?: ReactNode;
  /** Shorthand sparkline data — rendered below the value. */
  spark?: SparklinePoint[];
  /** Override the sparkline tone. Defaults to match `trend`. */
  sparkTone?: SparklineTone;
  /** Override the change-row icon (defaults to `ArrowUpRight`/`ArrowDownRight`). */
  icon?: ReactNode;
  /** Featured icon shown as a 48px tinted circle. */
  featuredIcon?: ReactNode;
  /** Chip icon shown as a 32px bordered square. Alternative to `featuredIcon`. */
  iconChip?: ReactNode;
  /** Visual treatment when `iconChip` is set. `outline` = white bg + border; `tint` = colored fill. Defaults to `outline`. */
  iconChipStyle?: "outline" | "tint";
  /** Color of the featured or chip icon. Defaults to `success` for up, `error` for down, `gray` otherwise. */
  featuredIconColor?: MetricIconColor;
  /** Where to place the featured/chip icon relative to the label. Defaults to `above`. */
  iconPlacement?: "above" | "inline";
  /** Top-right action slot (e.g. dropdown trigger). */
  actions?: ReactNode;
  /** Full custom footer slot. Overrides `footerLabel`/`footerHref`. */
  footer?: ReactNode;
  /** Shorthand CTA label shown in a bordered footer ("View report" pattern). */
  footerLabel?: string;
  /** Href for the footer CTA. Required if `footerLabel` is set. */
  footerHref?: string;
  /** Render the entire card as a link. */
  href?: string;
  /** Show a loading skeleton instead of the value. */
  loading?: boolean;
  /**
   * Apply mobile-compact treatment below the `lg` breakpoint:
   * shrinks the value text one tier, hides `helpText`, and tightens
   * padding/gap. Desktop layout is unchanged. Defaults to `true`.
   */
  responsive?: boolean;
  /** Custom chart slot. Replaces the sparkline if both are passed. */
  children?: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Token tables                                                               */
/* -------------------------------------------------------------------------- */

const TREND_TONE: Record<MetricTrend, SparklineTone> = {
  up: "success",
  down: "error",
  flat: "neutral",
};

const TREND_TEXT_COLOR: Record<MetricTrend, string> = {
  up: "text-fg-success",
  down: "text-fg-error",
  flat: "text-fg-tertiary",
};

const TREND_ARROW_COLOR: Record<MetricTrend, string> = {
  up: "text-fg-success",
  down: "text-fg-error",
  flat: "text-fg-tertiary",
};

const FEATURED_ICON_BG: Record<MetricIconColor, string> = {
  brand: "bg-info-bg text-fg-brand",
  success: "bg-success-bg text-fg-success",
  error: "bg-error-bg text-fg-error",
  warning: "bg-warning-bg text-warning-fg",
  gray: "bg-neutral-bg text-fg-tertiary",
};

const FEATURED_ICON_TEXT: Record<MetricIconColor, string> = {
  brand: "text-fg-brand",
  success: "text-fg-success",
  error: "text-fg-error",
  warning: "text-warning-fg",
  gray: "text-fg-tertiary",
};

const DEFAULT_CHANGE_LABEL = "vs last week";

/* -------------------------------------------------------------------------- */
/*  Internal renderers                                                         */
/* -------------------------------------------------------------------------- */

function TrendArrowIcon({ trend }: { trend: MetricTrend }) {
  if (trend === "up") return <ArrowUpRight className="size-3" />;
  if (trend === "down") return <ArrowDownRight className="size-3" />;
  return null;
}

function PlainTrendIcon({ trend }: { trend: MetricTrend }) {
  if (trend === "up") return <TrendingUp className="size-4" />;
  if (trend === "down") return <TrendingDown className="size-4" />;
  return null;
}

function inferIconColor(trend?: MetricTrend): MetricIconColor {
  if (trend === "up") return "success";
  if (trend === "down") return "error";
  return "gray";
}

function ChangeBadge({
  trend,
  change,
  icon,
}: {
  trend?: MetricTrend | undefined;
  change: string;
  icon?: ReactNode | undefined;
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-bg py-0.5 pr-2 pl-1.5 shadow-xs"
      data-trend={trend ?? "flat"}
    >
      <span className={cn("inline-flex", trend ? TREND_ARROW_COLOR[trend] : "text-fg-tertiary")}>
        {icon !== undefined ? icon : trend ? <TrendArrowIcon trend={trend} /> : null}
      </span>
      <span className="text-sm font-medium text-fg-secondary">{change}</span>
    </span>
  );
}

function ChangeText({
  trend,
  change,
  icon,
}: {
  trend?: MetricTrend | undefined;
  change: string;
  icon?: ReactNode | undefined;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium",
        trend ? TREND_TEXT_COLOR[trend] : "text-fg-tertiary",
      )}
    >
      {icon !== undefined ? icon : trend ? <PlainTrendIcon trend={trend} /> : null}
      {change}
    </span>
  );
}

const VALUE_SIZE_CLASS = {
  xs: "text-base leading-6",
  sm: "text-xl leading-7",
  md: "text-2xl leading-8",
  lg: "text-3xl leading-9.5",
} as const;

const VALUE_SIZE_CLASS_RESPONSIVE = {
  xs: "text-base leading-6",
  sm: "text-base leading-6 lg:text-xl lg:leading-7",
  md: "text-lg leading-7 lg:text-2xl lg:leading-8",
  lg: "text-xl leading-7 lg:text-3xl lg:leading-9.5",
} as const;

const VALUE_TONE_CLASS = {
  default: "text-fg",
  brand: "text-fg-brand",
  success: "text-fg-success",
  warning: "text-warning-fg",
  error: "text-fg-error",
} as const;

const LOADING_SIZE_CLASS = {
  xs: "h-5 w-16",
  sm: "h-6 w-20",
  md: "h-7 w-24",
  lg: "h-9 w-24",
} as const;

function ValueBlock({
  loading,
  prefix,
  value,
  suffix,
  valueSize = "lg",
  valueTone = "default",
  responsive = true,
}: Pick<
  MetricCardProps,
  "loading" | "prefix" | "value" | "suffix" | "valueSize" | "valueTone" | "responsive"
>) {
  if (loading) {
    return (
      <span
        className={cn(
          "block animate-pulse rounded-md bg-bg-tertiary",
          LOADING_SIZE_CLASS[valueSize],
        )}
        aria-label="Loading metric value"
      />
    );
  }
  return (
    <span
      className={cn(
        "font-semibold",
        (responsive ? VALUE_SIZE_CLASS_RESPONSIVE : VALUE_SIZE_CLASS)[valueSize],
        VALUE_TONE_CLASS[valueTone],
      )}
    >
      {prefix ? <span className="mr-0.5 text-fg-tertiary">{prefix}</span> : null}
      {value}
      {suffix ? <span className="ml-0.5 text-fg-tertiary">{suffix}</span> : null}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export const MetricCard = forwardRef<HTMLElement, MetricCardProps>(function MetricCard(
  {
    label,
    value,
    valueSize = "lg",
    valueTone = "default",
    change,
    trend,
    changeStyle = "badge",
    variant = "flat",
    changeLabel,
    helpText,
    prefix,
    suffix,
    spark,
    sparkTone,
    icon,
    featuredIcon,
    iconChip,
    iconChipStyle = "outline",
    featuredIconColor,
    iconPlacement = "above",
    actions,
    footer,
    footerLabel,
    footerHref,
    href,
    loading = false,
    responsive = true,
    children,
    className,
    ...rest
  },
  ref,
) {
  const isLink = !!href && !footerLabel && !footer;
  const hasChange = !!change && !loading;
  const hasChart = !loading && (children || (spark && spark.length > 0));
  const sparklineTone = sparkTone ?? (trend ? TREND_TONE[trend] : "brand");
  const iconColor = featuredIconColor ?? inferIconColor(trend);
  const hasFooter = !!footer || (!!footerLabel && !!footerHref);
  const hasActions = !!actions;

  const valueAndChange = (
    <div className="flex w-full items-end justify-between gap-4">
      <ValueBlock loading={loading} prefix={prefix} value={value} suffix={suffix} valueSize={valueSize} valueTone={valueTone} responsive={responsive} />
      {hasChange ? (
        changeStyle === "badge" ? (
          <ChangeBadge trend={trend} change={change as string} icon={icon} />
        ) : null
      ) : null}
    </div>
  );

  const resolvedTextLabel =
    changeStyle === "text" ? changeLabel ?? DEFAULT_CHANGE_LABEL : undefined;

  const textChange =
    hasChange && changeStyle === "text" ? (
      <div className="flex flex-wrap items-center gap-2">
        <ChangeText trend={trend} change={change as string} icon={icon} />
        {resolvedTextLabel ? (
          <span className="text-sm font-medium text-fg-tertiary">{resolvedTextLabel}</span>
        ) : null}
      </div>
    ) : null;

  const badgeChangeLabel =
    hasChange && changeStyle === "badge" && changeLabel ? (
      <p className="text-sm font-medium text-fg-tertiary">{changeLabel}</p>
    ) : null;

  const helpTextNode = helpText ? (
    <p
      className={cn(
        "text-sm text-muted-fg",
        responsive && "hidden lg:block",
      )}
    >
      {helpText}
    </p>
  ) : null;

  const featuredIconNode = featuredIcon ? (
    <div
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full",
        FEATURED_ICON_BG[iconColor],
      )}
      aria-hidden="true"
    >
      {featuredIcon}
    </div>
  ) : null;

  const chipIconNode = iconChip ? (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-md",
        iconChipStyle === "tint"
          ? FEATURED_ICON_BG[iconColor]
          : cn("border border-border-secondary bg-bg shadow-xs", FEATURED_ICON_TEXT[iconColor]),
      )}
      aria-hidden="true"
    >
      {iconChip}
    </div>
  ) : null;

  const iconNode = featuredIconNode ?? chipIconNode;

  const headingRow = (
    <div
      className={cn(
        "flex flex-col gap-2",
        iconNode && iconPlacement === "inline" ? "flex-row items-center gap-3" : null,
      )}
    >
      {iconNode && iconPlacement === "inline" ? iconNode : null}
      <p className="text-sm font-medium text-fg-tertiary">{label}</p>
    </div>
  );

  const chartBlock = hasChart ? (
    <div className="-mx-1">
      {children ?? <Sparkline data={spark!} tone={sparklineTone} />}
    </div>
  ) : null;

  const innerFramedActions = hasActions && variant === "framed" ? (
    <div className="absolute top-3 right-3 z-10">{actions}</div>
  ) : null;

  const tintedIcon = featuredIcon ?? iconChip;
  const tintedBody = (
    <div
      className={cn(
        "flex items-center gap-3 p-4",
        responsive && "gap-2.5 p-3 lg:gap-3 lg:p-4",
      )}
    >
      {tintedIcon ? (
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-md",
            responsive ? "size-8 lg:size-9" : "size-9",
            FEATURED_ICON_BG[iconColor],
          )}
          aria-hidden="true"
        >
          {tintedIcon}
        </div>
      ) : null}
      <div className="flex min-w-0 flex-col">
        <ValueBlock
          loading={loading}
          prefix={prefix}
          value={value}
          suffix={suffix}
          valueSize={valueSize}
          valueTone={valueTone}
          responsive={responsive}
        />
        <span className="truncate text-xs font-medium text-fg-tertiary lg:text-sm">
          {label}
        </span>
      </div>
    </div>
  );

  const body =
    variant === "compact" ? (
      tintedBody
    ) : variant === "framed" ? (
      <div className="flex flex-col">
        <div className={cn("px-5 pt-3 pb-2", responsive && "px-4 lg:px-5")}>{headingRow}</div>
        <div
          className={cn(
            "relative m-px flex flex-col gap-5 rounded-xl border border-border-secondary bg-bg p-5 shadow-xs",
            responsive && "gap-4 p-4 lg:gap-5 lg:p-5",
          )}
        >
          {innerFramedActions}
          {iconNode && iconPlacement === "above" ? iconNode : null}
          <div className="flex flex-col gap-2">
            {valueAndChange}
            {textChange}
            {badgeChangeLabel}
            {helpTextNode}
          </div>
          {chartBlock}
        </div>
      </div>
    ) : (
      <div
        className={cn(
          "flex flex-col gap-5 p-5",
          responsive && "gap-4 p-4 lg:gap-5 lg:p-5",
        )}
      >
        {iconNode && iconPlacement === "above" ? iconNode : null}
        <div className="flex flex-col gap-2">
          {headingRow}
          {valueAndChange}
          {textChange}
          {badgeChangeLabel}
          {helpTextNode}
        </div>
        {chartBlock}
      </div>
    );

  const footerNode = hasFooter && variant !== "compact" ? (
    <div className="flex items-center justify-end border-t border-border-secondary px-5 py-4">
      {footer ??
        (footerLabel && footerHref ? (
          <a
            href={footerHref}
            className="inline-flex items-center gap-1 text-sm font-semibold text-fg-brand transition-colors hover:text-fg"
          >
            {footerLabel}
            <ArrowRight className="size-4" />
          </a>
        ) : null)}
    </div>
  ) : null;

  const classes = cn(
    "relative flex flex-col overflow-hidden rounded-xl",
    cn("border border-border-secondary shadow-xs", variant === "framed" ? "bg-bg-secondary" : "bg-bg"),
    isLink &&
      "group cursor-pointer transition-colors hover:bg-bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand",
    className,
  );

  const actionsSlot =
    hasActions && variant !== "framed" && variant !== "compact" ? (
      <div className="absolute top-3 right-3 z-10">{actions}</div>
    ) : null;

  if (isLink) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...(rest as HTMLAttributes<HTMLAnchorElement>)}
      >
        {actionsSlot}
        {body}
        {footerNode}
      </a>
    );
  }

  return (
    <section
      ref={ref as React.Ref<HTMLElement>}
      className={classes}
      {...rest}
    >
      {actionsSlot}
      {body}
      {footerNode}
    </section>
  );
});
MetricCard.displayName = "MetricCard";
