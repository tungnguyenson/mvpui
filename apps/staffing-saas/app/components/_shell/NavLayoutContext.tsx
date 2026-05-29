"use client";

import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { NAV_LAYOUT_COOKIE } from "./nav";

export type NavLayout = "sidebar" | "header";

interface NavLayoutContextValue {
	navLayout: NavLayout;
	setNavLayout: (layout: NavLayout) => void;
}

const NavLayoutContext = createContext<NavLayoutContextValue | null>(null);

function writeCookie(value: NavLayout): void {
	if (typeof document === "undefined") return;
	// 1 year; SSR reads this to seed the initial layout and avoid a flash.
	// biome-ignore lint/suspicious/noDocumentCookie: lightweight client write; the server layout reads this cookie to seed the initial layout
	document.cookie = `${NAV_LAYOUT_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
}

export function NavLayoutProvider({
	initial,
	children,
}: {
	initial: NavLayout;
	children: ReactNode;
}) {
	const [navLayout, setState] = useState<NavLayout>(initial);

	const setNavLayout = useCallback((layout: NavLayout) => {
		setState(layout);
		writeCookie(layout);
	}, []);

	const value = useMemo<NavLayoutContextValue>(
		() => ({ navLayout, setNavLayout }),
		[navLayout, setNavLayout]
	);

	return <NavLayoutContext.Provider value={value}>{children}</NavLayoutContext.Provider>;
}

export function useNavLayout(): NavLayoutContextValue {
	const ctx = useContext(NavLayoutContext);
	if (!ctx) {
		throw new Error("useNavLayout must be used within NavLayoutProvider");
	}
	return ctx;
}
