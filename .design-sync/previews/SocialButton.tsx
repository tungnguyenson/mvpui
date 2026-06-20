import { SocialButton } from "@mvp-ui/ui";

export const Brand = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <SocialButton social="google">Sign in with Google</SocialButton>
    <SocialButton social="facebook">Sign in with Facebook</SocialButton>
    <SocialButton social="apple">Sign in with Apple</SocialButton>
    <SocialButton social="twitter">Sign in with X</SocialButton>
    <SocialButton social="figma">Sign in with Figma</SocialButton>
    <SocialButton social="dribble">Sign in with Dribbble</SocialButton>
  </div>
);

export const Color = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <SocialButton social="google" theme="color">
      Sign in with Google
    </SocialButton>
    <SocialButton social="facebook" theme="color">
      Sign in with Facebook
    </SocialButton>
    <SocialButton social="apple" theme="color">
      Sign in with Apple
    </SocialButton>
  </div>
);

export const Gray = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <SocialButton social="google" theme="gray">
      Sign in with Google
    </SocialButton>
    <SocialButton social="figma" theme="gray">
      Sign in with Figma
    </SocialButton>
    <SocialButton social="dribble" theme="gray">
      Sign in with Dribbble
    </SocialButton>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <SocialButton social="google" size="md">
      Continue with Google
    </SocialButton>
    <SocialButton social="google" size="lg">
      Continue with Google
    </SocialButton>
  </div>
);

export const IconOnly = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <SocialButton social="google" />
    <SocialButton social="apple" />
    <SocialButton social="dribble" />
  </div>
);

export const Disabled = () => (
  <SocialButton social="google" disabled>
    Sign in with Google
  </SocialButton>
);
