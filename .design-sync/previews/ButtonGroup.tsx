import { useState } from "react";
import { ButtonGroup, ButtonGroupItem } from "@mvp-ui/ui";

/* ButtonGroupItem renders `iconLeading` via `typeof IconLeading === "function"`.
   Lucide icons are forwardRef objects (typeof "object"), so they fail that check
   AND isValidElement — rendering as null. Use plain function components for the
   FC slot, and a filled-disc element for the status dot. */

function ArchiveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

const successDot = (
  <svg viewBox="0 0 10 10" aria-hidden="true" className="mx-0.5 size-2 text-fg-success">
    <circle cx="5" cy="5" r="5" fill="currentColor" />
  </svg>
);

export const Default = () => (
  <ButtonGroup selectedKeys={[]}>
    <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
    <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
    <ButtonGroupItem id="delete">Delete</ButtonGroupItem>
  </ButtonGroup>
);

export const LeadingIcon = () => (
  <ButtonGroup selectedKeys={[]}>
    <ButtonGroupItem id="archive" iconLeading={ArchiveIcon}>
      Archive
    </ButtonGroupItem>
    <ButtonGroupItem id="edit" iconLeading={EditIcon}>
      Edit
    </ButtonGroupItem>
    <ButtonGroupItem id="delete" iconLeading={TrashIcon}>
      Delete
    </ButtonGroupItem>
  </ButtonGroup>
);

export const DotLeading = () => (
  <ButtonGroup selectedKeys={["live"]}>
    <ButtonGroupItem id="live" iconLeading={successDot}>
      Live
    </ButtonGroupItem>
    <ButtonGroupItem id="idle" iconLeading={successDot}>
      Idle
    </ButtonGroupItem>
    <ButtonGroupItem id="offline" isDisabled iconLeading={successDot}>
      Offline
    </ButtonGroupItem>
  </ButtonGroup>
);

export const Selected = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(
    new Set(["today"]),
  );
  return (
    <ButtonGroup
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <ButtonGroupItem id="today">Today</ButtonGroupItem>
      <ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>
      <ButtonGroupItem id="thisweek">This week</ButtonGroupItem>
    </ButtonGroup>
  );
};

export const All = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
    <ButtonGroup selectedKeys={["archive"]}>
      <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
      <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
      <ButtonGroupItem id="delete" isDisabled>
        Delete
      </ButtonGroupItem>
    </ButtonGroup>

    <ButtonGroup selectedKeys={["archive"]}>
      <ButtonGroupItem id="archive" iconLeading={ArchiveIcon}>
        Archive
      </ButtonGroupItem>
      <ButtonGroupItem id="edit" iconLeading={EditIcon}>
        Edit
      </ButtonGroupItem>
      <ButtonGroupItem id="delete" isDisabled iconLeading={TrashIcon}>
        Delete
      </ButtonGroupItem>
    </ButtonGroup>

    <ButtonGroup selectedKeys={["live"]}>
      <ButtonGroupItem id="live" iconLeading={successDot}>
        Live
      </ButtonGroupItem>
      <ButtonGroupItem id="idle" iconLeading={successDot}>
        Idle
      </ButtonGroupItem>
      <ButtonGroupItem id="offline" isDisabled iconLeading={successDot}>
        Offline
      </ButtonGroupItem>
    </ButtonGroup>

    <ButtonGroup selectedKeys={["prev"]}>
      <ButtonGroupItem id="prev" iconLeading={ArrowLeftIcon} aria-label="Previous" />
      <ButtonGroupItem id="add" iconLeading={PlusIcon} aria-label="Add" />
      <ButtonGroupItem id="next" isDisabled iconLeading={ArrowRightIcon} aria-label="Next" />
    </ButtonGroup>
  </div>
);
