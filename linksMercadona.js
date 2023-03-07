const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // ------------ Mercadona -------------
    await page.goto('https://tienda.mercadona.es/categories/112');
    await page.setViewport({ width: 1920, height: 1080 });
    await page.waitForTimeout(2000);
    await page.type(".ym-hide-content", '08033');
    await page.waitForTimeout(1000);
    await page.click(".button-big");
    await page.waitForTimeout(1000);
    /*const BUTTONS = await page.$$eval('.category-menu__header', as => as.map(link => link.outerHTML));
    console.log(BUTTONS);*/
    //await page.click(".product-cell__content-link");
    //let data = [];
    /*const handles = await page.$$('.category-menu__header');
    for (const handleitem of handles)
        console.log(handleitem);*/
    /*let links = await page.$$eval(() => {
        let elements = document.getElementsByClassName('category-item__link');
        for (var element of elements)
            //data.push(element.textContent);
            console.log(element);
        //return data;
    });*/

    //console.log(BUTTONS);
    //await page.screenshot({ path: 'mercadonatest.png' });
    const elements = await page.$$('.product-cell__content-link');

    elements.forEach(async element => {
        await element.click();
    });

    await browser.close();
})();