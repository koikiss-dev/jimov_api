import { type IMangaResult } from "@animetypes/manga";

/**
 * Extracts the search results of an already downloaded search page.
 */
export function getFilterByPages($: cheerio.Root): IMangaResult[] {
  const searchResults: IMangaResult[] = [];

  $(".container .gallery a").each((_, elementCheerio) => {
    const href = $(elementCheerio).attr("href");
    const id = href?.split("/")[2];

    if (!id) return;

    searchResults.push({
      id: id,
      name: $(elementCheerio).find(".caption").text(),
      url: `/manga/nhentai/title/${id}`,
      thumbnail: {
        url: $(elementCheerio).find("img").attr("src"),
      },
    });
  });

  return searchResults;
}

/**
 * Total number of result pages reported by the pagination of the
 * search page. The link to the last page reports the real total; the
 * numbered links are only a windowed list.
 */
export function getFilterNumPages($: cheerio.Root): number {
  // The link to the last page ('...&page=N')
  const lastHref = $("section.pagination a.last").attr("href");
  const match = lastHref?.match(/page=(\d+)/);

  if (match) return parseInt(match[1], 10);

  let numPages = 0;

  $("section.pagination a").each((_, element) => {
    const pageNumber = parseInt($(element).text(), 10);

    if (!isNaN(pageNumber) && pageNumber > numPages) {
      numPages = pageNumber;
    }
  });

  return numPages > 0 ? numPages : 1;
}
