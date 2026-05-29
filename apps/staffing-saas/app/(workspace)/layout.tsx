import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { AppShell, NAV_LAYOUT_COOKIE, type NavLayout } from "../components/_shell";

export default async function WorkspaceLayout({ children }: { children: ReactNode }) {
	const store = await cookies();
	const initialNavLayout: NavLayout =
		store.get(NAV_LAYOUT_COOKIE)?.value === "header" ? "header" : "sidebar";

	return <AppShell initialNavLayout={initialNavLayout}>{children}</AppShell>;
}
