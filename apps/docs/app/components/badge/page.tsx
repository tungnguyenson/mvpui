import Link from "next/link";
import { ArrowLeft, Check, AlertTriangle, X, Info, Dot } from "lucide-react";
import { Badge } from "@mvp-ui/ui";

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

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 min-h-10">
      <span className="w-28 shrink-0 text-xs text-fg-tertiary font-medium uppercase tracking-wide">
        {label}
      </span>
      <div className="flex items-center gap-3 flex-wrap">{children}</div>
    </div>
  );
}

export default function BadgePage() {
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
        <h1 className="text-4xl font-semibold text-fg tracking-tight mb-1">Badge</h1>
        <p className="text-md text-fg-tertiary mb-8">
          Compact label for status, category, or count. Five semantic variants.
        </p>

        <div className="rounded-2xl border border-border bg-bg p-8 shadow-xs">
          <DocSection title="Variants" description="Five semantic variants matching status semantics.">
            <div className="flex flex-col gap-2">
              <Row label="Default">
                <Badge variant="default">Default</Badge>
              </Row>
              <Row label="Secondary">
                <Badge variant="secondary">Secondary</Badge>
              </Row>
              <Row label="Success">
                <Badge variant="success">Success</Badge>
              </Row>
              <Row label="Warning">
                <Badge variant="warning">Warning</Badge>
              </Row>
              <Row label="Error">
                <Badge variant="error">Error</Badge>
              </Row>
            </div>
          </DocSection>

          <DocSection title="With icons" description="Icons inherit currentColor and render at 12px.">
            <div className="flex flex-col gap-2">
              <Row label="Default">
                <Badge variant="default">
                  <Info size={12} />
                  In review
                </Badge>
              </Row>
              <Row label="Success">
                <Badge variant="success">
                  <Check size={12} />
                  Deployed
                </Badge>
              </Row>
              <Row label="Warning">
                <Badge variant="warning">
                  <AlertTriangle size={12} />
                  Degraded
                </Badge>
              </Row>
              <Row label="Error">
                <Badge variant="error">
                  <X size={12} />
                  Failed
                </Badge>
              </Row>
            </div>
          </DocSection>

          <DocSection title="Status dot" description="Use a filled circle icon for presence or health indicators.">
            <div className="flex flex-col gap-2">
              <Row label="Online">
                <Badge variant="success">
                  <Dot size={16} className="-mx-1" strokeWidth={4} />
                  Online
                </Badge>
              </Row>
              <Row label="Away">
                <Badge variant="warning">
                  <Dot size={16} className="-mx-1" strokeWidth={4} />
                  Away
                </Badge>
              </Row>
              <Row label="Offline">
                <Badge variant="secondary">
                  <Dot size={16} className="-mx-1" strokeWidth={4} />
                  Offline
                </Badge>
              </Row>
            </div>
          </DocSection>

          <DocSection title="In context" description="Badges as table status column and nav count.">
            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wide">
                        Deployment
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wide">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wide">
                        Environment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { name: "v2.4.1", status: "success", env: "Production" },
                      { name: "v2.4.0", status: "secondary", env: "Staging" },
                      { name: "v2.3.9", status: "error", env: "Production" },
                    ].map((row) => (
                      <tr key={row.name}>
                        <td className="px-4 py-3 font-mono text-fg">{row.name}</td>
                        <td className="px-4 py-3">
                          <Badge variant={row.status as "success" | "secondary" | "error"}>
                            {row.status === "success"
                              ? "Live"
                              : row.status === "error"
                              ? "Failed"
                              : "Archived"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-fg-secondary">{row.env}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DocSection>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-bg p-6">
          <h3 className="text-sm font-semibold text-fg mb-3">Token reference</h3>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-fg-tertiary">
            <div className="flex justify-between">
              <dt>Padding</dt>
              <dd className="font-mono text-fg-secondary">px-2.5 py-0.5</dd>
            </div>
            <div className="flex justify-between">
              <dt>Font size</dt>
              <dd className="font-mono text-fg-secondary">--text-xs (12px)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Radius</dt>
              <dd className="font-mono text-fg-secondary">rounded-full</dd>
            </div>
            <div className="flex justify-between">
              <dt>Font weight</dt>
              <dd className="font-mono text-fg-secondary">500 (medium)</dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
