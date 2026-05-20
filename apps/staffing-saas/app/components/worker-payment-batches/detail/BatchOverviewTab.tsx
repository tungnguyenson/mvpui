import { Banknote, Building2, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import type { PaymentBatchRecord } from "../worker-payment-batches-data";
import { BatchSectionCard } from "./BatchSectionCard";
import {
  CompanyBarChart,
  DonutBreakdown,
  TransactionList,
} from "./BatchBreakdownChart";
import { formatVnd } from "./formatters";

function KpiTile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-fg">
          {icon}
        </div>
        <p className="text-sm font-medium text-fg-tertiary">{label}</p>
      </div>
      <p className="mt-4 text-3xl font-semibold text-fg tabular-nums">{value}</p>
    </div>
  );
}

export function BatchOverviewTab({ batch }: { batch: PaymentBatchRecord }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <KpiTile
          label="Tổng số tiền"
          value={formatVnd(batch.summary.totalAmount)}
          icon={<Banknote className="size-5" />}
        />
        <KpiTile
          label="Số Freelancer"
          value={batch.summary.workerCount.toLocaleString("vi-VN")}
          icon={<UserRound className="size-5" />}
        />
        <KpiTile
          label="Số công ty"
          value={String(batch.summary.companyCount)}
          icon={<Building2 className="size-5" />}
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
