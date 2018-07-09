const puppeteer = require('puppeteer');
const xpath2css = require('xpath2css');
// built in selenium vars
// https://github.com/Jongkeun/selenium-ide/blob/6d18a36991a9541ab3e9cad50c2023b0680e497b/packages/selenium-ide/src/content/selenium-api.js
let KEY_BACKSPACE = "\uE003"; let KEY_BKSP = KEY_BACKSPACE;
let KEY_TAB = "\uE004";
let KEY_ENTER = "\uE007";
let KEY_SHIFT = "\uE008";
let KEY_ESC = "\uE00C"; let KEY_ESCAPE = KEY_ESC;
let KEY_DELETE = "\uE017"; let KEY_DEL = KEY_DELETE;
var page;
async function getContainer(selector) {
    //returns previous index if not found
    var elementhandle = await page.$(selector);

    if (elementhandle) {
        return page;
    } else {
        var frames = await page.frames();
        var i, length = frames.length;
        for (i = 0; i < length; i++) {
            elementhandle = await frames[i].$(selector);

            if (elementhandle) {
                return frames[i];
            } else if (i === length - 1) {
                return frames[length - 1];
            }
        }
    }
}

function locatorToSelector(target) {
    var selector;

    if (target.substring(0, 1) === "/" || target.substring(0, 6) === "xpath=") {
        if (target.indexOf('@') != target.lastIndexOf('@')) {
            var attributeSelector = target.substring(target.lastIndexOf('@'), target.length);
            target = target.substring(0, target.lastIndexOf('@'));
            selector = xpath2css(target);
            selector += attributeSelector;
        } else {
            selector = xpath2css(target);
        }
    } else if (target.substring(0, 3) === "id=") {
        selector = "[id=" + target.substring(3, target.length) + "]";
    } else if (target.substring(0, 5) === "name=") {
        selector = "[name=" + target.substring(5, target.length) + "]";
    } else if (target.substring(0, 5) === "link=") {
        selector = "[link=" + target.substring(5, target.length) + "]";
        //Probably does not work, if meant to be used for ref attributes
    } else if (target.substring(0, 11) === "identifier=") {
        selector = "[name=" + target.substring(11, target.length) + "],[id=" + target.substring(11, target.length) + "]";
    } else if (target.substring(0, 4) === "dom=") {
        //TODO
    } else if (target.substring(0, 4) === "css=") {
        selector = target.substring(4, target.length);
    } else if (target.substring(0, 3) === "ui=") {
        //TODO
    } else {
        selector = target;
    }

    return selector;
}

(async () => {
	let browser = await puppeteer.launch({headless: false, args:['--start-maximized']});
    page = await browser.newPage();

    await page._client.send('Emulation.clearDeviceMetricsOverride');
    var winWidth = await page.evaluate(
        () => {
            return window.innerWidth;
        }
    );
    var winHeight = await page.evaluate(
        () => {
            return window.innerHeight;
        }
    );
    await page.setViewport({ width: winWidth, height: winHeight });

    var browserTabs = [];
    browserTabs.push(page);


    // exported test
    await page.goto('https://buildertrend.net/');
	selector = locatorToSelector(`id=ctl00_ctl00_ctl00_MasterMain_MasterMain_MasterMain_txtUserID_Textbox1`);
	var container = await getContainer(`id=ctl00_ctl00_ctl00_MasterMain_MasterMain_MasterMain_txtUserID_Textbox1`, page);	
    await container.type(selector, `nichbuilder`);
    
    selector = locatorToSelector(`id=ctl00_ctl00_ctl00_MasterMain_MasterMain_MasterMain_txtPassword_Textbox1`);
	var container = await getContainer(`id=ctl00_ctl00_ctl00_MasterMain_MasterMain_MasterMain_txtPassword_Textbox1`, page);	
    await container.type(selector, `bt!23`);
	selector = locatorToSelector(`id=ctl00_ctl00_ctl00_MasterMain_MasterMain_MasterMain_btnLogin`);
	await page.waitForSelector(selector);
	await page.click(selector);
	selector = locatorToSelector(`//div[@id='ctl00_ctl00_BaseMain_ctlMainMenu_ctl02_rptNewDropDownMenuItems_ctl00_divDropDownLinkElement']/div[2]`);
	await page.waitForSelector(selector);
	await page.click(selector);

    await browser.close()
})()