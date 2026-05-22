"use client";

import { Button } from "@mvp-ui/ui";
import { Mic, Paperclip, Send } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

interface ComposerProps {
  onSend?: (text: string) => void;
}

export function Composer({ onSend }: ComposerProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (trimmed === "") return;
    onSend?.(trimmed);
    setText("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="shrink-0 border-t border-border-secondary bg-bg p-3">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border-secondary bg-bg px-3 py-2 focus-within:ring-2 focus-within:ring-border-brand">
        <button
          type="button"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-fg-tertiary transition-colors hover:bg-bg-secondary hover:text-fg"
          aria-label="Đính kèm tệp"
        >
          <Paperclip className="size-4" />
        </button>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          rows={1}
          aria-label="Soạn tin nhắn"
          className="min-h-8 max-h-40 flex-1 resize-none bg-transparent text-sm text-fg placeholder:text-fg-tertiary focus:outline-none"
        />
        <button
          type="button"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-fg-tertiary transition-colors hover:bg-bg-secondary hover:text-fg"
          aria-label="Ghi âm tin nhắn thoại"
        >
          <Mic className="size-4" />
        </button>
        <Button
          size="sm"
          color="primary"
          onClick={handleSend}
          disabled={text.trim() === ""}
          iconLeading={<Send className="size-4" />}
          aria-label="Gửi tin nhắn"
        />
      </div>
    </div>
  );
}
