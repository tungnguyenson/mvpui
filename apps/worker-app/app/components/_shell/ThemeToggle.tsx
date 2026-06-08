"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { ButtonUtility } from "@mvp-ui/ui";

const STORAGE_KEY = "worker-app:appearance";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function persist(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme }));
  } catch {
    // storage unavailable — theme still applies for the session
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // Sync from the DOM after hydration (the pre-hydration script already set it).
  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    persist(next);
    setTheme(next);
  };

  return (
    <ButtonUtility
      size="sm"
      color="tertiary"
      icon={theme === "dark" ? <Sun /> : <Moon />}
      aria-label={theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      onClick={toggle}
    />
  );
}
