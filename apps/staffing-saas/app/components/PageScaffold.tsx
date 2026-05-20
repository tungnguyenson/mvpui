import type { ReactNode } from "react";

interface PageScaffoldProps {
  header: ReactNode;
  children: ReactNode;
  contentClassName?: string;
}

export function PageScaffold({
  header,
  children,
  contentClassName,
}: PageScaffoldProps) {
  return (
    <div className="flex flex-col">
      <div className="bg-bg px-4 py-8 shadow-xs md:px-8">{header}</div>
      <div
        className={`flex flex-col gap-8 px-4 py-8 md:px-8${
          contentClassName ? ` ${contentClassName}` : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
