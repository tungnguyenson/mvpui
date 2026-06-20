import { useEffect } from "react";
import { Toaster, toast, Button } from "@mvp-ui/ui";

// Static-friendly card: a Toaster scoped to the card fires one toast on mount
// so the rendered notification is captured, plus the imperative triggers.
export const Live = () => {
  useEffect(() => {
    toast.success("Changes saved!", { description: "Your profile has been updated." });
  }, []);
  return (
    <div style={{ position: "relative", minHeight: 120, width: "100%" }}>
      <Toaster position="top-center" richColors duration={100000} />
    </div>
  );
};

export const Triggers = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
    <Toaster position="bottom-right" richColors />
    <Button color="secondary" size="sm" onClick={() => toast("File saved successfully.")}>Default</Button>
    <Button color="secondary" size="sm" onClick={() => toast.success("Changes saved!")}>Success</Button>
    <Button color="secondary" size="sm" onClick={() => toast.error("Something went wrong.")}>Error</Button>
    <Button color="secondary" size="sm" onClick={() => toast.warning("Your session expires soon.")}>Warning</Button>
    <Button color="secondary" size="sm" onClick={() => toast.info("New version available.")}>Info</Button>
  </div>
);
