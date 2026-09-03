import { Characters } from "../data/characters-v2";

/** Decoys preloaded per round (plus the 4 real option faces). */
export const DECOY_POOL_SIZE = 16;

/** Give up waiting for one card's real art and lock anyway. */
export const REAL_ART_CAP_MS = 1000;

/**
 * Warm the browser (HTTP disk) cache for a URL set.
 * Resolves only after EVERY url settles (load or error) — the round
 * does not start until then. Failures just mean that face may pop in
 * late; existing fallbacks cover it. Never rejects.
 */
export function preloadImages(
  urls: string[],
  onProgress?: (loaded: number, total: number) => void,
): Promise<void> {
  const unique = [...new Set(urls.filter(Boolean))];
  if (unique.length === 0) {
    onProgress?.(0, 0);
    return Promise.resolve();
  }

  let settled = 0;
  const tick = () => {
    settled += 1;
    onProgress?.(settled, unique.length);
  };

  // No timeout cap: the round waits for every image. Errors settle
  // immediately (offline/dead link resolves fast, never hangs) and the
  // browser itself eventually times out truly-stalled requests.
  return Promise.allSettled(
    unique.map(
      (src) =>
        new Promise<void>((res) => {
          const img = new Image();
          const settle = () => {
            tick();
            res();
          };
          img.onload = settle;
          img.onerror = settle;
          img.src = src;
        }),
    ),
  ).then(() => undefined);
}

/**
 * Pick N random decoy faces, excluding the round's real options
 * (decoys never wear another option's face mid-shuffle).
 */
export function pickDecoyPool(excludeIds: string[], size: number = DECOY_POOL_SIZE): string[] {
  const excluded = new Set(excludeIds);
  const pool = Characters.filter((c) => c.imageURL && !excluded.has(c.id)).map((c) => c.imageURL as string);

  // Fisher-Yates take without replacement.
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, size);
}
