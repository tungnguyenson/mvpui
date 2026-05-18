/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/shared-assets/section-divider.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export const SectionDivider = (props: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", props.className)}>
			<hr className="h-px w-full border-none bg-border-secondary" />
		</div>
	);
};

SectionDivider.displayName = "SectionDivider";
