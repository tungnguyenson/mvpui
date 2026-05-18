"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Tag, TagGroup, TagList } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";
import { RemovableExample } from "./RemovableExample";
import {
  CloseXDemo,
  CheckboxDemo,
  CheckboxCloseXDemo,
  CheckboxCountDemo,
  CloseXMatrix,
  CheckboxDefaultMatrix,
  CheckboxCloseXMatrix,
  CheckboxCountMatrix,
} from "./TagsClientExamples";

const AU_FLAG = "https://www.untitledui.com/images/flags/AU.svg";
const AVATAR = "https://i.pravatar.cc/150?u=olivia";

const SECTIONS: DocExample[] = [
  /* 1 — DefaultDemo */
  {
    id: "default",
    title: "Default",
    description: "Basic tags with no variant, flag avatar, photo avatar, and dot.",
    preview: (
      <TagGroup label="Tags" size="md">
        <TagList className="flex gap-4">
          <Tag>Label</Tag>
          <Tag avatarSrc={AU_FLAG}>Label</Tag>
          <Tag avatarSrc={AVATAR}>Label</Tag>
          <Tag dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
    ),
    code: `<TagGroup label="Tags" size="md">
  <TagList className="flex gap-4">
    <Tag>Label</Tag>
    <Tag avatarSrc={AU_FLAG}>Label</Tag>
    <Tag avatarSrc={AVATAR}>Label</Tag>
    <Tag dot={true}>Label</Tag>
  </TagList>
</TagGroup>`,
  },

  /* 2 — CloseXDemo (client island: onRemove) */
  {
    id: "close-x-demo",
    title: "Close X (interactive)",
    description: "Tags with onRemove. Click X to remove a tag from the list.",
    preview: <CloseXDemo />,
    code: `<TagGroup
  label="Tags"
  size="md"
  onRemove={(keys) => setTags(tags.filter((t) => !keys.has(t.id)))}
>
  <TagList className="flex flex-col items-start gap-4 md:flex-row" items={tags}>
    {(item) => <Tag {...item}>{item.label}</Tag>}
  </TagList>
</TagGroup>`,
  },

  /* 3 — CountDemo */
  {
    id: "count",
    title: "Count",
    description: "Trailing count chip on each tag variant.",
    preview: (
      <TagGroup label="Tags" size="md">
        <TagList className="flex flex-col items-start gap-4 md:flex-row">
          <Tag count={5}>Label</Tag>
          <Tag avatarSrc={AU_FLAG} count={5}>
            Label
          </Tag>
          <Tag avatarSrc={AVATAR} count={5}>
            Label
          </Tag>
          <Tag dot={true} count={5}>
            Label
          </Tag>
        </TagList>
      </TagGroup>
    ),
    code: `<TagGroup label="Tags" size="md">
  <TagList className="flex gap-4">
    <Tag count={5}>Label</Tag>
    <Tag avatarSrc={AU_FLAG} count={5}>Label</Tag>
    <Tag avatarSrc={AVATAR} count={5}>Label</Tag>
    <Tag dot={true} count={5}>Label</Tag>
  </TagList>
</TagGroup>`,
  },

  /* 4 — CheckboxDemo (client island: selection state) */
  {
    id: "checkbox-demo",
    title: "Checkbox (interactive)",
    description: "selectionMode=\"multiple\" with controlled selectedKeys. Tags 1 and 2 start selected.",
    preview: <CheckboxDemo />,
    code: `<TagGroup
  label="Tags"
  size="md"
  selectionMode="multiple"
  selectedKeys={selectedTags}
  onSelectionChange={setSelectedTags}
>
  <TagList className="flex gap-4">
    <Tag id="tag-01">Label</Tag>
    <Tag id="tag-02" avatarSrc={AU_FLAG}>Label</Tag>
    <Tag id="tag-03" avatarSrc={AVATAR}>Label</Tag>
    <Tag id="tag-04" dot={true}>Label</Tag>
  </TagList>
</TagGroup>`,
  },

  /* 5 — CheckboxCloseXDemo (client island: selection + removable) */
  {
    id: "checkbox-close-x-demo",
    title: "Checkbox + Close X (interactive)",
    description: "Selectable tags that can also be removed. Both selection state and removal are controlled.",
    preview: <CheckboxCloseXDemo />,
    code: `<TagGroup
  label="Tags"
  size="md"
  selectionMode="multiple"
  selectedKeys={selectedTags}
  onSelectionChange={setSelectedTags}
  onRemove={(keys) => setTags(tags.filter((t) => !keys.has(t.id)))}
>
  <TagList className="flex gap-4" items={tags}>
    {(item) => <Tag {...item}>{item.label}</Tag>}
  </TagList>
</TagGroup>`,
  },

  /* 6 — CheckboxCountDemo (client island: selection + count) */
  {
    id: "checkbox-count-demo",
    title: "Checkbox + Count (interactive)",
    description: "Selectable tags with count chips. Selection state is controlled.",
    preview: <CheckboxCountDemo />,
    code: `<TagGroup
  label="Tags"
  size="md"
  selectionMode="multiple"
  selectedKeys={selectedTags}
  onSelectionChange={setSelectedTags}
>
  <TagList className="flex gap-4">
    <Tag id="tag-01" count={5}>Label</Tag>
    <Tag id="tag-02" avatarSrc={AU_FLAG} count={5}>Label</Tag>
    <Tag id="tag-03" avatarSrc={AVATAR} count={5}>Label</Tag>
    <Tag id="tag-04" dot={true} count={5}>Label</Tag>
  </TagList>
</TagGroup>`,
  },

  /* 7 — SizesDemo */
  {
    id: "sizes",
    title: "Sizes",
    description: "sm · md · lg across all tag variants.",
    preview: (
      <div className="flex flex-col gap-4">
        <TagGroup label="Tags" size="sm">
          <TagList className="flex gap-4">
            <Tag>Label</Tag>
            <Tag avatarSrc={AU_FLAG}>Label</Tag>
            <Tag avatarSrc={AVATAR}>Label</Tag>
            <Tag dot={true}>Label</Tag>
          </TagList>
        </TagGroup>
        <TagGroup label="Tags" size="md">
          <TagList className="flex gap-4">
            <Tag>Label</Tag>
            <Tag avatarSrc={AU_FLAG}>Label</Tag>
            <Tag avatarSrc={AVATAR}>Label</Tag>
            <Tag dot={true}>Label</Tag>
          </TagList>
        </TagGroup>
        <TagGroup label="Tags" size="lg">
          <TagList className="flex gap-4">
            <Tag>Label</Tag>
            <Tag avatarSrc={AU_FLAG}>Label</Tag>
            <Tag avatarSrc={AVATAR}>Label</Tag>
            <Tag dot={true}>Label</Tag>
          </TagList>
        </TagGroup>
      </div>
    ),
    code: `<TagGroup label="Tags" size="sm">
  <TagList className="flex gap-4">
    <Tag>Label</Tag>
    <Tag avatarSrc={AU_FLAG}>Label</Tag>
    <Tag avatarSrc={AVATAR}>Label</Tag>
    <Tag dot={true}>Label</Tag>
  </TagList>
</TagGroup>
{/* repeat for size="md" and size="lg" */}`,
  },

  /* 8 — Default (full size matrix, no close) */
  {
    id: "default-matrix",
    title: "Default (all sizes)",
    description: "Full size matrix: sm · md · lg, all tag types.",
    preview: (
      <div className="flex flex-col gap-4">
        <TagGroup label="Tags" size="sm">
          <TagList className="flex gap-4">
            <Tag id="tag-01">Label</Tag>
            <Tag id="tag-02" avatarSrc={AU_FLAG} avatarContrastBorder={false}>Label</Tag>
            <Tag id="tag-03" avatarSrc={AVATAR}>Label</Tag>
            <Tag id="tag-04" dot={true}>Label</Tag>
          </TagList>
        </TagGroup>
        <TagGroup label="Tags" size="md">
          <TagList className="flex gap-4">
            <Tag id="tag-11">Label</Tag>
            <Tag id="tag-12" avatarSrc={AU_FLAG} avatarContrastBorder={false}>Label</Tag>
            <Tag id="tag-13" avatarSrc={AVATAR}>Label</Tag>
            <Tag id="tag-14" dot={true}>Label</Tag>
          </TagList>
        </TagGroup>
        <TagGroup label="Tags" size="lg">
          <TagList className="flex gap-4">
            <Tag id="tag-21">Label</Tag>
            <Tag id="tag-22" avatarSrc={AU_FLAG} avatarContrastBorder={false}>Label</Tag>
            <Tag id="tag-23" avatarSrc={AVATAR}>Label</Tag>
            <Tag id="tag-24" dot={true}>Label</Tag>
          </TagList>
        </TagGroup>
      </div>
    ),
    code: `<TagGroup label="Tags" size="md">
  <TagList className="flex gap-4">
    <Tag id="tag-01">Label</Tag>
    <Tag id="tag-02" avatarSrc={AU_FLAG} avatarContrastBorder={false}>Label</Tag>
    <Tag id="tag-03" avatarSrc={AVATAR}>Label</Tag>
    <Tag id="tag-04" dot={true}>Label</Tag>
  </TagList>
</TagGroup>`,
  },

  /* 9 — CloseX (full size matrix with close) */
  {
    id: "close-x-matrix",
    title: "Close X (all sizes)",
    description: "onClose handler shown across sm · md · lg.",
    preview: <CloseXMatrix />,
    code: `<TagGroup label="Tags" size="md">
  <TagList className="flex gap-4">
    <Tag id="tag-01" onClose={() => {}}>Label</Tag>
    <Tag id="tag-02" onClose={() => {}} avatarSrc={AU_FLAG}>Label</Tag>
    <Tag id="tag-03" onClose={() => {}} avatarSrc={AVATAR}>Label</Tag>
    <Tag id="tag-04" onClose={() => {}} dot={true}>Label</Tag>
  </TagList>
</TagGroup>`,
  },

  /* 10 — Count (full size matrix with count) */
  {
    id: "count-matrix",
    title: "Count (all sizes)",
    description: "Count chips across sm · md · lg.",
    preview: (
      <div className="flex flex-col gap-4">
        <TagGroup label="Tags" size="sm">
          <TagList className="flex gap-4">
            <Tag id="tag-01" count={5}>Label</Tag>
            <Tag id="tag-02" count={5} avatarSrc={AU_FLAG} avatarContrastBorder={false}>Label</Tag>
            <Tag id="tag-03" count={5} avatarSrc={AVATAR}>Label</Tag>
            <Tag id="tag-04" count={5} dot={true}>Label</Tag>
          </TagList>
        </TagGroup>
        <TagGroup label="Tags" size="md">
          <TagList className="flex gap-4">
            <Tag id="tag-11" count={5}>Label</Tag>
            <Tag id="tag-12" count={5} avatarSrc={AU_FLAG} avatarContrastBorder={false}>Label</Tag>
            <Tag id="tag-13" count={5} avatarSrc={AVATAR}>Label</Tag>
            <Tag id="tag-14" count={5} dot={true}>Label</Tag>
          </TagList>
        </TagGroup>
        <TagGroup label="Tags" size="lg">
          <TagList className="flex gap-4">
            <Tag id="tag-21" count={5}>Label</Tag>
            <Tag id="tag-22" count={5} avatarSrc={AU_FLAG} avatarContrastBorder={false}>Label</Tag>
            <Tag id="tag-23" count={5} avatarSrc={AVATAR}>Label</Tag>
            <Tag id="tag-24" count={5} dot={true}>Label</Tag>
          </TagList>
        </TagGroup>
      </div>
    ),
    code: `<TagGroup label="Tags" size="md">
  <TagList className="flex gap-4">
    <Tag id="tag-01" count={5}>Label</Tag>
    <Tag id="tag-02" count={5} avatarSrc={AU_FLAG}>Label</Tag>
    <Tag id="tag-03" count={5} avatarSrc={AVATAR}>Label</Tag>
    <Tag id="tag-04" count={5} dot={true}>Label</Tag>
  </TagList>
</TagGroup>`,
  },

  /* 11 — CheckboxDefault (full size matrix, selectable) */
  {
    id: "checkbox-default-matrix",
    title: "Checkbox Default (all sizes)",
    description: "selectionMode=\"multiple\" across sm · md · lg.",
    preview: <CheckboxDefaultMatrix />,
    code: `<TagGroup label="Tags" selectionMode="multiple" size="md">
  <TagList className="flex gap-4">
    <Tag id="tag-01">Label</Tag>
    <Tag id="tag-02" avatarSrc={AU_FLAG}>Label</Tag>
    <Tag id="tag-03" avatarSrc={AVATAR}>Label</Tag>
    <Tag id="tag-04" dot={true}>Label</Tag>
  </TagList>
</TagGroup>`,
  },

  /* 12 — CheckboxCloseX (full size matrix, selectable + removable) */
  {
    id: "checkbox-close-x-matrix",
    title: "Checkbox + Close X (all sizes)",
    description: "Selectable and removable tags across sm · md · lg.",
    preview: <CheckboxCloseXMatrix />,
    code: `<TagGroup label="Tags" selectionMode="multiple" size="md">
  <TagList className="flex gap-4">
    <Tag id="tag-01" onClose={() => {}}>Label</Tag>
    <Tag id="tag-02" onClose={() => {}} avatarSrc={AU_FLAG}>Label</Tag>
    <Tag id="tag-03" onClose={() => {}} avatarSrc={AVATAR}>Label</Tag>
    <Tag id="tag-04" onClose={() => {}} dot={true}>Label</Tag>
  </TagList>
</TagGroup>`,
  },

  /* 13 — CheckboxCount (full size matrix, selectable + count) */
  {
    id: "checkbox-count-matrix",
    title: "Checkbox + Count (all sizes)",
    description: "Selectable tags with count chips across sm · md · lg.",
    preview: <CheckboxCountMatrix />,
    code: `<TagGroup label="Tags" selectionMode="multiple" size="md">
  <TagList className="flex gap-4">
    <Tag id="tag-01" count={5}>Label</Tag>
    <Tag id="tag-02" count={5} avatarSrc={AU_FLAG}>Label</Tag>
    <Tag id="tag-03" count={5} avatarSrc={AVATAR}>Label</Tag>
    <Tag id="tag-04" count={5} dot={true}>Label</Tag>
  </TagList>
</TagGroup>`,
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
