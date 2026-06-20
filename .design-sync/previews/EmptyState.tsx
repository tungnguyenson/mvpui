import { FolderOpen, Search, Inbox } from "lucide-react";
import { Button, EmptyState, FeaturedIcon } from "@mvp-ui/ui";

// FeaturedIcon renders its `icon` via `typeof icon === "function"`. lucide icons
// are forwardRef OBJECTS, so passing the bare component (icon={Search}) renders an
// empty chip. Pass a rendered element instead — isValidElement handles it — and put
// the size class on the element since the function-render size branch won't run.

export const Default = () => (
  <EmptyState
    title="No results found"
    description="Try adjusting your search or filters to find what you're looking for."
  />
);

export const WithIcon = () => (
  <EmptyState
    icon={<FeaturedIcon icon={<Search className="size-6" />} size="lg" color="gray" theme="light" />}
    title="No search results"
    description="We couldn't find anything matching your search. Try different keywords."
  />
);

export const WithActions = () => (
  <EmptyState
    icon={<FeaturedIcon icon={<Inbox className="size-6" />} size="lg" color="brand" theme="light" />}
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
);

export const FolderEmpty = () => (
  <EmptyState
    icon={<FeaturedIcon icon={<FolderOpen className="size-6" />} size="lg" color="warning" theme="light" />}
    title="This folder is empty"
    description="Drag and drop files here or use the button below to get started."
    actions={
      <Button color="primary" size="md">
        Upload files
      </Button>
    }
  />
);
