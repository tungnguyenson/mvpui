"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import { Pagination } from "@mvp-ui/ui";

export function DefaultDemo() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col items-start gap-3">
      <Pagination
        totalPages={5}
        currentPage={page}
        onPageChange={setPage}
      />
      <p className="text-sm text-fg-tertiary">Current page: {page}</p>
    </div>
  );
}

export function ManyPagesDemo() {
  const [page, setPage] = useState(5);
  return (
    <div className="flex flex-col items-start gap-3">
      <Pagination
        totalPages={20}
        currentPage={page}
        onPageChange={setPage}
        siblingCount={1}
      />
      <p className="text-sm text-fg-tertiary">Current page: {page} of 20</p>
    </div>
  );
}

export function CompactDemo() {
  const [page, setPage] = useState(3);
  return (
    <div className="flex flex-col items-start gap-3">
      <Pagination
        totalPages={10}
        currentPage={page}
        onPageChange={setPage}
        compact
      />
      <p className="text-sm text-fg-tertiary">
        Page {page} of 10 (compact mode — no page numbers shown)
      </p>
    </div>
  );
}
