import { Button } from "@mvp-ui/ui";
import { Inbox, Plus } from "lucide-react";

export function EmptyState({ title }: { title: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex size-14 items-center justify-center rounded-xl border border-border-secondary bg-bg-secondary">
        <Inbox className="size-6 text-fg-tertiary" />
      </div>
      <h2 className="mt-5 text-lg font-semibold text-fg">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-fg-tertiary">
        Trang này chưa có nội dung. Phần “{title}” đang trong quá trình xây dựng.
      </p>
      <div className="mt-6">
        <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
          Tạo mới
        </Button>
      </div>
    </div>
  );
}
