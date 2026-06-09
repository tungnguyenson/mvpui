import type { Metadata } from "next";
import { DEFAULT_BRAND, getReferrer } from "./data";
import { ReferralPage } from "./ReferralPage";
import "./referral.css";

export const metadata: Metadata = {
	title: "Đăng ký đi làm · viec.co",
	description:
		"Tìm việc gần nhà, đăng ký chỉ 2 phút. Để lại thông tin, đội ngũ viec.co sẽ liên hệ và xếp việc phù hợp.",
};

const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

interface PageProps {
	params: Promise<{ ctv: string }>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ReferralRoute({ params, searchParams }: PageProps) {
	const { ctv } = await params;
	const { brand, form } = await searchParams;

	const referrer = getReferrer(ctv);
	// `?brand=` cho phép xem trước màu — sẽ thay bằng trang cấu hình sau.
	const brandColor = typeof brand === "string" && HEX_RE.test(brand) ? brand : DEFAULT_BRAND;
	// `?form=simple` rút gọn biểu mẫu (bỏ công ty ưu tiên + ảnh CCCD); mặc định chi tiết.
	const variant = form === "simple" ? "simple" : "detailed";

	return <ReferralPage referrer={referrer} brand={brandColor} variant={variant} />;
}
