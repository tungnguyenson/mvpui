import { MetricCard } from "@mvp-ui/ui";
import { Banknote, Building2, UserRound } from "lucide-react";
import type { PaymentBatchRecord } from "../worker-payment-batches-data";
import { BatchSectionCard } from "./BatchSectionCard";
import {
  CompanyBarChart,
  DonutBreakdown,
  TransactionList,
} from "./BatchBreakdownChart";
import { formatVnd } from "./formatters";

export function BatchOverviewTab({ batch }: { batch: PaymentBatchRecord }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="Tổng số tiền"
          value={formatVnd(batch.summary.totalAmount)}
          valueSize="md"
          iconChip={<Banknote className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Số Freelancer"
          value={batch.summary.workerCount.toLocaleString("vi-VN")}
          valueSize="md"
          iconChip={<UserRound className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Số công ty"
          value={String(batch.summary.companyCount)}
          valueSize="md"
          iconChip={<Building2 className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
      </div>

      <BatchSectionCard title="Types of transaction">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <DonutBreakdown
            items={batch.transactionTypes}
            total={batch.summary.totalAmount}
          />
          <TransactionList items={batch.transactionTypes} />
        </div>
      </BatchSectionCard>

      <BatchSectionCard title="Thù lao theo công ty">
        <CompanyBarChart items={batch.companyBreakdown} />
      </BatchSectionCard>
    </div>
  );
}
