"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";

export type AppearanceMode = "light" | "dark" | "mixed";

interface Appearance {
  theme: ThemeMode;
  navTheme: ThemeMode;
}

interface ThemeContextValue extends Appearance {
  mode: AppearanceMode;
  setMode: (mode: AppearanceMode) => void;
  setTheme: (mode: ThemeMode) => void;
  setNavTheme: (mode: ThemeMode) => void;
}

function deriveMode({ theme, navTheme }: Appearance): AppearanceMode {
  if (theme === "dark" && navTheme === "dark") return "dark";
  if (theme === "light" && navTheme === "dark") return "mixed";
  return "light";
}

function modeToAppearance(mode: AppearanceMode): Appearance {
  if (mode === "dark") return { theme: "dark", navTheme: "dark" };
  if (mode === "mixed") return { theme: "light", navTheme: "dark" };
  return { theme: "light", navTheme: "light" };
}

export const APPEARANCE_STORAGE_KEY = "staffing-saas:appearance";
const APPEARANCE_EVENT = "staffing-saas:appearance-change";

const DEFAULT_APPEARANCE: Appearance = {
  theme: "light",
  navTheme: "light",
};

let snapshotCache: Appearance = DEFAULT_APPEARANCE;

function readDOM(): Appearance {
  if (typeof document === "undefined") return DEFAULT_APPEARANCE;
  const root = document.documentElement;
  const theme: ThemeMode =
    root.dataset.theme === "dark" ? "dark" : "light";
  const navTheme: ThemeMode =
    root.dataset.navTheme === "dark" ? "dark" : "light";
  return { theme, navTheme };
}

function getSnapshot(): Appearance {
  const next = readDOM();
  if (
    snapshotCache.theme === next.theme &&
    snapshotCache.navTheme === next.navTheme
  ) {
    return snapshotCache;
  }
  snapshotCache = next;
  return snapshotCache;
}

function getServerSnapshot(): Appearance {
  return DEFAULT_APPEARANCE;
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(APPEARANCE_EVENT, callback);
  return () => {
    window.removeEventListener(APPEARANCE_EVENT, callback);
  };
}

function applyDOM(next: Appearance): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.theme = next.theme;
  root.dataset.navTheme = next.navTheme;
}

function writeStorage(next: Appearance): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      APPEARANCE_STORAGE_KEY,
      JSON.stringify(next),
    );
  } catch {
    // ignore quota / privacy mode
  }
}

function dispatchChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(APPEARANCE_EVENT));
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const appearance = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setTheme = useCallback((mode: ThemeMode) => {
    const next: Appearance = { theme: mode, navTheme: readDOM().navTheme };
    applyDOM(next);
    writeStorage(next);
    dispatchChange();
  }, []);

  const setNavTheme = useCallback((mode: ThemeMode) => {
    const next: Appearance = { theme: readDOM().theme, navTheme: mode };
    applyDOM(next);
    writeStorage(next);
    dispatchChange();
  }, []);

  const setMode = useCallback((mode: AppearanceMode) => {
    const next = modeToAppearance(mode);
    applyDOM(next);
    writeStorage(next);
    dispatchChange();
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      ...appearance,
      mode: deriveMode(appearance),
      setMode,
      setTheme,
      setNavTheme,
    }),
    [appearance, setMode, setTheme, setNavTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppearance(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useAppearance must be used within ThemeProvider");
  }
  return ctx;
}
