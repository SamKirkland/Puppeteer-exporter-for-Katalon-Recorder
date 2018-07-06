Plugin for Katalon Recorder

This plugin exports scripts to a puppeteer script file

```
const puppeteer = require('puppeteer');

// built in selenium vars
let KEY_BACKSPACE = "\\uE003"; let KEY_BKSP = KEY_BACKSPACE;
let KEY_TAB = "\\uE004";
let KEY_ENTER = "\\uE007";
let KEY_SHIFT = "\\uE008";
let KEY_ESC = "\\uE00C"; let KEY_ESCAPE = KEY_ESC;
let KEY_DELETE = "\\uE017"; let KEY_DEL = KEY_DELETE;

(async () => {
	let browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // exported test
    // ...........
    // ...........
    // ...........

    await browser.close()
})()
```

You can download the plugin form the [chrome extension web store](https://chrome.google.com/webstore/detail/puppeteer-exporter-for-ka/idgpmhfldhpaoiflfleanildmnojchhd)