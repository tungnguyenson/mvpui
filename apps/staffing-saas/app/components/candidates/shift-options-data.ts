/**
 * Ca làm việc đang mở — dùng cho popover "Chốt ca làm" ở màn sourcing.
 *
 * UI demo only. Mỗi ca thuộc một khách hàng, có số cần tuyển (`required`) và số
 * đã có (`filled`); phần thiếu = required - filled.
 */

export interface ShiftOption {
	id: string;
	/** Khách hàng đặt ca. */
	customer: string;
	/** Tên ca làm việc, ví dụ "Ca sáng 06:00–14:00". */
	shift: string;
	/** Kho / điểm làm việc. */
	site: string;
	/** Ngày bắt đầu ca (định dạng VN). */
	date: string;
	/** Số lượng cần tuyển. */
	required: number;
	/** Số đã chốt. */
	filled: number;
}

export interface ShiftCustomerGroup {
	customer: string;
	shifts: ShiftOption[];
}

/** Số còn thiếu của một ca. */
export function shiftShortage(option: ShiftOption): number {
	return Math.max(0, option.required - option.filled);
}

export const SHIFT_OPTIONS: ShiftOption[] = [
	{
		id: "shift-ghtk-am",
		customer: "GHTK",
		shift: "Ca sáng 06:00–14:00",
		site: "Kho Q12",
		date: "26/05/2026",
		required: 8,
		filled: 5,
	},
	{
		id: "shift-ghtk-night",
		customer: "GHTK",
		shift: "Ca đêm 22:00–06:00",
		site: "Kho VSIP",
		date: "26/05/2026",
		required: 6,
		filled: 2,
	},
	{
		id: "shift-ghn-pm",
		customer: "GHN",
		shift: "Ca chiều 14:00–22:00",
		site: "Kho TBN3",
		date: "27/05/2026",
		required: 5,
		filled: 4,
	},
	{
		id: "shift-ghn-am",
		customer: "GHN",
		shift: "Ca sáng 06:00–14:00",
		site: "Kho Linh Trung",
		date: "27/05/2026",
		required: 10,
		filled: 6,
	},
	{
		id: "shift-lazada-night",
		customer: "Lazada Logistics",
		shift: "Ca đêm 22:00–06:00",
		site: "Kho SOC1",
		date: "28/05/2026",
		required: 12,
		filled: 7,
	},
	{
		id: "shift-shopee-am",
		customer: "Shopee Express",
		shift: "Ca sáng 07:00–15:00",
		site: "Kho Tân Tạo",
		date: "26/05/2026",
		required: 6,
		filled: 5,
	},
	{
		id: "shift-bhx-weekend",
		customer: "Bách Hoá Xanh",
		shift: "Ca cuối tuần 08:00–17:00",
		site: "Vincom Q1",
		date: "30/05/2026",
		required: 4,
		filled: 1,
	},
];

/** SHIFT_OPTIONS gom theo khách hàng, giữ thứ tự xuất hiện. */
export const SHIFT_OPTIONS_BY_CUSTOMER: ShiftCustomerGroup[] = SHIFT_OPTIONS.reduce<
	ShiftCustomerGroup[]
>((groups, option) => {
	const existing = groups.find((g) => g.customer === option.customer);
	if (existing) {
		existing.shifts.push(option);
	} else {
		groups.push({ customer: option.customer, shifts: [option] });
	}
	return groups;
}, []);
