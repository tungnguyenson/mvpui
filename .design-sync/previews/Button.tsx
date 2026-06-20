import { Button } from "@mvp-ui/ui";
import { ArrowRight, Download, Mail, Plus, Settings, Trash2 } from "lucide-react";

const row: React.CSSProperties = { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" };

export const Colors = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <div style={row}>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="tertiary">Tertiary</Button>
      <Button color="link-color">Link color</Button>
      <Button color="link-gray">Link gray</Button>
    </div>
    <div style={row}>
      <Button color="primary-destructive">Delete</Button>
      <Button color="secondary-destructive">Delete</Button>
      <Button color="tertiary-destructive">Delete</Button>
    </div>
  </div>
);

export const Sizes = () => (
  <div style={row}>
    <Button size="sm">Button sm</Button>
    <Button size="md">Button md</Button>
    <Button size="lg">Button lg</Button>
    <Button size="xl">Button xl</Button>
  </div>
);

export const WithIcons = () => (
  <div style={row}>
    <Button iconLeading={<Mail />}>Send email</Button>
    <Button color="secondary" iconLeading={<Download />}>Download</Button>
    <Button iconTrailing={<ArrowRight />}>Continue</Button>
    <Button color="primary-destructive" iconLeading={<Trash2 />}>Delete project</Button>
    <Button color="secondary" iconLeading={<Plus />} aria-label="Add item" />
    <Button iconLeading={<Settings />} aria-label="Settings" />
  </div>
);

export const States = () => (
  <div style={row}>
    <Button isLoading>Saving changes</Button>
    <Button color="secondary" isLoading showTextWhileLoading>Saving…</Button>
    <Button disabled>Disabled</Button>
    <Button color="secondary" disabled>Disabled</Button>
  </div>
);
