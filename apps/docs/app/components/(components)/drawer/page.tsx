"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { ComponentDocLayout, type DocExample } from "../../../_components/docs/ComponentDocLayout";
import {
	DefaultDrawerDemo,
	LeftDrawerDemo,
	SmallDrawerDemo,
	LargeDrawerDemo,
} from "./DrawerExamples";

const SECTIONS: DocExample[] = [
	{
		id: "default",
		title: "Default (right)",
		description:
			"Side panel that slides in from the right. Clicking the overlay or pressing Escape closes it.",
		preview: <DefaultDrawerDemo />,
		code: `const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Drawer</Button>

<Drawer
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  title="Panel title"
  description="A slide-out panel from the right edge."
>
  <DrawerBody>
    {/* scrollable content */}
  </DrawerBody>
  <DrawerFooter>
    <Button color="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button onClick={() => setIsOpen(false)}>Save changes</Button>
  </DrawerFooter>
</Drawer>`,
	},
	{
		id: "left-side",
		title: "Left side",
		description: 'Use `side="left"` for navigation panels or filter sidebars.',
		preview: <LeftDrawerDemo />,
		code: `<Drawer side="left" isOpen={isOpen} onOpenChange={setIsOpen} title="Left panel" description="Slides in from the left edge.">
  <DrawerBody>
    {/* navigation items */}
  </DrawerBody>
  <DrawerFooter>
    <Button color="secondary" onClick={() => setIsOpen(false)}>Close</Button>
  </DrawerFooter>
</Drawer>`,
	},
	{
		id: "small",
		title: "Small size",
		description: 'The `size="sm"` variant (w-80) suits quick-view and peek panels.',
		preview: <SmallDrawerDemo />,
		code: `<Drawer size="sm" isOpen={isOpen} onOpenChange={setIsOpen} aria-label="Quick view">
  <DrawerHeader><h2>Quick view</h2></DrawerHeader>
  <DrawerBody>{/* compact content */}</DrawerBody>
  <DrawerFooter>
    <Button color="secondary" onClick={() => setIsOpen(false)}>Dismiss</Button>
    <Button onClick={() => setIsOpen(false)}>Confirm</Button>
  </DrawerFooter>
</Drawer>`,
	},
	{
		id: "large",
		title: "Large size",
		description: 'The `size="lg"` variant (w-[32rem]) gives space for rich content or multi-column layouts.',
		preview: <LargeDrawerDemo />,
		code: `<Drawer size="lg" isOpen={isOpen} onOpenChange={setIsOpen} aria-label="Detail panel">
  <DrawerHeader>
    <h2>Detail panel</h2>
    <p>Wide format for rich content.</p>
  </DrawerHeader>
  <DrawerBody>
    {/* rich content */}
  </DrawerBody>
  <DrawerFooter>
    <Button color="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button onClick={() => setIsOpen(false)}>Apply</Button>
  </DrawerFooter>
</Drawer>`,
	},
];

export default function DrawerPage() {
	return (
		<ComponentDocLayout
			name="Drawer"
			tagline="Accessible side panel built on React Aria Modal. Slides in from left or right with three size options."
			install={{
				usage: `import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "@mvp-ui/ui";`,
			}}
			sections={SECTIONS}
			tokenReference={[
				{ label: "Panel bg", value: "bg-bg" },
				{ label: "Overlay bg", value: "bg-fg/40 backdrop-blur-sm" },
				{ label: "Border", value: "border-border" },
				{ label: "Size sm", value: "w-80" },
				{ label: "Size md", value: "w-96" },
				{ label: "Size lg", value: "w-128" },
			]}
		/>
	);
}
