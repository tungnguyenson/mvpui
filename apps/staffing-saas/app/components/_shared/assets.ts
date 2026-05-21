export type Gender = "male" | "female" | "unknown";

const FEMALE_MIDDLES = new Set([
  "thị",
  "thi",
  "thuỳ",
  "thùy",
  "thuy",
  "thu",
  "kim",
  "hương",
  "huong",
  "ngọc",
  "ngoc",
  "diệu",
  "dieu",
  "thanh",
  "mai",
]);

const MALE_MIDDLES = new Set([
  "văn",
  "van",
  "hữu",
  "huu",
  "công",
  "cong",
  "quang",
  "đức",
  "duc",
  "hoàng",
  "hoang",
  "minh",
  "quốc",
  "quoc",
]);

const FEMALE_FINALS = new Set([
  "bích",
  "bich",
  "mai",
  "hương",
  "huong",
  "lan",
  "linh",
  "nga",
  "hoa",
  "trang",
  "yến",
  "yen",
  "hồng",
  "hong",
  "nhung",
  "trinh",
  "vy",
  "phương",
  "phuong",
  "ngọc",
  "ngoc",
  "tuyết",
  "tuyet",
  "kim",
  "thư",
  "thu",
  "diệu",
  "dieu",
]);

const MALE_FINALS = new Set([
  "bình",
  "binh",
  "bảo",
  "bao",
  "cường",
  "cuong",
  "đạt",
  "dat",
  "đức",
  "duc",
  "hiếu",
  "hieu",
  "hùng",
  "hung",
  "khải",
  "khai",
  "khoa",
  "long",
  "lộc",
  "loc",
  "nam",
  "phong",
  "quân",
  "quan",
  "quốc",
  "quoc",
  "sơn",
  "son",
  "toàn",
  "toan",
  "tuấn",
  "tuan",
  "việt",
  "viet",
  "vinh",
  "trí",
  "tri",
  "trị",
  "an",
]);

function tokenize(name: string): string[] {
  return name.trim().toLowerCase().split(/\s+/);
}

export function inferGender(name: string): Gender {
  const tokens = tokenize(name);
  if (tokens.length === 0) return "unknown";

  // Middle name markers run first (more reliable than ambiguous finals)
  if (tokens.length >= 3) {
    for (let i = 1; i < tokens.length - 1; i++) {
      const m = tokens[i];
      if (!m) continue;
      if (FEMALE_MIDDLES.has(m)) return "female";
      if (MALE_MIDDLES.has(m)) return "male";
    }
  }

  const last = tokens[tokens.length - 1];
  if (!last) return "unknown";
  // diacritic-sensitive disambiguation
  if (last === "dũng") return "male";
  if (last === "dung") return "female";
  if (FEMALE_FINALS.has(last)) return "female";
  if (MALE_FINALS.has(last)) return "male";
  return "unknown";
}

const MALE_AVATARS = [
  "/avatars/avatar-002.jpg",
  "/avatars/avatar-007.jpg",
  "/avatars/avatar-008.jpg",
  "/avatars/avatar-011.jpg",
  "/avatars/avatar-014.jpg",
  "/avatars/avatar-015.jpg",
  "/avatars/avatar-019.jpg",
  "/avatars/avatar-022.jpg",
  "/avatars/avatar-023.jpg",
  "/avatars/avatar-026.jpg",
];

