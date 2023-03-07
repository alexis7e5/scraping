const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // ------------ Mercadona -------------
    await page.goto('https://tienda.mercadona.es/categories/112');
    await page.waitForTimeout(2000);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.type(".ym-hide-content", '08033');
    await page.waitForTimeout(1000);
    await page.click(".button-big");
    await page.waitForTimeout(1000);
    const IMAGES = await page.$$eval('.product-cell__image-wrapper > img', as => as.map(img => img.src));
    const TITLES = await page.$$eval('h4', as => as.map(h4 => h4.innerHTML));
    const PRICES = await page.$$eval('.product-price__unit-price', as => as.map(price => price.innerHTML));
    const EXTRAINFO = await page.$$eval('span.footnote1-r', as => as.map(info => info.innerHTML));
    var productArray = [];
    var count = 0;
    for (var i = 0; i < EXTRAINFO.length; i++) {
        if (EXTRAINFO[i].slice(-1) == " ") {
            var object = {
                titulo: TITLES[count] + " " + EXTRAINFO[i] + EXTRAINFO[i + 1],
                precio: PRICES[count],
                img: IMAGES[count],
                tienda: 'MERCADONA'
            }
            productArray.push(object);
            i++;
        } else {
            var object = {
                titulo: TITLES[count] + " " + EXTRAINFO[i],
                precio: PRICES[count],
                img: IMAGES[count],
                tienda: 'MERCADONA'
            }
            productArray.push(object);
        }
        count++;
    }
    console.log(productArray);
    const fs = require('fs');
    const jsonContent = JSON.stringify(productArray);

    fs.writeFile("./products.json", jsonContent, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
    await page.screenshot({ path: 'mercadona.png' });

    await browser.close();
})();


function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}