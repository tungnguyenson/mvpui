/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Avatar, AvatarLabelGroup, AvatarProfilePhoto } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SRC = "https://i.pravatar.cc/150?u=olivia";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Avatar",
    description: "Avatar with name and subtitle.",
    preview: (
      <AvatarLabelGroup
        size="md"
        src={SRC}
        alt="Olivia Rhye"
        title="Olivia Rhye"
        subtitle="olivia@untitledui.com"
      />
    ),
    code: `<AvatarLabelGroup
  size="md"
  src="..."
  alt="Olivia Rhye"
  title="Olivia Rhye"
  subtitle="olivia@untitledui.com"
/>`,
  },
  {
    id: "base",
    title: "Base",
    description: "Plain avatar with an image.",
    preview: (
      <Avatar size="md" src={SRC} alt="Olivia Rhye" />
    ),
    code: `<Avatar size="md" src="..." alt="Olivia Rhye" />`,
  },
  {
    id: "status-indicator",
    title: "Status indicator",
    description: "Online and offline status dot across all sizes.",
    preview: (
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-8">
          <Avatar status="online" size="xs"  src={SRC} alt="Olivia Rhye" />
          <Avatar status="online" size="sm"  src={SRC} alt="Olivia Rhye" />
          <Avatar status="online" size="md"  src={SRC} alt="Olivia Rhye" />
          <Avatar status="online" size="lg"  src={SRC} alt="Olivia Rhye" />
          <Avatar status="online" size="xl"  src={SRC} alt="Olivia Rhye" />
          <Avatar status="online" size="2xl" src={SRC} alt="Olivia Rhye" />
        </div>
        <div className="flex items-start gap-8">
          <Avatar status="offline" size="xs"  src={SRC} alt="Olivia Rhye" />
          <Avatar status="offline" size="sm"  src={SRC} alt="Olivia Rhye" />
          <Avatar status="offline" size="md"  src={SRC} alt="Olivia Rhye" />
          <Avatar status="offline" size="lg"  src={SRC} alt="Olivia Rhye" />
          <Avatar status="offline" size="xl"  src={SRC} alt="Olivia Rhye" />
          <Avatar status="offline" size="2xl" src={SRC} alt="Olivia Rhye" />
        </div>
      </div>
    ),
    code: `<Avatar status="online"  size="md" src="..." alt="Olivia Rhye" />
<Avatar status="offline" size="md" src="..." alt="Olivia Rhye" />`,
  },
  {
    id: "verified",
    title: "Verified",
    description: "Verified badge anchored to the bottom-right.",
    preview: (
      <Avatar verified size="md" src={SRC} alt="Olivia Rhye" />
    ),
    code: `<Avatar verified size="md" src="..." alt="Olivia Rhye" />`,
  },
  {
    id: "placeholder",
    title: "Placeholder",
    description: "No src — renders a generic user icon.",
    preview: (
      <Avatar size="md" alt="Olivia Rhye" />
    ),
    code: `<Avatar size="md" alt="Olivia Rhye" />`,
  },
  {
    id: "initials",
    title: "Initials",
    description: "Initials when no image is available.",
    preview: (
      <Avatar size="md" initials="OR" alt="Olivia Rhye" />
    ),
    code: `<Avatar size="md" initials="OR" alt="Olivia Rhye" />`,
  },
  {
    id: "label-group",
    title: "Label group",
    description: "Avatar with name and subtitle.",
    preview: (
      <AvatarLabelGroup
        size="md"
        src={SRC}
        alt="Olivia Rhye"
        title="Olivia Rhye"
        subtitle="olivia@untitledui.com"
      />
    ),
    code: `<AvatarLabelGroup
  size="md"
  src="..."
  alt="Olivia Rhye"
  title="Olivia Rhye"
  subtitle="olivia@untitledui.com"
/>`,
  },
  {
    id: "profile-photo",
    title: "Profile photo",
    description: "Large avatar for profile pages. Three sizes, three content types (image, placeholder, initials).",
    preview: (
      <div className="flex flex-col gap-16">
        <div className="flex gap-8">
          <AvatarProfilePhoto verified size="sm" src={SRC} alt="Olivia Rhye" />
          <AvatarProfilePhoto verified size="md" src={SRC} alt="Olivia Rhye" />
          <AvatarProfilePhoto verified size="lg" src={SRC} alt="Olivia Rhye" />
        </div>
        <div className="flex gap-8">
          <AvatarProfilePhoto verified size="sm" alt="Olivia Rhye" />
          <AvatarProfilePhoto verified size="md" alt="Olivia Rhye" />
          <AvatarProfilePhoto verified size="lg" alt="Olivia Rhye" />
        </div>
        <div className="flex gap-8">
          <AvatarProfilePhoto verified size="sm" initials="OR" alt="Olivia Rhye" />
          <AvatarProfilePhoto verified size="md" initials="OR" alt="Olivia Rhye" />
          <AvatarProfilePhoto verified size="lg" initials="OR" alt="Olivia Rhye" />
        </div>
      </div>
    ),
    code: `<AvatarProfilePhoto verified size="sm" src="..." alt="Olivia Rhye" />
<AvatarProfilePhoto verified size="md" src="..." alt="Olivia Rhye" />
<AvatarProfilePhoto verified size="lg" src="..." alt="Olivia Rhye" />`,
  },
  {
    id: "group",
    title: "Group",
    description: "Stacked avatars with overflow count. Three sizes.",
    preview: (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="flex -space-x-1">
            <Avatar className="ring-[1.5px] ring-bg" size="xs" src="https://i.pravatar.cc/150?u=a" alt="User 1" />
            <Avatar className="ring-[1.5px] ring-bg" size="xs" src="https://i.pravatar.cc/150?u=b" alt="User 2" />
            <Avatar className="ring-[1.5px] ring-bg" size="xs" src="https://i.pravatar.cc/150?u=c" alt="User 3" />
            <Avatar className="ring-[1.5px] ring-bg" size="xs" src="https://i.pravatar.cc/150?u=d" alt="User 4" />
            <Avatar className="ring-[1.5px] ring-bg" size="xs" src="https://i.pravatar.cc/150?u=e" alt="User 5" />
            <Avatar className="ring-[1.5px] ring-bg" size="xs" src="https://i.pravatar.cc/150?u=f" alt="User 6" />
            <Avatar className="ring-[1.5px] ring-bg" size="xs" initials="+5" alt="+5 more" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex -space-x-2">
            <Avatar className="ring-[1.5px] ring-bg" size="sm" src="https://i.pravatar.cc/150?u=a" alt="User 1" />
            <Avatar className="ring-[1.5px] ring-bg" size="sm" src="https://i.pravatar.cc/150?u=b" alt="User 2" />
            <Avatar className="ring-[1.5px] ring-bg" size="sm" src="https://i.pravatar.cc/150?u=c" alt="User 3" />
            <Avatar className="ring-[1.5px] ring-bg" size="sm" src="https://i.pravatar.cc/150?u=d" alt="User 4" />
            <Avatar className="ring-[1.5px] ring-bg" size="sm" src="https://i.pravatar.cc/150?u=e" alt="User 5" />
            <Avatar className="ring-[1.5px] ring-bg" size="sm" src="https://i.pravatar.cc/150?u=f" alt="User 6" />
            <Avatar className="ring-[1.5px] ring-bg" size="sm" initials="+5" alt="+5 more" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex -space-x-3">
            <Avatar className="ring-[1.5px] ring-bg" size="md" src="https://i.pravatar.cc/150?u=a" alt="User 1" />
            <Avatar className="ring-[1.5px] ring-bg" size="md" src="https://i.pravatar.cc/150?u=b" alt="User 2" />
            <Avatar className="ring-[1.5px] ring-bg" size="md" src="https://i.pravatar.cc/150?u=c" alt="User 3" />
            <Avatar className="ring-[1.5px] ring-bg" size="md" src="https://i.pravatar.cc/150?u=d" alt="User 4" />
            <Avatar className="ring-[1.5px] ring-bg" size="md" src="https://i.pravatar.cc/150?u=e" alt="User 5" />
            <Avatar className="ring-[1.5px] ring-bg" size="md" src="https://i.pravatar.cc/150?u=f" alt="User 6" />
            <Avatar className="ring-[1.5px] ring-bg" size="md" initials="+5" alt="+5 more" />
          </div>
        </div>
      </div>
    ),
    code: `<div className="flex -space-x-2">
  <Avatar className="ring-[1.5px] ring-bg" size="sm" src="..." alt="User 1" />
  <Avatar className="ring-[1.5px] ring-bg" size="sm" src="..." alt="User 2" />
  <Avatar className="ring-[1.5px] ring-bg" size="sm" src="..." alt="User 3" />
  <Avatar className="ring-[1.5px] ring-bg" size="sm" initials="+5" alt="+5 more" />
</div>`,
  },
];

export default function AvatarPage() {
  return (
    <ComponentDocLayout
      name="Avatar"
      tagline="User identity container with image, initials, or placeholder fallback. Supports status dots, verified badges, count badges, and label groups."
      install={{
        usage: `import { Avatar, AvatarLabelGroup, AvatarProfilePhoto } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Size xs", value: "24px (size-6)" },
        { label: "Size sm", value: "32px (size-8)" },
        { label: "Size md", value: "40px (size-10)" },
        { label: "Size lg", value: "48px (size-12)" },
        { label: "Size xl", value: "56px (size-14)" },
        { label: "Size 2xl", value: "64px (size-16)" },
        { label: "Placeholder bg", value: "bg-bg-tertiary" },
        { label: "Ring (border)", value: "ring-1 ring-border" },
      ]}
    />
  );
}
