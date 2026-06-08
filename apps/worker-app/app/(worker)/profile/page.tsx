import { ProfileForm } from "./ProfileForm";

export default function ProfilePage() {
  return (
    <>
      <div className="border-b border-border-secondary px-4 py-4 lg:mx-auto lg:max-w-4xl lg:border-b-0 lg:px-8 lg:pt-8 lg:pb-0">
        <h1 className="text-lg font-semibold tracking-tight text-fg">Hồ sơ của tôi</h1>
        <p className="mt-0.5 text-sm text-fg-tertiary">
          Cập nhật thông tin cá nhân và tài khoản nhận lương.
        </p>
      </div>
      <ProfileForm />
    </>
  );
}
