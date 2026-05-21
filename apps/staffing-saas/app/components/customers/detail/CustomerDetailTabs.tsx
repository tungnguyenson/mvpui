"use client";

import { Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CustomerDetailExtras } from "../customer-detail-data";
import { DocumentsTab } from "./DocumentsTab";
import { LocationsTab } from "./LocationsTab";
import { OverviewTab } from "./OverviewTab";
import { PositionsTab } from "./PositionsTab";
import { PricingTab } from "./PricingTab";
import { ReconciliationTab } from "./ReconciliationTab";
import { ShiftsTab } from "./ShiftsTab";
import { UsersTab } from "./UsersTab";

interface CustomerDetailTabsProps {
  customerId: string;
  extras: CustomerDetailExtras;
}

const TAB_DEFS = [
  { id: "overview", label: "Tổng quan" },
  { id: "documents", label: "Hợp đồng" },
  { id: "locations", label: "Địa điểm" },
  { id: "positions", label: "Công việc" },
  { id: "pricing", label: "Cấu hình giá" },
  { id: "shifts", label: "Ca làm việc" },
  { id: "reconciliation", label: "Cấu hình đối soát" },
  { id: "users", label: "Nhân viên" },
] as const;

const TAB_IDS = TAB_DEFS.map((t) => t.id) as readonly string[];

// Sub-route params that belong to a specific tab. When tab changes, drop
// the previous tab's sub-route params so URL stays clean.
const TAB_SUB_PARAMS: Record<string, readonly string[]> = {
  shifts: ["shift"],
  pricing: ["config"],
  positions: ["position"],
};

export function CustomerDetailTabs({ customerId, extras }: CustomerDetailTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tabParam = searchParams.get("tab");
  const selectedTab =
    tabParam && TAB_IDS.includes(tabParam) ? tabParam : "overview";

  const handleTabChange = (key: string) => {
    if (key === selectedTab) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", key);
    // Drop sub-route params from previous tab
    for (const [tabId, subParams] of Object.entries(TAB_SUB_PARAMS)) {
      if (tabId !== key) {
        for (const sub of subParams) params.delete(sub);
      }
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs
      selectedKey={selectedTab}
      onSelectionChange={(key) => handleTabChange(key as string)}
      variant="pill"
      orientation="vertical"
      className="gap-6"
    >
      <TabList aria-label="Customer detail tabs">
        {TAB_DEFS.map((tab) => (
          <Tab key={tab.id} id={tab.id}>
            {tab.label}
          </Tab>
        ))}
      </TabList>

      <TabPanel id="overview">
        <OverviewTab extras={extras} />
      </TabPanel>
      <TabPanel id="documents">
        <DocumentsTab documents={extras.documents} />
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
        <PricingTab
          configs={extras.pricingConfigs}
          customerId={customerId}
          customerName={extras.brand.brandName}
        />
      </TabPanel>
      <TabPanel id="shifts">
        <ShiftsTab
          shifts={extras.shifts}
          positions={extras.positions}
          locations={extras.locations}
          pricingConfigs={extras.pricingConfigs}
        />
      </TabPanel>
      <TabPanel id="reconciliation">
        <ReconciliationTab data={extras.reconciliation} />
      </TabPanel>
    </Tabs>
  );
}
