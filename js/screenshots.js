const chromium = require("chrome-aws-lambda");
const fs = require("fs");
const path = require("path");

(async () => {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1000000 }); 

    // This creates the page based on html input
    // There is a problem with the styling. It doesnt 
    // load the CSS.
    // const html = fs.readFileSync(path.resolve(__dirname, '../_site/previews/index.html')).toString();
    // await page.setContent(html, {waitUntil: ["networkidle0"],});
    // await page.evaluateHandle("document.fonts.ready");

    // Serving locally and navigating to the site 
    // loads the CSS correctly. But it requires the 
    // localhost to be running. Not ideal.
    await page.goto('http://127.0.0.1:4000/previews/')

    await page.waitForSelector('.preview');

    const previews = await page.$$('.preview')
    for (const preview of previews) {
        const box = await preview.boundingBox();
        const title = await preview.$eval('.title', node => node.innerText.replaceAll(' ', ''))
        await page.screenshot({
            path: `./public/img/${title}.png`,
            type: "png",
            clip: { x: box['x'], y: box['y'], width: box['width'], height: box['height'] }
        });
    }

    await browser.close();
})();