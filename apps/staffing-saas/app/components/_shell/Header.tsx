"use client";

import {
    Badge,
    Breadcrumbs,
    Button,
    CommandMenu,
    Input,
    type CommandItem,
} from "@mvp-ui/ui";
import type { Key } from "react-aria-components";
import {
    Bell,
    ChevronLeft,
    Menu,
    MessageCircle,
    Search,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { NAV_SECTIONS, breadcrumbsForPath } from "./nav";
import { useBreadcrumbOverride } from "./BreadcrumbContext";
import { buildSearchItems } from "./search/buildSearchItems";
import { ThemePicker } from "./ThemePicker";

const NAV_GROUP_LABEL = "Điều hướng";

interface HeaderProps {
    onOpenNav?: () => void;
}

export function Header({ onOpenNav }: HeaderProps) {
    const pathname = usePathname();
    const router = useRouter();
    const override = useBreadcrumbOverride();
    const breadcrumbs = override ?? breadcrumbsForPath(pathname);
    const [isCommandOpen, setIsCommandOpen] = useState(false);

    const title = breadcrumbs[breadcrumbs.length - 1]?.label ?? "Trang";
    const parent =
        breadcrumbs.length > 1
            ? breadcrumbs[breadcrumbs.length - 2]
            : undefined;
    const parentHref = parent?.href;

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
        <>
          <div className="sticky top-0 z-30">
            {/* Mobile header */}
            <div className="flex min-h-14 shrink-0 items-center gap-1 border-b border-border-secondary bg-bg px-2 pt-safe md:hidden">
                <Button
                    size="md"
                    color="tertiary"
                    onClick={onOpenNav}
                    iconLeading={<Menu className="size-5" />}
                    aria-label="Mở menu"
                />
                {parentHref ? (
                    <button
                        type="button"
                        onClick={() => router.push(parentHref)}
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-fg-secondary transition-colors hover:bg-bg-secondary"
                        aria-label={`Quay lại ${parent?.label ?? ""}`}
                    >
                        <ChevronLeft className="size-5" />
                    </button>
                ) : null}
                <h1 className="min-w-0 flex-1 truncate text-md font-semibold text-fg">
                    {title}
                </h1>
                <div className="relative">
                    <Button
                        size="md"
                        color="tertiary"
                        iconLeading={<Bell className="size-5" />}
                        aria-label="Thông báo"
                    />
                    <Badge
                        color="error"
                        size="sm"
                        className="pointer-events-none absolute -top-0.5 -right-0.5 min-w-4 justify-center px-1 text-xs"
                        aria-hidden
                    >
                        1
                    </Badge>
                </div>
            </div>

            {/* Desktop header */}
            <div className="hidden h-16 items-center gap-4 border-b border-border-secondary bg-bg px-4 md:flex md:px-8">
                <div className="min-w-0">
                    <Breadcrumbs items={breadcrumbs} />
                </div>
                <div className="flex flex-1" />
                <button
                    type="button"
                    onClick={openCommandMenu}
                    className="w-full max-w-md cursor-pointer text-left"
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
                <div className="relative">
                    <Button
                        size="lg"
                        color="tertiary"
                        onClick={() => router.push("/chat")}
                        iconLeading={<MessageCircle className="size-5" />}
                        aria-label="Tin nhắn (2 chưa đọc)"
                    />
                    <Badge
                        color="error"
                        size="sm"
                        className="pointer-events-none absolute -top-1 -right-1 min-w-5 justify-center px-1.5"
                        aria-hidden
                    >
                        2
                    </Badge>
                </div>
                <div className="relative">
                    <Button
                        size="lg"
                        color="tertiary"
                        iconLeading={<Bell className="size-5" />}
                        aria-label="Thông báo"
                    />
                    <Badge
                        color="error"
                        size="sm"
                        className="pointer-events-none absolute -top-1 -right-1 min-w-5 justify-center px-1.5"
                        aria-hidden
                    >
                        1
                    </Badge>
                </div>
            </div>
          </div>

            <CommandMenu
                isOpen={isCommandOpen}
                onOpenChange={setIsCommandOpen}
                items={commandItems}
                placeholder="Tìm khách hàng, CTV, ca làm việc ..."
                emptyMessage="Không tìm thấy kết quả."
                onAction={handleCommandAction}
            />
        </>
    );
}
