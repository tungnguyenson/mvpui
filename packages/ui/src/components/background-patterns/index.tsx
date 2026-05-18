/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/shared-assets/background-patterns/index.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import type { SVGProps } from "react";
import { cn } from "../../lib/cn.js";
import { Circle } from "./circle.js";
import { Grid } from "./grid.js";
import { GridCheck } from "./grid-check.js";
import { Square } from "./square.js";

const patterns = {
	circle: Circle,
	square: Square,
	grid: Grid,
	"grid-check": GridCheck,
};

export type BackgroundPatternType = keyof typeof patterns;

export interface BackgroundPatternProps extends Omit<SVGProps<SVGSVGElement>, "size"> {
	size?: "sm" | "md" | "lg";
	pattern: BackgroundPatternType;
}

export const BackgroundPattern = (props: BackgroundPatternProps) => {
	const { pattern } = props;
	const Pattern = patterns[pattern];

	return <Pattern {...props} size={props.size as "sm" | "md"} className={cn("pointer-events-none", props.className)} />;
};

BackgroundPattern.displayName = "BackgroundPattern";
