"use client";

import { Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import { useState } from "react";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { PageScaffold } from "../_shell/PageScaffold";
import { InviteTrialTab } from "./InviteTrialTab";
import { PayslipTab } from "./PayslipTab";
import { SwatListTab } from "./SwatListTab";
import { TimesheetTab } from "./TimesheetTab";

const TAB_DEFS = [
  { id: "invite", label: "Mời thử việc" },
  { id: "list", label: "Danh sách SWAT" },
  { id: "timesheet", label: "Bảng công" },
  { id: "payslip", label: "Phiếu lương" },
] as const;

type TabId = (typeof TAB_DEFS)[number]["id"];

export function WorkerSwatPage() {
  const [tab, setTab] = useState<TabId>("list");

  return (
    <PageScaffold
      header={
        <AppPageHeader
          title="Quản lý SWAT"
          description="Theo dõi đội SWAT — mời thử việc, danh sách hợp đồng, bảng công và phiếu lương trong cùng một nơi."
        />
      }
    >
      <Tabs
        selectedKey={tab}
        onSelectionChange={(key) => setTab(key as TabId)}
        orientation="vertical"
        variant="pill"
        className="gap-6"
      >
        <TabList aria-label="Quản lý SWAT">
          {TAB_DEFS.map((t) => (
            <Tab key={t.id} id={t.id}>
              {t.label}
            </Tab>
          ))}
        </TabList>

        <TabPanel id="invite">
          <InviteTrialTab />
        </TabPanel>
        <TabPanel id="list">
          <SwatListTab />
        </TabPanel>
        <TabPanel id="timesheet">
          <TimesheetTab />
        </TabPanel>
        <TabPanel id="payslip">
          <PayslipTab />
        </TabPanel>
      </Tabs>
    </PageScaffold>
  );
}
