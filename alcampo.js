const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // ------------ Mercadona -------------
    await page.goto('https://www.alcampo.es/compra-online/alimentacion/aceite-vinagre-salsas-especias/c/W18');
    await page.waitForTimeout(2000);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.click(".cookie-button");
    await page.waitForTimeout(1500);
    await page.click(".question > a");
    await page.waitForTimeout(1000);
    await page.type("#postalCode", '08033');
    await page.waitForTimeout(10000);

    await browser.close();
})();