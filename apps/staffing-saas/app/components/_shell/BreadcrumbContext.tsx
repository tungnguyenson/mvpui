"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppBreadcrumb } from "./nav";

interface BreadcrumbContextValue {
  override: AppBreadcrumb[] | null;
  setOverride: (items: AppBreadcrumb[] | null) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [override, setOverride] = useState<AppBreadcrumb[] | null>(null);
  const value = useMemo(() => ({ override, setOverride }), [override]);
  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbOverride(): AppBreadcrumb[] | null {
  const ctx = useContext(BreadcrumbContext);
  return ctx?.override ?? null;
}

export function SetPageBreadcrumb({ items }: { items: AppBreadcrumb[] }) {
  const ctx = useContext(BreadcrumbContext);
  const setOverride = ctx?.setOverride;
  const serialized = JSON.stringify(items);

  useEffect(() => {
    if (!setOverride) return;
    setOverride(items);
    return () => setOverride(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialized, setOverride]);

  return null;
}
