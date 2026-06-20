import { PlayButtonIcon } from "@mvp-ui/ui";

const thumb: React.CSSProperties = {
  display: "flex",
  height: 128,
  width: 200,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 12,
  overflow: "hidden",
  background: "linear-gradient(135deg, #7f56d9, #53389e)",
};

const cap: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
};

export const States = () => (
  <div style={{ display: "flex", gap: 28 }}>
    <div style={cap}>
      <div style={thumb}>
        <PlayButtonIcon isPlaying={false} />
      </div>
      <span className="text-fg-tertiary" style={{ fontSize: 12 }}>
        Play
      </span>
    </div>
    <div style={cap}>
      <div style={thumb}>
        <PlayButtonIcon isPlaying={true} />
      </div>
      <span className="text-fg-tertiary" style={{ fontSize: 12 }}>
        Pause
      </span>
    </div>
  </div>
);
