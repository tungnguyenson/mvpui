/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { ArrowRight, ArrowUp, Plus } from "lucide-react";
import {
  Badge,
  BadgeIcon,
  BadgeWithButton,
  BadgeWithDot,
  BadgeWithFlag,
  BadgeWithIcon,
  BadgeWithImage,
  filledColors,
  type BadgeColor,
} from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const COLORS = Object.keys(filledColors) as BadgeColor[];
const IMG = "https://i.pravatar.cc/150?u=olivia";
const SIZES = ["sm", "md", "lg"] as const;

const allColorRows = (render: (color: BadgeColor) => React.ReactNode) => (
  <div className="flex flex-col items-start gap-4">
    {COLORS.map((color) => (
      <div key={color} className="flex items-start gap-4">
        {render(color)}
      </div>
    ))}
  </div>
);

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description: "BadgeWithDot across all three types: pill-color, color, modern.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-start gap-4">
          <BadgeWithDot type="pill-color" color="brand">Label</BadgeWithDot>
          <BadgeWithDot type="color"      color="brand">Label</BadgeWithDot>
          <BadgeWithDot type="modern"     color="brand">Label</BadgeWithDot>
        </div>
      </div>
    ),
    code: `<BadgeWithDot type="pill-color" color="brand">Label</BadgeWithDot>
<BadgeWithDot type="color"      color="brand">Label</BadgeWithDot>
<BadgeWithDot type="modern"     color="brand">Label</BadgeWithDot>`,
  },
  {
    id: "pill-color",
    title: "Pill color",
    description: "Rounded-full. All 12 colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <Badge key={sz} color={color} size={sz} type="pill-color">Label</Badge>
    ))),
    code: `<Badge color="brand" size="sm" type="pill-color">Label</Badge>
<Badge color="brand" size="md" type="pill-color">Label</Badge>
<Badge color="brand" size="lg" type="pill-color">Label</Badge>`,
  },
  {
    id: "badge-color",
    title: "Badge color",
    description: "Rounded-md shape. All 12 colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <Badge key={sz} color={color} size={sz} type="color">Label</Badge>
    ))),
    code: `<Badge color="brand" size="sm" type="color">Label</Badge>
<Badge color="brand" size="md" type="color">Label</Badge>
<Badge color="brand" size="lg" type="color">Label</Badge>`,
  },
  {
    id: "badge-modern",
    title: "Badge modern",
    description: "Surface bg + ring + shadow. Always neutral container.",
    preview: (
      <div className="flex items-start gap-4">
        {SIZES.map((sz) => <Badge key={sz} color="gray" size={sz} type="modern">Label</Badge>)}
      </div>
    ),
    code: `<Badge color="gray" size="sm" type="modern">Label</Badge>
<Badge color="gray" size="md" type="modern">Label</Badge>
<Badge color="gray" size="lg" type="modern">Label</Badge>`,
  },
  {
    id: "with-dot",
    title: "With dot — pill color",
    description: "Colored dot before label. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithDot key={sz} color={color} size={sz} type="pill-color">Label</BadgeWithDot>
    ))),
    code: `<BadgeWithDot color="brand" size="sm" type="pill-color">Label</BadgeWithDot>
<BadgeWithDot color="brand" size="md" type="pill-color">Label</BadgeWithDot>
<BadgeWithDot color="brand" size="lg" type="pill-color">Label</BadgeWithDot>`,
  },
  {
    id: "with-dot-color",
    title: "With dot — badge color",
    description: "Dot + badge color type. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithDot key={sz} color={color} size={sz} type="color">Label</BadgeWithDot>
    ))),
    code: `<BadgeWithDot color="brand" size="md" type="color">Label</BadgeWithDot>`,
  },
  {
    id: "with-dot-modern",
    title: "With dot — modern",
    description: "Neutral container, colored dot. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithDot key={sz} color={color} size={sz} type="modern">Label</BadgeWithDot>
    ))),
    code: `<BadgeWithDot color="brand" size="md" type="modern">Label</BadgeWithDot>`,
  },
  {
    id: "with-flag",
    title: "With flag — pill color",
    description: "Country flag before label. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithFlag key={sz} color={color} size={sz} flag="AU" type="pill-color">Label</BadgeWithFlag>
    ))),
    code: `<BadgeWithFlag color="brand" size="md" flag="AU" type="pill-color">Label</BadgeWithFlag>`,
  },
  {
    id: "with-flag-color",
    title: "With flag — badge color",
    description: "Flag + badge color type. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithFlag key={sz} color={color} size={sz} flag="AU" type="color">Label</BadgeWithFlag>
    ))),
    code: `<BadgeWithFlag color="brand" size="md" flag="AU" type="color">Label</BadgeWithFlag>`,
  },
  {
    id: "with-flag-modern",
    title: "With flag — modern",
    description: "Flag + neutral container. gray color × sm / md / lg.",
    preview: (
      <div className="flex items-start gap-4">
        {SIZES.map((sz) => (
          <BadgeWithFlag key={sz} color="gray" size={sz} flag="AU" type="modern">Label</BadgeWithFlag>
        ))}
      </div>
    ),
    code: `<BadgeWithFlag color="gray" size="md" flag="AU" type="modern">Label</BadgeWithFlag>`,
  },
  {
    id: "with-avatar",
    title: "With avatar — pill color",
    description: "Circular image before label. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithImage key={sz} color={color} size={sz} imgSrc={IMG}>Label</BadgeWithImage>
    ))),
    code: `<BadgeWithImage color="brand" size="md" imgSrc="..." >Label</BadgeWithImage>`,
  },
  {
    id: "with-avatar-color",
    title: "With avatar — badge color",
    description: "Image + badge color type. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithImage key={sz} color={color} size={sz} imgSrc={IMG} type="color">Label</BadgeWithImage>
    ))),
    code: `<BadgeWithImage color="brand" size="md" imgSrc="..." type="color">Label</BadgeWithImage>`,
  },
  {
    id: "with-avatar-modern",
    title: "With avatar — modern",
    description: "Image + neutral container. gray color × sm / md / lg.",
    preview: (
      <div className="flex items-start gap-4">
        {SIZES.map((sz) => (
          <BadgeWithImage key={sz} color="gray" size={sz} imgSrc={IMG} type="modern">Label</BadgeWithImage>
        ))}
      </div>
    ),
    code: `<BadgeWithImage color="gray" size="md" imgSrc="..." type="modern">Label</BadgeWithImage>`,
  },
  {
    id: "with-close-x",
    title: "With close — pill color",
    description: "Close button after label. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithButton key={sz} color={color} size={sz} type="pill-color" buttonLabel="Clear">Label</BadgeWithButton>
    ))),
    code: `<BadgeWithButton color="brand" size="md" buttonLabel="Clear" onButtonClick={() => {}}>Label</BadgeWithButton>`,
  },
  {
    id: "with-close-x-color",
    title: "With close — badge color",
    description: "Close + badge color type. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithButton key={sz} color={color} size={sz} type="color" buttonLabel="Clear">Label</BadgeWithButton>
    ))),
    code: `<BadgeWithButton color="brand" size="md" type="color" buttonLabel="Clear" onButtonClick={() => {}}>Label</BadgeWithButton>`,
  },
  {
    id: "with-close-x-modern",
    title: "With close — modern",
    description: "Close + neutral container. gray color × sm / md / lg.",
    preview: (
      <div className="flex items-start gap-4">
        {SIZES.map((sz) => (
          <BadgeWithButton key={sz} color="gray" size={sz} type="modern" buttonLabel="Clear">Label</BadgeWithButton>
        ))}
      </div>
    ),
    code: `<BadgeWithButton color="gray" size="md" type="modern" buttonLabel="Clear" onButtonClick={() => {}}>Label</BadgeWithButton>`,
  },
  {
    id: "with-icon-trailing",
    title: "With icon trailing — pill color",
    description: "Trailing icon after label. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithIcon key={sz} color={color} size={sz} type="pill-color" iconTrailing={ArrowRight}>Label</BadgeWithIcon>
    ))),
    code: `<BadgeWithIcon color="brand" size="md" iconTrailing={ArrowRight}>Label</BadgeWithIcon>`,
  },
  {
    id: "with-icon-trailing-color",
    title: "With icon trailing — badge color",
    description: "Trailing icon + badge color type. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithIcon key={sz} color={color} size={sz} type="color" iconTrailing={ArrowRight}>Label</BadgeWithIcon>
    ))),
    code: `<BadgeWithIcon color="brand" size="md" type="color" iconTrailing={ArrowRight}>Label</BadgeWithIcon>`,
  },
  {
    id: "with-icon-trailing-modern",
    title: "With icon trailing — modern",
    description: "Trailing icon + neutral container. gray × sm / md / lg.",
    preview: (
      <div className="flex items-start gap-4">
        {SIZES.map((sz) => (
          <BadgeWithIcon key={sz} color="gray" size={sz} type="modern" iconTrailing={ArrowRight}>Label</BadgeWithIcon>
        ))}
      </div>
    ),
    code: `<BadgeWithIcon color="gray" size="md" type="modern" iconTrailing={ArrowRight}>Label</BadgeWithIcon>`,
  },
  {
    id: "with-icon-leading",
    title: "With icon leading — pill color",
    description: "Leading icon before label. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithIcon key={sz} color={color} size={sz} type="pill-color" iconLeading={ArrowUp}>Label</BadgeWithIcon>
    ))),
    code: `<BadgeWithIcon color="brand" size="md" iconLeading={ArrowUp}>Label</BadgeWithIcon>`,
  },
  {
    id: "with-icon-leading-color",
    title: "With icon leading — badge color",
    description: "Leading icon + badge color type. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithIcon key={sz} color={color} size={sz} type="color" iconLeading={ArrowUp}>Label</BadgeWithIcon>
    ))),
    code: `<BadgeWithIcon color="brand" size="md" type="color" iconLeading={ArrowUp}>Label</BadgeWithIcon>`,
  },
  {
    id: "with-icon-leading-modern",
    title: "With icon leading — modern",
    description: "Leading icon + neutral container. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <BadgeWithIcon key={sz} color={color} size={sz} type="modern" iconLeading={ArrowUp}>Label</BadgeWithIcon>
    ))),
    code: `<BadgeWithIcon color="gray" size="md" type="modern" iconLeading={ArrowUp}>Label</BadgeWithIcon>`,
  },
  {
    id: "with-icon-only",
    title: "Icon only — pill color",
    description: "Icon-only pill badge. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <button key={sz} aria-label="Add" className="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2">
        <BadgeIcon color={color} size={sz} icon={Plus} />
      </button>
    ))),
    code: `<BadgeIcon color="brand" size="md" icon={Plus} />`,
  },
  {
    id: "with-icon-only-color",
    title: "Icon only — badge color",
    description: "Icon-only badge color type. All colors × sm / md / lg.",
    preview: allColorRows((color) => SIZES.map((sz) => (
      <button key={sz} aria-label="Add" className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-2">
        <BadgeIcon color={color} size={sz} icon={Plus} type="color" />
      </button>
    ))),
    code: `<BadgeIcon color="brand" size="md" icon={Plus} type="color" />`,
  },
  {
    id: "with-icon-only-modern",
    title: "Icon only — modern",
    description: "Icon-only modern type. gray × sm / md / lg.",
    preview: (
      <div className="flex items-start gap-4">
        {SIZES.map((sz) => (
          <button key={sz} aria-label="Add" className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-2">
            <BadgeIcon color="gray" size={sz} icon={Plus} type="modern" />
          </button>
        ))}
      </div>
    ),
    code: `<BadgeIcon color="gray" size="md" icon={Plus} type="modern" />`,
  },
];

export default function BadgePage() {
  return (
    <ComponentDocLayout
      name="Badge"
      tagline="Compact label for status, category, or count. 12 colors, 3 types, 3 sizes. Composable with dots, flags, images, icons, and close buttons."
      install={{
        usage: `import { Badge, BadgeIcon, BadgeWithDot, BadgeWithIcon, BadgeWithFlag, BadgeWithImage, BadgeWithButton, filledColors } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Size sm", value: "py-0.5 px-2 text-xs" },
        { label: "Size md", value: "py-0.5 px-2.5 text-sm" },
        { label: "Size lg", value: "py-1 px-3 text-sm" },
        { label: "Pill radius", value: "rounded-full" },
        { label: "Color radius", value: "rounded-md (rounded-lg at lg)" },
        { label: "Ring", value: "ring-1 ring-inset" },
        { label: "Modern bg", value: "bg-bg ring-border shadow-xs" },
      ]}
    />
  );
}
