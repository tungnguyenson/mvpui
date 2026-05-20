import type { ReactNode } from "react";

interface BatchSectionCardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  bodyClassName?: string;
}

export function BatchSectionCard({
  title,
  description,
  action,
  children,
  bodyClassName,
}: BatchSectionCardProps) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-border-secondary px-5 py-4">
          <div>
            {title && <h2 className="text-base font-semibold text-fg">{title}</h2>}
            {description && (
              <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={bodyClassName ?? "p-5"}>{children}</div>
    </div>
  );
}
