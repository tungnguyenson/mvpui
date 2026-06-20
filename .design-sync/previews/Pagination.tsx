import { Pagination } from "@mvp-ui/ui";

// Deterministic, presentational — onPageChange is a required no-op for the static card.
const noop = () => {};

export const Default = () => (
  <Pagination totalPages={5} currentPage={1} onPageChange={noop} />
);

export const ManyPages = () => (
  <Pagination
    totalPages={20}
    currentPage={5}
    onPageChange={noop}
    siblingCount={1}
  />
);

export const Compact = () => (
  <Pagination totalPages={10} currentPage={3} onPageChange={noop} compact />
);
