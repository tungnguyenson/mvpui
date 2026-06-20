import { DrawerEdgeTrigger } from "@mvp-ui/ui";

// DrawerEdgeTrigger is an invisible touch zone at a viewport edge that fires
// `onOpen` on swipe. It paints nothing, so frame a viewport and highlight the
// active edge zone for documentation. The real component is mounted too.
const noop = () => {};

export const EdgeZone = () => (
  <div
    style={{
      position: "relative",
      width: 320,
      height: 260,
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid var(--color-border)",
      background: "var(--color-bg-secondary)",
      display: "grid",
      placeItems: "center",
    }}
  >
    {/* Highlighted active edge (right side), mirrors edgeWidth */}
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        width: 24,
        background: "linear-gradient(to left, var(--color-brand-200), transparent)",
        borderLeft: "1px dashed var(--color-border-brand)",
      }}
    />
    <div style={{ textAlign: "center", padding: 20 }}>
      <p className="text-fg" style={{ fontSize: 14, fontWeight: 600 }}>Swipe from the right edge</p>
      <p className="text-fg-tertiary" style={{ fontSize: 13, marginTop: 4 }}>
        DrawerEdgeTrigger opens the paired drawer on a swipe past the threshold.
      </p>
    </div>
    <DrawerEdgeTrigger side="right" onOpen={noop} edgeWidth={24} />
  </div>
);
