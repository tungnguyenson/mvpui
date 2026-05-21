"use client";

import { Breadcrumbs, Button, CommandMenu, Input, type CommandItem } from "@mvp-ui/ui";
import type { Key } from "react-aria-components";
import { Bell, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { NAV_SECTIONS, breadcrumbsForPath } from "./nav";
import { useBreadcrumbOverride } from "./BreadcrumbContext";
import { buildSearchItems } from "./search/buildSearchItems";
import { ThemePicker } from "./ThemePicker";

const NAV_GROUP_LABEL = "Điều hướng";

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const override = useBreadcrumbOverride();
    const breadcrumbs = override ?? breadcrumbsForPath(pathname);
    const [isCommandOpen, setIsCommandOpen] = useState(false);

    const commandItems = useMemo<CommandItem[]>(() => {
        const navItems: CommandItem[] = NAV_SECTIONS.flatMap((section) =>
            section.items.map((item) => ({
                id: item.href,
                label: item.label,
                icon: item.icon,
                group: NAV_GROUP_LABEL,
                ...(section.label ? { description: section.label } : {}),
            })),
        );
        return [...navItems, ...buildSearchItems()];
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setIsCommandOpen((open) => !open);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const handleCommandAction = (id: Key) => {
        router.push(String(id));
    };

    const openCommandMenu = () => setIsCommandOpen(true);

    return (
        <div className="flex h-16 items-center gap-4 border-b border-border-secondary px-4 md:px-8 bg-bg">
            <div className="min-w-0">
                <Breadcrumbs items={breadcrumbs} />
            </div>
            <div className="flex flex-1" />
            <button
                type="button"
                onClick={openCommandMenu}
                className="hidden w-full max-w-md cursor-pointer text-left md:block"
                aria-label="Mở tìm kiếm toàn hệ thống"
            >
                <Input
                    iconLeading={<Search className="size-4" />}
                    placeholder="Tìm khách hàng, CTV, ca làm việc ..."
                    type="search"
                    shortcut="⌘K"
                    aria-label="Tìm kiếm toàn hệ thống"
                    readOnly
                    tabIndex={-1}
                    className="pointer-events-none"
                />
            </button>
            <ThemePicker />
            <Button
                size="lg"
                color="tertiary"
                iconLeading={<Bell className="size-5" />}
                aria-label="Thông báo"
            />
            <CommandMenu
                isOpen={isCommandOpen}
                onOpenChange={setIsCommandOpen}
                items={commandItems}
                placeholder="Tìm khách hàng, CTV, ca làm việc ..."
                emptyMessage="Không tìm thấy kết quả."
                onAction={handleCommandAction}
            />
        </div>
    );
}
