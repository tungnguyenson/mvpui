"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/form/form.tsx + components/base/form/hook-form.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ReactNode } from "react";
import { createContext, useContext, useId } from "react";
import { Form as AriaForm } from "react-aria-components";
import type {
	FieldPath,
	FieldValues,
	UseControllerProps,
	UseControllerReturn,
	UseFormReturn,
} from "react-hook-form";
import { FormProvider, useController, useFormContext } from "react-hook-form";

/* -------------------------------------------------------------------------- */
/*  Form — thin React Aria Form wrapper (no RHF)                              */
/* -------------------------------------------------------------------------- */

export const Form = (props: ComponentPropsWithRef<typeof AriaForm>) => (
	<AriaForm {...props} />
);
Form.displayName = "Form";

/* -------------------------------------------------------------------------- */
/*  HookForm — RHF FormProvider + React Aria Form                             */
/* -------------------------------------------------------------------------- */

interface HookFormProps<TFieldValues extends FieldValues = FieldValues>
	extends ComponentPropsWithoutRef<typeof AriaForm> {
	form: UseFormReturn<TFieldValues>;
	children: ReactNode;
}

export const HookForm = <TFieldValues extends FieldValues = FieldValues>({
	form,
	...props
}: HookFormProps<TFieldValues>) => (
	<FormProvider {...form}>
		<AriaForm {...props} />
	</FormProvider>
);
HookForm.displayName = "HookForm";

/* -------------------------------------------------------------------------- */
/*  FormField + useFormFieldContext — field registration + error access       */
/* -------------------------------------------------------------------------- */

interface FormFieldContextValues<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
	id: string;
	name: TName;
	control?: UseControllerReturn<TFieldValues, TName>;
}

interface FormFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
	children:
		| ReactNode
		| ((control: UseControllerReturn<TFieldValues, TName>) => ReactNode);
}

const FormFieldContext = createContext<FormFieldContextValues>(
	{} as FormFieldContextValues,
);

export const useFormFieldContext = () => {
	const context = useContext(FormFieldContext);

	if (!context.name) {
		throw new Error("useFormFieldContext must be used within a <FormField />");
	}

	const { getFieldState, formState } = useFormContext();
	const fieldState = getFieldState(context.name, formState);

	return { ...context, ...fieldState };
};

export const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	children,
	...props
}: FormFieldProps<TFieldValues, TName>) => {
	const id = `form-item-${useId()}`;
	const control = useController(props);

	const withValidationBehavior: UseControllerReturn<TFieldValues, TName> = {
		...control,
		field: {
			...control.field,
			// @ts-expect-error -- validationBehavior is a React Aria concept on field props
			validationBehavior: "aria",
		},
	};

	return (
		<FormFieldContext.Provider
			value={{
				id,
				name: props.name,
				control: control as UseControllerReturn<FieldValues, TName>,
			}}
		>
			{children &&
				(typeof children === "function"
					? children(withValidationBehavior)
					: children)}
		</FormFieldContext.Provider>
	);
};
FormField.displayName = "FormField";
