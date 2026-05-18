/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Check, AlertTriangle, X, Info, Dot } from "lucide-react";
import { Badge } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../_components/docs/ComponentDocLayout";

/* Snippets authored by hand next to each preview — keep in sync. */

const ROWS = [
  { name: "v2.4.1", status: "success", env: "Production", text: "Live" },
  { name: "v2.4.0", status: "secondary", env: "Staging", text: "Archived" },
  { name: "v2.3.9", status: "error", env: "Production", text: "Failed" },
] as const;

const SECTIONS: DocExample[] = [
  {
    id: "variants",
    title: "Variants",
    description: "Five semantic variants matching status semantics.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    ),
    code: `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>`,
  },
  {
    id: "with-icons",
    title: "With icons",
    description: "Icons inherit currentColor and render at 12px.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="default">
          <Info size={12} />
          In review
        </Badge>
        <Badge variant="success">
          <Check size={12} />
          Deployed
        </Badge>
        <Badge variant="warning">
          <AlertTriangle size={12} />
          Degraded
        </Badge>
        <Badge variant="error">
          <X size={12} />
          Failed
        </Badge>
      </div>
    ),
    code: `<Badge variant="success">
  <Check size={12} />
  Deployed
</Badge>`,
  },
  {
    id: "status-dot",
    title: "Status dot",
    description:
      "Use a filled circle icon for presence or health indicators.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="success">
          <Dot size={16} className="-mx-1" strokeWidth={4} />
          Online
        </Badge>
        <Badge variant="warning">
          <Dot size={16} className="-mx-1" strokeWidth={4} />
          Away
        </Badge>
        <Badge variant="secondary">
          <Dot size={16} className="-mx-1" strokeWidth={4} />
          Offline
        </Badge>
      </div>
    ),
    code: `<Badge variant="success">
  <Dot size={16} className="-mx-1" strokeWidth={4} />
  Online
</Badge>`,
  },
  {
    id: "in-context",
    title: "In context",
    description: "Badges as a table status column.",
    preview: (
      <div className="w-full overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-fg-tertiary">
                Deployment
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-fg-tertiary">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-fg-tertiary">
                Environment
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ROWS.map((row) => (
              <tr key={row.name}>
                <td className="px-4 py-3 font-mono text-fg">{row.name}</td>
                <td className="px-4 py-3">
                  <Badge variant={row.status}>{row.text}</Badge>
                </td>
                <td className="px-4 py-3 text-fg-secondary">{row.env}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    code: `<td className="px-4 py-3">
  <Badge variant={row.status}>{row.text}</Badge>
</td>`,
  },
];

export default function BadgePage() {
  return (
    <ComponentDocLayout
      name="Badge"
      tagline="Compact label for status, category, or count. Five semantic variants. Toggle any example to dark with the moon."
      install={{
        usage: `import { Badge } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Padding", value: "px-2.5 py-0.5" },
        { label: "Font size", value: "--text-xs (12px)" },
        { label: "Radius", value: "rounded-full" },
        { label: "Font weight", value: "500 (medium)" },
      ]}
    />
  );
}
