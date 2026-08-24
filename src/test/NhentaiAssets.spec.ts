import { load } from "cheerio";
import {
  getFilterByPages,
  getFilterNumPages,
} from "../scraper/sites/manga/nhentai/assets/getFilterByPage";
import {
  extractGalleryJson,
  getPageImages,
} from "../scraper/sites/manga/nhentai/assets/galleryJson";

describe("Nhentai assets - getFilterNumPages", () => {
  const render = (paginationHtml: string) =>
    load(`<html><body>${paginationHtml}</body></html>`);

  it("should read the real total from the last-page link", () => {
    // Regression: counting anchors minus two returned 16 while the
    // site really has 30 result pages
    const $ = render(`
      <section class="pagination">
        <a href="?q=test&amp;page=1" class="page current">1</a>
        <a href="?q=test&amp;page=14" class="page">14</a>
        <a href="?q=test&amp;page=29" class="page">29</a>
        <a href="?q=test&amp;page=30" class="page">30</a>
        <a href="?q=test&amp;page=2" class="next">icon</a>
        <a href="?q=test&amp;page=30" class="last">icon icon</a>
      </section>`);

    expect(getFilterNumPages($)).toBe(30);
  });

  it("should use the greatest numbered page when there is no last link", () => {
    const $ = render(`
      <section class="pagination">
        <a href="?q=test&amp;page=1" class="page current">1</a>
        <a href="?q=test&amp;page=5" class="page">5</a>
        <a href="?q=test&amp;page=3" class="previous">icon</a>
      </section>`);

    expect(getFilterNumPages($)).toBe(5);
  });

  it("should ignore non numeric labels", () => {
    const $ = render(`
      <section class="pagination">
        <a href="?q=test&amp;page=7" class="page current">7</a>
        <a href="#" class="next">icon</a>
      </section>`);

    expect(getFilterNumPages($)).toBe(7);
  });

  it("should fall back to one page when the pagination is empty", () => {
    const $ = render('<section class="pagination"></section>');

    expect(getFilterNumPages($)).toBe(1);
  });

  it("should fall back to one page when there is no pagination", () => {
    const $ = render("<section id=\"tags\"></section>");

    expect(getFilterNumPages($)).toBe(1);
  });
});

describe("Nhentai assets - getFilterByPages", () => {
  const SEARCH_PAGE = `
    <div class="container index-container search-grid">
      <div class="gallery" data-tags="3027">
        <a href="/g/650873/" class="cover">
          <img src="https://zrocdn.xyz/galleries/3931394/thumb.webp">
          <div class="caption">(Puniket 52) [Testa Kitchen] Idol Nakayoshi Time P52</div>
        </a>
      </div>
      <div class="gallery" data-tags="73">
        <a href="/g/650253/" class="cover">
          <img src="https://zrocdn.xyz/galleries/3925801/thumb.webp">
          <div class="caption">(COMIC1☆21) [Testa Kitchen] Idol Nakayoshi Time! KZ2</div>
        </a>
      </div>
      <div class="gallery">
        <a class="cover">
          <img src="https://zrocdn.xyz/broken.webp">
          <div class="caption">broken entry without href</div>
        </a>
      </div>
    </div>`;

  it("should extract every valid result of the page", () => {
    const results = getFilterByPages(load(SEARCH_PAGE));

    expect(results).toHaveLength(2);

    expect(results[0]).toEqual({
      id: "650873",
      name: "(Puniket 52) [Testa Kitchen] Idol Nakayoshi Time P52",
      url: "/manga/nhentai/title/650873",
      thumbnail: {
        url: "https://zrocdn.xyz/galleries/3931394/thumb.webp",
      },
    });

    expect(results[1].id).toBe("650253");
    expect(results[1].url).toBe("/manga/nhentai/title/650253");
  });

  it("should skip entries without a usable gallery id", () => {
    const results = getFilterByPages(load(SEARCH_PAGE));

    expect(
      results.find((result) => result.name === "broken entry without href")
    ).toBeUndefined();
  });

  it("should return an empty list for an empty container", () => {
    const results = getFilterByPages(load("<div class='container'></div>"));

    expect(results).toEqual([]);
  });
});

