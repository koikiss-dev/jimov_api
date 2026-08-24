import axios from "axios";
import { SITE_URL } from "./site";

/**
 * Maximum time in milliseconds for every request to the site.
 */
export const REQUEST_TIMEOUT = 15000;

/**
 * Time in milliseconds that the html of a gallery stays cached.
 * Clients commonly request the info and then the chapters of the same
 * gallery; both come from the same page.
 */
const GALLERY_CACHE_TTL = 60000;

/** Maximum number of galleries kept in the cache. */
const GALLERY_CACHE_MAX = 100;

interface GalleryCacheEntry {
  html: string;
  expiresAt: number;
}

const galleryCache = new Map<string, GalleryCacheEntry>();

/**
 * Download the html of a gallery reusing a recent download of the same
 * gallery (see GALLERY_CACHE_TTL).
 */
export async function fetchGalleryPage(mangaId: string): Promise<string> {
  const cached = galleryCache.get(mangaId);
  const now = Date.now();

  if (cached && cached.expiresAt > now) {
    return cached.html;
  }

  const { data } = await axios.get(`${SITE_URL}/g/${mangaId}`, {
    timeout: REQUEST_TIMEOUT,
  });

  if (galleryCache.size >= GALLERY_CACHE_MAX) {
    // Evict the oldest entry to keep the cache bounded
    const oldestKey = galleryCache.keys().next().value;

    if (oldestKey !== undefined) galleryCache.delete(oldestKey);
  }

  galleryCache.set(mangaId, { html: data, expiresAt: now + GALLERY_CACHE_TTL });

  return data;
}

/**
 * Empty the gallery cache.
 */
export function clearGalleryCache(): void {
  galleryCache.clear();
}
