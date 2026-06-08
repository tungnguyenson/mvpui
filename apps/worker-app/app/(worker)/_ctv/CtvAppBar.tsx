"use client";

import { Bell } from "lucide-react";
import { Avatar, toast } from "@mvp-ui/ui";
import { CTV } from "../../data/ctv-referral";

/**
 * Thanh nhận diện CTV trên dải --bp (avatar + tên + hạng + chuông) — đóng vai
 * appbar của hai màn referral, thay cho top bar chung của app.
 */
export function CtvAppBar() {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 rounded-full ring-2 ring-white/90">
        <Avatar size="md" src={CTV.avatar} alt={CTV.name} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11.5px] leading-tight text-primary-fg/80">Cộng tác viên</div>
        <div className="flex items-center gap-2">
          <span className="truncate text-[16px] font-bold leading-tight text-primary-fg">{CTV.name}</span>
          <span className="shrink-0 rounded-full bg-[linear-gradient(135deg,#FFD976,#F0B429)] px-2 py-0.5 text-[11px] font-semibold text-[#7a4b00]">
            {CTV.level}
          </span>
        </div>
      </div>
      <button
        type="button"
        aria-label="Thông báo"
        onClick={() => toast.success("Chưa có thông báo mới")}
        className="relative grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-primary-fg transition-colors hover:bg-white/25"
      >
        <Bell className="size-4" />
        <span className="absolute right-2 top-2 size-2 rounded-full bg-[#FF5A4D] ring-2 ring-(--bp)" />
      </button>
    </div>
  );
}
