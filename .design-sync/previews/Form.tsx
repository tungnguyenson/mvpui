import { Form, Label, Input, HintText, Button, Checkbox } from "@mvp-ui/ui";

export const SignIn = () => (
  <Form style={{ width: 320, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Label htmlFor="form-email" isRequired>Email</Label>
      <Input id="form-email" type="email" placeholder="you@example.com" />
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Label htmlFor="form-password" isRequired>Password</Label>
      <Input id="form-password" type="password" defaultValue="hunter2" />
    </div>
    <Checkbox label="Remember me" size="sm" />
    <Button type="submit" color="primary" style={{ width: "100%" }}>Sign in</Button>
  </Form>
);

export const WithErrors = () => (
  <Form style={{ width: 320, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Label htmlFor="form-username" isRequired isInvalid>Username</Label>
      <Input id="form-username" isInvalid defaultValue="ab" />
      <HintText isInvalid>At least 3 characters required.</HintText>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Label htmlFor="form-email2" isRequired isInvalid>Email</Label>
      <Input id="form-email2" isInvalid defaultValue="not-an-email" />
      <HintText isInvalid>Enter a valid email address.</HintText>
    </div>
    <Button type="submit" color="primary" style={{ width: "100%" }}>Create account</Button>
  </Form>
);
