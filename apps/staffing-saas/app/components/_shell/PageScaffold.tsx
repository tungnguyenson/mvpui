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
      {header}
      <div
        className={`flex flex-col gap-8 px-0 pt-4 pb-24 md:px-8 md:py-8 md:pb-8${
          contentClassName ? ` ${contentClassName}` : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
