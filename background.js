// Chrome Extension ID: ljdobmomdgdljniojadhoplhkpialdid
// Firefox Extension ID: {91f05833-bab1-4fb1-b9e4-187091a4d75d}

var extensionId = bowser.firefox ? '{91f05833-bab1-4fb1-b9e4-187091a4d75d}' : 'ljdobmomdgdljniojadhoplhkpialdid';

/*
Periodically send a message to Katalon Recorder with a list of capabilities. If Katalon Recorder does not receive any message for 2 minutes, it will stop communicating with the plugin.

Message structure:
{
    type: 'katalon_recorder_register',
    payload: {
        capabilities: [
            {
                id: <string: unique ID for capability>,
                summary: <string: user-friendly name, e.g script format>,
                type: <right now only 'export' is available>
            }
        ]
    }
}
*/
function register() {
    chrome.runtime.sendMessage(
        extensionId,
        {
            type: 'katalon_recorder_register',
            payload: {
                capabilities: [
                    {
                        id: 'puppeteer', // unique ID for each capability
                        summary: 'Puppeteer', // user-friendly name
                        type: 'export' // for now only 'export' is available
                    },
                    {
                        id: 'json',
                        summary: 'JSON',
                        type: 'export'
                    },
                    {
                        id: 'puppeteerBT',
                        summary: 'PuppeteerBT',
                        type: 'export'
                    }
                ]
            }
        }
    );
}

register();

setInterval(register, 60 * 1000);


/*
let BACKSPACE = "\uE003"; let BKSP = BACKSPACE;
let TAB = "\uE004";
let ENTER = "\uE007";
let SHIFT = "\uE008";
let CONTROL = "\uE009"; let CTRL = CONTROL;
let ALT = "\uE00A";
let PAUSE = "\uE00B";
let ESC = "\uE00C"; let ESCAPE = ESC;
let SPACE = "\uE00D";
let PAGE_UP = "\uE00E"; let PGUP = PAGE_UP;
let PAGE_DOWN = "\uE00F"; let PGDN = PAGE_DOWN;
let END = "\uE010";
let HOME = "\uE011";
let LEFT = "\uE012";
let UP = "\uE013";
let RIGHT = "\uE014";
let DOWN = "\uE015";
let INSERT = "\uE016"; let INS = INSERT;
let DELETE = "\uE017"; let DEL = DELETE;
let SEMICOLON = "\uE018";
let EQUALS = "\uE019";
let NUMPAD0 = "\uE01A"; let N0 = NUMPAD0; let NUM_ZERO = NUMPAD0;
let NUMPAD1 = "\uE01B"; let N1 = NUMPAD1; let NUM_ONE = NUMPAD1;
let NUMPAD2 = "\uE01C"; let N2 = NUMPAD2; let NUM_TWO = NUMPAD2;
let NUMPAD3 = "\uE01D"; let N3 = NUMPAD3; let NUM_THREE = NUMPAD3;
let NUMPAD4 = "\uE01E"; let N4 = NUMPAD4; let NUM_FOUR = NUMPAD4;
let NUMPAD5 = "\uE01F"; let N5 = NUMPAD5; let NUM_FIVE = NUMPAD5;
let NUMPAD6 = "\uE020"; let N6 = NUMPAD6; let NUM_SIX = NUMPAD6;
let NUMPAD7 = "\uE021"; let N7 = NUMPAD7; let NUM_SEVEN = NUMPAD7;
let NUMPAD8 = "\uE022"; let N8 = NUMPAD8; let NUM_EIGHT = NUMPAD8;
let NUMPAD9 = "\uE023"; let N9 = NUMPAD9; let NUM_NINE = NUMPAD9;
let MULTIPLY = "\uE024"; let MUL = MULTIPLY; let NUM_MULTIPLY = MULTIPLY;
let ADD = "\uE025"; let PLUS = ADD; let NUM_PLUS = ADD;
let SEPARATOR = "\uE026"; let SEP = SEPARATOR;
let SUBTRACT = "\uE027"; let MINUS = SUBTRACT; let NUM_MINUS = SUBTRACT;
let DECIMAL = "\uE028"; let PERIOD = DECIMAL; let NUM_PERIOD = DECIMAL;
let DIVIDE = "\uE029"; let DIV = DIVIDE; let NUM_DIVISION = DIVIDE;
let F1 = "\uE031";
let F2 = "\uE032";
let F3 = "\uE033";
let F4 = "\uE034";
let F5 = "\uE035";
let F6 = "\uE036";
let F7 = "\uE037";
let F8 = "\uE038";
let F9 = "\uE039";
let F10 = "\uE03A";
let F11 = "\uE03B";
let F12 = "\uE03C";
let META = "\uE03D"; let COMMAND = META;
*/

