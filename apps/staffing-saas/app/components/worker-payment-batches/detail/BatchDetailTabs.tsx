"use client";

import { Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import type { PaymentBatchRecord } from "../worker-payment-batches-data";
import { BatchOverviewTab } from "./BatchOverviewTab";
import { BatchDetailsTab } from "./BatchDetailsTab";
import { BatchAdjustmentsTab } from "./BatchAdjustmentsTab";
import { BatchConfigTab } from "./BatchConfigTab";

const TAB_DEFS = [
  { id: "overview", label: "Tổng quan" },
  { id: "details", label: "Chi tiết" },
  { id: "adjustments", label: "Các khoản điều chỉnh" },
  { id: "config", label: "Cấu hình" },
] as const;

export function BatchDetailTabs({ batch }: { batch: PaymentBatchRecord }) {
  return (
    <Tabs defaultSelectedKey="overview" className="gap-6">
      <TabList aria-label="Chi tiết kỳ thù lao" className="gap-6">
        {TAB_DEFS.map((tab) => (
          <Tab key={tab.id} id={tab.id}>
            {tab.label}
          </Tab>
        ))}
      </TabList>

      <TabPanel id="overview">
        <BatchOverviewTab batch={batch} />
      </TabPanel>
      <TabPanel id="details">
        <BatchDetailsTab batch={batch} />
      </TabPanel>
      <TabPanel id="adjustments">
        <BatchAdjustmentsTab batch={batch} />
      </TabPanel>
      <TabPanel id="config">
        <BatchConfigTab batch={batch} />
      </TabPanel>
    </Tabs>
  );
}
