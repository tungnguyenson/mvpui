"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface HeaderAction {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface HeaderActionsContextValue {
  actions: HeaderAction[];
  setActions: (items: HeaderAction[] | null) => void;
}

const HeaderActionsContext = createContext<HeaderActionsContextValue | null>(null);

export function HeaderActionsProvider({ children }: { children: ReactNode }) {
  const [actions, setActionsState] = useState<HeaderAction[]>([]);
  const setActions = (items: HeaderAction[] | null) => setActionsState(items ?? []);
  const value = useMemo(() => ({ actions, setActions }), [actions]);
  return (
    <HeaderActionsContext.Provider value={value}>
      {children}
    </HeaderActionsContext.Provider>
  );
}

export function useHeaderActions(): HeaderAction[] {
  const ctx = useContext(HeaderActionsContext);
  return ctx?.actions ?? [];
}

export function SetHeaderActions({ items }: { items: Omit<HeaderAction, "onClick">[] }) {
  const ctx = useContext(HeaderActionsContext);
  const setActions = ctx?.setActions;
  const serialized = JSON.stringify(items);

  useEffect(() => {
    if (!setActions) return;
    setActions(items);
    return () => setActions(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialized, setActions]);

  return null;
}
