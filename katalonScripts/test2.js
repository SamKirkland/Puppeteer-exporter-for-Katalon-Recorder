const puppeteer = require('puppeteer');
// built in selenium vars
// https://github.com/Jongkeun/selenium-ide/blob/6d18a36991a9541ab3e9cad50c2023b0680e497b/packages/selenium-ide/src/content/selenium-api.js

(async () => {
    let browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
    var page = await browser.newPage();
    var tempContainer = page;
    var lastIndex = 0;
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    var winWidth = await page.evaluate(async () => { return await window.innerWidth; });
    var winHeight = await page.evaluate(async () => { return await window.innerHeight; });
    await page.setViewport({ width: winWidth, height: winHeight });
    var browserTabs = [page];

    var keyDictionary = {
        '${KEY_LEFT}': 'ArrowLeft',
        '${KEY_UP}': 'ArrowUp',
        '${KEY_RIGHT}': 'ArrowRight',
        '${KEY_DOWN}': 'ArrowDown',
        '${KEY_PGUP}': 'PageUp',
        '${KEY_PAGE_UP}': 'PageUp',
        '${KEY_PGDN}': 'PageDown',
        '${KEY_PAGE_DOWN}': 'PageDown',
        '${KEY_BKSP}': 'Backspace',
        '${KEY_BACKSPACE}': 'Backspace',
        '${KEY_DEL}': 'Delete',
        '${KEY_DELETE}': 'Delete',
        '${KEY_ENTER}': 'Enter',
        '${KEY_TAB}': 'Tab',
        '${KEY_HOME}': 'Home'
    };


    //exported test
    await open(`https://www.google.com/`);
	await click(`//*[@id="lst-ib"]`);
	await type(`//*[@id="lst-ib"]`, `buildertrend`);
	await sendKeys(keyDictionary['${KEY_ENTER}']);
	await click(`//a[contains(text(),'Buildertrend: Construction Project Management Software')]`);
	await click(`//a/div`);
	await click(`//a[contains(text(),'LEARN MORE')]`);
	await click(`//a[contains(text(),'INDUSTRIES')]`);
	await click(`//a[contains(text(),'Home Building')]`);
	await click(`//a[contains(text(),'PRICING')]`);
	await click(`//a[contains(text(),'COMPANY')]`);
	await click(`//a[contains(text(),'Support')]`);
	await click(`//a/div`);
	await open(`https://www.google.com/`);
	await type(`//*[@id="lst-ib"]`, `buildertrend`);
	await sendKeys(keyDictionary['${KEY_ENTER}']);
	await click(`//div[@id='rhs_block']/div/div/div/div/div[2]/div/div/div[2]/div[2]`);
	await click(`//div[@id='rhs_block']/div/div/div/div/div[2]/div/div/div[2]/div[2]/div/div/span[2]/span/a/span`);
	await click(`//a[@id='wrl']/span/span[2]`);
	await selectFrame(``);
	await click(`//div[2]/div[2]/div[2]/div/div/div/div`);
	await selectFrame(``);
	await click(`//body[@id='gsr']/g-lightbox/div[2]/div[2]`);

    await browser.close();


	//function definitions
async function assertAlert(target) {
        try {
            await assertionHelper(target, `/alert\\(['"]([^'"]+)['"]\\)/`);
            console.log("Target: '" + target + "' found.");
        } catch (error) {
            console.log("Confirmation message not found.");
        }
    }
async function assertElementPresent(target) {
        if (await getContainer(target)) {
            console.log("assertElementPresent PASSED.");
        } else {
            throw ("assertElementPresent FAILED. Element not found.");
            process.exit();
        }
    }
async function assertPrompt(target) {
        try {
            await assertionHelper(target, `prompt\\(['"]([^'"]+)['"]`);
            console.log("Target: '" + target + "' found.");
        } catch (error) {
            console.log("Prompt message not found.");
        }
    }
async function assertText(target, value) {
        var property;
        try {
            var container = await getContainer(target);
            const elementHandle = await container.waitForXPath(target);
            const jshandle = await elementHandle.getProperty('text');
            property = await jshandle.jsonValue();
        } catch (err) {
            throw ("assertText FAILED. Unable to retreive element or property. Error message:\n" + err);
            process.exit();
        }

        if (property === value) {
            console.log("assertText PASSED. Actual value = '" + property + "'. Given value = '" + value + "'.");
        } else {
            throw ("assertText FAILED. Actual value = '" + property + "'. Given value = '" + value + "'.");
            process.exit();
        }
    }
async function assertTitle(value) {
        var title;
        try {
            title = await page.title();
        } catch (err) {
            throw ("verifyTitle FAILED. Could not retreive title. Error message:\n" + err);
            process.exit();
        }

        if (title === value) {
            console.log("assertTitle PASSED. Actual value = '" + title + "'. Given value = '" + value + "'.");
        } else {
            throw "assertTitle FAILED. Actual value = '" + title + "'. Given value = '" + value + "'.";
            process.exit();
        }
    }
async function assertValue(target, value) {
        var property;
        try {
            var container = await getContainer(target);
            const elementHandle = await container.waitForXPath(target);
            const jshandle = await elementHandle.getProperty('value');
            property = await jshandle.jsonValue();
        } catch (err) {
            throw ("assertValue FAILED. Unable to retreive element or property. Error message:\n" + err);
            process.exit();
        }

        if (property === value) {
            console.log("assertValue PASSED. Actual value = '" + property + "'. Given value = '" + value + "'.");
        } else {
            throw "assertValue FAILED. Actual value = '" + property + "'. Given value = '" + value + "'.";
            process.exit();
        }
    }
async function bringBrowserToForground() {
        await page.bringToFront();
    }
async function captureScreenshot(target) {
        let name = target + ".jpg";
        await page.goto(page.url());
        await page.screenshot({ path: name });
    }
async function captureEntirePageScreenshot(target) {
        let name = target + ".jpg";
        await page.screenshot({ path: name, fullPage: true });
    }
async function click(target) {
        var container = await getContainer(target);
        var query = await container.waitForXPath(target, { timeout: 5000, visible: true });

        //currently, Puppeteer's frame.click() does not support XPath, and frame.click() is what updates the page.
        //When the clicked element is a link, we must instead use goto because goto updates the page object.
        var elementHandle = query.length === undefined ? query : query[0];
        var taghandle = await elementHandle.getProperty('tagName');
        var tag = await taghandle.jsonValue().toString().toLowerCase();

        var navigation = page.waitForRequest(
            (r) => { return (r.method() === 'GET' && r.isNavigationRequest() && r.frame() === page.mainFrame()) },
            { timeout: 800 }
        );

        await elementHandle.click();

        try {
            await navigation;
        } catch (error) {
            return;
        }

        await page.waitForNavigation({ waitUntil: 'load' });
    }
async function deleteAllVisibleCookies() {
        for (var i = 0; i < browserTabs.length; i++) {
            await browserTabs[i]._client.send('Network.clearBrowserCookies');
        }
    }
async function echo(target, value) {
        var container;
        if (value !== "#shownotification") {
            container = await getContainer(target);
        } else {
            container = page;
        }

        if (container.evaluate('Notification.permission !== "granted"') && value === "#shownotification") {
            await container.evaluate('Notification.requestPermission()');
            await container.evaluate(t => {
                new Notification('Notification title', { body: t });
            }, target);
        } else if (value === "#shownotification") { //notification access already granted.
            await container.evaluate(t => {
                new Notification('Notification title', { body: t });
            }, target);
        }
    }
async function get(target) {
        await page.goto(target);
    }
async function mouseOver(target) {
        var container = await getContainer(target);
        await container.hover(target);
    }
async function open(target) {
        await page.goto(target);
    }
async function pause(target) {
        await page.waitFor(parseInt(target));
    }
async function refresh() {
        await page.reload();
    }
async function selectFrame(value) {
        await page.waitFor(4000);
        var frames = await page.frames();
        tempContainer = page;
        //relative=top will change frame to top frame
        if (value === 'relative=top') {
            tempContainer = frames[lastIndex].parentFrame();
        }
        //index=x will change frame to frame x
        else if (value.substring(0, 5) === 'index') {
            var num = value.substring(6);
            var index = parseInt(num);
            tempContainer = frames[index];
        }
        //finds frame through name and target
        else {
            tempContainer = await frames.find(f => f.name() === value.substring(3, value.length));
            //if it still hasn't found, set equal to last index used
            if (tempContainer === null) {
                tempContainer = frames[lastIndex];
            }
        }
    }
async function selectWindow(target, value) {
        if (target.substring(9) === 'local') {
            await browserTabs[0].bringToFront();
            page = browserTabs[0];
            await page.waitFor(1000);
        } else if (target.substring(9) > browserTabs.length) {
            var newTab = await page.browser().newPage();
            await newTab.setViewport(page.viewport());
            await newTab.goto(value, { waitUntil: 'networkidle2' });
            await newTab.bringToFront();
            await browserTabs.push(newTab);
            page = newTab;
        } else if (parseInt(target.substring(9)) >= 0) {
            var goto = parseInt(target.substring(9));
            await browserTabs[goto].bringToFront();
            page = browserTabs[goto];
            await page.waitFor(1000);
        }
    }
async function sendKeys(value) {
        var navigation = page.waitForRequest(
            (r) => { return (r.method() === 'GET' && r.isNavigationRequest() && r.frame() === page.mainFrame()) },
            { timeout: 800 }
        );

        await page.keyboard.press(value);

        try {
            await navigation;
        } catch (error) {
            return;
        }

        await page.waitForNavigation({ waitUntil: 'load' });
    }
async function type(target, value) {
        var container = await getContainer(target);
        const elementHandle = await container.waitForXPath(target);
        await elementHandle.type(value);
    }
async function verifyChecked(target) {
        var property;
        try {
            var container = await getContainer(target);
            const elementHandle = await container.waitForXPath(target);
            const jshandle = await elementHandle.getProperty('checked');
            property = await jshandle.jsonValue();
        } catch (err) {
            return console.log("verifyChecked FAILED. Unable to retreive element or property. Error message:\n" + err);
        }

        if (property) {
            console.log("verifyChecked PASSED. Element is checked.");
        } else {
            console.log("verifyChecked FAILED. Element is unchecked.");
        }
    }
async function verifyElementPresent(target) {
        if (await getContainer(target)) {
            console.log("verifyElementPresent PASSED.");
        } else {
            console.log("verifyElementPresent FAILED. Element not found.");
        }
    }
async function verifyText(target, value) {
        var property;
        try {
            var container = await getContainer(target);
            const elementHandle = await container.waitForXPath(target);
            const jshandle = await elementHandle.getProperty('text');
            property = await jshandle.jsonValue();
        } catch (err) {
            return console.log("verifyText FAILED. Unable to retreive element or property. Error message:\n" + err);
        }

        if (property === value) {
            console.log("verifyText PASSED. Actual value = '" + property + "'. Given value = '" + value + "'.");
        } else {
            console.log("verifyText FAILED. Actual value = '" + property + "'. Given value = '" + value + "'.");
        }
    }
async function verifyTitle(value) {
        var title;
        try {
            title = await page.title();
        } catch (err) {
            return console.log("verifyTitle FAILED. Could not retreive title. Error message:\n" + err);
        }

        if (title === value) {
            console.log("verifyTitle PASSED. Actual value = '" + title + "'. Given value = '" + value + "'.");
        } else {
            console.log("verifyTitle FAILED. Actual value = '" + title + "'. Given value = '" + value + "'.");
        }
    }
async function verifyValue(target, value) {
        var property;
        try {
            var container = await getContainer(target);
            const elementHandle = await container.waitForXPath(target);
            const jshandle = await elementHandle.getProperty('value');
            property = await jshandle.jsonValue();
        } catch (err) {
            return console.log("verifyValue FAILED. Unable to retreive element or property. Error message:\n" + err);
        }

        if (property === value) {
            console.log("verifyValue PASSED. Actual value = '" + property + "'. Given value = '" + value + "'.");
        } else {
            console.log("verifyValue FAILED. Actual value = '" + property + "'. Given value = '" + value + "'.");
        }
    }
async function waitForPageToLoad() {
        while (await page.evaluate('document.readyState !== \'complete\';'));
    }
async function waitForVisible(target) {
        var container = await getContainer(target);
        return await container.waitForXPath(target, { visible: true });
    }
async function getContainer(selector) {
        var elementhandle = await page.$x(selector);

        if (elementhandle) {
            return page;
        } else {
            var frames = await page.frames();
            var i, length = frames.length;
            for (i = 0; i < length; i++) {
                elementhandle = await frames[i].$x(selector);

                if (elementhandle) {
                    return frames[i];
                }
            }
        }
        return null;
    }
async function assertionHelper(target, regex) {
        await page.evaluate((t, r) => {
            var elem = document.scripts;
            var reg = new RegExp(r);
            for (var i = 0; i < elem.length; i++) {
                var txt = elem[i].textContent.match(reg);
                if (txt) {
                    var checkText = txt[1].replace('\\\\n', '\\n');
                    if (checkText === t) {
                        break;
                    }
                }
                if (i >= elem.length - 1) {
                    throw "Confirmation message not found.";
                }
            }
        }, target, regex);
    }
})()