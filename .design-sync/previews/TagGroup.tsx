import { Tag, TagGroup, TagList } from "@mvp-ui/ui";

// TagGroup is the React-Aria container that owns size + selection for its Tags.
const AVATAR =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <rect width="60" height="60" fill="#7f56d9"/>
      <circle cx="30" cy="23" r="12" fill="#ffffff" opacity="0.95"/>
      <path d="M9 58c0-12 9-19 21-19s21 7 21 19z" fill="#ffffff" opacity="0.95"/>
    </svg>`,
  );

export const Default = () => (
  <TagGroup label="Tech stack" size="md">
    <TagList style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tag id="t1">React</Tag>
      <Tag id="t2" avatarSrc={AVATAR}>Olivia Rhye</Tag>
      <Tag id="t3" dot>Production</Tag>
      <Tag id="t4" count={12}>Issues</Tag>
    </TagList>
  </TagGroup>
);

export const Selectable = () => (
  <TagGroup label="Filter by status" size="md" selectionMode="multiple" defaultSelectedKeys={["open", "review"]}>
    <TagList style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tag id="open">Open</Tag>
      <Tag id="review">In review</Tag>
      <Tag id="done">Done</Tag>
      <Tag id="archived">Archived</Tag>
    </TagList>
  </TagGroup>
);

export const SelectableRemovable = () => (
  <TagGroup label="Active filters" size="md" selectionMode="multiple" defaultSelectedKeys={["a"]}>
    <TagList style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tag id="a" onClose={() => {}}>Design</Tag>
      <Tag id="b" onClose={() => {}} count={5}>Engineering</Tag>
      <Tag id="c" onClose={() => {}} avatarSrc={AVATAR}>Olivia Rhye</Tag>
      <Tag id="d" onClose={() => {}} dot>Product</Tag>
    </TagList>
  </TagGroup>
);
