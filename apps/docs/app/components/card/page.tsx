import Link from "next/link";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
} from "@mvp-ui/ui";

function DocSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-10 border-b border-border last:border-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-fg">{title}</h2>
        {description && <p className="mt-1 text-sm text-fg-tertiary">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export default function CardPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="mb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-fg-tertiary hover:text-fg transition-colors"
          >
            <ArrowLeft size={14} />
            Components
          </Link>
        </div>
        <h1 className="text-4xl font-semibold text-fg tracking-tight mb-1">Card</h1>
        <p className="text-md text-fg-tertiary mb-8">
          Container with header, content, and footer sub-components. Composes freely.
        </p>

        <div className="rounded-2xl border border-border bg-bg p-8 shadow-xs">
          <DocSection title="Full card" description="Header, content, and footer with actions.">
            <div className="max-w-sm">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <CardTitle>Project Aurora</CardTitle>
                      <CardDescription>
                        Design system for the next-gen app platform.
                      </CardDescription>
                    </div>
                    <button className="text-fg-tertiary hover:text-fg transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-fg-secondary">
                    Last updated 2 hours ago. 12 open issues, 3 pull requests pending review.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">View project</Button>
                  <Button size="sm" variant="ghost">Archive</Button>
                </CardFooter>
              </Card>
            </div>
          </DocSection>

          <DocSection title="Content only" description="Minimal card — no header or footer.">
            <div className="max-w-sm">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-fg-secondary leading-relaxed">
                    This is a minimal card with only content. Useful for simple
                    information containers, callouts, or embedded media.
                  </p>
                </CardContent>
              </Card>
            </div>
          </DocSection>

          <DocSection title="Stats card" description="Metric display using Card sub-components.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Total users", value: "12,430", delta: "+12%", variant: "success" },
                { label: "Revenue", value: "$48,295", delta: "+8.2%", variant: "success" },
                { label: "Churn rate", value: "2.4%", delta: "+0.3%", variant: "error" },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardHeader className="pb-2">
                    <CardDescription>{stat.label}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <p className="text-2xl font-semibold text-fg">{stat.value}</p>
                    <Badge
                      variant={stat.variant as "success" | "error"}
                      className="mt-2"
                    >
                      {stat.delta} vs last month
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DocSection>

          <DocSection title="Card grid" description="Cards compose naturally in grid layouts.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {["Getting started", "API reference", "Examples", "Changelog"].map((title) => (
                <Card
                  key={title}
                  className="cursor-pointer hover:border-brand-300 hover:shadow-md transition-all duration-[250ms]"
                >
                  <CardHeader>
                    <CardTitle className="text-base">{title}</CardTitle>
                    <CardDescription>
                      Explore the {title.toLowerCase()} to learn more.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </DocSection>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-bg p-6">
          <h3 className="text-sm font-semibold text-fg mb-3">Token reference</h3>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-fg-tertiary">
            <div className="flex justify-between">
              <dt>Background</dt>
              <dd className="font-mono text-fg-secondary">--color-bg</dd>
            </div>
            <div className="flex justify-between">
              <dt>Border</dt>
              <dd className="font-mono text-fg-secondary">--color-border</dd>
            </div>
            <div className="flex justify-between">
              <dt>Radius</dt>
              <dd className="font-mono text-fg-secondary">--radius-xl (12px)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shadow</dt>
              <dd className="font-mono text-fg-secondary">--shadow-xs</dd>
            </div>
            <div className="flex justify-between">
              <dt>Padding</dt>
              <dd className="font-mono text-fg-secondary">p-6 (24px)</dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
