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

// Gender-classified via montage QA of all 126 source photos (see
// reference-asian-avatar-source memory note). avatar-053/058/104 were dropped as
// gender-ambiguous; avatar-126 is the only .png.
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
  "/avatars/avatar-033.jpg",
  "/avatars/avatar-036.jpg",
  "/avatars/avatar-038.jpg",
  "/avatars/avatar-039.jpg",
  "/avatars/avatar-042.jpg",
  "/avatars/avatar-045.jpg",
  "/avatars/avatar-048.jpg",
  "/avatars/avatar-051.jpg",
  "/avatars/avatar-054.jpg",
  "/avatars/avatar-057.jpg",
  "/avatars/avatar-060.jpg",
  "/avatars/avatar-063.jpg",
  "/avatars/avatar-064.jpg",
  "/avatars/avatar-066.jpg",
  "/avatars/avatar-069.jpg",
  "/avatars/avatar-072.jpg",
  "/avatars/avatar-074.jpg",
  "/avatars/avatar-075.jpg",
  "/avatars/avatar-078.jpg",
  "/avatars/avatar-081.jpg",
  "/avatars/avatar-084.jpg",
  "/avatars/avatar-087.jpg",
  "/avatars/avatar-090.jpg",
  "/avatars/avatar-093.jpg",
  "/avatars/avatar-096.jpg",
  "/avatars/avatar-099.jpg",
  "/avatars/avatar-102.jpg",
  "/avatars/avatar-105.jpg",
  "/avatars/avatar-107.jpg",
  "/avatars/avatar-108.jpg",
  "/avatars/avatar-111.jpg",
  "/avatars/avatar-112.jpg",
  "/avatars/avatar-114.jpg",
  "/avatars/avatar-117.jpg",
  "/avatars/avatar-120.jpg",
  "/avatars/avatar-123.jpg",
  "/avatars/avatar-126.png",
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
  "/avatars/avatar-031.jpg",
  "/avatars/avatar-032.jpg",
  "/avatars/avatar-034.jpg",
  "/avatars/avatar-035.jpg",
  "/avatars/avatar-037.jpg",
  "/avatars/avatar-040.jpg",
  "/avatars/avatar-041.jpg",
  "/avatars/avatar-043.jpg",
  "/avatars/avatar-044.jpg",
  "/avatars/avatar-046.jpg",
  "/avatars/avatar-047.jpg",
  "/avatars/avatar-049.jpg",
  "/avatars/avatar-050.jpg",
  "/avatars/avatar-052.jpg",
  "/avatars/avatar-055.jpg",
  "/avatars/avatar-056.jpg",
  "/avatars/avatar-059.jpg",
  "/avatars/avatar-061.jpg",
  "/avatars/avatar-062.jpg",
  "/avatars/avatar-065.jpg",
  "/avatars/avatar-067.jpg",
  "/avatars/avatar-068.jpg",
  "/avatars/avatar-070.jpg",
  "/avatars/avatar-071.jpg",
  "/avatars/avatar-073.jpg",
  "/avatars/avatar-076.jpg",
  "/avatars/avatar-077.jpg",
  "/avatars/avatar-079.jpg",
  "/avatars/avatar-080.jpg",
  "/avatars/avatar-082.jpg",
  "/avatars/avatar-083.jpg",
  "/avatars/avatar-085.jpg",
  "/avatars/avatar-086.jpg",
  "/avatars/avatar-088.jpg",
  "/avatars/avatar-089.jpg",
  "/avatars/avatar-091.jpg",
  "/avatars/avatar-092.jpg",
  "/avatars/avatar-094.jpg",
  "/avatars/avatar-095.jpg",
  "/avatars/avatar-097.jpg",
  "/avatars/avatar-098.jpg",
  "/avatars/avatar-100.jpg",
  "/avatars/avatar-101.jpg",
  "/avatars/avatar-103.jpg",
  "/avatars/avatar-106.jpg",
  "/avatars/avatar-109.jpg",
  "/avatars/avatar-110.jpg",
  "/avatars/avatar-113.jpg",
  "/avatars/avatar-115.jpg",
  "/avatars/avatar-116.jpg",
  "/avatars/avatar-118.jpg",
  "/avatars/avatar-119.jpg",
  "/avatars/avatar-121.jpg",
  "/avatars/avatar-122.jpg",
  "/avatars/avatar-124.jpg",
  "/avatars/avatar-125.jpg",
];

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function poolFor(gender: Gender): readonly string[] {
  if (gender === "male") return MALE_AVATARS;
  if (gender === "female") return FEMALE_AVATARS;
  return [...MALE_AVATARS, ...FEMALE_AVATARS];
}

/**
 * Stateless, hash-based avatar pick. Stable per seed and hydration-safe, but two
 * distinct seeds can collide on the same image (modulo of independent hashes).
 * For list views where repeats are noticeable, prefer {@link assignAvatars}.
 * Pass an explicit `gender` when the record carries one — more reliable than the
 * name-based {@link inferGender} guess.
 */
export function getAvatarFor(
  name?: string,
  id?: string,
  gender?: Gender,
): string | undefined {
  if (!name) return undefined;
  const seed = id ?? name;
  const pool = poolFor(gender ?? inferGender(name));
  if (pool.length === 0) return undefined;
  return pool[hashSeed(seed) % pool.length];
}

export interface AvatarSeed {
  id?: string;
  name?: string;
  gender?: Gender;
}

/**
 * Assign a UNIQUE avatar to every item in an ordered list, walking each gender
 * pool in order and only cycling once it is exhausted. Guarantees no repeats
 * until a pool runs out (47 male / 76 female slots).
 *
 * Pass the FULL, unfiltered dataset so each id keeps its avatar across filtered
 * or sorted views. Assignment is deterministic by list order, so it is
 * hydration-safe when computed at module scope from a static array.
 */
export function assignAvatars<T>(
  items: readonly T[],
  select: (item: T) => AvatarSeed,
): Map<string, string> {
  const combined = [...MALE_AVATARS, ...FEMALE_AVATARS];
  const map = new Map<string, string>();
  let mi = 0;
  let fi = 0;
  let ui = 0;
  for (const item of items) {
    const { id, name, gender } = select(item);
    const key = id ?? name;
    if (!key || map.has(key)) continue;
    const g = gender ?? inferGender(name ?? "");
    if (g === "male") {
      map.set(key, MALE_AVATARS[mi % MALE_AVATARS.length]!);
      mi += 1;
    } else if (g === "female") {
      map.set(key, FEMALE_AVATARS[fi % FEMALE_AVATARS.length]!);
      fi += 1;
    } else if (combined.length > 0) {
      map.set(key, combined[ui % combined.length]!);
      ui += 1;
    }
  }
  return map;
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
