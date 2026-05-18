/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import { Tag, TagGroup, TagList, type TagItem } from "@mvp-ui/ui";

/* Selection is re-exported from react-aria-components via TagGroup.
   We use a local alias to avoid a direct dependency on react-aria-components
   in the docs app. */
type Key = string | number;
type Selection = "all" | Set<Key>;

/* Client island: examples that use useState (onClose / selectionMode + state).
   Imported as <ComponentName /> in the server page. */

export function CloseXDemo() {
  const [tags, setTags] = useState<TagItem[]>([
    { id: "tag-01", label: "Label" },
    { id: "tag-02", label: "Label", avatarSrc: "https://www.untitledui.com/images/flags/AU.svg", avatarContrastBorder: false },
    { id: "tag-03", label: "Label", avatarSrc: "https://i.pravatar.cc/150?u=olivia" },
    { id: "tag-04", label: "Label", dot: true },
  ]);

  return (
    <TagGroup
      label="Tags"
      size="md"
      onRemove={(keys) => {
        setTags(tags.filter((tag) => !keys.has(tag.id)));
      }}
    >
      <TagList className="flex flex-col items-start gap-4 md:flex-row" items={tags}>
        {(item) => <Tag {...item}>{item.label}</Tag>}
      </TagList>
    </TagGroup>
  );
}

export function CheckboxDemo() {
  const [selectedTags, setSelectedTags] = useState<Selection>(new Set(["tag-01", "tag-02"]));

  return (
    <TagGroup label="Tags" size="md" selectionMode="multiple" selectedKeys={selectedTags} onSelectionChange={setSelectedTags}>
      <TagList className="flex flex-col items-start gap-4 md:flex-row">
        <Tag id="tag-01">Label</Tag>
        <Tag id="tag-02" avatarSrc="https://www.untitledui.com/images/flags/AU.svg">
          Label
        </Tag>
        <Tag id="tag-03" avatarSrc="https://i.pravatar.cc/150?u=olivia">
          Label
        </Tag>
        <Tag id="tag-04" dot={true}>
          Label
        </Tag>
      </TagList>
    </TagGroup>
  );
}

export function CheckboxCloseXDemo() {
  const [selectedTags, setSelectedTags] = useState<Selection>(new Set(["tag-01", "tag-02"]));
  const [tags, setTags] = useState<TagItem[]>([
    { id: "tag-01", label: "Label" },
    { id: "tag-02", label: "Label", avatarSrc: "https://www.untitledui.com/images/flags/AU.svg", avatarContrastBorder: false },
    { id: "tag-03", label: "Label", avatarSrc: "https://i.pravatar.cc/150?u=olivia" },
    { id: "tag-04", label: "Label", dot: true },
  ]);

  return (
    <TagGroup
      label="Tags"
      size="md"
      selectionMode="multiple"
      selectedKeys={selectedTags}
      onSelectionChange={setSelectedTags}
      onRemove={(keys) => {
        setTags(tags.filter((tag) => !keys.has(tag.id)));
      }}
    >
      <TagList className="flex flex-col items-start gap-4 md:flex-row" items={tags}>
        {(item) => <Tag {...item}>{item.label}</Tag>}
      </TagList>
    </TagGroup>
  );
}

export function CheckboxCountDemo() {
  const [selectedTags, setSelectedTags] = useState<Selection>(new Set(["tag-01", "tag-02"]));

  return (
    <TagGroup label="Tags" size="md" selectionMode="multiple" selectedKeys={selectedTags} onSelectionChange={setSelectedTags}>
      <TagList className="flex flex-col items-start gap-4 md:flex-row">
        <Tag id="tag-01" count={5}>
          Label
        </Tag>
        <Tag id="tag-02" avatarSrc="https://www.untitledui.com/images/flags/AU.svg" count={5}>
          Label
        </Tag>
        <Tag id="tag-03" avatarSrc="https://i.pravatar.cc/150?u=olivia" count={5}>
          Label
        </Tag>
        <Tag id="tag-04" dot={true} count={5}>
          Label
        </Tag>
      </TagList>
    </TagGroup>
  );
}

