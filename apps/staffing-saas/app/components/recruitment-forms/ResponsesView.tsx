"use client";

import type { BadgeColor } from "@mvp-ui/ui";
import { Badge, Button, EmptyState, toast } from "@mvp-ui/ui";
import { Download, Inbox } from "lucide-react";
import type { FormConfig } from "./form-schema";

interface MockRow {
	name: string;
	phone: string;
	area: string;
	when: string;
	status: { label: string; color: BadgeColor };
}

const NEW = { label: "Mới", color: "warning" as const };
const CONTACTED = { label: "Đã liên hệ", color: "blue" as const };
const WORKING = { label: "Đã đi làm", color: "success" as const };

/** Phản hồi mock — prototype chưa có backend. Hiển thị cố định, cắt theo số lượng. */
const POOL: MockRow[] = [
	{
		name: "Nguyễn Thị Hồng",
		phone: "0987 ••• 321",
		area: "Quận 7 · TP.HCM",
		when: "Hôm nay, 09:12",
		status: NEW,
	},
	{
		name: "Lê Văn Bình",
		phone: "0934 ••• 108",
		area: "Thủ Đức · TP.HCM",
		when: "Hôm nay, 08:40",
		status: NEW,
	},
	{
		name: "Phạm Minh Đức",
		phone: "0901 ••• 776",
		area: "Gò Vấp · TP.HCM",
		when: "Hôm qua, 17:05",
		status: CONTACTED,
	},
	{
		name: "Trần Thị Mai",
		phone: "0978 ••• 540",
		area: "Bình Thạnh · TP.HCM",
		when: "Hôm qua, 14:22",
		status: CONTACTED,
	},
	{
		name: "Võ Hoàng Long",
		phone: "0967 ••• 213",
		area: "Tân Bình · TP.HCM",
		when: "2 ngày trước",
		status: WORKING,
	},
	{
		name: "Đỗ Thị Lan",
		phone: "0945 ••• 887",
		area: "Quận 1 · TP.HCM",
		when: "2 ngày trước",
		status: WORKING,
	},
	{
		name: "Bùi Quốc Việt",
		phone: "0912 ••• 459",
		area: "Dĩ An · Bình Dương",
		when: "3 ngày trước",
		status: WORKING,
	},
	{
		name: "Hồ Thị Thu",
		phone: "0989 ••• 102",
		area: "Biên Hòa · Đồng Nai",
		when: "3 ngày trước",
		status: CONTACTED,
	},
	{
		name: "Ngô Văn Sơn",
		phone: "0931 ••• 678",
		area: "Quận 12 · TP.HCM",
		when: "4 ngày trước",
		status: WORKING,
	},
	{
		name: "Đặng Thu Hà",
		phone: "0908 ••• 334",
		area: "Hà Đông · Hà Nội",
		when: "5 ngày trước",
		status: WORKING,
	},
];

export function ResponsesView({ config }: { config: FormConfig }) {
	const total = config.responseCount;
	const rows = POOL.slice(0, Math.min(total, POOL.length));
	const extra = Math.max(0, total - rows.length);

	return (
		<div className="mx-auto max-w-4xl p-4 md:p-6">
			<div className="mb-4 flex items-center justify-between gap-3">
				<div>
					<h2 className="text-base font-semibold text-fg">Phản hồi</h2>
					<p className="text-sm text-fg-tertiary">
						{total > 0 ? `${total.toLocaleString("vi-VN")} người đã đăng ký` : "Chưa có phản hồi"}
					</p>
				</div>
				<Button
					color="secondary"
					size="sm"
					iconLeading={Download}
					disabled={total === 0}
					onClick={() => toast.success("Xuất CSV — tính năng đang phát triển")}
				>
					Xuất CSV
				</Button>
			</div>

			<p className="mb-3 rounded-lg bg-info-bg px-3 py-2 text-xs text-info-fg">
				Dữ liệu mẫu (prototype). Khi nối backend, mỗi lượt gửi form sẽ tạo một ứng viên ở đây.
			</p>

			{rows.length === 0 ? (
				<EmptyState
					icon={<Inbox />}
					title="Chưa có ai đăng ký"
					description="Chia sẻ link hoặc mã QR của form để bắt đầu nhận phản hồi."
				/>
			) : (
				<div className="overflow-hidden rounded-xl border border-border">
					<table className="w-full text-left text-sm">
						<thead>
							<tr className="border-border border-b bg-bg-secondary text-xs text-fg-tertiary">
								<th className="px-4 py-2.5 font-medium">Họ tên</th>
								<th className="px-4 py-2.5 font-medium">SĐT</th>
								<th className="hidden px-4 py-2.5 font-medium sm:table-cell">Khu vực</th>
								<th className="hidden px-4 py-2.5 font-medium md:table-cell">Thời gian</th>
								<th className="px-4 py-2.5 font-medium">Trạng thái</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((r) => (
								<tr key={r.phone} className="border-border-secondary border-b last:border-0">
									<td className="px-4 py-3 font-medium text-fg">{r.name}</td>
									<td className="px-4 py-3 font-mono text-fg-secondary">{r.phone}</td>
									<td className="hidden px-4 py-3 text-fg-secondary sm:table-cell">{r.area}</td>
									<td className="hidden px-4 py-3 text-fg-tertiary md:table-cell">{r.when}</td>
									<td className="px-4 py-3">
										<Badge color={r.status.color} size="sm">
											{r.status.label}
										</Badge>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{extra > 0 && (
						<div className="border-border-secondary border-t bg-bg-secondary px-4 py-2.5 text-center text-xs text-fg-tertiary">
							… và {extra.toLocaleString("vi-VN")} phản hồi khác
						</div>
					)}
				</div>
			)}
		</div>
	);
}
