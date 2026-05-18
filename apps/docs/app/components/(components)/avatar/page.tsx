"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { ReactNode } from "react";
import { Avatar, AvatarAddButton, AvatarCompanyIcon, AvatarCount, AvatarLabelGroup, AvatarProfilePhoto } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SRC = "https://i.pravatar.cc/150?u=olivia";
const COMPANY = "https://i.pravatar.cc/150?u=layers-company";
const GROUP_SRCS = [
  "https://i.pravatar.cc/150?u=g1",
  "https://i.pravatar.cc/150?u=g2",
  "https://i.pravatar.cc/150?u=g3",
  "https://i.pravatar.cc/150?u=g4",
  "https://i.pravatar.cc/150?u=g5",
  "https://i.pravatar.cc/150?u=g6",
];
const ALTS = ["Sienna H", "Ammar F", "Pippa W", "Olly S", "Mathilde L", "Julius V"];
const SIZES_ALL = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

function AvatarLink({ children, relative = false }: { children: ReactNode; relative?: boolean }) {
  return (
    <a href="#" className={`group inline-flex focus:outline-hidden${relative ? " relative" : ""}`}>
      {children}
    </a>
  );
}

const companyIconRow = (border?: true) => (
  <div className="flex items-start gap-8">
    {SIZES_ALL.map((sz) => (
      <AvatarLink key={sz} relative>
        <Avatar
          {...(border ? { border } : {})}
          size={sz}
          src={SRC}
          alt="Olivia Rhye"
          focusable
          badge={<AvatarCompanyIcon src={COMPANY} alt="Layers Inc." size={sz} />}
        />
      </AvatarLink>
    ))}
  </div>
);

const statusRow = (border?: true) => (
  <div className="flex items-start gap-8">
    {SIZES_ALL.map((sz) => (
      <AvatarLink key={sz} relative>
        <Avatar {...(border ? { border } : {})} size={sz} src={SRC} focusable alt="Olivia Rhye" status="online" />
      </AvatarLink>
    ))}
  </div>
);

const countRow = (border?: true) => (
  <div className="flex items-start gap-8">
    {SIZES_ALL.map((sz) => (
      <AvatarLink key={sz}>
        <Avatar
          {...(border ? { border } : {})}
          size={sz}
          src={SRC}
          alt="Olivia Rhye"
          focusable
          badge={<AvatarCount count={5} />}
        />
      </AvatarLink>
    ))}
  </div>
);

const verifiedRow = (border?: true) => (
  <div className="flex items-start gap-8">
    {SIZES_ALL.map((sz) => (
      <AvatarLink key={sz} relative>
        <Avatar {...(border ? { border } : {})} size={sz} src={SRC} focusable alt="Olivia Rhye" verified />
      </AvatarLink>
    ))}
  </div>
);

const baseRow = (border?: true) => (
  <div className="flex items-start gap-8">
    {SIZES_ALL.map((sz) => (
      <AvatarLink key={sz}>
        <Avatar {...(border ? { border } : {})} size={sz} src={SRC} alt="Olivia Rhye" focusable />
      </AvatarLink>
    ))}
  </div>
);

function GroupRow({ size, spacing }: { size: "xs" | "sm" | "md"; spacing: string }) {
  return (
    <div className="flex gap-2">
      <div className={`flex -${spacing}`}>
        {GROUP_SRCS.map((src, i) => (
          <Avatar key={src} className="ring-[1.5px] ring-bg" size={size} src={src} alt={ALTS[i] ?? "User"} />
        ))}
        <Avatar
          size={size}
          className="ring-[1.5px] ring-bg"
          placeholder={<span className="flex items-center justify-center text-xs font-semibold text-fg-tertiary">+5</span>}
        />
      </div>
      <AvatarAddButton size={size} />
    </div>
  );
}

