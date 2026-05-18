"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { FolderOpen, Search, Inbox } from "lucide-react";
import { Button, EmptyState, FeaturedIcon } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description: "Minimal empty state with just a title and description.",
    preview: (
      <EmptyState
        title="No results found"
        description="Try adjusting your search or filters to find what you're looking for."
      />
    ),
    code: `<EmptyState
  title="No results found"
  description="Try adjusting your search or filters to find what you're looking for."
/>`,
  },
  {
    id: "with-icon",
    title: "With icon",
    description: "Empty state with a FeaturedIcon for visual context.",
    preview: (
      <EmptyState
        icon={
          <FeaturedIcon
            icon={Search}
            size="lg"
            color="gray"
            theme="light"
          />
        }
        title="No search results"
        description="We couldn't find anything matching your search. Try different keywords."
      />
    ),
    code: `<EmptyState
  icon={<FeaturedIcon icon={Search} size="lg" color="gray" theme="light" />}
  title="No search results"
  description="We couldn't find anything matching your search. Try different keywords."
/>`,
  },
  {
    id: "with-actions",
    title: "With actions",
    description: "Empty state with primary and secondary action buttons.",
    preview: (
      <EmptyState
        icon={
          <FeaturedIcon
            icon={Inbox}
            size="lg"
            color="brand"
            theme="light"
          />
        }
        title="Your inbox is empty"
        description="When you receive messages they'll appear here. Start a conversation to get going."
        actions={
          <>
            <Button color="secondary" size="md">
              Learn more
            </Button>
            <Button color="primary" size="md">
              New message
            </Button>
          </>
        }
      />
    ),
    code: `<EmptyState
  icon={<FeaturedIcon icon={Inbox} size="lg" color="brand" theme="light" />}
  title="Your inbox is empty"
  description="When you receive messages they'll appear here. Start a conversation to get going."
  actions={
    <>
      <Button color="secondary" size="md">Learn more</Button>
      <Button color="primary" size="md">New message</Button>
    </>
  }
/>`,
  },
  {
    id: "folder",
    title: "Folder empty",
    description: "Empty state for a files or project folder.",
    preview: (
      <EmptyState
        icon={
          <FeaturedIcon
            icon={FolderOpen}
            size="lg"
            color="warning"
            theme="light"
          />
        }
        title="This folder is empty"
        description="Drag and drop files here or use the button below to get started."
        actions={
          <Button color="primary" size="md">
            Upload files
          </Button>
        }
      />
    ),
    code: `<EmptyState
  icon={<FeaturedIcon icon={FolderOpen} size="lg" color="warning" theme="light" />}
  title="This folder is empty"
  description="Drag and drop files here or use the button below to get started."
  actions={<Button color="primary" size="md">Upload files</Button>}
/>`,
  },
];

export default function EmptyStatePage() {
  return (
    <ComponentDocLayout
      name="Empty State"
      tagline="Contextual placeholder shown when there is no content to display. Supports icon, title, description, and action slots."
      install={{ usage: `import { EmptyState } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
    />
  );
}
