import { ModalOverlay, Modal, Dialog, ModalHeader, ModalBody, ModalFooter, Button, CloseButton } from "@mvp-ui/ui";

// Dialog is the accessible content wrapper rendered inside a Modal/ModalOverlay.
export const AlertDialog = () => (
  <ModalOverlay isOpen>
    <Modal size="sm">
      <Dialog role="alertdialog">
        <ModalHeader>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
            <div>
              <h2 className="text-fg" style={{ fontSize: 18, fontWeight: 600 }}>Discard changes?</h2>
              <p className="text-fg-tertiary" style={{ marginTop: 4, fontSize: 14, maxWidth: 320 }}>
                You have unsaved edits to “Q3 Roadmap”. Leaving now will discard them.
              </p>
            </div>
            <CloseButton className="shrink-0" />
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="text-fg-secondary" style={{ fontSize: 14 }}>This can’t be undone once you leave the page.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary">Keep editing</Button>
          <Button color="primary-destructive">Discard</Button>
        </ModalFooter>
      </Dialog>
    </Modal>
  </ModalOverlay>
);
