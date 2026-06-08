"use client";

import { Check, Download } from "lucide-react";
import type { Company, Province, Referrer } from "./data";
import { SHIFT_LABELS } from "./data";
import type { FormState } from "./ReferralPage";

interface SuccessScreenProps {
	f: FormState;
	province: Province | undefined;
	companies: Company[];
	referrer: Referrer;
}

export function SuccessScreen({ f, province, companies, referrer }: SuccessScreenProps) {
	const firstName = f.name.trim().split(/\s+/).slice(-1)[0] || "bạn";
	const pickedCompanies = companies.filter((c) => f.companies.includes(c.id)).map((c) => c.name);
	const shiftText = f.shifts.map((s) => SHIFT_LABELS[s]).join(", ");

	return (
		<div className="device">
			<div className="scroll">
				<div className="success">
					<div className="burst">
						<span className="ring" />
						<Check />
					</div>
					<h1>Đăng ký thành công!</h1>
					<p className="lede">
						Cảm ơn <b>{firstName}</b>. Hồ sơ của bạn đã được gửi. Đội ngũ viec.co sẽ liên hệ trong
						vòng <b>24 giờ làm việc</b>.
					</p>

					<div className="summary">
						<div className="srow">
							<span className="k">Họ và tên</span>
							<span className="v">{f.name}</span>
						</div>
						<div className="srow">
							<span className="k">Số điện thoại</span>
							<span className="v">{f.phone}</span>
						</div>
						{province && (
							<div className="srow">
								<span className="k">Khu vực</span>
								<span className="v">
									{f.districts.join(", ")} · {province.name}
								</span>
							</div>
						)}
						{pickedCompanies.length > 0 && (
							<div className="srow">
								<span className="k">Công ty ưu tiên</span>
								<span className="v">{pickedCompanies.join(", ")}</span>
							</div>
						)}
						{shiftText && (
							<div className="srow">
								<span className="k">Ca làm</span>
								<span className="v">{shiftText}</span>
							</div>
						)}
					</div>

					<div className="nextsteps">
						<div className="nst">Tiếp theo sẽ thế nào?</div>
						<div className="step-item">
							<span className="num">1</span>
							<span className="stx">
								<b>Tải app viec.co</b> để theo dõi trạng thái hồ sơ và nhận thông báo việc mới.
							</span>
						</div>
						<div className="step-item">
							<span className="num">2</span>
							<span className="stx">
								<b>Kết nối Zalo OA</b> để được tư vấn viên nhắn tin trực tiếp, nhanh hơn cả gọi
								điện.
							</span>
						</div>
						<div className="step-item">
							<span className="num">3</span>
							<span className="stx">
								Chờ <b>cuộc gọi xếp việc</b> từ số tổng đài viec.co trong 24 giờ tới.
							</span>
						</div>
					</div>

					{/* CTA — nối link Zalo OA / app store thật khi có backend */}
					<div className="apps">
						<button type="button" className="btn-app btn-zalo">
							<span className="za">Z</span>Nhắn tin qua Zalo OA
						</button>
						<button type="button" className="btn-app btn-app-store">
							<Download />
							Tải app viec.co
						</button>
					</div>

					<p className="ref-foot">
						Bạn được giới thiệu bởi <b>{referrer.name}</b>.
						<br />
						Cảm ơn bạn đã tin tưởng cộng đồng viec.co.
					</p>
				</div>
			</div>
		</div>
	);
}