describe("Nhentai assets - extractGalleryJson", () => {
  const wrap = (scriptBody: string) =>
    `<html><head><script>${scriptBody}</script></head><body></body></html>`;

  it("should parse the embedded gallery object tolerating trailing commas", () => {
    const gallery = extractGalleryJson(
      wrap(`
        N.init({ "csrf_token": "abc" })
        var gallery = new N.gallery({
            "media_id": "3931394",
            "title": {
                "english": "Idol Nakayoshi Time P52",
                "japanese": "アイドルなかよしタイムP52",
                "pretty": "Idol Nakayoshi Time P52"
            },
            "images": {
                "pages": {"2":{"t":"w"},"3":{"t":"j"},},
            },
            "upload_date": 1778555748,
            "tags": [
                {"type":"artist","name":"testa"},
                {"type":"character","name":"kaoru ryuzaki"},
                {"type":"tag","name":"nakadashi"},
            ],
            "scanlator": "",
        })`)
    );

    expect(gallery).not.toBeNull();
    expect(gallery.media_id).toBe("3931394");
    expect(gallery.title.english).toBe("Idol Nakayoshi Time P52");
    expect(Object.keys(gallery.images.pages)).toEqual(["2", "3"]);
    expect(gallery.upload_date).toBe(1778555748);
    expect(gallery.tags).toHaveLength(3);
  });

  it("should scan braces and quotes inside string values correctly", () => {
    const gallery = extractGalleryJson(
      wrap(`
        var gallery = new N.gallery({
            "media_id": "1",
            "title": {
                "english": "weird {brace} and \\"quoted\\" title",
                "japanese": "日本語 {テスト}",
            },
            "images": {"pages": {"1":{"t":"w"}}},
        })`)
    );

    expect(gallery).not.toBeNull();
    expect(gallery.title.english).toBe('weird {brace} and "quoted" title');
    expect(gallery.title.japanese).toBe("日本語 {テスト}");
  });

  it("should handle whitespace between the marker and the object", () => {
    const gallery = extractGalleryJson(
      wrap(`var gallery = new N.gallery(   \n\t  {"media_id":"9","title":{},"images":{"pages":{}},})`)
    );

    expect(gallery).not.toBeNull();
    expect(gallery.media_id).toBe("9");
  });

  it("should return null when the marker is not present", () => {
    expect(extractGalleryJson(wrap("console.log('nothing here')"))).toBeNull();
  });

  it("should return null when the object cannot be parsed", () => {
    expect(extractGalleryJson(wrap("var g = new N.gallery({invalid key: 1})"))).toBeNull();
  });

  it("should return null when the object is never closed", () => {
    expect(extractGalleryJson(wrap("var g = new N.gallery({\"media_id\": \"1\""))).toBeNull();
  });
});

describe("Nhentai assets - getPageImages", () => {
  const CDN = "https://zrocdn.xyz/galleries/3931394";

  it("should restore the exact extension reported per page", () => {
    const images = getPageImages(
      [`${CDN}/1t.webp`, `${CDN}/2t.webp`, `${CDN}/3t.webp`],
      { "1": { t: "j" }, "2": { t: "p" }, "3": { t: "g" } }
    );

    expect(images).toEqual([
      `${CDN}/1.jpg`,
      `${CDN}/2.png`,
      `${CDN}/3.gif`,
    ]);
  });

  it("should align extensions by position regardless of the map keys", () => {
    // The embedded object numbers its pages starting at 2 while the
    // cdn files start at 1; only the order matters
    const images = getPageImages([`${CDN}/1t.webp`, `${CDN}/2t.webp`], {
      "2": { t: "p" },
      "3": { t: "j" },
    });

    expect(images).toEqual([`${CDN}/1.png`, `${CDN}/2.jpg`]);
  });

  it("should keep the thumbnail extension when no map is available", () => {
    const images = getPageImages([`${CDN}/1t.webp`, `${CDN}/10t.webp`]);

    expect(images).toEqual([`${CDN}/1.webp`, `${CDN}/10.webp`]);
  });

  it("should fall back to the thumbnail extension beyond the map", () => {
    const images = getPageImages([`${CDN}/1t.webp`, `${CDN}/2t.webp`], {
      "2": { t: "j" },
    });

    expect(images).toEqual([`${CDN}/1.jpg`, `${CDN}/2.webp`]);
  });

  it("should fall back to the thumbnail extension for unknown types", () => {
    const images = getPageImages([`${CDN}/1t.webp`], { "2": { t: "x" } });

    expect(images).toEqual([`${CDN}/1.webp`]);
  });
});
