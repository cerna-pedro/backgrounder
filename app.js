require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-core');

const appBrowsers = ['edge'];

const paths = {
  edge: process.env.EDGE_PATH,
};


const prefixes = {
  edge: 'https://img-prod',
};

const newTabs = {
  edge:
    'https://ntp.msn.com/edge/ntp?locale=en-US&title=New%20tab&ocid=msedgntp',
};

const getBackground = async (appBrowser) => {
  console.log('Starting...\n');
  let today = new Date();

  const browser = await puppeteer.launch({
    executablePath: paths[appBrowser],
  });
  const page = await browser.newPage();
  const picLinks = [];
  await page.setRequestInterception(true);
  page.on('request', (interceptedRequest) => {
    if (
      interceptedRequest._resourceType === 'image' &&
      interceptedRequest._url.startsWith(prefixes[appBrowser])
    ) {
      picLinks.push(interceptedRequest.url());
    }
    interceptedRequest.continue();
  });
  await page.waitForTimeout(4000);
  await page.goto(newTabs[appBrowser]);
  await page.waitForTimeout(4000);
  page.on('response', async (response) => {
    response.buffer().then((file) => {
      const fileName = `${appBrowser}_${today.getFullYear()}_${
        today.getMonth() + 1 < 10
          ? `0${today.getMonth() + 1}`
          : today.getMonth() + 1
      }_${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}.jpg`;
      const filePath = `${process.env.SAVE_DIR}\\${fileName}`;
      const writeStream = fs.createWriteStream(filePath);
      writeStream.write(file);
    });
  });
  await page.goto(picLinks[picLinks.length - 1]);
  await page.waitForTimeout(4000);
  console.log('FINISHED!');
  await browser.close();
};

const main = async (appBrowsersArray) => {
  for (const appBrowser of appBrowsersArray) {
    await getBackground(appBrowser);
  }
};

main(appBrowsers);
