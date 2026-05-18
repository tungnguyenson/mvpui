"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Button,
	Checkbox,
	HintText,
	HookForm,
	FormField,
	Input,
	Label,
} from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  BasicHookFormDemo                                                          */
/* -------------------------------------------------------------------------- */

interface LoginFields {
	email: string;
	password: string;
	rememberMe: boolean;
}

export function BasicHookFormDemo() {
	const [submitted, setSubmitted] = useState<LoginFields | null>(null);
	const form = useForm<LoginFields>({
		defaultValues: { email: "", password: "", rememberMe: false },
	});

	const {
		formState: { errors },
	} = form;

	return (
		<div className="w-full max-w-sm mx-auto">
			<HookForm
				form={form}
				onSubmit={form.handleSubmit((data) => setSubmitted(data))}
				className="flex flex-col gap-4"
			>
				<FormField name="email" control={form.control}>
					{({ field }) => (
						<div className="flex flex-col gap-1.5">
							<Label htmlFor="email-input" isRequired>
								Email
							</Label>
							<Input
								id="email-input"
								type="email"
								placeholder="you@example.com"
								{...field}
							/>
							{errors.email && (
								<HintText isInvalid>{errors.email.message}</HintText>
							)}
						</div>
					)}
				</FormField>

				<FormField name="password" control={form.control}>
					{({ field }) => (
						<div className="flex flex-col gap-1.5">
							<Label htmlFor="pw-input" isRequired>
								Password
							</Label>
							<Input
								id="pw-input"
								type="password"
								placeholder="••••••••"
								{...field}
							/>
							{errors.password && (
								<HintText isInvalid>{errors.password.message}</HintText>
							)}
						</div>
					)}
				</FormField>

				<FormField name="rememberMe" control={form.control}>
					{({ field: { value, onChange, ...rest } }) => (
						<Checkbox
							isSelected={value}
							onChange={onChange}
							{...rest}
						>
							Remember me
						</Checkbox>
					)}
				</FormField>

				<Button type="submit" color="primary" className="w-full">
					Sign in
				</Button>
			</HookForm>

			{submitted && (
				<pre className="mt-4 rounded-lg bg-bg-secondary p-4 text-xs text-fg-secondary overflow-auto">
					{JSON.stringify(submitted, null, 2)}
				</pre>
			)}
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  ValidationDemo                                                             */
/* -------------------------------------------------------------------------- */

interface SignupFields {
	username: string;
	email: string;
}

export function ValidationDemo() {
	const form = useForm<SignupFields>({
		defaultValues: { username: "", email: "" },
		mode: "onBlur",
	});

	const {
		formState: { errors },
		handleSubmit,
	} = form;

	return (
		<div className="w-full max-w-sm mx-auto">
			<HookForm
				form={form}
				onSubmit={handleSubmit(() => {})}
				className="flex flex-col gap-4"
			>
				<FormField
					name="username"
					control={form.control}
					rules={{
						required: "Username is required",
						minLength: { value: 3, message: "At least 3 characters" },
					}}
				>
					{({ field }) => (
						<div className="flex flex-col gap-1.5">
							<Label htmlFor="username-input" isRequired isInvalid={!!errors.username}>
								Username
							</Label>
							<Input
								id="username-input"
								placeholder="your_handle"
								isInvalid={!!errors.username}
								{...field}
							/>
							{errors.username ? (
								<HintText isInvalid>{errors.username.message}</HintText>
							) : (
								<HintText>3 characters minimum.</HintText>
							)}
						</div>
					)}
				</FormField>

				<FormField
					name="email"
					control={form.control}
					rules={{
						required: "Email is required",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Enter a valid email address",
						},
					}}
				>
					{({ field }) => (
						<div className="flex flex-col gap-1.5">
							<Label htmlFor="signup-email" isRequired isInvalid={!!errors.email}>
								Email
							</Label>
							<Input
								id="signup-email"
								type="email"
								placeholder="you@example.com"
								isInvalid={!!errors.email}
								{...field}
							/>
							{errors.email && (
								<HintText isInvalid>{errors.email.message}</HintText>
							)}
						</div>
					)}
				</FormField>

				<Button type="submit" color="primary" className="w-full">
					Create account
				</Button>
			</HookForm>
		</div>
	);
}
