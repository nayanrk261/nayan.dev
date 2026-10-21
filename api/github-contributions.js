/**
 * Vercel Serverless Function: /api/github-contributions
 * Proxies GitHub contribution calendar server-side (no CORS issues).
 * Query: ?username=nayanrk261
 */
export default async function handler(req, res) {
  const username = req.query.username || "nayanrk261";

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const ghUrl = `https://github.com/users/${encodeURIComponent(username)}/contributions`;
    const response = await fetch(ghUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: `GitHub responded with ${response.status}` });
    }

    const html = await response.text();
    const dateMap = new Map();

    // Parse data-date + data-level attributes
    const cellRegex = /data-date=["']([^"']+)["'][^>]*data-level=["']([^"']+)["']/g;
    let match;
    while ((match = cellRegex.exec(html)) !== null) {
      const date = match[1];
      const level = Math.min(4, Math.max(0, parseInt(match[2], 10)));
      dateMap.set(date, { date, level, count: level });
    }

    // Parse tool-tip for actual counts
    const tipRegex = /<tool-tip[^>]*for=["'][^'"]*-(\d{4}-\d{2}-\d{2})["'][^>]*>(.*?)<\/tool-tip>/g;
    while ((match = tipRegex.exec(html)) !== null) {
      const date = match[1];
      const tipText = match[2];
      const countMatch = tipText.match(/(\d+)\s+contribution/i);
      if (countMatch) {
        const count = parseInt(countMatch[1], 10);
        const existing = dateMap.get(date);
        const level = existing ? existing.level : (count >= 10 ? 4 : count >= 6 ? 3 : count >= 3 ? 2 : count >= 1 ? 1 : 0);
        dateMap.set(date, { date, count, level });
      }
    }

    // Older data-count format
    const rectRegex = /data-date=["']([^"']+)["'][^>]*data-count=["']([^"']+)["']/g;
    while ((match = rectRegex.exec(html)) !== null) {
      const date = match[1];
      const count = parseInt(match[2], 10) || 0;
      if (!dateMap.has(date) || count > (dateMap.get(date)?.count || 0)) {
        const level = count >= 10 ? 4 : count >= 6 ? 3 : count >= 3 ? 2 : count >= 1 ? 1 : 0;
        dateMap.set(date, { date, count, level });
      }
    }

    const contributions = Array.from(dateMap.values()).filter(d => d.count > 0);
    const totalContributions = contributions.reduce((a, b) => a + b.count, 0);

    return res.status(200).json({
      username,
      totalContributions,
      contributions,
      parsedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("GitHub proxy error:", err);
    return res.status(500).json({ error: "Failed to fetch GitHub contributions" });
  }
}
