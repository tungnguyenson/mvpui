import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  bodyClassName?: string;
}

export function SectionCard({
  title,
  description,
  action,
  children,
  bodyClassName,
}: SectionCardProps) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
      <div className="flex items-start justify-between gap-4 border-b border-border-secondary px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-fg">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className={bodyClassName ?? "p-5"}>{children}</div>
    </div>
  );
}

interface FieldRowProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}

export function FieldRow({ label, required, children }: FieldRowProps) {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6 sm:py-2">
      <div className="text-sm text-fg-tertiary">
        {required && <span className="mr-1 text-fg-error">*</span>}
        {label}
      </div>
      <div className="text-sm text-fg">{children}</div>
    </div>
  );
}

export function MissingValue({ tone = "muted" }: { tone?: "muted" | "bold" }) {
  if (tone === "bold") {
    return <span className="font-semibold text-fg">Chưa cập nhật</span>;
  }
  return <span className="italic text-fg-tertiary">(chưa có)</span>;
}
