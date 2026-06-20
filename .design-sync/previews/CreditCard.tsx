import { CreditCard } from "@mvp-ui/ui";

const CARD = {
  company: "Untitled.",
  cardNumber: "1234 1234 1234 1234",
  cardHolder: "OLIVIA RHYE",
  cardExpiration: "06/28",
};

const NORMAL = [
  "transparent",
  "transparent-gradient",
  "brand-dark",
  "brand-light",
  "gray-dark",
  "gray-light",
] as const;

const STRIP = ["transparent-strip", "gray-strip", "gradient-strip", "salmon-strip"] as const;

const wrap: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 16 };

export const NormalTypes = () => (
  <div style={wrap}>
    {NORMAL.map((t) => (
      <CreditCard key={t} {...CARD} type={t} width={220} />
    ))}
  </div>
);

export const StripTypes = () => (
  <div style={wrap}>
    {STRIP.map((t) => (
      <CreditCard key={t} {...CARD} type={t} width={220} />
    ))}
  </div>
);

export const Widths = () => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
    <CreditCard {...CARD} type="brand-dark" width={160} />
    <CreditCard {...CARD} type="brand-dark" width={220} />
    <CreditCard {...CARD} type="brand-dark" width={300} />
  </div>
);
