"use client";

import { type ReactNode, useState } from "react";
import { BadgeCheck, Camera, CreditCard, IdCard, Sparkles, UserRound } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  AvatarProfilePhoto,
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  MultiSelect,
  Select,
  SelectItem,
  TextArea,
} from "@mvp-ui/ui";
import {
  BANK_OPTIONS,
  CURRENT_WORKER,
  PROVINCE_OPTIONS,
  SKILL_OPTIONS,
  type VerificationState,
  skillLabelToId,
} from "../../data/worker";

const VERIFICATION_META: Record<
  VerificationState,
  { color: "success" | "warning" | "error"; label: string }
> = {
  verified: { color: "success", label: "Đã xác thực" },
  pending: { color: "warning", label: "Chờ bổ sung" },
  missing: { color: "error", label: "Chưa xác thực" },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

interface FormSectionProps {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
}

function FormSection({ icon, title, description, children }: FormSectionProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col gap-5 p-5">
        <div className="flex items-start gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-bg-secondary text-fg-brand">
            {icon}
          </span>
          <div>
            <h2 className="text-sm font-semibold text-fg">{title}</h2>
            {description && (
              <p className="mt-0.5 text-xs text-fg-tertiary">{description}</p>
            )}
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

export function ProfileForm() {
  const worker = CURRENT_WORKER;

  const [name, setName] = useState(worker.name);
  const [phone, setPhone] = useState(worker.phone);
  const [email, setEmail] = useState(worker.email);
  const [city, setCity] = useState(() => {
    return PROVINCE_OPTIONS.find((p) => p.label === worker.city)?.id ?? "hcm";
  });
  const [district, setDistrict] = useState(worker.district);
  const [bio, setBio] = useState(worker.bio);
  const [skills, setSkills] = useState<Set<string>>(
    () => new Set(worker.skills.map(skillLabelToId)),
  );
  const [bankCode, setBankCode] = useState(worker.bank.bankCode);
  const [accountNumber, setAccountNumber] = useState(worker.bank.accountNumber);
  const [accountHolder, setAccountHolder] = useState(worker.bank.accountHolder);
  const [nationalId, setNationalId] = useState(worker.nationalId);
  const [taxId, setTaxId] = useState(worker.taxId);

  const [saved, setSaved] = useState(false);
  const verification = VERIFICATION_META[worker.verification];

  const handleSave = () => {
    // Demo only — a real build would POST to the worker profile endpoint.
    setSaved(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-5 px-4 py-5 pb-8 lg:mx-auto lg:max-w-4xl lg:px-8 lg:py-8">
      {saved && (
        <Alert variant="success">
          <AlertTitle>Đã lưu hồ sơ</AlertTitle>
          <AlertDescription>
            Thông tin cá nhân của bạn đã được cập nhật.
          </AlertDescription>
        </Alert>
      )}

      {/* Avatar */}
      <Card className="shadow-sm">
        <CardContent className="flex flex-col items-center gap-3 p-5">
          <AvatarProfilePhoto
            size="lg"
            state="verified"
            src={worker.avatar}
            alt={name}
            initials={getInitials(name)}
          />
          <div className="text-center">
            <p className="text-base font-semibold text-fg">{name || "—"}</p>
            <p className="text-sm text-fg-tertiary">Mã CTV · {worker.id}</p>
          </div>
          <Button color="tertiary" size="sm" iconLeading={<Camera className="size-4" />}>
            Đổi ảnh đại diện
          </Button>
        </CardContent>
      </Card>

      {/* Detail sections — two columns on desktop */}
      <div className="contents lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
      {/* Basic info */}
      <FormSection
        icon={<UserRound className="size-4" />}
        title="Thông tin cơ bản"
        description="Hiển thị với khách hàng khi bạn nhận ca."
      >
        <Input
          label="Họ và tên"
          isRequired
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Số điện thoại"
          type="tel"
          isRequired
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-fg-secondary">Tỉnh / Thành phố</span>
          <Select
            aria-label="Tỉnh / Thành phố"
            placeholder="Chọn tỉnh/thành"
            items={PROVINCE_OPTIONS}
            selectedKey={city}
            onSelectionChange={(key) => setCity(String(key))}
          >
            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
          </Select>
        </div>
        <Input
          label="Quận / Huyện"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
        <TextArea
          label="Giới thiệu bản thân"
          rows={4}
          value={bio}
          onChange={(value) => setBio(value)}
        />
      </FormSection>

      {/* Skills */}
      <FormSection
        icon={<Sparkles className="size-4" />}
        title="Kỹ năng"
        description="Chọn các nhóm công việc bạn nhận."
      >
        <MultiSelect
          aria-label="Kỹ năng"
          items={SKILL_OPTIONS}
          selectedKeys={skills}
          onSelectionChange={(keys) => {
            if (keys === "all") {
              setSkills(new Set(SKILL_OPTIONS.map((s) => s.id)));
            } else {
              setSkills(new Set(Array.from(keys, String)));
            }
          }}
          placeholder="Chọn kỹ năng"
          showSearch={false}
        >
          {(item) => (
            <SelectItem id={item.id} label={item.label}>
              {item.label}
            </SelectItem>
          )}
        </MultiSelect>
      </FormSection>

      {/* Bank */}
      <FormSection
        icon={<CreditCard className="size-4" />}
        title="Tài khoản nhận lương"
        description="Tiền công mỗi ca sẽ chuyển vào tài khoản này."
      >
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-fg-secondary">Ngân hàng</span>
          <Select
            aria-label="Ngân hàng"
            placeholder="Chọn ngân hàng"
            items={BANK_OPTIONS}
            selectedKey={bankCode}
            onSelectionChange={(key) => setBankCode(String(key))}
          >
            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
          </Select>
        </div>
        <Input
          label="Số tài khoản"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <Input
          label="Chủ tài khoản"
          hint="Viết IN HOA, không dấu — đúng như trên thẻ ngân hàng."
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value.toUpperCase())}
        />
      </FormSection>

      {/* Identity */}
      <FormSection
        icon={<IdCard className="size-4" />}
        title="Định danh"
        description="Dùng để xác thực và ký hợp đồng điện tử."
      >
        <div className="flex items-center gap-2 rounded-lg border border-border-secondary bg-bg-secondary px-3 py-2.5">
          <BadgeCheck className="size-4 text-fg-success" />
          <span className="flex-1 text-sm text-fg-secondary">Trạng thái xác thực</span>
          <Badge color={verification.color} type="pill-color" size="sm">
            {verification.label}
          </Badge>
        </div>
        <Input
          label="Số CCCD"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
        <Input
          label="Mã số thuế"
          value={taxId}
          onChange={(e) => setTaxId(e.target.value)}
        />
      </FormSection>
      </div>

      <Button
        color="primary"
        size="lg"
        className="w-full justify-center lg:w-auto lg:self-end lg:px-8"
        onClick={handleSave}
      >
        Lưu thay đổi
      </Button>
    </div>
  );
}
