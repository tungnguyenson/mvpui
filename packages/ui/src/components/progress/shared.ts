export interface ProgressBarProps {
  value: number;
  min?: number;
  max?: number;
  className?: string;
  progressClassName?: string;
  valueFormatter?: (value: number, percentage: number) => string | number;
}

export interface ProgressBarWithLabelProps extends ProgressBarProps {
  labelPosition?: "right" | "bottom" | "top-floating" | "bottom-floating";
}

export interface ProgressCircleProps {
  value: number;
  min?: number;
  max?: number;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  label?: string;
  valueFormatter?: (value: number, percentage: number) => string | number;
}

export const CIRCLE_SIZE = {
  xxs: { strokeWidth: 6,  radius: 29,  valueClass: "text-sm font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary" },
  xs:  { strokeWidth: 16, radius: 72,  valueClass: "text-2xl font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary" },
  sm:  { strokeWidth: 20, radius: 90,  valueClass: "text-3xl font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary" },
  md:  { strokeWidth: 24, radius: 108, valueClass: "text-4xl font-semibold text-fg",   labelClass: "text-sm font-medium text-fg-tertiary" },
  lg:  { strokeWidth: 28, radius: 126, valueClass: "text-5xl font-semibold text-fg",   labelClass: "text-sm font-medium text-fg-tertiary" },
} as const;

export const HALF_SIZE = {
  xxs: { strokeWidth: 6,  radius: 29,  valueClass: "text-sm font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary", bottomClass: "absolute bottom-0.5 text-center" },
  xs:  { strokeWidth: 16, radius: 72,  valueClass: "text-2xl font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary", bottomClass: "absolute bottom-0.5 text-center" },
  sm:  { strokeWidth: 20, radius: 90,  valueClass: "text-3xl font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary", bottomClass: "absolute bottom-2 text-center"   },
  md:  { strokeWidth: 24, radius: 108, valueClass: "text-4xl font-semibold text-fg",   labelClass: "text-sm font-medium text-fg-tertiary", bottomClass: "absolute bottom-1 text-center"   },
  lg:  { strokeWidth: 28, radius: 126, valueClass: "text-5xl font-semibold text-fg",   labelClass: "text-sm font-medium text-fg-tertiary", bottomClass: "absolute bottom-0 text-center"   },
} as const;