/* Full-matrix demos below — no state needed but they use static data arrays
   rendered as explicit JSX, so we keep them here for consistent module loading. */

export function CloseXMatrix() {
  return (
    <div className="flex flex-col gap-4">
      <TagGroup label="Tags" size="sm">
        <TagList className="flex gap-4">
          <Tag id="tag-01" onClose={() => {}}>Label</Tag>
          <Tag id="tag-02" onClose={() => {}} avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-03" onClose={() => {}} avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-04" onClose={() => {}} dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
      <TagGroup label="Tags" size="md">
        <TagList className="flex gap-4">
          <Tag id="tag-11" onClose={() => {}}>Label</Tag>
          <Tag id="tag-12" onClose={() => {}} avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-13" onClose={() => {}} avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-14" onClose={() => {}} dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
      <TagGroup label="Tags" size="lg">
        <TagList className="flex gap-4">
          <Tag id="tag-21" onClose={() => {}}>Label</Tag>
          <Tag id="tag-22" onClose={() => {}} avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-23" onClose={() => {}} avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-24" onClose={() => {}} dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
    </div>
  );
}

export function CheckboxDefaultMatrix() {
  return (
    <div className="flex flex-col gap-4">
      <TagGroup label="Tags" selectionMode="multiple" size="sm">
        <TagList className="flex gap-4">
          <Tag id="tag-01">Label</Tag>
          <Tag id="tag-02" avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-03" avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-04" dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
      <TagGroup label="Tags" selectionMode="multiple" size="md">
        <TagList className="flex gap-4">
          <Tag id="tag-11">Label</Tag>
          <Tag id="tag-12" avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-13" avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-14" dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
      <TagGroup label="Tags" selectionMode="multiple" size="lg">
        <TagList className="flex gap-4">
          <Tag id="tag-21">Label</Tag>
          <Tag id="tag-22" avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-23" avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-24" dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
    </div>
  );
}

export function CheckboxCloseXMatrix() {
  return (
    <div className="flex flex-col gap-4">
      <TagGroup label="Tags" selectionMode="multiple" size="sm">
        <TagList className="flex gap-4">
          <Tag id="tag-01" onClose={() => {}}>Label</Tag>
          <Tag id="tag-02" onClose={() => {}} avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-03" onClose={() => {}} avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-04" onClose={() => {}} dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
      <TagGroup label="Tags" selectionMode="multiple" size="md">
        <TagList className="flex gap-4">
          <Tag id="tag-11" onClose={() => {}}>Label</Tag>
          <Tag id="tag-12" onClose={() => {}} avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-13" onClose={() => {}} avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-14" onClose={() => {}} dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
      <TagGroup label="Tags" selectionMode="multiple" size="lg">
        <TagList className="flex gap-4">
          <Tag id="tag-21" onClose={() => {}}>Label</Tag>
          <Tag id="tag-22" onClose={() => {}} avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-23" onClose={() => {}} avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-24" onClose={() => {}} dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
    </div>
  );
}

export function CheckboxCountMatrix() {
  return (
    <div className="flex flex-col gap-4">
      <TagGroup label="Tags" selectionMode="multiple" size="sm">
        <TagList className="flex gap-4">
          <Tag id="tag-01" count={5}>Label</Tag>
          <Tag id="tag-02" count={5} avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-03" count={5} avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-04" count={5} dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
      <TagGroup label="Tags" selectionMode="multiple" size="md">
        <TagList className="flex gap-4">
          <Tag id="tag-11" count={5}>Label</Tag>
          <Tag id="tag-12" count={5} avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-13" count={5} avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-14" count={5} dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
      <TagGroup label="Tags" selectionMode="multiple" size="lg">
        <TagList className="flex gap-4">
          <Tag id="tag-21" count={5}>Label</Tag>
          <Tag id="tag-22" count={5} avatarSrc="https://www.untitledui.com/images/flags/AU.svg" avatarContrastBorder={false}>Label</Tag>
          <Tag id="tag-23" count={5} avatarSrc="https://i.pravatar.cc/150?u=olivia">Label</Tag>
          <Tag id="tag-24" count={5} dot={true}>Label</Tag>
        </TagList>
      </TagGroup>
    </div>
  );
}
