// Xuất QR / poster ra PNG. Dùng qr-code-styling (cùng lib với <QRCode> của
// @mvp-ui/ui) thay cho code ma trận thủ công trong prototype.
// Chỉ chạy phía client (gọi khi bấm nút) — import động để tránh đụng SSR.

import type { CtvProfile } from "../../data/ctv-referral";

/** Module dạng đen trên trắng, bo nhẹ — khớp spec QR #0D1526, ECC H. */
const QR_STYLE = {
	qrOptions: { errorCorrectionLevel: "H" as const },
	dotsOptions: { type: "rounded" as const, color: "#0D1526" },
	cornersSquareOptions: { type: "extra-rounded" as const, color: "#0D1526" },
	cornersDotOptions: { type: "dot" as const, color: "#0D1526" },
	backgroundOptions: { color: "#ffffff" },
};

function stripPng(name: string): string {
	return name.replace(/\.png$/i, "");
}

/** Tải QR đơn ra PNG 1024px (lề trắng). */
export async function downloadQrPng(value: string, filename: string): Promise<void> {
	const { default: QRCodeStyling } = await import("qr-code-styling");
	const qr = new QRCodeStyling({
		width: 1024,
		height: 1024,
		data: value,
		type: "canvas",
		margin: 56,
		...QR_STYLE,
	});
	await qr.download({ name: stripPng(filename), extension: "png" });
}

function blobToImage(blob: Blob): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(blob);
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(url);
			resolve(img);
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(new Error("Không tải được ảnh QR"));
		};
		img.src = url;
	});
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
	return new Promise((resolve) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => resolve(img);
		img.onerror = () => resolve(null);
		img.src = src;
	});
}

function shade(hex: string, amt: number): string {
	let h = hex.replace("#", "").trim();
	if (h.length === 3)
		h = h
			.split("")
			.map((c) => c + c)
			.join("");
	const n = Number.parseInt(h, 16);
	const r = (n >> 16) & 255;
	const g = (n >> 8) & 255;
	const b = n & 255;
	const f = (v: number) =>
		Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
	return `rgb(${f(r)},${f(g)},${f(b)})`;
}

function roundRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number
): void {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}

function triggerCanvasDownload(canvas: HTMLCanvasElement, filename: string): void {
	canvas.toBlob((blob) => {
		if (!blob) return;
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(() => URL.revokeObjectURL(url), 1500);
	}, "image/png");
}

/** Dựng poster 1080×1440 trên canvas (nền brand, avatar, headline, QR, link). */
export async function downloadPosterPng(
	ctv: CtvProfile,
	brandHex: string,
	filename: string
): Promise<void> {
	const { default: QRCodeStyling } = await import("qr-code-styling");
	const W = 1080;
	const H = 1440;
	const canvas = document.createElement("canvas");
	canvas.width = W;
	canvas.height = H;
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	// nền gradient brand
	const g = ctx.createLinearGradient(0, 0, W * 0.4, H);
	g.addColorStop(0, brandHex);
	g.addColorStop(1, shade(brandHex, -0.42));
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, W, H);

	// lưới mờ phía trên
	ctx.strokeStyle = "rgba(255,255,255,0.07)";
	ctx.lineWidth = 2;
	for (let x = 0; x <= W; x += 64) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, 560);
		ctx.stroke();
	}
	for (let y = 0; y <= 560; y += 64) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(W, y);
		ctx.stroke();
	}

	const [logo, avatar, qrBlob] = await Promise.all([
		loadImage("/viec-logo.png"),
		loadImage(ctv.avatar),
		new QRCodeStyling({
			width: 380,
			height: 380,
			data: ctv.fullLink,
			type: "canvas",
			margin: 0,
			...QR_STYLE,
		}).getRawData("png"),
	]);

	// logo viec (đảo sang trắng)
	if (logo) {
		const lw = 150;
		const lh = lw * (logo.height / logo.width);
		const off = document.createElement("canvas");
		off.width = logo.width;
		off.height = logo.height;
		const octx = off.getContext("2d");
		if (octx) {
			octx.drawImage(logo, 0, 0);
			octx.globalCompositeOperation = "source-in";
			octx.fillStyle = "#fff";
			octx.fillRect(0, 0, logo.width, logo.height);
			ctx.drawImage(off, (W - lw) / 2, 78, lw, lh);
		}
	}

	// avatar tròn
	const acx = W / 2;
	const acy = 250;
	const ar = 70;
	if (avatar) {
		ctx.save();
		ctx.beginPath();
		ctx.arc(acx, acy, ar, 0, Math.PI * 2);
		ctx.closePath();
		ctx.clip();
		const s = Math.min(avatar.width, avatar.height);
		ctx.drawImage(
			avatar,
			(avatar.width - s) / 2,
			(avatar.height - s) / 2,
			s,
			s,
			acx - ar,
			acy - ar,
			ar * 2,
			ar * 2
		);
		ctx.restore();
	}
	ctx.lineWidth = 6;
	ctx.strokeStyle = "rgba(255,255,255,0.4)";
	ctx.beginPath();
	ctx.arc(acx, acy, ar, 0, Math.PI * 2);
	ctx.stroke();

	// tên + vai trò
	ctx.textAlign = "center";
	ctx.fillStyle = "#fff";
	ctx.font = "700 40px Inter, sans-serif";
	ctx.fillText(ctv.name, W / 2, acy + ar + 56);
	ctx.font = "500 25px Inter, sans-serif";
	ctx.fillStyle = "rgba(255,255,255,0.82)";
	ctx.fillText(`CTV viec.co · ${ctv.joinedYears} năm kinh nghiệm`, W / 2, acy + ar + 96);

	// headline
	ctx.font = "700 52px Inter, sans-serif";
	ctx.fillStyle = "#fff";
	ctx.fillText("Tìm việc gần nhà,", W / 2, 540);
	ctx.fillStyle = "#FFE08A";
	ctx.fillText("đăng ký chỉ 2 phút", W / 2, 600);
	ctx.font = "400 27px Inter, sans-serif";
	ctx.fillStyle = "rgba(255,255,255,0.88)";
	ctx.fillText("Quét mã QR hoặc bấm vào link để đăng ký.", W / 2, 656);

	// thẻ QR trắng
	const qrCard = 470;
	const qcx = (W - qrCard) / 2;
	const qcy = 712;
	ctx.save();
	ctx.shadowColor = "rgba(0,0,0,0.28)";
	ctx.shadowBlur = 50;
	ctx.shadowOffsetY = 20;
	ctx.fillStyle = "#fff";
	roundRect(ctx, qcx, qcy, qrCard, qrCard, 34);
	ctx.fill();
	ctx.restore();
	if (qrBlob instanceof Blob) {
		const qrImg = await blobToImage(qrBlob);
		ctx.drawImage(qrImg, qcx + 45, qcy + 45, qrCard - 90, qrCard - 90);
	}

	// link
	ctx.font = "600 34px 'JetBrains Mono', ui-monospace, monospace";
	ctx.fillStyle = "#fff";
	ctx.fillText(ctv.link, W / 2, qcy + qrCard + 78);

	// dải đáy
	ctx.font = "600 25px Inter, sans-serif";
	ctx.fillStyle = "rgba(255,255,255,0.85)";
	ctx.fillText("✓  Miễn phí 100% với người lao động", W / 2, H - 70);

	triggerCanvasDownload(canvas, filename);
}
