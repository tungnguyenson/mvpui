/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { ComponentDocLayout, type DocExample } from "../../../_components/docs/ComponentDocLayout";
import {
	DefaultModalDemo,
	SizeVariantsDemo,
	DestructiveModalDemo,
	ControlledModalDemo,
} from "./ModalExamples";

const SECTIONS: DocExample[] = [
	{
		id: "default",
		title: "Default",
		description:
			"Open via `onClick`, close via overlay click, Escape key, or the `close` render-prop from `Dialog`.",
		preview: <DefaultModalDemo />,
		code: `const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

<ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen}>
  <Modal>
    <Dialog>
      {({ close }) => (
        <>
          <ModalHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-fg">Confirm action</h2>
                <p className="mt-1 text-sm text-fg-tertiary">This action cannot be undone.</p>
              </div>
              <CloseButton onClick={close} className="shrink-0" />
            </div>
          </ModalHeader>
          <ModalBody>
            <p className="text-sm text-fg-secondary">Your data will be permanently deleted.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={close}>Cancel</Button>
            <Button color="primary" onClick={close}>Confirm</Button>
          </ModalFooter>
        </>
      )}
    </Dialog>
  </Modal>
</ModalOverlay>`,
	},
	{
		id: "sizes",
		title: "Size variants",
		description:
			"`Modal` accepts `size` prop: `sm` (384px), `md` (512px, default), `lg` (672px), `xl` (768px), `full`.",
		preview: <SizeVariantsDemo />,
		code: `<Modal size="lg">
  <Dialog>...</Dialog>
</Modal>`,
	},
	{
		id: "destructive",
		title: "Destructive",
		description:
			"Use `color=\"primary-destructive\"` on the confirm button for irreversible actions like deletion.",
		preview: <DestructiveModalDemo />,
		code: `<ModalFooter>
  <Button color="secondary" className="flex-1" onClick={close}>Cancel</Button>
  <Button color="primary-destructive" className="flex-1" onClick={close}>Delete</Button>
</ModalFooter>`,
	},
	{
		id: "controlled",
		title: "Controlled",
		description:
			"Use `isOpen` + `onOpenChange` on `ModalOverlay` when external code needs to control open state.",
		preview: <ControlledModalDemo />,
		code: `const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open modal</Button>

<ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen}>
  <Modal>
    <Dialog>
      {({ close }) => (
        <>
          <ModalHeader>...</ModalHeader>
          <ModalBody>...</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={close}>Close</Button>
          </ModalFooter>
        </>
      )}
    </Dialog>
  </Modal>
</ModalOverlay>`,
	},
];

export default function ModalPage() {
	return (
		<ComponentDocLayout
			name="Modal"
			tagline="Accessible dialog built on React Aria. Animates in/out, traps focus, closes on overlay click or Escape."
			install={{
				usage: `import { ModalOverlay, Modal, Dialog, ModalHeader, ModalBody, ModalFooter } from "@mvp-ui/ui";`,
			}}
			sections={SECTIONS}
			tokenReference={[
				{ label: "Overlay bg", value: "bg-fg/50 backdrop-blur-sm" },
				{ label: "Panel bg", value: "bg-bg" },
				{ label: "Border", value: "border-border" },
				{ label: "Size sm", value: "max-w-sm" },
				{ label: "Size md", value: "max-w-lg" },
				{ label: "Size lg", value: "max-w-2xl" },
				{ label: "Size xl", value: "max-w-3xl" },
			]}
		/>
	);
}
