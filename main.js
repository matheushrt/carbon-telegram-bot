import { escape } from 'querystring';
import puppeteer from 'puppeteer';

const carbonURL =
  'https://carbon.now.sh/?bg=rgba(49%2C127%2C193%2C1)&t=seti&wt=none&l=auto&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=';

const code = escape('const browser = await puppeteer.launch();');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Set viewport to something big
    // Prevents Carbon from cutting off lines
    await page.setViewport({ width: 1600, height: 1000 });
    await page.goto(`${carbonURL}${code}`, { waitUntil: 'load' });
    const exportContainer = await page.waitForSelector('#export-container');
    const elementBounds = await exportContainer.boundingBox();
    await page.screenshot({
      path: 'screenshot.jpeg',
      clip: {
        ...elementBounds,
        // This avoids a black line towards the left and bottom side of images,
        // which only occured when certain fonts were used, see https://goo.gl/JHHskx
        x: Math.round(elementBounds.x),
        height: Math.round(elementBounds.height) - 1
      },
      type: 'jpeg'
    });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
