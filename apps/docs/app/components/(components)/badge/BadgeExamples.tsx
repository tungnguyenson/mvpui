"use client";

import { useState } from "react";
import { Badge } from "@mvp-ui/ui";

export function DismissExample() {
  const [visible, setVisible] = useState(true);
  if (!visible)
    return (
      <button className="text-sm text-fg-secondary underline" onClick={() => setVisible(true)}>
        Reset
      </button>
    );
  return <Badge color="brand" onDismiss={() => setVisible(false)}>Dismissible</Badge>;
}
