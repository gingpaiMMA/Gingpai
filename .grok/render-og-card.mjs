import { chromium } from "playwright";

const html = "file:///workspace/.grok/og-card.html";
const out = "/workspace/.grok/card-raw.png";

const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await page.goto(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(120);
await page.screenshot({ path: out, type: "png", omitBackground: false });
await browser.close();
console.log(`wrote ${out}`);
