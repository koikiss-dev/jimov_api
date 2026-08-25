/**
 * The gallery page of the site embeds the complete gallery
 * information inside a script as 'new N.gallery({...})'.
 */
export interface GalleryJson {
  media_id: string;
  title: {
    english?: string;
    japanese?: string;
    pretty?: string;
  };
  images: {
    pages: Record<string, { t: string }>;
  };
  upload_date?: number;
  tags?: { type: string; name: string }[];
}

/**
 * Extension of the images hosted on the CDN according to the type
 * reported for each page of the gallery.
 */
const IMAGE_EXTENSIONS: Record<string, string> = {
  j: "jpg",
  p: "png",
  g: "gif",
  w: "webp",
};

/**
 * Extract and parse the gallery object embedded in the html of a
 * gallery page. The raw json is not strictly standard (it may contain
 * trailing commas), so it is cleaned up before parsing.
 *
 * Returns null when the object is not present or cannot be parsed.
 */
export function extractGalleryJson(html: string): GalleryJson | null {
  const marker = "new N.gallery(";
  const start = html.indexOf(marker);

  if (start === -1) return null;

  let open = start + marker.length;

  while (open < html.length && /\s/.test(html[open])) open++;

  if (html[open] !== "{") return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = open; index < html.length; index++) {
    const char = html[index];

    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
    } else if (char === '"') {
      inString = true;
    } else if (char === "{") {
      depth++;
    } else if (char === "}") {
      depth--;

      if (depth === 0) {
        try {
          const raw = html.slice(open, index + 1);
          return JSON.parse(raw.replace(/,\s*([}\]])/g, "$1"));
        } catch {
          return null;
        }
      }
    }
  }

  return null;
}

/**
 * Full-size url of each page of the gallery from the url of its
 * thumbnail. The site shows thumbnails with a 't' suffix before the
 * extension (e.g. '1t.webp'). When the embedded gallery object is
 * available, it reports the real type of every page in ascending
 * order, allowing the exact extension of each image to be restored.
 *
 * @param thumbnails List of thumbnail urls in page order
 * @param pages Page type map from the embedded gallery object
 */
export function getPageImages(
  thumbnails: string[],
  pages?: Record<string, { t: string }>,
): string[] {
  const extensions = pages
    ? Object.keys(pages)
        .map(Number)
        .sort((a, b) => a - b)
        .map((key) => IMAGE_EXTENSIONS[pages[key].t])
    : [];

  return thumbnails.map((thumbnail, index) => {
    const image = thumbnail.replace(/\/(\d+)t\.\w+$/, "/$1");

    if (index < extensions.length && extensions[index]) {
      return `${image}.${extensions[index]}`;
    }

    const fallback = thumbnail.match(/t\.(\w+)$/);

    return `${image}.${fallback ? fallback[1] : "jpg"}`;
  });
}
