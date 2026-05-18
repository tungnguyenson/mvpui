/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Tag, TagGroup, TagList } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../_components/docs/ComponentDocLayout";
import { RemovableExample } from "./RemovableExample";

const SECTIONS: DocExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description: "sm · md · lg. React Aria TagGroup (pulled ahead from Wave 3).",
    preview: (
      <div className="flex flex-col gap-4">
        {(["sm", "md", "lg"] as const).map((s) => (
          <TagGroup key={s} label="Tags" size={s}>
            <TagList className="flex flex-wrap gap-1.5">
              <Tag id="design">Design</Tag>
              <Tag id="eng">Engineering</Tag>
              <Tag id="product">Product</Tag>
            </TagList>
          </TagGroup>
        ))}
      </div>
    ),
    code: `<TagGroup label="Tags" size="md">
  <TagList className="flex flex-wrap gap-1.5">
    <Tag id="design">Design</Tag>
    <Tag id="eng">Engineering</Tag>
    <Tag id="product">Product</Tag>
  </TagList>
</TagGroup>`,
  },
  {
    id: "dot-count",
    title: "Dot & count",
    description: "Leading status dot and a trailing count chip.",
    preview: (
      <TagGroup label="Status" size="md">
        <TagList className="flex flex-wrap gap-1.5">
          <Tag id="live" dot>
            Live
          </Tag>
          <Tag id="open" count={12}>
            Open
          </Tag>
        </TagList>
      </TagGroup>
    ),
    code: `<Tag id="live" dot>Live</Tag>
<Tag id="open" count={12}>Open</Tag>`,
  },
  {
    id: "selection",
    title: "Selectable",
    description: "selectionMode single/multiple shows the checkbox affordance.",
    preview: (
      <TagGroup label="Filter" size="md" selectionMode="multiple">
        <TagList className="flex flex-wrap gap-1.5">
          <Tag id="design">Design</Tag>
          <Tag id="eng">Engineering</Tag>
          <Tag id="product">Product</Tag>
        </TagList>
      </TagGroup>
    ),
    code: `<TagGroup label="Filter" selectionMode="multiple">
  <TagList className="flex flex-wrap gap-1.5">
    <Tag id="design">Design</Tag>
    <Tag id="eng">Engineering</Tag>
    <Tag id="product">Product</Tag>
  </TagList>
</TagGroup>`,
  },
  {
    id: "removable",
    title: "Removable",
    description: "Pass onClose (or TagGroup onRemove) to show the X.",
    preview: <RemovableExample />,
    code: `<Tag id="a" onClose={(id) => remove(id)}>ana@acme.co</Tag>`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="Tags"
      tagline={
        <>
          Tag / chip list on React Aria <code>TagGroup</code>. Sizes, status
          dot, count, avatar, selection (checkbox) and removable (X). Pulled
          ahead from Wave 3 — <code>InputTags</code> builds on it.
        </>
      }
      install={{
        usage: `import { Tag, TagGroup, TagList } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Surface", value: "--color-bg" },
        { label: "Ring", value: "--color-border" },
        { label: "Selected fill", value: "--color-primary" },
        { label: "Dot", value: "--color-fg-success" },
      ]}
    />
  );
}
