import { Tag, TagGroup, TagList } from "@mvp-ui/ui";

// Tag is a React-Aria collection item — only valid composed inside TagGroup > TagList.
// Deterministic inline avatar (data URI) for avatarSrc, no network fetch.
const AVATAR =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <rect width="60" height="60" fill="#7f56d9"/>
      <circle cx="30" cy="23" r="12" fill="#ffffff" opacity="0.95"/>
      <path d="M9 58c0-12 9-19 21-19s21 7 21 19z" fill="#ffffff" opacity="0.95"/>
    </svg>`,
  );

const SIZES = ["sm", "md", "lg"] as const;

export const Variants = () => (
  <TagGroup label="Filters" size="md">
    <TagList style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tag id="t1">Design</Tag>
      <Tag id="t2" dot>Active</Tag>
      <Tag id="t3" avatarSrc={AVATAR}>Olivia Rhye</Tag>
      <Tag id="t4" count={5}>Engineering</Tag>
    </TagList>
  </TagGroup>
);

export const Sizes = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    {SIZES.map((size) => (
      <TagGroup key={size} label={`Tags ${size}`} size={size}>
        <TagList style={{ display: "flex", gap: 12 }}>
          <Tag id="a">Design</Tag>
          <Tag id="b" dot>Active</Tag>
          <Tag id="c" avatarSrc={AVATAR}>Olivia</Tag>
          <Tag id="d" count={5}>Eng</Tag>
        </TagList>
      </TagGroup>
    ))}
  </div>
);

export const Removable = () => (
  <TagGroup label="Skills" size="md">
    <TagList style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tag id="r1" onClose={() => {}}>React</Tag>
      <Tag id="r2" onClose={() => {}}>TypeScript</Tag>
      <Tag id="r3" onClose={() => {}} avatarSrc={AVATAR}>Olivia Rhye</Tag>
      <Tag id="r4" onClose={() => {}} count={3}>Tailwind</Tag>
    </TagList>
  </TagGroup>
);

export const Selected = () => (
  <TagGroup label="Categories" size="md" selectionMode="multiple" defaultSelectedKeys={["s1", "s3"]}>
    <TagList style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tag id="s1">Frontend</Tag>
      <Tag id="s2">Backend</Tag>
      <Tag id="s3" dot>Design</Tag>
      <Tag id="s4">DevOps</Tag>
    </TagList>
  </TagGroup>
);
