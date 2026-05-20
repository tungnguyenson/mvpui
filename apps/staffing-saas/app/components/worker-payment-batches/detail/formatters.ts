const VND = new Intl.NumberFormat("vi-VN");

export function formatVnd(amount: number, opts?: { suffix?: boolean; sign?: boolean }): string {
  const suffix = opts?.suffix ? " đ" : "";
  if (opts?.sign && amount > 0) {
    return `+${VND.format(amount)}${suffix}`;
  }
  return `${VND.format(amount)}${suffix}`;
}

export function formatHours(value: number): string {
  return value.toLocaleString("vi-VN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const TODAY = new Date("2026-05-20T12:00:00+07:00");

export function formatRelativeVi(iso: string): string {
  const date = new Date(iso);
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const startOfToday = new Date(
    TODAY.getFullYear(),
    TODAY.getMonth(),
    TODAY.getDate(),
  );
  const diffDays = Math.round(
    (startOfToday.getTime() - startOfDate.getTime()) / (24 * 60 * 60 * 1000),
  );
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  if (diffDays === 0) return `${hh}:${mm} Hôm nay`;
  if (diffDays === 1) return `${hh}:${mm} Hôm qua`;
  const dd = String(date.getDate()).padStart(2, "0");
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  return `${hh}:${mm} ${dd}/${mo}/${date.getFullYear()}`;
}

export function formatDateVi(iso: string): string {
  const date = new Date(iso);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getFullYear()}`;
}

export function formatTimeDateVi(iso: string): string {
  const date = new Date(iso);
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm} ${formatDateVi(iso)}`;
}
