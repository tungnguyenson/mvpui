/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { DocsSidebar } from "../_components/DocsSidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <DocsSidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