const FEMALE_AVATARS = [
  "/avatars/avatar-001.jpg",
  "/avatars/avatar-003.jpg",
  "/avatars/avatar-004.jpg",
  "/avatars/avatar-005.jpg",
  "/avatars/avatar-006.jpg",
  "/avatars/avatar-009.jpg",
  "/avatars/avatar-010.jpg",
  "/avatars/avatar-012.jpg",
  "/avatars/avatar-013.jpg",
  "/avatars/avatar-016.jpg",
  "/avatars/avatar-017.jpg",
  "/avatars/avatar-018.jpg",
  "/avatars/avatar-020.jpg",
  "/avatars/avatar-021.jpg",
  "/avatars/avatar-024.jpg",
  "/avatars/avatar-025.jpg",
  "/avatars/avatar-027.jpg",
  "/avatars/avatar-028.jpg",
  "/avatars/avatar-029.jpg",
  "/avatars/avatar-030.jpg",
];

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getAvatarFor(name?: string, id?: string): string | undefined {
  if (!name) return undefined;
  const seed = id ?? name;
  const gender = inferGender(name);
  const pool =
    gender === "male"
      ? MALE_AVATARS
      : gender === "female"
        ? FEMALE_AVATARS
        : [...MALE_AVATARS, ...FEMALE_AVATARS];
  if (pool.length === 0) return undefined;
  return pool[hashSeed(seed) % pool.length];
}

export interface CustomerBrand {
  full: string;
  mark: string;
}

const VIEC = (path: string) => `https://business.viec.co/storage/companies/${path}`;
const sameLogo = (path: string): CustomerBrand => ({ full: VIEC(path), mark: VIEC(path) });

export const CUSTOMER_LOGOS: Record<string, CustomerBrand> = {
  "highlands-commerce": sameLogo("1591/logo.png"),
  "gomart-distribution": sameLogo("42/logo.png"),
  "ghn-sorting": sameLogo("1591/logo.png"),
  "ninja-van": sameLogo("42/logo.png"),
  "medistar-clinic": sameLogo("2312/logo.png"),
  "nova-event-partners": sameLogo("July2021/logo83799.png"),
  "ghtk-logistics": sameLogo("1553/logo.jpg"),
  "viettel-post-hcm": sameLogo("December2022/unnamed.png"),
  "shopee-express": sameLogo("3078/logo.png"),
  "bach-hoa-xanh": sameLogo("1793/logo.png"),
  "tiki-now-smart-logistics": sameLogo("January2023/logo_(1).png"),
  "foodmap": sameLogo("1719/logo.png"),
  "boxme": sameLogo("October2022/Logo-Boxme-New.png"),
  "tiki-market": sameLogo("6/logo.png"),
  "seedcom-food": sameLogo("April2022/62069254_1170385843140023_3169201825928708096_n.png"),
  "skt-vina": sameLogo("1540/logo.png"),
  "tc-logistics": sameLogo("August2022/tcwt.jpeg"),
  "baspro": sameLogo("2680/logo.jpg"),
  "ship60": sameLogo("748/logo.png"),
  "viec-co": sameLogo("1/logo.png"),
  "tgdd": sameLogo("1757/logo.png"),
  "shopee-retail": sameLogo("3128/logo.jpg"),
};

export function getCustomerLogo(customerId?: string): CustomerBrand | undefined {
  if (!customerId) return undefined;
  return CUSTOMER_LOGOS[customerId];
}

const SAMPLE_LOGOMARKS = [
  "/logos/logomark/acme-corp.svg",
  "/logos/logomark/boltshift.svg",
  "/logos/logomark/catalog.svg",
  "/logos/logomark/biosynthesis.svg",
  "/logos/logomark/contrast-ai.svg",
  "/logos/logomark/quantum.svg",
  "/logos/logomark/lightspeed.svg",
  "/logos/logomark/warpspeed.svg",
  "/logos/logomark/luminary.svg",
  "/logos/logomark/prometheus.svg",
  "/logos/logomark/galileo.svg",
  "/logos/logomark/spherule.svg",
  "/logos/logomark/radius.svg",
  "/logos/logomark/voxel-labs.svg",
  "/logos/logomark/polymath.svg",
];

export function getSampleLogomark(seed: string): string {
  return SAMPLE_LOGOMARKS[hashSeed(seed) % SAMPLE_LOGOMARKS.length] ?? SAMPLE_LOGOMARKS[0]!;
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
