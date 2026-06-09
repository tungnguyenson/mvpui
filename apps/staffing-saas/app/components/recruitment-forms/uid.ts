/** Id ngắn ổn định cho field/section/option. Client-side (builder là "use client"). */
export function uid(prefix = "f"): string {
	const rand =
		typeof crypto !== "undefined" && "randomUUID" in crypto
			? crypto.randomUUID().slice(0, 8)
			: Math.random().toString(36).slice(2, 10);
	return `${prefix}_${rand}`;
}
