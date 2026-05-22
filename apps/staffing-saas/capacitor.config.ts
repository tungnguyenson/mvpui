import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.tungmvp.staffingsaas",
  appName: "Staffing SaaS",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  ios: {
    contentInset: "never",
  },
};

export default config;
