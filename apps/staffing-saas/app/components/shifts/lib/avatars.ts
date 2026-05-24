const PRAVATAR_MAX = 70;

export function workerAvatarUrl(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const img = (Math.abs(hash) % PRAVATAR_MAX) + 1;
  return `https://i.pravatar.cc/80?img=${img}`;
}
