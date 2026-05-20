"use client";

import { Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import type { CustomerDetailExtras } from "../customer-detail-data";
import { OverviewTab } from "./OverviewTab";
import { PricingTab } from "./PricingTab";
import { ReconciliationTab } from "./ReconciliationTab";
import { UsersTab } from "./UsersTab";

interface CustomerDetailTabsProps {
  customerId: string;
  extras: CustomerDetailExtras;
}

const TAB_DEFS = [
  { id: "overview", label: "Tổng quan" },
  { id: "users", label: "Quản lý user" },
  { id: "pricing", label: "Cấu hình chi trả & phí" },
  { id: "reconciliation", label: "Cấu hình đối soát" },
] as const;

export function CustomerDetailTabs({ customerId, extras }: CustomerDetailTabsProps) {
  return (
    <Tabs defaultSelectedKey="overview" className="gap-6">
      <TabList aria-label="Customer detail tabs" className="gap-6">
        {TAB_DEFS.map((tab) => (
          <Tab key={tab.id} id={tab.id}>
            {tab.label}
          </Tab>
        ))}
      </TabList>

      <TabPanel id="overview">
        <OverviewTab extras={extras} />
      </TabPanel>
      <TabPanel id="users">
        <UsersTab users={extras.users} />
      </TabPanel>
      <TabPanel id="pricing">
        <PricingTab configs={extras.pricingConfigs} customerId={customerId} />
      </TabPanel>
      <TabPanel id="reconciliation">
        <ReconciliationTab data={extras.reconciliation} />
      </TabPanel>
    </Tabs>
  );
}
