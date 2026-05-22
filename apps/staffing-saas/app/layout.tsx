import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Staffing SaaS",
  description: "Nền tảng quản lý cộng tác viên — demo @mvp-ui/ui với brand token tùy chỉnh",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const APPEARANCE_STORAGE_KEY = "staffing-saas:appearance";

const themeInitScript = `(function(){try{var raw=localStorage.getItem(${JSON.stringify(
  APPEARANCE_STORAGE_KEY,
)});if(!raw)return;var p=JSON.parse(raw);var t=p&&p.theme==='dark'?'dark':'light';var n=p&&p.navTheme==='dark'?'dark':'light';var r=document.documentElement;r.setAttribute('data-theme',t);r.setAttribute('data-nav-theme',n);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: pre-hydration theme init, controlled literal
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
