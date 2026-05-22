"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Standalone comparison page — no sidebar, no chrome.
 * Open in browser and resize between mobile (~375px) and desktop
 * to evaluate MetricStrip vs MetricCard at different item counts.
 */

import {
  AlertOctagon,
  Briefcase,
  Building2,
  UserPlus,
} from "lucide-react";
import {
  MetricCard,
  MetricStrip,
  type MetricStripColor,
  type MetricStripItem,
} from "@mvp-ui/ui";
import type { ComponentType, SVGProps } from "react";

type DemoItem = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: MetricStripColor;
  value: string;
  label: string;
  helpText: string;
};

const ALL_ITEMS: DemoItem[] = [
  {
    Icon: Briefcase,
    color: "brand",
    value: "2",
    label: "Request mở",
    helpText: "Nhu cầu tuyển khách hàng đang gửi cho đội vận hành.",
  },
  {
    Icon: AlertOctagon,
    color: "error",
    value: "1",
    label: "Quá hạn",
    helpText: "Đã quá deadline, cần xử lý hoặc thương lượng lại với khách.",
  },
  {
    Icon: UserPlus,
    color: "warning",
    value: "18",
    label: "CTV cần fill",
    helpText: "Tổng số headcount còn thiếu trong toàn bộ request hiện hiển thị.",
  },
  {
    Icon: Building2,
    color: "success",
    value: "24",
    label: "Khách đang hoạt động",
    helpText: "Số khách hàng có ít nhất một request mở trong tuần này.",
  },
];

const COUNTS = [2, 3, 4] as const;
type Count = (typeof COUNTS)[number];

function take<T>(arr: T[], n: number): T[] {
  return arr.slice(0, n);
}

function toStripItems(items: DemoItem[]): MetricStripItem[] {
  return items.map(({ Icon, color, value, label }) => ({
    icon: <Icon className="size-4" />,
    color,
    value,
    label,
  }));
}

function SectionLabel({
  letter,
  title,
  note,
}: {
  letter: string;
  title: string;
  note: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-neutral-bg text-xs font-bold text-fg">
        {letter}
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-fg">{title}</span>
        <span className="text-xs text-fg-tertiary">{note}</span>
      </div>
    </div>
  );
}

function CountHeader({ count }: { count: Count }) {
  return (
    <div className="flex items-center gap-3 border-b border-border-secondary pb-2">
      <span className="rounded-full bg-info-bg px-3 py-0.5 text-sm font-semibold text-fg-brand">
        {count} metrics
      </span>
      <span className="text-xs text-fg-tertiary">
        Compare layouts side-by-side at this item count.
      </span>
    </div>
  );
}

function TintedGrid({ items }: { items: DemoItem[] }) {
  const cols = items.length;
  const lgClass =
    cols === 2
      ? "lg:grid-cols-2"
      : cols === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-4";
  return (
    <div className={`grid grid-cols-2 gap-3 ${lgClass} lg:gap-4`}>
      {items.map((it) => (
        <MetricCard
          key={it.label}
          variant="compact"
          label={it.label}
          value={it.value}
          valueSize="sm"
          featuredIcon={<it.Icon className="size-5" />}
          featuredIconColor={
            it.color === "brand"
              ? "brand"
              : it.color === "error"
                ? "error"
                : it.color === "warning"
                  ? "warning"
                  : "success"
          }
        />
      ))}
    </div>
  );
}

function TintedScroller({ items }: { items: DemoItem[] }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0">
      <div className="flex w-max gap-3 lg:w-full lg:gap-4">
        {items.map((it) => (
          <MetricCard
            key={it.label}
            variant="compact"
            label={it.label}
            value={it.value}
            valueSize="sm"
            featuredIcon={<it.Icon className="size-5" />}
            featuredIconColor={
              it.color === "brand"
                ? "brand"
                : it.color === "error"
                  ? "error"
                  : it.color === "warning"
                    ? "warning"
                    : "success"
            }
            className="w-[160px] shrink-0 snap-start lg:w-auto lg:flex-1"
          />
        ))}
      </div>
    </div>
  );
}



export default function MetricComparePage() {
  return (
    <main className="min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-fg lg:text-3xl">
            Metric layout comparison
          </h1>
          <p className="max-w-3xl text-sm text-fg-tertiary lg:text-base">
            Resize the browser between ~375px and full desktop to compare
            <code className="mx-1 rounded bg-neutral-bg px-1 py-0.5 text-xs">MetricStrip</code>
            (compact KPI row) vs
            <code className="mx-1 rounded bg-neutral-bg px-1 py-0.5 text-xs">MetricCard</code>
            (full tile) at 2, 3, and 4 item counts. Each block uses the same
            data so the layout is the only variable.
          </p>
        </header>

        {COUNTS.map((count) => {
          const items = take(ALL_ITEMS, count);
          const stripItems = toStripItems(items);
          return (
            <section key={count} className="flex flex-col gap-6">
              <CountHeader count={count} />

              <div className="flex flex-col gap-2">
                <SectionLabel
                  letter="B"
                  title='MetricStrip — mobileLayout="stack"'
                  note="Vertical stack below lg, row above. Labels never truncate; trades vertical space."
                />
                <MetricStrip items={stripItems} mobileLayout="stack" />
              </div>

              <div className="flex flex-col gap-2">
                <SectionLabel
                  letter="E"
                  title='MetricCard variant="compact" — horizontal scroller'
                  note="Compact tiles. Container handles horizontal scroll on mobile (fixed 160px tiles, swipe). Above lg: flex row, items fill width."
                />
                <TintedScroller items={items} />
              </div>

              <div className="flex flex-col gap-2">
                <SectionLabel
                  letter="F"
                  title='MetricStrip — mobileLayout="scroll"'
                  note="Strip scrolls horizontally on mobile — labels never truncate, no vertical space cost. Above lg: normal row."
                />
                <MetricStrip items={stripItems} mobileLayout="scroll" />
              </div>

              <div className="flex flex-col gap-2">
                <SectionLabel
                  letter="G"
                  title='MetricCard variant="compact" — 2-col grid'
                  note="Compact tinted tiles in a 2-col grid on mobile. Same height per row, no scroll needed. Above lg: full N-col grid."
                />
                <TintedGrid items={items} />
              </div>
            </section>
          );
        })}

        <footer className="flex flex-col gap-1 border-t border-border-secondary pt-4 text-xs text-fg-tertiary">
          <p>
            Tip: open Chrome DevTools, toggle the device toolbar (Cmd+Shift+M),
            and step through breakpoints sm 640 / md 768 / lg 1024 / xl 1280.
          </p>
          <p>
            Route is unlisted — direct link only:{" "}
            <code className="rounded bg-neutral-bg px-1 py-0.5">
              /metric-compare
            </code>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
