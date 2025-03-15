import { load } from "cheerio";

export function extractHeadings(htmlContent: string) {
  const $ = load(htmlContent);
  const headings: { id: string; title: string; isActive?: boolean }[] = [];

  // h2見出しを抽出
  $("h2").each((i, el) => {
    const title = $(el).text();
    // idがない場合は自動生成
    let id = $(el).attr("id");
    if (!id) {
      id = `heading-${i}`;
      $(el).attr("id", id);
    }

    headings.push({ id, title });
  });

  return {
    headings,
    modifiedHtml: $.html(),
  };
}
