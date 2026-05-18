/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import { Tag, TagGroup, TagList } from "@mvp-ui/ui";

/* Client island: `onClose` is a function prop, so this can't live in the
   server-rendered docs page directly. */
export function RemovableExample() {
  const [tags, setTags] = useState([
    { id: "a", label: "ana@acme.co" },
    { id: "b", label: "sam@acme.co" },
  ]);

  return (
    <TagGroup label="Recipients" size="md">
      <TagList className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <Tag
            key={t.id}
            id={t.id}
            onClose={(id) => setTags((cur) => cur.filter((x) => x.id !== id))}
          >
            {t.label}
          </Tag>
        ))}
      </TagList>
    </TagGroup>
  );
}
