import { FeaturedIcon } from "@mvp-ui/ui";
import { Star } from "lucide-react";

const COLORS = ["brand", "gray", "error", "warning", "success"] as const;

const colRow: React.CSSProperties = { display: "flex", alignItems: "center", gap: 16 };

export const Themes = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
    <FeaturedIcon color="brand" icon={<Star />} theme="light" size="lg" />
    <FeaturedIcon color="brand" icon={<Star />} theme="gradient" size="lg" />
    <FeaturedIcon color="brand" icon={<Star />} theme="dark" size="lg" />
    <FeaturedIcon color="gray" icon={<Star />} theme="modern" size="lg" />
    <FeaturedIcon color="gray" icon={<Star />} theme="modern-neue" size="lg" />
    <FeaturedIcon color="brand" icon={<Star />} theme="outline" size="lg" />
  </div>
);

export const LightColors = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    {COLORS.map((color) => (
      <div key={color} style={colRow}>
        <FeaturedIcon theme="light" color={color} icon={<Star />} size="sm" />
        <FeaturedIcon theme="light" color={color} icon={<Star />} size="md" />
        <FeaturedIcon theme="light" color={color} icon={<Star />} size="lg" />
        <FeaturedIcon theme="light" color={color} icon={<Star />} size="xl" />
      </div>
    ))}
  </div>
);

export const GradientColors = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    {COLORS.map((color) => (
      <div key={color} style={colRow}>
        <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="sm" />
        <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="md" />
        <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="lg" />
        <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="xl" />
      </div>
    ))}
  </div>
);

export const OutlineColors = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    {COLORS.map((color) => (
      <div key={color} style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <FeaturedIcon theme="outline" color={color} icon={<Star />} size="sm" />
        <FeaturedIcon theme="outline" color={color} icon={<Star />} size="md" />
        <FeaturedIcon theme="outline" color={color} icon={<Star />} size="lg" />
        <FeaturedIcon theme="outline" color={color} icon={<Star />} size="xl" />
      </div>
    ))}
  </div>
);
