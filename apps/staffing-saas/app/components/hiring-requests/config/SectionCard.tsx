import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, description, children, className }: SectionCardProps) {
  return (
    <section
      className={`rounded-xl border border-border-secondary bg-bg shadow-xs${className ? ` ${className}` : ""}`}
    >
      <header className="border-b border-border-secondary px-5 py-4">
        <h2 className="text-base font-semibold text-fg">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
        ) : null}
      </header>
      <div className="flex flex-col gap-5 p-5">{children}</div>
    </section>
  );
}
