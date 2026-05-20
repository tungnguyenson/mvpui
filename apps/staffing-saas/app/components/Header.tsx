"use client";

import { Breadcrumbs, Button, Input } from "@mvp-ui/ui";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { breadcrumbsForPath } from "./nav";

export function Header() {
    const pathname = usePathname();
    const breadcrumbs = breadcrumbsForPath(pathname);

    return (
        <div className="flex h-16 items-center gap-4 border-b border-border-secondary px-4 md:px-8 bg-bg">
            <div className="min-w-0">
                <Breadcrumbs items={breadcrumbs} />
            </div>
            <div className="flex flex-1" />
            <div className="hidden w-full max-w-md md:block">
                <Input
                    iconLeading={<Search className="size-4" />}
                    placeholder="Tìm khách hàng, CTV, ca làm việc ..."
                    type="search"
                    aria-label="Tìm kiếm toàn hệ thống"
                />
            </div>
            <Button
                size="lg"
                color="tertiary"
                iconLeading={<Bell className="size-5" />}
                aria-label="Thông báo"
            />
        </div>
    );
}
