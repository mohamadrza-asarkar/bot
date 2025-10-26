const TelegramBot = require("node-telegram-bot-api");
const puppeteer = require("puppeteer-core");
const BOT_TOKEN = "توکن ربات خود را وارد کنید";
const CHANNEL_ID = "ای دی کانال خودتون رو وارد کنید";
const bot = new TelegramBot(BOT_TOKEN,{polling:true});
async function getPrice() {
  const browser = await puppeteer.launch({
    executablePath: "/data/data/com.termux/files/usr/bin/chromium-browser",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu"
    ]
  });
  const pageGold = await browser.newPage();
  await pageGold.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  pageGold.on("response", async response => {
    if (
      response.status() >= 200 &&
      response.status() <= 300 &&
      response.url().includes("ajax.json")
    ) {
      const data = await response.json();
      await browser.close()
       await bot.sendMessage(
        CHANNEL_ID,
        `💰 طلا ۱۸ عیار: ${new Intl.NumberFormat().format(
          data.current.tgju_gold_irg18.p / 10
        )} تومان
💰 طلا ۲۴ عیار: ${new Intl.NumberFormat().format(
          parseInt(data.current.geram24.p.replace(/,/g, "")) / 10
        )} تومان

💰 سکه تمام: ${new Intl.NumberFormat().format(
          parseInt(data.current.retail_sekee.p.replace(/,/g, "")) / 10
        )} تومان
💰 سکه نیم: ${new Intl.NumberFormat().format(
          parseInt(data.current.retail_nim.p.replace(/,/g, "")) / 10
        )} تومان
💰 سکه ربع: ${new Intl.NumberFormat().format(
          parseInt(data.current.retail_rob.p.replace(/,/g, "")) / 10
        )} تومان
💰 سکه گرمی: ${new Intl.NumberFormat().format(
          parseInt(data.current.retail_gerami.p.replace(/,/g, "")) / 10
        )} تومان

💵 دلار: ${new Intl.NumberFormat().format(
          parseInt(data.current.price_dollar_rl.p.replace(/,/g, "")) / 10
        )} تومان
💵 یورو: ${new Intl.NumberFormat().format(
          parseInt(data.current.price_eur.p.replace(/,/g, "")) / 10
        )} تومان
💵 درهم: ${new Intl.NumberFormat().format(
          parseInt(data.current.price_aed.p.replace(/,/g, "")) / 10
        )} تومان

₿ بیت‌کوین: ${new Intl.NumberFormat().format(
          parseInt(data.current["crypto-bitcoin-irr"].p.replace(/,/g, "")) / 10
        )} تومان

🥇 طلا آبشده مثقالی: ${new Intl.NumberFormat().format(
          parseInt(data.current.mesghal.p.replace(/,/g, "")) / 10
        )} تومان
قیمت ها هر ۱۰ دقیقه بروز می باشد
`
      );
    }
  });
  await pageGold.goto("https://tgju.org", {
    timeout: 40000
  });
}
getPrice();
setInterval(
  () => {
    getPrice();
  },
  5 * 60 * 1000
);
