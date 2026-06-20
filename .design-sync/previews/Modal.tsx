import { ModalOverlay, Modal, Dialog, ModalHeader, ModalBody, ModalFooter, Button, CloseButton, FeaturedIcon } from "@mvp-ui/ui";
import { Trash2 } from "lucide-react";

// Overlay renders open + portaled; cfg.overrides pins a single-card viewport.
export const Confirmation = () => (
  <ModalOverlay isOpen>
    <Modal size="md">
      <Dialog>
        <ModalHeader>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <FeaturedIcon color="error" theme="light" size="md"><Trash2 /></FeaturedIcon>
              <div>
                <h2 className="text-fg" style={{ fontSize: 18, fontWeight: 600 }}>Delete project</h2>
                <p className="text-fg-tertiary" style={{ marginTop: 4, fontSize: 14, maxWidth: 360 }}>
                  This action cannot be undone. All boards, files, and member access will be permanently removed.
                </p>
              </div>
            </div>
            <CloseButton className="shrink-0" />
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="text-fg-secondary" style={{ fontSize: 14 }}>
            You have <strong>3 active members</strong> and <strong>128 files</strong> in this project. They will lose access immediately.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary">Cancel</Button>
          <Button color="primary-destructive" iconLeading={<Trash2 />}>Delete project</Button>
        </ModalFooter>
      </Dialog>
    </Modal>
  </ModalOverlay>
);
