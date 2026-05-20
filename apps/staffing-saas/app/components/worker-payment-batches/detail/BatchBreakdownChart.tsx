import type { BatchTransactionType } from "../worker-payment-batches-data";
import { formatVnd } from "./formatters";

const POSITIVE_OPACITIES = [
  1, 0.85, 0.72, 0.6, 0.5, 0.42, 0.36, 0.3, 0.26, 0.22, 0.19, 0.16, 0.14, 0.12,
];

function positiveOpacity(index: number): number {
  return POSITIVE_OPACITIES[Math.min(index, POSITIVE_OPACITIES.length - 1)] ?? 0.12;
}

interface DonutBreakdownProps {
  items: BatchTransactionType[];
  total: number;
}

export function DonutBreakdown({ items, total }: DonutBreakdownProps) {
  const positives = items.filter((item) => item.amount > 0);
  const positiveSum = positives.reduce((s, item) => s + item.amount, 0) || 1;

  const size = 220;
  const stroke = 28;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label="Tỷ trọng các loại giao dịch"
        >
          <title>Tỷ trọng các loại giao dịch</title>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            className="stroke-border-secondary"
            strokeWidth={stroke}
          />
          <g className="text-primary">
            {positives.map((item, index) => {
              const fraction = item.amount / positiveSum;
              const length = circumference * fraction;
              const seg = (
                <circle
                  key={item.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={positiveOpacity(index)}
                  strokeWidth={stroke}
                  strokeDasharray={`${length} ${circumference - length}`}
                  strokeDashoffset={-offset}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              );
              offset += length;
              return seg;
            })}
          </g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-base font-semibold text-fg tabular-nums">
            {formatVnd(total, { suffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TransactionListProps {
  items: BatchTransactionType[];
}

export function TransactionList({ items }: TransactionListProps) {
  let posIndex = -1;
  return (
    <ul className="flex flex-col divide-y divide-border-secondary">
      {items.map((item) => {
        const isPositive = item.amount > 0;
        if (isPositive) posIndex += 1;
        const dotOpacity = isPositive ? positiveOpacity(posIndex) : 1;
        const dotClass = isPositive ? "text-primary" : "text-fg-error";
        const pct = (item.share * 100).toFixed(2);
        return (
          <li key={item.id} className="flex items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-2 text-sm">
              <svg
                width={10}
                height={10}
                viewBox="0 0 10 10"
                className={dotClass}
                aria-hidden="true"
                focusable="false"
              >
                <title>Dot</title>
                <circle cx="5" cy="5" r="5" fill="currentColor" fillOpacity={dotOpacity} />
              </svg>
              <span className="text-fg">{item.label}</span>
              <span className="text-xs text-fg-tertiary tabular-nums">{pct}%</span>
            </div>
            <span
              className={`text-sm font-medium tabular-nums ${
                item.amount < 0 ? "text-fg-error" : "text-fg"
              }`}
            >
              {formatVnd(item.amount, { suffix: true, sign: item.amount > 0 })}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

interface CompanyBarChartProps {
  items: { customerId: string; customerName: string; amount: number }[];
}

export function CompanyBarChart({ items }: CompanyBarChartProps) {
  const sorted = [...items].sort((a, b) => b.amount - a.amount);
  const max = sorted[0]?.amount ?? 1;
  return (
    <ul className="flex flex-col gap-3">
      {sorted.map((row) => {
        const width = Math.max(2, (row.amount / max) * 100);
        return (
          <li
            key={row.customerId}
            className="grid grid-cols-[180px_minmax(0,1fr)_140px] items-center gap-3"
          >
            <span className="truncate text-sm text-fg">{row.customerName}</span>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-bg-secondary">
              <div
                className="h-2.5 rounded-full bg-primary"
                style={{ width: `${width}%` }}
              />
            </div>
            <span className="text-right text-sm font-medium text-fg tabular-nums">
              {formatVnd(row.amount, { suffix: true })}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
