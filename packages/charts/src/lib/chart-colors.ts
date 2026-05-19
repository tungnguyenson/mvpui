/**
 * Default chart color palette using design token CSS variables.
 * Each color maps to a brand scale step for multi-series differentiation.
 */
export const CHART_COLORS = [
	"var(--color-brand-600)",
	"var(--color-brand-400)",
	"var(--color-brand-700)",
	"var(--color-brand-300)",
	"var(--color-brand-800)",
	"var(--color-brand-200)",
] as const;

export type ChartColorsArray = typeof CHART_COLORS;

/**
 * Selects evenly spaced items from an array.
 * Used to render a fixed number of axis tick labels.
 */
export function selectEvenlySpacedItems<T>(arr: readonly T[], count: number): T[] {
	if (!arr.length) return [];
	if (arr.length === 1) return Array.from({ length: count }, () => arr[0] as T);
	const result: T[] = [];
	for (let i = 0; i < count; i++) {
		const idx = Math.round((i * (arr.length - 1)) / (count - 1));
		result.push(arr[Math.max(0, Math.min(idx, arr.length - 1))] as T);
	}
	return result;
}
