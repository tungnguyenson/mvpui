/**
 * Ca làm việc đang mở — dùng cho dialog "Chốt ca làm" ở màn sourcing.
 *
 * UI demo only. Mỗi ca thuộc một khách hàng, có số cần tuyển (`required`) và số
 * đã có (`filled`); phần thiếu = required - filled. Danh sách dài → dialog có ô
 * tìm kiếm + cuộn, không nhét vừa dropdown tại chỗ.
 */

export interface ShiftOption {
	id: string;
	/** Khách hàng đặt ca. */
	customer: string;
	/** Tên ca làm việc, ví dụ "Ca sáng 06:00–14:00". */
	shift: string;
	/** Kho / điểm làm việc. */
	site: string;
	/** Khu vực. */
	region: string;
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

/** Gom danh sách ca theo khách hàng, giữ thứ tự xuất hiện. */
export function groupShiftsByCustomer(options: ShiftOption[]): ShiftCustomerGroup[] {
	return options.reduce<ShiftCustomerGroup[]>((groups, option) => {
		const existing = groups.find((g) => g.customer === option.customer);
		if (existing) {
			existing.shifts.push(option);
		} else {
			groups.push({ customer: option.customer, shifts: [option] });
		}
		return groups;
	}, []);
}

export const SHIFT_OPTIONS: ShiftOption[] = [
	// GHTK
	{ id: "ghtk-q12-am", customer: "GHTK", shift: "Ca sáng 06:00–14:00", site: "Kho Q12", region: "TP.HCM", date: "26/05/2026", required: 8, filled: 5 },
	{ id: "ghtk-vsip-night", customer: "GHTK", shift: "Ca đêm 22:00–06:00", site: "Kho VSIP", region: "Bình Dương", date: "26/05/2026", required: 6, filled: 2 },
	{ id: "ghtk-tbn3-pm", customer: "GHTK", shift: "Ca chiều 14:00–22:00", site: "Kho TBN3", region: "TP.HCM", date: "27/05/2026", required: 5, filled: 5 },
	// GHN
	{ id: "ghn-tbn3-pm", customer: "GHN", shift: "Ca chiều 14:00–22:00", site: "Kho TBN3", region: "TP.HCM", date: "27/05/2026", required: 5, filled: 4 },
	{ id: "ghn-linhtrung-am", customer: "GHN", shift: "Ca sáng 06:00–14:00", site: "Kho Linh Trung", region: "Thủ Đức", date: "27/05/2026", required: 10, filled: 6 },
	{ id: "ghn-soc1-night", customer: "GHN", shift: "Ca đêm 22:00–06:00", site: "Kho SOC1", region: "TP.HCM", date: "28/05/2026", required: 7, filled: 3 },
	// Lazada Logistics
	{ id: "lazada-soc1-night", customer: "Lazada Logistics", shift: "Ca đêm 22:00–06:00", site: "Kho SOC1", region: "TP.HCM", date: "28/05/2026", required: 12, filled: 7 },
	{ id: "lazada-bgiang-am", customer: "Lazada Logistics", shift: "Ca sáng 07:00–15:00", site: "Kho Bắc Giang", region: "Bắc Giang", date: "29/05/2026", required: 15, filled: 9 },
	{ id: "lazada-bgiang-pm", customer: "Lazada Logistics", shift: "Ca chiều 15:00–23:00", site: "Kho Bắc Giang", region: "Bắc Giang", date: "29/05/2026", required: 15, filled: 14 },
	// Shopee Express
	{ id: "shopee-tantao-am", customer: "Shopee Express", shift: "Ca sáng 07:00–15:00", site: "Kho Tân Tạo", region: "TP.HCM", date: "26/05/2026", required: 6, filled: 5 },
	{ id: "shopee-tantao-pm", customer: "Shopee Express", shift: "Ca chiều 15:00–23:00", site: "Kho Tân Tạo", region: "TP.HCM", date: "26/05/2026", required: 6, filled: 2 },
	{ id: "shopee-q7-weekend", customer: "Shopee Express", shift: "Ca cuối tuần 08:00–17:00", site: "Hub Quận 7", region: "TP.HCM", date: "30/05/2026", required: 4, filled: 1 },
	// J&T Express
	{ id: "jt-binhtan-am", customer: "J&T Express", shift: "Ca sáng 06:00–14:00", site: "Kho Bình Tân", region: "TP.HCM", date: "27/05/2026", required: 9, filled: 4 },
	{ id: "jt-binhtan-night", customer: "J&T Express", shift: "Ca đêm 22:00–06:00", site: "Kho Bình Tân", region: "TP.HCM", date: "27/05/2026", required: 9, filled: 6 },
	{ id: "jt-thuanan-pm", customer: "J&T Express", shift: "Ca chiều 14:00–22:00", site: "Kho Thuận An", region: "Bình Dương", date: "28/05/2026", required: 8, filled: 3 },
	// Viettel Post
	{ id: "vtp-hocmon-am", customer: "Viettel Post", shift: "Ca sáng 06:00–14:00", site: "Kho Hóc Môn", region: "TP.HCM", date: "26/05/2026", required: 7, filled: 5 },
	{ id: "vtp-hocmon-pm", customer: "Viettel Post", shift: "Ca chiều 14:00–22:00", site: "Kho Hóc Môn", region: "TP.HCM", date: "26/05/2026", required: 7, filled: 7 },
	// Tiki
	{ id: "tiki-cuchi-am", customer: "Tiki", shift: "Ca sáng 07:00–15:00", site: "Kho Củ Chi", region: "TP.HCM", date: "29/05/2026", required: 11, filled: 6 },
	{ id: "tiki-cuchi-night", customer: "Tiki", shift: "Ca đêm 23:00–07:00", site: "Kho Củ Chi", region: "TP.HCM", date: "29/05/2026", required: 11, filled: 8 },
	// Bách Hoá Xanh
	{ id: "bhx-binhduong-am", customer: "Bách Hoá Xanh", shift: "Ca sáng 06:00–12:00", site: "Kho Bình Dương", region: "Bình Dương", date: "27/05/2026", required: 5, filled: 2 },
	{ id: "bhx-vincomq1-weekend", customer: "Bách Hoá Xanh", shift: "Ca cuối tuần 08:00–17:00", site: "Vincom Q1", region: "TP.HCM", date: "30/05/2026", required: 4, filled: 1 },
	// Con Cưng
	{ id: "concung-q3-am", customer: "Con Cưng", shift: "Ca sáng 08:00–14:00", site: "Cửa hàng Quận 3", region: "TP.HCM", date: "26/05/2026", required: 3, filled: 1 },
	{ id: "concung-govap-pm", customer: "Con Cưng", shift: "Ca chiều 14:00–21:00", site: "Cửa hàng Gò Vấp", region: "TP.HCM", date: "26/05/2026", required: 3, filled: 3 },
	// Vincom Retail
	{ id: "vincom-thaodien-weekend", customer: "Vincom Retail", shift: "Ca cuối tuần 09:00–18:00", site: "Vincom Thảo Điền", region: "Thủ Đức", date: "30/05/2026", required: 6, filled: 2 },
	{ id: "vincom-landmark-weekend", customer: "Vincom Retail", shift: "Ca cuối tuần 09:00–18:00", site: "Landmark 81", region: "Bình Thạnh", date: "31/05/2026", required: 6, filled: 4 },
];
