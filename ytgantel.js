async () => {
  const rssUrl = "https://gamate-hash.github.io/feed.xml"; // replace

  try {
    const res = await fetch(rssUrl);
    const xmlText = await res.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");

    const items = xml.querySelectorAll("item");
    if (!items.length) return;

    const latest = items[items.length - 1];

    const title = latest.querySelector("title")?.textContent || "";
    const desc = latest.querySelector("description")?.textContent || "";

    const titleEl = document.querySelector(".gamate-title");
    const descEl = document.querySelector(".gamate-desc");

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.innerHTML = desc;

  } catch (err) {
    console.error("RSS fetch failed:", err);
  }
}