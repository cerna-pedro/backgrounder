# Backgrounder

### Must have **_[Node.js](https://nodejs.org/en/)_** installed!

---

This script launches [Microsoft Edge](https://www.microsoft.com/en-us/edge) in a headless browser using [Puppeteer.JS](https://developers.google.com/web/tools/puppeteer) by [Google](https://www.google.com/), to save the background image displayed in the browser new tab window.

Steps to take:

1. Create a `.env` file in the same directory that `app.js` will be located.
2. Make sure you specify the location of your Microsoft Edge executable & the location of where you want to save the background image, in your `.env` file, under the variables `EDGE_PATH` & `SAVE_DIR`, respectively.
3. From the command prompt terminal line, type `npm install`.
4. From the command prompt terminal line, type `npm start` or `node app.js`.
5. Enjoy! 😊
