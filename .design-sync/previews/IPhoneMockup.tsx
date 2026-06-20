import { IPhoneMockup } from "@mvp-ui/ui";

// Deterministic inline screenshot (percent-encoded SVG data URI — no btoa needed).
const SCREEN =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="750" height="1624" viewBox="0 0 750 1624">
      <rect width="750" height="1624" fill="#7f56d9"/>
      <rect y="1180" width="750" height="444" fill="#53389e"/>
      <circle cx="375" cy="560" r="140" fill="#ffffff" opacity="0.18"/>
      <text x="375" y="900" text-anchor="middle" font-size="74" fill="#ffffff" font-family="sans-serif">App Screen</text>
    </svg>`,
  );

const center: React.CSSProperties = { display: "flex", justifyContent: "center" };

export const Light = () => (
  <div style={center}>
    <IPhoneMockup image={SCREEN} theme="light" className="w-40" />
  </div>
);

export const Dark = () => (
  <div style={center}>
    <IPhoneMockup image={SCREEN} theme="dark" className="w-40" />
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 28 }}>
    <IPhoneMockup image={SCREEN} theme="light" className="w-24" />
    <IPhoneMockup image={SCREEN} theme="light" className="w-40" />
    <IPhoneMockup image={SCREEN} theme="light" className="w-56" />
  </div>
);
