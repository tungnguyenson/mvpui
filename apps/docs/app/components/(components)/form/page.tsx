/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { ComponentDocLayout, type DocExample } from "../../../_components/docs/ComponentDocLayout";
import { BasicHookFormDemo, ValidationDemo } from "./FormExamples";

const SECTIONS: DocExample[] = [
	{
		id: "basic",
		title: "Basic form",
		description:
			"Wrap react-hook-form's `useForm` with `HookForm`, then register fields using `FormField`. The render-prop child receives the full `useController` return so you can wire any input.",
		preview: <BasicHookFormDemo />,
		code: `const form = useForm<LoginFields>({ defaultValues: { email: "", password: "" } });

<HookForm form={form} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
  <FormField name="email" control={form.control}>
    {({ field }) => (
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email-input" isRequired>Email</Label>
        <Input id="email-input" type="email" placeholder="you@example.com" {...field} />
        {errors.email && <HintText isInvalid>{errors.email.message}</HintText>}
      </div>
    )}
  </FormField>

  <Button type="submit">Sign in</Button>
</HookForm>`,
	},
	{
		id: "validation",
		title: "Validation",
		description:
			"Pass `rules` to `FormField` for built-in react-hook-form validation. Error messages surface via `HintText isInvalid`.",
		preview: <ValidationDemo />,
		code: `<FormField
  name="username"
  control={form.control}
  rules={{
    required: "Username is required",
    minLength: { value: 3, message: "At least 3 characters" },
  }}
>
  {({ field }) => (
    <div className="flex flex-col gap-1.5">
      <Label isRequired isInvalid={!!errors.username}>Username</Label>
      <Input isInvalid={!!errors.username} {...field} />
      {errors.username
        ? <HintText isInvalid>{errors.username.message}</HintText>
        : <HintText>3 characters minimum.</HintText>}
    </div>
  )}
</FormField>`,
	},
];

export default function FormPage() {
	return (
		<ComponentDocLayout
			name="Form"
			tagline="React Aria Form + react-hook-form integration. HookForm wraps FormProvider; FormField registers fields and exposes controller state via render prop."
			install={{
				usage: `import { Form, HookForm, FormField, useFormFieldContext } from "@mvp-ui/ui";`,
			}}
			sections={SECTIONS}
			tokenReference={[
				{ label: "No tokens — Form is structural only", value: "—" },
			]}
		/>
	);
}
