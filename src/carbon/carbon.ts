import { escape } from 'querystring';
import puppeteer, { BoundingBox } from 'puppeteer';
import qs from 'querystring';

const carbonParams = {
  bg: '#80B6F7',
  t: 'seti',
  wt: 'none',
  l: 'auto',
  ds: true,
  dsyoff: '20px',
  dsblur: '68px',
  wc: true,
  wa: true,
  pv: '40px',
  ph: '40px',
  ln: false,
  fl: 1,
  fm: 'Hack',
  fs: '14px',
  lh: '133%',
  si: false,
  es: '1x',
  wm: false
};

const carbonURL = `https://carbon.now.sh/?${qs.stringify(carbonParams)}&code=`;

export async function carbon(input: string) {
  const code = escape(input);
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Set viewport to something big
    // Prevents Carbon from cutting off lines
    await page.setViewport({ width: 1600, height: 1000 });
    await page.goto(`${carbonURL}${code}`, { waitUntil: 'load' });
    const exportContainer = await page.waitForSelector('#export-container');
    const elementBounds = await exportContainer.boundingBox();
    const clip: BoundingBox = {
      x: Math.round(elementBounds?.x || 0),
      y: elementBounds?.y || 0,
      width: elementBounds?.width || 0,
      height: Math.round(elementBounds?.height || 0) - 1
    };
    await page.screenshot({
      path: 'screenshot.png',
      clip
    });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}
