import { MessageCircle } from "lucide-react";

export function EmptyThread() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-bg-secondary p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-bg text-fg-tertiary">
        <MessageCircle className="size-6" />
      </div>
      <div className="text-sm font-medium text-fg">Chọn cuộc trò chuyện</div>
      <div className="max-w-sm text-sm text-fg-tertiary">
        Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu trả lời.
      </div>
    </div>
  );
}