var exportFunctions = {

    assertAlert: async function assertAlert(target) {
        try {
            await assertionHelper(target, `/alert\\(['"]([^'"]+)['"]\\)/`);
            console.log("Target: '" + target + "' found.");
        } catch (error) {
            console.log("Confirmation message not found.");
        }
    },

    assertElementPresent: async function assertElementPresent(target) {
        if (await getContainer(target)) {
            console.log("assertElementPresent PASSED.");
        } else {
            throw ("assertElementPresent FAILED. Element not found.");
            process.exit();
        }
    },

    assertPrompt: async function assertPrompt(target) {
        try {
            await assertionHelper(target, `prompt\\(['"]([^'"]+)['"]`);
            console.log("Target: '" + target + "' found.");
        } catch (error) {
            console.log("Prompt message not found.");
        }
    },

    assertText: async function assertText(target, value) {
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
    },

    assertTitle: async function assertTitle(value) {
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
    },

    assertValue: async function assertValue(target, value) {
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
    },

    bringBrowserToForground: async function bringBrowserToForground() {
        await page.bringToFront();
    },

    captureScreenshot: async function captureScreenshot(target) {
        let name = target + ".jpg";
        await page.goto(page.url());
        await page.screenshot({ path: name });
    },

    captureEntirePageScreenshot: async function captureEntirePageScreenshot(target) {
        let name = target + ".jpg";
        await page.screenshot({ path: name, fullPage: true });
    },

    click: async function click(target) {
        var container = await getContainer(target);
        var query;

        try {
            query = await container.waitForXPath(target, { timeout: 5000, visible: true });
        } catch (error) {
            query = await container.$x(target);
        }


        //currently, Puppeteer's frame.click() does not support XPath, and frame.click() is what updates the page.
        //When the clicked element is a link, we must instead use goto because goto updates the page object.
        var elementHandle = query.length === undefined ? query : query[0];
        var taghandle = await elementHandle.getProperty('tagName');
        var tag = await taghandle.jsonValue().toString().toLowerCase();

        var navigation = page.waitForRequest(
            (r) => { return (r.method() === 'GET' && r.isNavigationRequest() && r.frame() === page.mainFrame()) },
            { timeout: 800 }
        );
        try {
            await elementHandle.click();
        } catch (error) {
            console.log(elementHandle);
        }

        try {
            await navigation;
        } catch (error) {
            return;
        }

        await page.waitForNavigation({ waitUntil: 'load' });
    },

    deleteAllVisibleCookies: async function deleteAllVisibleCookies() {
        for (var i = 0; i < browserTabs.length; i++) {
            await browserTabs[i]._client.send('Network.clearBrowserCookies');
        }
    },

    echo: async function echo(target, value) {
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
    },

    get: async function get(target) {
        await page.goto(target);
    },

    mouseOver: async function mouseOver(target) {
        var container = await getContainer(target);
        await container.hover(target);
    },

    /**
    * @param target is the url to which the page should navigate.
    */
    open: async function open(target) {
        await page.goto(target);
    },

    pause: async function pause(target) {
        await page.waitFor(parseInt(target));
    },

    refresh: async function refresh() {
        await page.reload();
    },

    selectFrame: async function selectFrame(target) {
        await page.waitFor(4000);
        var frames = await page.frames();
        tempContainer = page;
        //relative=top will change frame to top frame
        if (target === 'relative=top') {
            tempContainer = frames[lastIndex].parentFrame();
        }
        //index=x will change frame to frame x
        else if (target.substring(0, 5) === 'index') {
            var num = target.substring(6);
            var index = parseInt(num);
            tempContainer = frames[index];
        }
        //finds frame through name and target
        else {
            tempContainer = await frames.find(f => f.name() === target.substring(3, target.length));
            //if it still hasn't found, set equal to last index used
            if (tempContainer === null) {
                tempContainer = frames[lastIndex];
            }
        }
    },

    selectWindow: async function selectWindow(target, value) {
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
    },

    sendKeys: async function sendKeys(value) {
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
    },

    type: async function type(target, value) {
        var container = await getContainer(target);
        const elementHandle = await container.waitForXPath(target);
        await elementHandle.type(value);
    },

    verifyChecked: async function verifyChecked(target) {
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
    },

    verifyElementPresent: async function verifyElementPresent(target) {
        if (await getContainer(target)) {
            console.log("verifyElementPresent PASSED.");
        } else {
            console.log("verifyElementPresent FAILED. Element not found.");
        }
    },

    verifyText: async function verifyText(target, value) {
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
    },

    verifyTitle: async function verifyTitle(value) {
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
    },

    verifyValue: async function verifyValue(target, value) {
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
    },

    waitForPageToLoad: async function waitForPageToLoad() {
        while (await page.evaluate('document.readyState !== \'complete\';'));
    },

    waitForVisible: async function waitForVisible(target) {
        var container = await getContainer(target);
        return await container.waitForXPath(target, { visible: true });
    },

    getContainer: async function getContainer(selector) {
        var query = await page.$x(selector);
        var elementhandle = query.length === undefined ? query : query[0];

        if (elementhandle && elementhandle.toString() !== undefined) { //added the toString check because .$x() returns [] if not found, not null/undefined
            return page;
        } else {
            var frames = await page.frames();
            var i, length = frames.length;
            for (i = 0; i < length; i++) {
                query = await frames[i].$x(selector);
                elementhandle = query.length === undefined ? query : query[0];

                if (elementhandle && elementhandle.toString() !== undefined) {
                    return frames[i];
                }
            }
        }
        return null;
    },

    assertionHelper: async function assertionHelper(target, regex) {
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
    },
};

