"use client";

export type {
	SidebarNavItemDef,
	SidebarNavSectionDef,
	SidebarNavAccountDef,
} from "./shared.js";
export type { SidebarNavAccountCardProps } from "./sidebar-nav-account-card.js";
export { SidebarNavAccountCard } from "./sidebar-nav-account-card.js";
export type { SidebarNavSimpleProps } from "./sidebar-nav-simple.js";
export { SidebarNavSimple } from "./sidebar-nav-simple.js";
export type { SidebarNavDualTierProps } from "./sidebar-nav-dual-tier.js";
export { SidebarNavDualTier } from "./sidebar-nav-dual-tier.js";
export type { SidebarNavSectionDividersProps } from "./sidebar-nav-section-dividers.js";
export { SidebarNavSectionDividers } from "./sidebar-nav-section-dividers.js";
export type { SidebarNavSectionsSubheadingsProps } from "./sidebar-nav-sections-subheadings.js";
export { SidebarNavSectionsSubheadings } from "./sidebar-nav-sections-subheadings.js";
export type { SidebarNavSlimProps } from "./sidebar-nav-slim.js";
export { SidebarNavSlim } from "./sidebar-nav-slim.js";
export type { SidebarNavCollapsibleProps } from "./sidebar-nav-collapsible.js";
export { SidebarNavCollapsible } from "./sidebar-nav-collapsible.js";

import { SidebarNavSimple } from "./sidebar-nav-simple.js";
import { SidebarNavDualTier } from "./sidebar-nav-dual-tier.js";
import { SidebarNavSectionDividers } from "./sidebar-nav-section-dividers.js";
import { SidebarNavSectionsSubheadings } from "./sidebar-nav-sections-subheadings.js";
import { SidebarNavSlim } from "./sidebar-nav-slim.js";
import { SidebarNavCollapsible } from "./sidebar-nav-collapsible.js";
import { SidebarNavAccountCard } from "./sidebar-nav-account-card.js";

export const SidebarNav = {
	Simple: SidebarNavSimple,
	DualTier: SidebarNavDualTier,
	SectionDividers: SidebarNavSectionDividers,
	SectionsSubheadings: SidebarNavSectionsSubheadings,
	Slim: SidebarNavSlim,
	Collapsible: SidebarNavCollapsible,
	AccountCard: SidebarNavAccountCard,
} as const;
