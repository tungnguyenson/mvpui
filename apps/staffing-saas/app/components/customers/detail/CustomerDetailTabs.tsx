"use client";

import { Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import { useSearchParams } from "next/navigation";
import type { CustomerDetailExtras } from "../customer-detail-data";
import { LocationsTab } from "./LocationsTab";
import { OverviewTab } from "./OverviewTab";
import { PositionsTab } from "./PositionsTab";
import { PricingTab } from "./PricingTab";
import { ReconciliationTab } from "./ReconciliationTab";
import { UsersTab } from "./UsersTab";

interface CustomerDetailTabsProps {
  customerId: string;
  extras: CustomerDetailExtras;
}

const TAB_DEFS = [
  { id: "overview", label: "Tổng quan" },
  { id: "locations", label: "Địa điểm" },
  { id: "positions", label: "Vị trí làm việc" },
  { id: "users", label: "Quản lý user" },
  { id: "pricing", label: "Cấu hình chi trả & phí" },
  { id: "reconciliation", label: "Cấu hình đối soát" },
] as const;

const TAB_IDS = TAB_DEFS.map((t) => t.id) as readonly string[];

export function CustomerDetailTabs({ customerId, extras }: CustomerDetailTabsProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = tabParam && TAB_IDS.includes(tabParam) ? tabParam : "overview";

  return (
    <Tabs defaultSelectedKey={initialTab} className="gap-6">
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
      <TabPanel id="locations">
        <LocationsTab locations={extras.locations} />
      </TabPanel>
      <TabPanel id="positions">
        <PositionsTab positions={extras.positions} customerId={customerId} />
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
