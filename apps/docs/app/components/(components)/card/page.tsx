/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { MoreHorizontal } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  type BadgeColor,
} from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

/* Snippets authored by hand next to each preview — keep in sync. */

const STATS = [
  { label: "Total users", value: "12,430", delta: "+12%", color: "success" },
  { label: "Revenue", value: "$48,295", delta: "+8.2%", color: "success" },
  { label: "Churn rate", value: "2.4%", delta: "+0.3%", color: "error" },
] as const;

const SECTIONS: DocExample[] = [
  {
    id: "full-card",
    title: "Full card",
    description: "Header, content, and footer with actions.",
    preview: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>Project Aurora</CardTitle>
              <CardDescription>
                Design system for the next-gen app platform.
              </CardDescription>
            </div>
            <button className="text-fg-tertiary transition-colors hover:text-fg">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-fg-secondary">
            Last updated 2 hours ago. 12 open issues, 3 pull requests pending
            review.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">View project</Button>
          <Button size="sm" color="tertiary">
            Archive
          </Button>
        </CardFooter>
      </Card>
    ),
    code: `<Card>
  <CardHeader>
    <CardTitle>Project Aurora</CardTitle>
    <CardDescription>
      Design system for the next-gen app platform.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-fg-secondary">
      Last updated 2 hours ago.
    </p>
  </CardContent>
  <CardFooter>
    <Button size="sm">View project</Button>
    <Button size="sm" color="tertiary">Archive</Button>
  </CardFooter>
</Card>`,
  },
  {
    id: "content-only",
    title: "Content only",
    description: "Minimal card — no header or footer.",
    preview: (
      <Card className="w-full max-w-sm">
        <CardContent className="p-6">
          <p className="text-sm leading-relaxed text-fg-secondary">
            This is a minimal card with only content. Useful for simple
            information containers, callouts, or embedded media.
          </p>
        </CardContent>
      </Card>
    ),
    code: `<Card>
  <CardContent className="p-6">
    <p className="text-sm text-fg-secondary">
      A minimal card with only content.
    </p>
  </CardContent>
</Card>`,
  },
  {
    id: "stats-card",
    title: "Stats card",
    description: "Metric display using Card sub-components.",
    preview: (
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4 pt-0">
              <p className="text-2xl font-semibold text-fg">{stat.value}</p>
              <Badge color={stat.color as BadgeColor} className="mt-2">
                {stat.delta} vs last month
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    ),
    code: `<Card>
  <CardHeader className="pb-2">
    <CardDescription>Total users</CardDescription>
  </CardHeader>
  <CardContent className="pt-0 pb-4">
    <p className="text-2xl font-semibold text-fg">12,430</p>
    <Badge color="success" className="mt-2">+12% vs last month</Badge>
  </CardContent>
</Card>`,
  },
  {
    id: "card-grid",
    title: "Card grid",
    description: "Cards compose naturally in grid layouts.",
    preview: (
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {["Getting started", "API reference", "Examples", "Changelog"].map(
          (title) => (
            <Card
              key={title}
              className="cursor-pointer transition-all duration-250 hover:border-brand-300 hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>
                  Explore the {title.toLowerCase()} to learn more.
                </CardDescription>
              </CardHeader>
            </Card>
          )
        )}
      </div>
    ),
    code: `{items.map((title) => (
  <Card
    key={title}
    className="cursor-pointer hover:border-brand-300 hover:shadow-md transition-all"
  >
    <CardHeader>
      <CardTitle className="text-base">{title}</CardTitle>
      <CardDescription>Explore {title} to learn more.</CardDescription>
    </CardHeader>
  </Card>
))}`,
  },
];

export default function CardPage() {
  return (
    <ComponentDocLayout
      name="Card"
      tagline="Container with header, content, and footer sub-components. Composes freely. Toggle any example to dark with the moon."
      install={{
        usage: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Background", value: "--color-bg" },
        { label: "Border", value: "--color-border" },
        { label: "Radius", value: "--radius-xl (12px)" },
        { label: "Shadow", value: "--shadow-xs" },
        { label: "Padding", value: "p-6 (24px)" },
      ]}
    />
  );
}