const SECTIONS: DocExample[] = [
  {
    id: "default-demo",
    title: "Default",
    description: "Avatar with name and subtitle.",
    preview: (
      <AvatarLabelGroup size="md" src={SRC} alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" />
    ),
    code: `<AvatarLabelGroup size="md" src="..." alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" />`,
  },
  {
    id: "base",
    title: "Base",
    description: "Plain avatar with an image.",
    preview: (
      <div className="flex items-start gap-8">
        {SIZES_ALL.map((sz) => (
          <Avatar key={sz} size={sz} src={SRC} alt="Olivia Rhye" />
        ))}
      </div>
    ),
    code: `<Avatar size="xs" src="..." alt="Olivia Rhye" />
<Avatar size="sm" src="..." alt="Olivia Rhye" />
<Avatar size="md" src="..." alt="Olivia Rhye" />
<Avatar size="lg" src="..." alt="Olivia Rhye" />
<Avatar size="xl" src="..." alt="Olivia Rhye" />
<Avatar size="2xl" src="..." alt="Olivia Rhye" />`,
  },
  {
    id: "status-indicator",
    title: "Status indicator",
    description: "Online and offline status dot.",
    preview: (
      <div className="flex gap-8">
        <Avatar status="online"  size="md" src={SRC} alt="Olivia Rhye" />
        <Avatar status="offline" size="md" src={SRC} alt="Olivia Rhye" />
      </div>
    ),
    code: `<Avatar status="online"  size="md" src="..." alt="Olivia Rhye" />
<Avatar status="offline" size="md" src="..." alt="Olivia Rhye" />`,
  },
  {
    id: "company-logo",
    title: "Company logo",
    description: "AvatarCompanyIcon anchored to the bottom-right via the badge prop.",
    preview: (
      <Avatar
        size="md"
        src={SRC}
        alt="Olivia Rhye"
        badge={<AvatarCompanyIcon src={COMPANY} alt="Layers Inc." size="md" />}
      />
    ),
    code: `<Avatar
  size="md"
  src="..."
  alt="Olivia Rhye"
  badge={<AvatarCompanyIcon src="..." alt="Layers Inc." size="md" />}
/>`,
  },
  {
    id: "verified",
    title: "Verified",
    description: "Verified badge anchored to the bottom-right.",
    preview: <Avatar verified size="md" src={SRC} alt="Olivia Rhye" />,
    code: `<Avatar verified size="md" src="..." alt="Olivia Rhye" />`,
  },
  {
    id: "placeholder",
    title: "Placeholder",
    description: "No src — renders the default user icon.",
    preview: <Avatar size="md" alt="Olivia Rhye" />,
    code: `<Avatar size="md" alt="Olivia Rhye" />`,
  },
  {
    id: "initials",
    title: "Initials",
    description: "Initials when no image is available.",
    preview: <Avatar size="md" initials="OR" alt="Olivia Rhye" />,
    code: `<Avatar size="md" initials="OR" alt="Olivia Rhye" />`,
  },
  {
    id: "label-group-demo",
    title: "Label group",
    description: "Avatar with name and subtitle.",
    preview: (
      <AvatarLabelGroup size="md" src={SRC} alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" />
    ),
    code: `<AvatarLabelGroup size="md" src="..." alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" />`,
  },
  {
    id: "group-demo",
    title: "Group",
    description: "Stacked avatars with overflow count and add button. sm size.",
    preview: <GroupRow size="sm" spacing="space-x-2" />,
    code: `<div className="flex -space-x-2">
  <Avatar className="ring-[1.5px] ring-bg" size="sm" src="..." alt="User 1" />
  ...
  <Avatar size="sm" className="ring-[1.5px] ring-bg" placeholder={<span>+5</span>} />
</div>
<AvatarAddButton size="sm" />`,
  },
  {
    id: "profile-photo-demo",
    title: "Profile photo",
    description: "Large avatar for profile pages. Image, placeholder, and initials at md size.",
    preview: (
      <div className="flex gap-8">
        <AvatarProfilePhoto verified size="md" src={SRC} alt="Olivia Rhye" />
        <AvatarProfilePhoto verified size="md" alt="Olivia Rhye" />
        <AvatarProfilePhoto verified size="md" initials="OR" alt="Olivia Rhye" />
      </div>
    ),
    code: `<AvatarProfilePhoto verified size="md" src="..." alt="Olivia Rhye" />
<AvatarProfilePhoto verified size="md" alt="Olivia Rhye" />
<AvatarProfilePhoto verified size="md" initials="OR" alt="Olivia Rhye" />`,
  },
  {
    id: "group",
    title: "Group — all sizes",
    description: "Stacked avatar groups at xs, sm, and md with add button.",
    preview: (
      <div className="flex flex-col gap-4">
        <GroupRow size="xs" spacing="space-x-1" />
        <GroupRow size="sm" spacing="space-x-2" />
        <GroupRow size="md" spacing="space-x-3" />
      </div>
    ),
    code: `<div className="flex gap-2">
  <div className="flex -space-x-2">
    <Avatar className="ring-[1.5px] ring-bg" size="sm" src="..." alt="User" />
    ...
  </div>
  <AvatarAddButton size="sm" />
</div>`,
  },
  {
    id: "default-all",
    title: "Default — all sizes",
    description: "All sizes × no badge, count badge, online, company icon, verified.",
    preview: (
      <div className="flex flex-col gap-4">
        {baseRow()}
        {countRow()}
        {statusRow()}
        {companyIconRow()}
        {verifiedRow()}
      </div>
    ),
    code: `<Avatar size="xs" src="..." alt="Olivia Rhye" focusable />
<Avatar size="md" src="..." badge={<AvatarCount count={5} />} focusable />
<Avatar size="md" src="..." status="online" focusable />
<Avatar size="md" src="..." badge={<AvatarCompanyIcon src="..." alt="..." size="md" />} focusable />
<Avatar size="md" src="..." verified focusable />`,
  },
  {
    id: "with-border",
    title: "With border — all sizes",
    description: "All sizes with border ring × no badge, count badge, online, company icon, verified.",
    preview: (
      <div className="flex flex-col gap-4">
        {baseRow(true)}
        {countRow(true)}
        {statusRow(true)}
        {companyIconRow(true)}
        {verifiedRow(true)}
      </div>
    ),
    code: `<Avatar border size="xs" src="..." alt="Olivia Rhye" focusable />
<Avatar border size="md" src="..." badge={<AvatarCount count={5} />} focusable />
<Avatar border size="md" src="..." status="online" focusable />
<Avatar border size="md" src="..." badge={<AvatarCompanyIcon src="..." alt="..." size="md" />} focusable />
<Avatar border size="md" src="..." verified focusable />`,
  },
  {
    id: "placeholder-all",
    title: "Placeholder — all sizes",
    description: "Default user icon across all sizes, with status and company icon.",
    preview: (
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-8">
          {SIZES_ALL.map((sz) => <Avatar key={sz} size={sz} />)}
        </div>
        <div className="flex items-start gap-8">
          {SIZES_ALL.map((sz) => <Avatar key={sz} size={sz} status="online" />)}
        </div>
        <div className="flex items-start gap-8">
          {SIZES_ALL.map((sz) => (
            <Avatar key={sz} size={sz} badge={<AvatarCompanyIcon src={COMPANY} alt="Layers Inc." size={sz} />} />
          ))}
        </div>
      </div>
    ),
    code: `<Avatar size="md" />
<Avatar size="md" status="online" />
<Avatar size="md" badge={<AvatarCompanyIcon src="..." alt="..." size="md" />} />`,
  },
  {
    id: "initials-all",
    title: "Initials — all sizes",
    description: "Initials across all sizes, with status and company icon.",
    preview: (
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-8">
          {SIZES_ALL.map((sz) => <Avatar key={sz} size={sz} initials="OR" />)}
        </div>
        <div className="flex items-start gap-8">
          {SIZES_ALL.map((sz) => <Avatar key={sz} size={sz} initials="OR" status="online" />)}
        </div>
        <div className="flex items-start gap-8">
          {SIZES_ALL.map((sz) => (
            <Avatar key={sz} size={sz} initials="OR" badge={<AvatarCompanyIcon src={COMPANY} alt="Layers Inc." size={sz} />} />
          ))}
        </div>
      </div>
    ),
    code: `<Avatar size="md" initials="OR" />
<Avatar size="md" initials="OR" status="online" />
<Avatar size="md" initials="OR" badge={<AvatarCompanyIcon src="..." alt="..." size="md" />} />`,
  },
  {
    id: "label-group-all",
    title: "Label group — all sizes",
    description: "AvatarLabelGroup at sm/md/lg × no decoration, online, company icon, verified.",
    preview: (
      <div className="flex flex-col gap-4">
        {(["sm", "md", "lg"] as const).map((sz) => (
          <AvatarLabelGroup key={sz} size={sz} src={SRC} alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" />
        ))}
        {(["sm", "md", "lg"] as const).map((sz) => (
          <AvatarLabelGroup key={`${sz}-online`} size={sz} src={SRC} alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" status="online" />
        ))}
        {(["sm", "md", "lg"] as const).map((sz) => (
          <AvatarLabelGroup key={`${sz}-company`} size={sz} src={SRC} alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" badge={<AvatarCompanyIcon src={COMPANY} alt="Layers Inc." size={sz} />} />
        ))}
        {(["sm", "md", "lg"] as const).map((sz) => (
          <AvatarLabelGroup key={`${sz}-verified`} size={sz} src={SRC} alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" verified />
        ))}
      </div>
    ),
    code: `<AvatarLabelGroup size="sm" src="..." alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" />
<AvatarLabelGroup size="md" src="..." alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" status="online" />
<AvatarLabelGroup size="lg" src="..." alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" verified />`,
  },
  {
    id: "profile-photo-all",
    title: "Profile photo — all sizes",
    description: "AvatarProfilePhoto at sm/md/lg × image, placeholder, initials.",
    preview: (
      <div className="flex flex-col gap-16">
        <div className="flex gap-8">
          {(["sm", "md", "lg"] as const).map((sz) => (
            <AvatarProfilePhoto key={sz} verified size={sz} src={SRC} alt="Olivia Rhye" />
          ))}
        </div>
        <div className="flex gap-8">
          {(["sm", "md", "lg"] as const).map((sz) => (
            <AvatarProfilePhoto key={sz} verified size={sz} alt="Olivia Rhye" />
          ))}
        </div>
        <div className="flex gap-8">
          {(["sm", "md", "lg"] as const).map((sz) => (
            <AvatarProfilePhoto key={sz} verified size={sz} initials="OR" />
          ))}
        </div>
      </div>
    ),
    code: `<AvatarProfilePhoto verified size="sm" src="..." alt="Olivia Rhye" />
<AvatarProfilePhoto verified size="md" src="..." alt="Olivia Rhye" />
<AvatarProfilePhoto verified size="lg" src="..." alt="Olivia Rhye" />`,
  },
];

export default function AvatarPage() {
  return (
    <ComponentDocLayout
      name="Avatar"
      tagline="User identity container with image, initials, or placeholder fallback. Supports status dots, verified badges, count badges, company icons, label groups, and profile photos."
      install={{
        usage: `import { Avatar, AvatarLabelGroup, AvatarProfilePhoto, AvatarCompanyIcon, AvatarCount, AvatarAddButton } from "@mvp-ui/ui";`,
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
