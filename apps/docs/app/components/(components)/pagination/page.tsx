"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";
import { CompactDemo, DefaultDemo, ManyPagesDemo } from "./PaginationExamples";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description:
      "Standard pagination with previous/next buttons and page number buttons.",
    preview: <DefaultDemo />,
    code: `const [page, setPage] = useState(1);

<Pagination
  totalPages={5}
  currentPage={page}
  onPageChange={setPage}
/>`,
  },
  {
    id: "many-pages",
    title: "Many pages",
    description:
      "When there are many pages, ellipsis collapses distant pages while always showing first and last.",
    preview: <ManyPagesDemo />,
    code: `const [page, setPage] = useState(5);

<Pagination
  totalPages={20}
  currentPage={page}
  onPageChange={setPage}
  siblingCount={1}
/>`,
  },
  {
    id: "compact",
    title: "Compact",
    description:
      "Compact mode hides page number buttons — useful in space-constrained layouts.",
    preview: <CompactDemo />,
    code: `const [page, setPage] = useState(3);

<Pagination
  totalPages={10}
  currentPage={page}
  onPageChange={setPage}
  compact
/>`,
  },
];

export default function PaginationPage() {
  return (
    <ComponentDocLayout
      name="Pagination"
      tagline="Prev/next navigation with page numbers, ellipsis for large ranges, and a compact mode for constrained layouts."
      install={{ usage: `import { Pagination } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
    />
  );
}
