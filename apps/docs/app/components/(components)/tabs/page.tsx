"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { BarChart2, Settings, Users } from "lucide-react";
import { Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default (underline, md)",
    description:
      "Underline-style tabs with bottom indicator. Default size is md.",
    preview: (
      <Tabs defaultSelectedKey="overview">
        <TabList>
          <Tab id="overview">Overview</Tab>
          <Tab id="activity">Activity</Tab>
          <Tab id="settings">Settings</Tab>
        </TabList>
        <TabPanel id="overview">
          <p className="text-sm text-fg-secondary">Overview panel content.</p>
        </TabPanel>
        <TabPanel id="activity">
          <p className="text-sm text-fg-secondary">Activity panel content.</p>
        </TabPanel>
        <TabPanel id="settings">
          <p className="text-sm text-fg-secondary">Settings panel content.</p>
        </TabPanel>
      </Tabs>
    ),
    code: `<Tabs defaultSelectedKey="overview">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="activity">Activity</Tab>
    <Tab id="settings">Settings</Tab>
  </TabList>
  <TabPanel id="overview">Overview panel content.</TabPanel>
  <TabPanel id="activity">Activity panel content.</TabPanel>
  <TabPanel id="settings">Settings panel content.</TabPanel>
</Tabs>`,
  },
  {
    id: "small",
    title: "Small (underline, sm)",
    description: "Underline tabs in the smaller sm size.",
    preview: (
      <Tabs defaultSelectedKey="overview" size="sm">
        <TabList>
          <Tab id="overview">Overview</Tab>
          <Tab id="activity">Activity</Tab>
          <Tab id="settings">Settings</Tab>
        </TabList>
        <TabPanel id="overview">
          <p className="text-sm text-fg-secondary">Overview panel content.</p>
        </TabPanel>
        <TabPanel id="activity">
          <p className="text-sm text-fg-secondary">Activity panel content.</p>
        </TabPanel>
        <TabPanel id="settings">
          <p className="text-sm text-fg-secondary">Settings panel content.</p>
        </TabPanel>
      </Tabs>
    ),
    code: `<Tabs defaultSelectedKey="overview" size="sm">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="activity">Activity</Tab>
    <Tab id="settings">Settings</Tab>
  </TabList>
  <TabPanel id="overview">Overview panel content.</TabPanel>
  <TabPanel id="activity">Activity panel content.</TabPanel>
  <TabPanel id="settings">Settings panel content.</TabPanel>
</Tabs>`,
  },
  {
    id: "pill",
    title: "Pill variant (md)",
    description:
      "Pill-style tabs with a floating selected indicator in a neutral container.",
    preview: (
      <Tabs defaultSelectedKey="overview" variant="pill">
        <TabList>
          <Tab id="overview">Overview</Tab>
          <Tab id="activity">Activity</Tab>
          <Tab id="settings">Settings</Tab>
        </TabList>
        <TabPanel id="overview">
          <p className="text-sm text-fg-secondary">Overview panel content.</p>
        </TabPanel>
        <TabPanel id="activity">
          <p className="text-sm text-fg-secondary">Activity panel content.</p>
        </TabPanel>
        <TabPanel id="settings">
          <p className="text-sm text-fg-secondary">Settings panel content.</p>
        </TabPanel>
      </Tabs>
    ),
    code: `<Tabs defaultSelectedKey="overview" variant="pill">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="activity">Activity</Tab>
    <Tab id="settings">Settings</Tab>
  </TabList>
  <TabPanel id="overview">Overview panel content.</TabPanel>
  <TabPanel id="activity">Activity panel content.</TabPanel>
  <TabPanel id="settings">Settings panel content.</TabPanel>
</Tabs>`,
  },
  {
    id: "pill-sm",
    title: "Pill variant (sm)",
    description: "Pill tabs in the smaller sm size.",
    preview: (
      <Tabs defaultSelectedKey="overview" variant="pill" size="sm">
        <TabList>
          <Tab id="overview">Overview</Tab>
          <Tab id="activity">Activity</Tab>
          <Tab id="settings">Settings</Tab>
        </TabList>
        <TabPanel id="overview">
          <p className="text-sm text-fg-secondary">Overview panel content.</p>
        </TabPanel>
        <TabPanel id="activity">
          <p className="text-sm text-fg-secondary">Activity panel content.</p>
        </TabPanel>
        <TabPanel id="settings">
          <p className="text-sm text-fg-secondary">Settings panel content.</p>
        </TabPanel>
      </Tabs>
    ),
    code: `<Tabs defaultSelectedKey="overview" variant="pill" size="sm">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="activity">Activity</Tab>
    <Tab id="settings">Settings</Tab>
  </TabList>
  <TabPanel id="overview">Overview panel content.</TabPanel>
  <TabPanel id="activity">Activity panel content.</TabPanel>
  <TabPanel id="settings">Settings panel content.</TabPanel>
</Tabs>`,
  },
  {
    id: "with-icons",
    title: "With icons",
    description: "Tabs with leading icons in both underline and pill styles.",
    preview: (
      <div className="flex flex-col gap-8">
        <Tabs defaultSelectedKey="overview">
          <TabList>
            <Tab id="overview" icon={<BarChart2 className="size-4" />}>
              Overview
            </Tab>
            <Tab id="team" icon={<Users className="size-4" />}>
              Team
            </Tab>
            <Tab id="settings" icon={<Settings className="size-4" />}>
              Settings
            </Tab>
          </TabList>
          <TabPanel id="overview">
            <p className="text-sm text-fg-secondary">Overview panel content.</p>
          </TabPanel>
          <TabPanel id="team">
            <p className="text-sm text-fg-secondary">Team panel content.</p>
          </TabPanel>
          <TabPanel id="settings">
            <p className="text-sm text-fg-secondary">Settings panel content.</p>
          </TabPanel>
        </Tabs>
        <Tabs defaultSelectedKey="overview" variant="pill">
          <TabList>
            <Tab id="overview" icon={<BarChart2 className="size-4" />}>
              Overview
            </Tab>
            <Tab id="team" icon={<Users className="size-4" />}>
              Team
            </Tab>
            <Tab id="settings" icon={<Settings className="size-4" />}>
              Settings
            </Tab>
          </TabList>
          <TabPanel id="overview">
            <p className="text-sm text-fg-secondary">Overview panel content.</p>
          </TabPanel>
          <TabPanel id="team">
            <p className="text-sm text-fg-secondary">Team panel content.</p>
          </TabPanel>
          <TabPanel id="settings">
            <p className="text-sm text-fg-secondary">Settings panel content.</p>
          </TabPanel>
        </Tabs>
      </div>
    ),
    code: `<Tabs defaultSelectedKey="overview">
  <TabList>
    <Tab id="overview" icon={<BarChart2 className="size-4" />}>Overview</Tab>
    <Tab id="team" icon={<Users className="size-4" />}>Team</Tab>
    <Tab id="settings" icon={<Settings className="size-4" />}>Settings</Tab>
  </TabList>
  <TabPanel id="overview">Overview panel content.</TabPanel>
  <TabPanel id="team">Team panel content.</TabPanel>
  <TabPanel id="settings">Settings panel content.</TabPanel>
</Tabs>`,
  },
  {
    id: "with-value",
    title: "With trailing value (badge / count)",
    description:
      "Pass any ReactNode via the `value` prop to render a neutral trailing pill after the tab label — counts, status labels, anything. Style stays consistent across active and inactive tabs (matches Untitled UI).",
    preview: (
      <div className="flex flex-col gap-8">
        <Tabs defaultSelectedKey="inbox">
          <TabList>
            <Tab id="inbox" value={12}>
              Inbox
            </Tab>
            <Tab id="drafts" value={3}>
              Drafts
            </Tab>
            <Tab id="sent" value={0}>
              Sent
            </Tab>
            <Tab id="archive">Archive</Tab>
          </TabList>
          <TabPanel id="inbox">
            <p className="text-sm text-fg-secondary">Inbox panel.</p>
          </TabPanel>
          <TabPanel id="drafts">
            <p className="text-sm text-fg-secondary">Drafts panel.</p>
          </TabPanel>
          <TabPanel id="sent">
            <p className="text-sm text-fg-secondary">Sent panel.</p>
          </TabPanel>
          <TabPanel id="archive">
            <p className="text-sm text-fg-secondary">Archive panel.</p>
          </TabPanel>
        </Tabs>
        <Tabs defaultSelectedKey="inbox" variant="pill">
          <TabList>
            <Tab id="inbox" value={12}>
              Inbox
            </Tab>
            <Tab id="drafts" value={3}>
              Drafts
            </Tab>
            <Tab id="sent" value="new">
              Sent
            </Tab>
            <Tab id="archive">Archive</Tab>
          </TabList>
          <TabPanel id="inbox">
            <p className="text-sm text-fg-secondary">Inbox panel.</p>
          </TabPanel>
          <TabPanel id="drafts">
            <p className="text-sm text-fg-secondary">Drafts panel.</p>
          </TabPanel>
          <TabPanel id="sent">
            <p className="text-sm text-fg-secondary">Sent panel.</p>
          </TabPanel>
          <TabPanel id="archive">
            <p className="text-sm text-fg-secondary">Archive panel.</p>
          </TabPanel>
        </Tabs>
      </div>
    ),
    code: `<Tabs defaultSelectedKey="inbox">
  <TabList>
    <Tab id="inbox" value={12}>Inbox</Tab>
    <Tab id="drafts" value={3}>Drafts</Tab>
    <Tab id="sent" value={0}>Sent</Tab>
    <Tab id="archive">Archive</Tab>
  </TabList>
  {/* …panels */}
</Tabs>`,
  },
  {
    id: "disabled",
    title: "Disabled tab",
    description: "Individual tabs can be disabled with the isDisabled prop.",
    preview: (
      <Tabs defaultSelectedKey="overview">
        <TabList>
          <Tab id="overview">Overview</Tab>
          <Tab id="activity">Activity</Tab>
          <Tab id="settings" isDisabled>
            Settings
          </Tab>
        </TabList>
        <TabPanel id="overview">
          <p className="text-sm text-fg-secondary">Overview panel content.</p>
        </TabPanel>
        <TabPanel id="activity">
          <p className="text-sm text-fg-secondary">Activity panel content.</p>
        </TabPanel>
        <TabPanel id="settings">
          <p className="text-sm text-fg-secondary">Settings panel content.</p>
        </TabPanel>
      </Tabs>
    ),
    code: `<Tabs defaultSelectedKey="overview">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="activity">Activity</Tab>
    <Tab id="settings" isDisabled>Settings</Tab>
  </TabList>
  <TabPanel id="overview">Overview panel content.</TabPanel>
  <TabPanel id="activity">Activity panel content.</TabPanel>
  <TabPanel id="settings">Settings panel content.</TabPanel>
</Tabs>`,
  },
];

export default function TabsPage() {
  return (
    <ComponentDocLayout
      name="Tabs"
      tagline="Accessible tab navigation built on react-aria. Supports underline and pill variants, sm/md sizes, icons, and disabled tabs."
      install={{ usage: `import { Tabs, TabList, Tab, TabPanel } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
    />
  );
}
