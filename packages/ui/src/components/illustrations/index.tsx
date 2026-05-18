/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/shared-assets/illustrations/index.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import type { HTMLAttributes } from "react";
import { BoxIllustration } from "./box.js";
import { CloudIllustration } from "./cloud.js";
import { CreditCardIllustration } from "./credit-card.js";
import { DocumentsIllustration } from "./documents.js";
export { BoxIllustration, CloudIllustration, CreditCardIllustration, DocumentsIllustration };

export type { IllustrationProps } from "./box.js";

const types = {
	box: BoxIllustration,
	cloud: CloudIllustration,
	documents: DocumentsIllustration,
	"credit-card": CreditCardIllustration,
};

export type IllustrationType = keyof typeof types;

export interface IllustrationCompoundProps extends HTMLAttributes<HTMLDivElement> {
	type: IllustrationType;
	size?: "sm" | "md" | "lg";
	svgClassName?: string;
	childrenClassName?: string;
}

export const Illustration = (props: IllustrationCompoundProps) => {
	const { type, ...rest } = props;
	const Component = types[type];
	return <Component {...rest} />;
};

Illustration.displayName = "Illustration";