function locatorToSelector(target) {
    var selector = target;

    if (target.substring(0, 3) === "id=") {
        selector = "//*[@id=\"" + target.substring(3, target.length) + "\"]";
    } else if (target.substring(0, 5) === "name=") {
        selector = "//*[@name=\"" + target.substring(5, target.length) + "\"]";
    } else if (target.substring(0, 5) === "link=") {
        var offset = 5;
        if(target.substring(5, 11) == 'exact:') {
            offset = 11
        }
        selector = "//a[contains(text(),'" + target.substring(offset, target.length) + "')]";
    } else if (target.substring(0, 11) === "identifier=") {
        selector = "[name=" + target.substring(11, target.length) + "],[id=" + target.substring(11, target.length) + "]";
    } else if (target.substring(0, 4) === "css=") {
        //selector = target.substring(4, target.length);
    } else if (target.substring(0, 3) === "ui=") {
        throw new Error("The 'ui=' locator is not supported.");
    } else if (target.substring(0, 4) === "dom=") {
        throw new Error("The 'dom=' locator is not supported.");
    } else if (target.substring(0, 6) === "xpath=") {
        selector = target.substring(6, target.length);
    }

    return selector;
}

chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
    if (message.type === 'katalon_recorder_export') {
        var payload = message.payload;
        var commands = payload.commands;
        var content = '';
        var extension = '';
        var mimetype = '';

        switch (payload.capabilityId) {
            case 'puppeteerBT':
            case 'puppeteer':
                seleniumToPuppeteer = {
                    "open": (x) => `await open(\`${x.target}\`);\n`,
                    "click": (x) => `await click(\`${locatorToSelector(x.target)}\`);\n`,
                    "store": (x) => `await let ${x.target} = ${x.value};\n`,
                    "type": (x) => `await type(\`${locatorToSelector(x.target)}\`, \`${x.value}\`);\n`,
                    "capturescreenshot": (x) => `await captureScreenshot(\`${x.target}\`);\n`,
                    "pause": (x) => `await pause('${x.target}');\n`,
                    "mouseOver": (x) => `await mouseOver(\`${locatorToSelector(x.target)}\`);\n`,
                    "deleteallvisiblecookies": (x) => `await deleteAllVisibleCookies();\n`,
                    "captureentirepagescreenshot": (x) => `await captureEntirePageScreenshot(\`${x.target}\`);\n`,
                    "bringbrowsertoforeground": (x) => `await bringBrowserToForeground();\n`,
                    "refresh": (x) => `await refresh();\n`,
                    "selectwindow": (x) => `await selectWindow(\`${x.target}\`, \`${x.value}\`);\n`,
                    "echo": (x) => `await echo(\`${locatorToSelector(x.target)}\`, \`${x.value}\`);\n`,
                    "get": (x) => `await get(\`${x.target}\`);\n`,
                    "comment": (x) => `//${x.target}\n`,
                    "sendkeys": (x) => `await sendKeys(keyDictionary['${x.target}']);\n`,
                    "selectframe": (x) => `await selectFrame(\`${x.target}\`);\n`,
                    "assertalert": (x) => `await assertAlert(\`${x.target}\`);\n`,
                    "asserttext": (x) => `await assertText(\`${locatorToSelector(x.target)}\`, \`${x.value}\`);\n`,
                    "asserttitle": (x) => `await assertTitle(\`${x.value}\`);\n`,
                    "assertprompt": (x) => `await assertPrompt(\`${x.target}\`);\n`,
                    "assertelementpresent": (x) => `await assertElementPresent(\`${locatorToSelector(x.target)}\`);\n`,
                    "assertvalue": (x) => `await assertValue(\`${locatorToSelector(x.target)}\`, \`${x.value}\`);\n`,
                    "verifychecked": (x) => `await verifyChecked(\`${locatorToSelector(x.target)}\`);\n`,
                    "verifyelementpresent": (x) => `await verifyElementPresent(\`${locatorToSelector(x.target)}\`);\n`,
                    "verifytext": (x) => `await verifyText(\`${locatorToSelector(x.target)}\`, \`${x.value}\`);\n`,
                    "verifytitle": (x) => `await verifyTitle(\`${x.value}\`);\n`,
                    "verifyvalue": (x) => `await verifyValue(\`${locatorToSelector(x.target)}\`, \`${x.value}\`);\n`,
                    "waitforpagetoload": (x) => `await waitForPageToLoad();\n`,
                    "waitforvisible": (x) => `await waitForVisible(\`${locatorToSelector(x.target)}\`);\n`
                }
                //commands that can cause navigation:
                //open, click, get, sendkeys

                //needs to determine if navigation has happened, update page, wait for load
                if (payload.capabilityId === 'puppeteerBT') {
                    //ex seleniumToPuppeteer[command] = `new instructions;`;
                }

                let convertedCommands = commands.map((c) => {
                    let equivCommand = seleniumToPuppeteer[c.command.toLowerCase()];

                    if (typeof equivCommand === "function") {
                        return equivCommand(c);
                    }
                    //return `alert('Command "${c.command.toLowerCase()}" not supported');`; //, ${c.target}', '${x.value}');`;
                });


                content =
                    `const puppeteer = require('puppeteer');
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
        '\${KEY_LEFT}': 'ArrowLeft',
        '\${KEY_UP}': 'ArrowUp',
        '\${KEY_RIGHT}': 'ArrowRight',
        '\${KEY_DOWN}': 'ArrowDown',
        '\${KEY_PGUP}': 'PageUp',
        '\${KEY_PAGE_UP}': 'PageUp',
        '\${KEY_PGDN}': 'PageDown',
        '\${KEY_PAGE_DOWN}': 'PageDown',
        '\${KEY_BKSP}': 'Backspace',
        '\${KEY_BACKSPACE}': 'Backspace',
        '\${KEY_DEL}': 'Delete',
        '\${KEY_DELETE}': 'Delete',
        '\${KEY_ENTER}': 'Enter',
        '\${KEY_TAB}': 'Tab',
        '\${KEY_HOME}': 'Home'
    };


    //exported test
    ${convertedCommands.join('\t')}
    await browser.close();\n\n\n\t//function definitions\n`

                //add function definitions to output
                var functions = Object.values(exportFunctions);
                var i, length = functions.length;
                for (i = 0; i < length; i++) {
                    content += functions[i].toString() + "\n";
                }

                content += `})()`;
                extension = 'js';
                mimetype = 'application/javascript';
                break;

            case 'json':
                content = JSON.stringify(commands);
                extension = 'json';
                mimetype = 'application/ld-json';
                break;

            default:
                content = 'Invalid capability ID';
                extension = 'txt';
                mimetype = 'text/plain';
        }

        sendResponse({
            status: true,
            payload: {
                content: content,
                extension: extension,
                mimetype: mimetype
            }
        });
    }
});
