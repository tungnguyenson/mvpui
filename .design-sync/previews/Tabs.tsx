import { BarChart2, Settings, Users } from "lucide-react";
import { Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";

export const Underline = () => (
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
);

export const Pill = () => (
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
);

export const WithIcons = () => (
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
);

export const WithCounts = () => (
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
);

export const Vertical = () => (
  <Tabs defaultSelectedKey="details" orientation="vertical" variant="pill">
    <TabList>
      <Tab id="details">My details</Tab>
      <Tab id="profile">Profile</Tab>
      <Tab id="password">Password</Tab>
      <Tab id="team">Team</Tab>
      <Tab id="notifications" value={2}>
        Notifications
      </Tab>
      <Tab id="api">API</Tab>
    </TabList>
    <TabPanel id="details">
      <p className="text-sm text-fg-secondary">My details panel.</p>
    </TabPanel>
    <TabPanel id="profile">
      <p className="text-sm text-fg-secondary">Profile panel.</p>
    </TabPanel>
    <TabPanel id="password">
      <p className="text-sm text-fg-secondary">Password panel.</p>
    </TabPanel>
    <TabPanel id="team">
      <p className="text-sm text-fg-secondary">Team panel.</p>
    </TabPanel>
    <TabPanel id="notifications">
      <p className="text-sm text-fg-secondary">Notifications panel.</p>
    </TabPanel>
    <TabPanel id="api">
      <p className="text-sm text-fg-secondary">API panel.</p>
    </TabPanel>
  </Tabs>
);
