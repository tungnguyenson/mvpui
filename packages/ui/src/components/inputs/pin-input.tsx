/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/pin-input.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Compound API (PinInput.Slot/.Group/.Label/.Separator/.Description) is a
 * documented exception to plan A8 (flat exports): OTP is inherently
 * compositional and this is the shadcn / `input-otp` idiom. Tokens mapped to
 * dark-safe aliases. `text-display-*` → `text-4xl/5xl`; the source's
 * `animate-caret-blink` is approximated with `animate-pulse`.
 */

"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { type ComponentPropsWithRef, createContext, useContext, useId } from "react";
import { cn } from "../../lib/cn.js";
import { HintText } from "./hint-text.js";
import { Label as LabelBase } from "./label.js";

type PinInputSize = "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg";

type PinInputContextType = {
	size: PinInputSize;
	disabled: boolean;
	id: string;
	invalid: boolean;
};

const PinInputContext = createContext<PinInputContextType>({
	size: "sm",
	id: "",
	disabled: false,
	invalid: false,
});

export const usePinInputContext = () => useContext(PinInputContext);

interface RootProps extends ComponentPropsWithRef<"div"> {
	size?: PinInputSize;
	disabled?: boolean;
	invalid?: boolean;
}

const Root = ({
	className,
	size = "md",
	disabled = false,
	invalid = false,
	...props
}: RootProps) => {
	const id = useId();
	return (
		<PinInputContext.Provider value={{ size, disabled, id, invalid }}>
			{/* The labelled control is the hidden OTP <input> inside Group;
			    this wrapper is purely layout. */}
			<div className={cn("flex h-max flex-col gap-1.5", className)} {...props} />
		</PinInputContext.Provider>
	);
};
Root.displayName = "PinInput";

const styles = {
	xxxs: { group: "gap-1.5", slot: "size-9 text-sm rounded-lg font-medium", caret: "text-sm" },
	xxs: { group: "gap-2", slot: "size-10 text-md rounded-lg font-medium", caret: "text-md" },
	xs: { group: "gap-2", slot: "size-11 text-md rounded-lg font-medium", caret: "text-md" },
	sm: { group: "gap-2", slot: "size-16 text-4xl rounded-xl font-medium", caret: "text-4xl" },
	md: { group: "gap-3", slot: "size-20 text-5xl rounded-xl font-medium", caret: "text-5xl" },
	lg: { group: "gap-3", slot: "size-24 text-5xl rounded-xl font-medium", caret: "text-5xl" },
};

type GroupProps = ComponentPropsWithRef<typeof OTPInput> & {
	inputClassName?: string;
};

const Group = ({ inputClassName, containerClassName, maxLength = 4, ...props }: GroupProps) => {
	const { id, size, disabled } = usePinInputContext();
	return (
		<OTPInput
			{...props}
			maxLength={maxLength}
			disabled={disabled}
			id={`pin-input-${id}`}
			aria-label="Enter your pin"
			aria-labelledby={`pin-input-label-${id}`}
			aria-describedby={`pin-input-description-${id}`}
			containerClassName={cn("flex flex-row", styles[size].group, containerClassName)}
			className={cn("disabled:cursor-not-allowed", inputClassName)}
		/>
	);
};
Group.displayName = "PinInput.Group";

const Slot = ({ index, className, ...props }: ComponentPropsWithRef<"div"> & { index: number }) => {
	const { size, disabled, invalid } = usePinInputContext();
	const { slots, isFocused } = useContext(OTPInputContext);
	const slot = slots[index];

	return (
		<div
			{...props}
			aria-hidden="true"
			data-invalid={invalid || undefined}
			className={cn(
				"relative flex items-center justify-center bg-bg text-center text-fg-tertiary shadow-xs ring-1 ring-border transition-[box-shadow,background-color] duration-100 ease-linear ring-inset",
				styles[size].slot,
				isFocused &&
					slot?.isActive &&
					"ring-2 ring-border-brand outline-2 outline-offset-2 outline-border-brand",
				slot?.char && "text-fg-brand ring-2 ring-border-brand",
				disabled && "opacity-50",
				invalid && "text-fg-error ring-border-error",
				className
			)}
		>
			{slot?.char ? slot.char : slot?.hasFakeCaret ? <FakeCaret size={size} /> : 0}
		</div>
	);
};
Slot.displayName = "PinInput.Slot";

const FakeCaret = ({ size = "md" }: { size?: PinInputSize }) => (
	<div
		className={cn("pointer-events-none h-[1em] w-0.5 animate-pulse bg-primary", styles[size].caret)}
	/>
);

const Separator = (props: ComponentPropsWithRef<"div">) => (
	<div
		aria-hidden="true"
		{...props}
		className={cn(
			"flex items-center text-center text-5xl font-medium text-fg-tertiary",
			props.className
		)}
	>
		-
	</div>
);
Separator.displayName = "PinInput.Separator";

const Label = (props: ComponentPropsWithRef<typeof LabelBase>) => {
	const { id } = usePinInputContext();
	return <LabelBase {...props} htmlFor={`pin-input-${id}`} id={`pin-input-label-${id}`} />;
};
Label.displayName = "PinInput.Label";

const Description = (props: ComponentPropsWithRef<typeof HintText>) => {
	const { id, size } = usePinInputContext();
	return (
		<HintText {...props} id={`pin-input-description-${id}`} size={size === "xxxs" ? "sm" : "md"} />
	);
};
Description.displayName = "PinInput.Description";

export const PinInput = Root as typeof Root & {
	Slot: typeof Slot;
	Label: typeof Label;
	Group: typeof Group;
	Separator: typeof Separator;
	Description: typeof Description;
};
PinInput.Slot = Slot;
PinInput.Label = Label;
PinInput.Group = Group;
PinInput.Separator = Separator;
PinInput.Description = Description;
