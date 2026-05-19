/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { DocsSidebar } from "../_components/DocsSidebar";
import { MobileTopBar } from "../_components/MobileTopBar";

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <DocsSidebar />
      <div className="flex flex-1 min-w-0 flex-col">
        <MobileTopBar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
