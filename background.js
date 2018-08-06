// Chrome Extension ID: ljdobmomdgdljniojadhoplhkpialdid
// Firefox Extension ID: {91f05833-bab1-4fb1-b9e4-187091a4d75d}
var extensionId = bowser.firefox ? '{91f05833-bab1-4fb1-b9e4-187091a4d75d}' : 'ljdobmomdgdljniojadhoplhkpialdid';

/** version 0.1 2009-04-30
 * @author      Andrea Giammarchi
 * @license     Mit Style License
 * @project     http://code.google.com/p/css2xpath/
 */css2xpath = (function () { var b = [/\[([^\]~\$\*\^\|\!]+)(=[^\]]+)?\]/g, "[@$1$2]", /\s*,\s*/g, "|", /\s*(\+|~|>)\s*/g, "$1", /([a-zA-Z0-9\_\-\*])~([a-zA-Z0-9\_\-\*])/g, "$1/following-sibling::$2", /([a-zA-Z0-9\_\-\*])\+([a-zA-Z0-9\_\-\*])/g, "$1/following-sibling::*[1]/self::$2", /([a-zA-Z0-9\_\-\*])>([a-zA-Z0-9\_\-\*])/g, "$1/$2", /\[([^=]+)=([^'|"][^\]]*)\]/g, "[$1='$2']", /(^|[^a-zA-Z0-9\_\-\*])(#|\.)([a-zA-Z0-9\_\-]+)/g, "$1*$2$3", /([\>\+\|\~\,\s])([a-zA-Z\*]+)/g, "$1//$2", /\s+\/\//g, "//", /([a-zA-Z0-9\_\-\*]+):first-child/g, "*[1]/self::$1", /([a-zA-Z0-9\_\-\*]+):last-child/g, "$1[not(following-sibling::*)]", /([a-zA-Z0-9\_\-\*]+):only-child/g, "*[last()=1]/self::$1", /([a-zA-Z0-9\_\-\*]+):empty/g, "$1[not(*) and not(normalize-space())]", /([a-zA-Z0-9\_\-\*]+):not\(([^\)]*)\)/g, function (f, e, d) { return e.concat("[not(", a(d).replace(/^[^\[]+\[([^\]]*)\].*$/g, "$1"), ")]") }, /([a-zA-Z0-9\_\-\*]+):nth-child\(([^\)]*)\)/g, function (f, e, d) { switch (d) { case "n": return e; case "even": return "*[position() mod 2=0 and position()>=0]/self::" + e; case "odd": return e + "[(count(preceding-sibling::*) + 1) mod 2=1]"; default: d = (d || "0").replace(/^([0-9]*)n.*?([0-9]*)$/, "$1+$2").split("+"); d[1] = d[1] || "0"; return "*[(position()-".concat(d[1], ") mod ", d[0], "=0 and position()>=", d[1], "]/self::", e) } }, /:contains\(([^\)]*)\)/g, function (e, d) { return "[contains(text(),'" + d + "')]" }, /\[([a-zA-Z0-9\_\-]+)\|=([^\]]+)\]/g, "[@$1=$2 or starts-with(@$1,concat($2,'-'))]", /\[([a-zA-Z0-9\_\-]+)\*=([^\]]+)\]/g, "[contains(@$1,$2)]", /\[([a-zA-Z0-9\_\-]+)~=([^\]]+)\]/g, "[contains(concat(' ',normalize-space(@$1),' '),concat(' ',$2,' '))]", /\[([a-zA-Z0-9\_\-]+)\^=([^\]]+)\]/g, "[starts-with(@$1,$2)]", /\[([a-zA-Z0-9\_\-]+)\$=([^\]]+)\]/g, function (f, e, d) { return "[substring(@".concat(e, ",string-length(@", e, ")-", d.length - 3, ")=", d, "]") }, /\[([a-zA-Z0-9\_\-]+)\!=([^\]]+)\]/g, "[not(@$1) or @$1!=$2]", /#([a-zA-Z0-9\_\-]+)/g, "[@id='$1']", /\.([a-zA-Z0-9\_\-]+)/g, "[contains(concat(' ',normalize-space(@class),' '),' $1 ')]", /\]\[([^\]]+)/g, " and ($1)"], c = b.length; return function a(e) { var d = 0; while (d < c) { e = e.replace(b[d++], b[d++]) } return "//" + e } })();
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
                    },
                    {
                        id: 'autobots',
                        summary: 'autobots',
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
            target = container.target;
            container = container.container;
            var query = await container.$x(target);
            var elementHandle = query[0];
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
            target = container.target;
            container = container.container;
            var query = await container.$x(target);
            var elementHandle = query[0];
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
        target = container.target;
        container = container.container;
        var query = await container.$x(target);
        var elementHandle = query[0];

        var navigation = page.waitForRequest(
            (r) => { return (r.method() === 'GET' && r.isNavigationRequest() && r.frame() === page.mainFrame()) },
            { timeout: 800 }
        );

        await elementHandle.click();

        //if an error is thrown, no navigation reqest was received and it should move on
        try {
            await navigation;
            await page.waitForNavigation({ waitUntil: 'load' });
        } catch (error) {
            return;
        }
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
            target = container.target;
            container = container.container;
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
        target = container.target;
        container = container.container;
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
        var frames = await page.frames();
        var newFrame;

        //relative=top will change frame to top frame
        if (target === 'relative=parent') {
            selectedFrame = selectedFrame.parentFrame();
        }

        else if (target === 'relative=top') {
            selectedFrame = frames[frames.length - 1];
        }

        //index=x will change frame to frame x
        else if (target.substring(0, 5) === 'index') {
            var num = target.substring(6);
            var index = parseInt(num);
            selectedFrame = frames[index];
        }

        //finds frame through name and target
        else {
            newFrame = await frames.find(f => f.name() === target.substring(3, target.length));

            if (newFrame !== null && newFrame !== undefined) {
                selectedFrame = newFrame;
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
            await page.waitForNavigation({ waitUntil: 'load' });
        } catch (error) {
            return;
        }
    },

    type: async function type(target, value) {
        var container = await getContainer(target);
        target = container.target;
        container = container.container;
        var query = await container.$x(target);
        var elementHandle = query[0];
        await elementHandle.type(value);
    },

    verifyChecked: async function verifyChecked(target) {
        var property;
        try {
            var container = await getContainer(target);
            target = container.target;
            container = container.container;
            var query = await container.$x(target);
            var elementHandle = query[0];
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
            target = container.target;
            container = container.container;
            var query = await container.$x(target);
            var elementHandle = query[0];
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
            target = container.target;
            container = container.container;
            var query = await container.$x(target);
            var elementHandle = query[0];
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
        await page.waitForFunction(() => {
            while (document.readyState !== 'complete');
            return true;
        });
    },

    waitForVisible: async function waitForVisible(target) {
        var container = await getContainer(target);
        target = container.target;
        container = container.container;
        return await container.waitForXPath(target, { visible: true });
    },

    getContainer: async function getContainer(selector) {
        await waitForPageToLoad();

        try {
            await selectedFrame.waitForXPath(selector, { timeout: 3000 , visible: true});
            return { container: selectedFrame, target: selector };
        } catch (timeout) {
            //element was not in selectedFrame
        }

        var result = await searchFrames(selector);
        if (result) return { container: result, target: selector };

        //If this is reached, target was not found in any frame, so the locator was bad.
        console.log('Element not found at the given locator: ' + selector);

        //The code below will search nearby indices for nth-of-type elements
        var nthIndexBounds = [];
        var j = selector.length - 1;
        while (j > 0) {
            //skip if the ancestor is an not nth-of-type()
            if (selector.charAt(j) === ']') {
                var k = j;

                //grab the index. skip if there is no index
                j = j - 2;
                while (selector.charAt(j) !== '[') j--;
                try {
                    index = parseInt(selector.substring(j + 1, k));
                    if (isNaN(index)) throw Error('Tried to parse a predicate as an index. Oops. Moving on.');
                    nthIndexBounds.unshift(k); //end
                    nthIndexBounds.unshift(j + 1); //start
                } catch (notAnInt) {
                    //console.log(notAnInt);
                }
            }

            //find the next ancestor's end
            while (j > 0 && selector.charAt(j) !== '/' && selector.charAt(j - 1) !== '/') {
                j--;
            }

            j--;
        }

        //while holding all else the same, check the closest indices of all elements in the path where
        //an index is used (nth-of-type elements)
        //ex: //span[5]/div[5], //span[4]/div[5], //span[3]/div[5]... //span[6]/div[5]... //span[5]/div[4]... //span[5]/div[6]... and so on
        var numIndices = nthIndexBounds.length / 2;
        for (i = 0; i < numIndices; i += 2) {
            var start = nthIndexBounds[i];
            var end = nthIndexBounds[i + 1];
            var index = parseInt(selector.substring(start, end));
            var newSelector;

            var range = 10;
            for (j = -1 * range; j <= range; j++) {
                if (index + j < 1 || j === 0) continue;
                newSelector = selector.substring(0, start) + (index + j) + selector.substring(end, selector.length);
                console.log('Looking for element at: ' + newSelector);
                var result = await searchFrames(newSelector);
                if (result) {
                    return { container: result, target: newSelector };
                }
            }
        }

        console.log('Element not found. Returning null.');
        return null;
    },

    searchFrames: async function searchFrames(selector) {
        await page.waitFor(500);
        var frames = await page.frames();
        var i, length = frames.length;
        for (i = 0; i < length; i++) {
            query = await frames[i].$x(selector);
            element = query[0];
            if (element && element != undefined && element.toString() !== undefined) {
                try {
                    frames[i].waitFor(selector, {timeout: 5000, visible: true});
                } catch (error) {
                    throw "Element found, but it never became visible. " + error;
                    process.exit();
                }
                return frames[i];
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

/**
 * This function assumes that Katalon's Record uses the ExtensionScript.js, which
 * should be found in the same directory as this file (background.js). The preference of
 * locators is absoluteCSS, xpath:position, xpath:idRelative, xpath:link, css.
 * It is unlikely that anything other than xpath will be received, as absoluteCSS does not
 * currently work. The rest of the checks are just in case.
 * */
function locatorToSelector(target) {
    var selector = target;

    if (target.substring(0, 1) === "/" || target.substring(0, 2) === "//") {
        return selector;
    } else if (target.substring(0, 6) === "xpath=") {
        selector = target.substring(6, target.length);
    } else if (target.substring(0, 12) === "absoluteCSS=") {
        selector = css2xpath(target.substring(12, target.length));
    } else if (target.substring(0, 4) === "css=") {
        selector = css2xpath(target.substring(4, target.length));
    } else if (target.substring(0, 5) === "name=") {
        selector = "//*[@name=\"" + target.substring(5, target.length) + "\"]";
    } else if (target.substring(0, 3) === "id=") {
        selector = "//*[@id=\"" + target.substring(3, target.length) + "\"]";
    } else if (target.substring(0, 5) === "link=") {
        var offset = 5;
        if (target.substring(5, 11) == 'exact:') {
            offset = 11
        }
        selector = "//a[contains(text(),'" + target.substring(offset, target.length) + "')]";
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
                    "sendkeys": (x) => `await sendKeys(keyDictionary[\`\\${x.target.charAt(0) === '$' ? x.target : x.value}\`]);\n`,
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
    var selectedFrame = page;
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

            case 'autobots':
                convertToAutobots = {
                    "open": (x) => convert_open(x),
                    "click": (x) => convert_click(x),
                    "store": (x) => `\n\t\t//initialize variable: ${x.target} with value: ${x.value}\n\t\tvar ${x.target} = '${x.value}';\n`,
                    "type": (x) => convert_type(x),
                    "get": (x) => convert_open(x),
                    "comment": (x) => `\t\t// ${x.target}\n`,
                    "sendkeys": (x) => convert_sendKeys(x),
                    "selectFrame": (x) => convert_selectFrame(x),
                    "captureScreenshot": (x) => convert_captureScreenshot(x),
                    "captureEntirePageScreenshot": (x) => convert_captureScreenshot(x),
                    "bringBrowserToForeground": (x) => `\n\t\t//Bring browser to foreground\n\t\tawait page.bringToFront();\n`,
                    "refresh": (x) => `\n\t\t//Refresh the page\n\t\tawait globalUI.refreshPage();\n`,
                    "selectWindow": (x) => convert_selectWindow(x),
                    "pause": (x) => `\n\t\t//Delay for ${x.target} milliseconds\n\t\tawait globalUI.delay(${x.target});\n`,
                    "mouseOver": (x) => convert_mouseOver(x),
                    "deleteAllVisibleCookies": (x) => convert_deleteAllCookies(x),
                    "echo": (x) => tempFunction(x),
                    "assertAlert": (x) => tempFunction(x),
                    "assertText": (x) => convert_assertText(x),
                    "assertTitle": (x) => tempFunction(x),
                    "assertValue": (x) => convert_assertValue(x),
                    "assertElementPresent": (x) => convert_testID(x),
                    "assertPrompt": (x) => tempFunction(x),
                    "verifyChecked": (x) => convert_verifyChecked(x),
                    "verifyNotChecked": (x) => convert_verifyNotChecked(x),
                    "verifyElementPresent": (x) => convert_testID(x),
                    "verifyText": (x) => convert_testID(x),
                    "verifyTitle": (x) => convert_testID(x),
                    "verifyValue": (x) => convert_testID(x),
                    "waitForPageToLoad": (x) => `\n\t\t//Wait for current page to load\n\t\tawait globalUI.waitForPageToLoad();`,
                    "waitForVisible": (x) => convert_testID(x)
                }

                let autobotsConvertedCommands = commands.map((c) => {
                    let equivCommand = convertToAutobots[c.command];

                    //return it
                    if (typeof equivCommand !== "undefined") {
                        return equivCommand(c);
                    }
                    else {
                        return `\n\t\t//not supported command: ${c.command} with target: ${c.target}\n\n`;
                    }
                    //return `alert('Command "${c.command.toLowerCase()}" not supported');`; //, ${c.target}', '${x.value}');`;
                });


                content =
                    `var fields = require('./globalFields');
var bt = require('./globalFunctions');
var builderLinks = require('./builderLinks');
var colors = require('colors');
const puppeteer = require('puppeteer');
var browserState = require('./isHeadless');
var isHeadless = browserState.getHeadless();
var isSlowMo = browserState.getSlowMo();
var chromiumProfile = "C:\\\\uitests\\\\chromiumProfile";

//call function
testName();

/**
   * DESCRIBE THE TEST HERE
   * @example testName()
   * */
async function testName() {
    await puppeteer.launch({ headless: isHeadless, userDataDir: chromiumProfile, slowMo: isSlowMo, args: ['--start-maximized'] }).then(async browser => {
        //this will log the failure, close the browser, and exit Node if pupeteer fails
        const unhandledRejectionHandler = (reason, p) => {
            console.log('FAIL Unhandled Rejection, '.bold.red + reason.bold.red);
            browser.close();
            process.exit();
        };
        //this will handle puppeteer getting unhandled promise rejection
        process.on('unhandledRejection', unhandledRejectionHandler);
        const initialPage = await browser.pages();
        const page = await initialPage[0];

        //If page has error, such as such as jserror
        await page.on("pageerror", async function (err) {
            theTempValue = await err.toString();
            var newText = await theTempValue.indexOf("cannot call methods on dialog prior to initialization; attempted to call method 'option'");
            if (newText < 0) {
                await console.log('\\nJS Error: '.bold.red + err.bold.red);
            }
        });
        //If page has error, such as exception
        await page.on("error", async function (err) {
            await console.log('\\nOther Error: '.bold.red + err.bold.red);
        });
        //If page has error where link takes you to error page
        await page.on("load", async function (err) {
            page.evaluate(() => document.body.innerText)
                .then(function (resp) {
                    tempValue = resp;
                    var textThere = tempValue.indexOf("We're sorry, the system has encountered an error processing your request.");
                    if (textThere > -1) {
                        console.log('\\nError: '.bold.red + err.bold.red);
                    }
                });
        });
        //for js alerts
        await page.on('dialog', async dialog => {
            await dialog.accept()
                .then(function (resp) {
                    console.log("\\n**Click OK in javascript alert**".bold.yellow);
                    console.log('Javascript Alert Text: '.gray + dialog.message().gray);
                }).catch(function (error) {
                    console.log('FAIL Javascript Alert OK pressed : '.bold.red + err.bold.red);
                });
        });

        //setup puppeteer
        const globalUI = await new bt(page);
        await page.setViewport({ width: 1920, height: 1080 });
        //set errorscreenshot name
        var theName = await arguments.callee.toString().match(/function ([^\\(]+)/)[1];
        await globalUI.setScreenshotErrorName(theName, arguments.callee);

        //set variables
        var theSetTime = await globalUI.getShortDate();

        /////////////////////////////////
        // BEGIN TESTS
        /////////////////////////////////

        ${autobotsConvertedCommands.join('')}
        //close the browser
        await setTimeout(function () { browser.close(); }, 2500);
    });
}

${selectorsObjectString}
}`;
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

///////////////////////////////////////////////
//      FUNCTIONS FOR AUTOBOTS EXPORT        //
///////////////////////////////////////////////

//hold count for selectors we need names for
var selectorCount = 1;

//will hold all the selectors in an object
var selectorsObjectString = `testFields = {\n\t`;

//will add the selector to the selectorsObjectString if it isn't there already
function addToSelectorsObject(theSelectorObject) {
    //initialize variables
    var objectTitle = theSelectorObject.title;
    var newObject = JSON.stringify(theSelectorObject);


    //fix object formatting problems
    newObject = newObject.replace(/"id":/g, "id: ");
    newObject = newObject.replace(/"title":/g, "\t\ttitle: ");
    newObject = newObject.replace(/,/g, ",\n");
    newObject = newObject.replace(/{/g, "{\n\t\t");
    newObject = newObject.replace(/}/g, "\n\t},\n\t");

    //only add it if it doesn't exist yet
    if (selectorsObjectString.indexOf(newObject) == -1) {
        selectorsObjectString += objectTitle + ": " + newObject;
    }
}

//converts the selector
function convertSelector(theSelector) {
    var newSelector = ``;

    //regular CSS selector
    if (theSelector.substr(0, 3) == "id=") {
        newSelector = "#" + theSelector.substr(3);
    }
    //xPath
    else if (theSelector.indexOf("[@id") != -1) {
        newSelector = "//*" + theSelector.substr(theSelector.indexOf("[@id"));
    }
    //xPath other
    else if (theSelector.indexOf("xpath=") != -1) {
        newSelector = "//*" + theSelector.substr(theSelector.indexOf("[@"));
    }
    //something else
    else {
        newSelector = theSelector;
    }

    //return the new selector
    return newSelector;
}

//gets title for selector
function getSelectorTitle(theSelector) {
    var newSelector = theSelector;

    //remove everything until there are no underscores left
    do {
        newSelector = newSelector.substr(newSelector.indexOf("_") + 1);
    } while (newSelector.indexOf("ctl00_") != -1 || newSelector.indexOf("BaseMain_") != -1 || newSelector.indexOf("MainContentHolder_") != -1 || newSelector.indexOf("MasterMain_") != -1 || newSelector.indexOf("BTTabControl1_") != -1 || newSelector.indexOf("ctlMainMenu_") != -1)

    //fix titles to have no special characters
    if (newSelector.indexOf("/") != -1 || newSelector.indexOf("xpath=") != -1) {
        newSelector = "selector" + selectorCount;
        selectorCount++;
    }

    //return the new selector
    return newSelector;
}

//OPEN
function convert_open(x) {
    //initialize string
    var theString = ``;

    //finalize theString
    theString = `//go to ${x.target}\n\t\t`;
    theString += `await globalUI.goToPage('${x.target}');\n`;

    //return the string
    return theString;
}

//CLICK
function convert_click(x) {
    //initialize string
    var theString = ``;

    //initialize the selector
    var theSelector = {
        id: "",
        title: ""
    };

    //for top menu (if needed)
    var hoverSelector = {
        id: "",
        title: ""
    };

    //if not a link
    if (x.target.indexOf("link=") == -1) {
        //convert selector
        theSelector.id = convertSelector(x.target);
        theSelector.title = getSelectorTitle(x.target);

        //add to selector object
        addToSelectorsObject(theSelector);

        //if its not the dropdown menu
        if (x.target.indexOf("rptNewDropDownMenuItems") == -1) {
            //if its not a dropdown item
            if (theSelector.id.indexOf("ul") == -1 && theSelector.id.indexOf("li") == -1) {
                theString = `\n\t\t//click on selector: ${theSelector.title}\n\t\tawait globalUI.clickID(testFields.${theSelector.title});\n`;
            }
            //if its a dropdown item
            else {
                theString = `\n\t\t//click on selector: ${theSelector.title}\n\t\tawait globalUI.clickHiddenID(testFields.${theSelector.title});\n`;
            }
        }
        else {
            //need to get the top menu selector
            hoverSelector.id = convertSelector(x.target);
            hoverSelector.title = getSelectorTitle(x.target);

            //modify them to make it the appropriate main icon
            hoverSelector.id = hoverSelector.id.substr(0, hoverSelector.id.indexOf("rptNew"));
            hoverSelector.id += "pnlNewTopMenu";
            hoverSelector.title = hoverSelector.title.substr(0, 5) + "_pnlNewTopMenu";

            //add to selector object
            addToSelectorsObject(hoverSelector);

            theString = `
        //hover over top menu selector: ${hoverSelector.title}
        await globalUI.mouseHoverOver(testFields.${hoverSelector.title});
        
        //click on the dropdown menu icon: ${theSelector.title}
        await globalUI.clickID(testFields.${theSelector.title});\n`;
        }
    }
    //if it is a link
    else {
        //trim down the link to just the text
        var theLink = x.target.substr(5);

        //open link by text
        theString = `
        //open link with text: ${theLink}
        await globalUI.clickText("${theLink}");\n`;
    }

    //return the string
    return theString;
}

//TYPE
function convert_type(x) {
    //initialize string
    var theString = ``;

    //initialize the selector
    var theSelector = {
        id: "",
        title: ""
    };

    //convert selector
    theSelector.id = convertSelector(x.target);
    theSelector.title = getSelectorTitle(x.target);

    //add to selector object
    addToSelectorsObject(theSelector);

    //if its not the dropdown menu
    theString = `
        //populate ${theSelector.title} with value: ${x.value}
        await globalUI.fillTextField(testFields.${theSelector.title}, "${x.value}");\n`;


    //return the string
    return theString;
}

//ASSERT TEXT
function convert_assertText(x) {
    //initialize string
    var theString = ``;

    //initialize the selector
    var theSelector = {
        id: "",
        title: ""
    };

    //convert selector
    theSelector.id = convertSelector(x.target);
    theSelector.title = getSelectorTitle(x.target);

    //add to selector object
    addToSelectorsObject(theSelector);

    //if its not the dropdown menu
    theString = `
        //Verify that ${theSelector.title} is populated with text value: ${x.value}
        await globalUI.testTextValue(testFields.${theSelector.title}, "${x.value}");\n`;

    //return the string
    return theString;
}

//ASSERT VALUE
function convert_assertValue(x) {
    //initialize string
    var theString = ``;

    //initialize the selector
    var theSelector = {
        id: "",
        title: ""
    };

    //convert selector
    theSelector.id = convertSelector(x.target);
    theSelector.title = getSelectorTitle(x.target);

    //add to selector object
    addToSelectorsObject(theSelector);

    //if it's not a checkbox
    if (x.value != "off" && x.value != "on") {
        //add to string
        theString = `
        //Verify that ${theSelector.title} is populated with value: ${x.value}
        await globalUI.testValue(testFields.${theSelector.title}, "${x.value}");\n`;
    }
    //if its a checkbox
    else {
        //checked
        if (x.value == "on") {
            //add to string
            theString = `\n\t\t//Verify that ${theSelector.title} is checked
        await globalUI.validateCheckedStatus(testFields.${theSelector.title});\n`;
        }
        else if (x.value == "off") {
            //add to string
            theString = `\n\t\t//Verify that ${theSelector.title} is NOT checked
        await globalUI.validateNotCheckedStatus(testFields.${theSelector.title});\n`;
        }
    }

    //return the string
    return theString;
}

//VERIFY CHECKED
function convert_verifyChecked(x) {
    //initialize string
    var theString = ``;

    //initialize the selector
    var theSelector = {
        id: "",
        title: ""
    };

    //convert selector
    theSelector.id = convertSelector(x.target);
    theSelector.title = getSelectorTitle(x.target);

    //add to selector object
    addToSelectorsObject(theSelector);

    //if its not the dropdown menu
    theString = `
        //Verify that ${theSelector.title} is checked
        await globalUI.validateCheckedStatus(testFields.${theSelector.title});\n`;

    //return the string
    return theString;
}

//VERIFY NOT CHECKED
function convert_verifyNotChecked(x) {
    //initialize string
    var theString = ``;

    //initialize the selector
    var theSelector = {
        id: "",
        title: ""
    };

    //convert selector
    theSelector.id = convertSelector(x.target);
    theSelector.title = getSelectorTitle(x.target);

    //add to selector object
    addToSelectorsObject(theSelector);

    //if its not the dropdown menu
    theString = `
        //Verify that ${theSelector.title} is NOT checked
        await globalUI.validateNotCheckedStatus(testFields.${theSelector.title});\n`;

    //return the string
    return theString;
}

//TEST ID
function convert_testID(x) {
    //initialize string
    var theString = ``;

    //initialize the selector
    var theSelector = {
        id: "",
        title: ""
    };

    //convert selector
    theSelector.id = convertSelector(x.target);
    theSelector.title = getSelectorTitle(x.target);

    //add to selector object
    addToSelectorsObject(theSelector);

    //if its not the dropdown menu
    theString = `
        //ensure that ${theSelector.title} is present
        await globalUI.testID(testFields.${theSelector.title});\n`;


    //return the string
    return theString;
}

//SELECT FRAME
function convert_selectFrame(x) {
    //initialize string
    var theString = ``;

    //for holding the index
    var theIndex = x.target;

    //if its the parent, set it to 0, otherwise get the index
    if (theIndex.indexOf("parent") != -1) {
        theIndex = 0;
    }
    else {
        theIndex = theIndex.substr(6);
    }

    //if its not the dropdown menu
    theString = `
        //select frame by index: ${theIndex}
        await globalUI.selectFrameByIndex(${theIndex});\n`;


    //return the string
    return theString;
}

//SEND KEYS
function convert_sendKeys(x) {
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

    //get key from dictionary
    var theKey = keyDictionary[`\\${x.value}`];

    //initialize string
    var theString = ``;

    //finalize theString
    theString = `//hit key on keyboard: ${theKey}\n\t\t`;
    theString += `await globalUI.hitKey('${theKey}');\n`;

    //return the string
    return theString;
}

//CAPTURE SCREENSHOT
function convert_captureScreenshot(x) {
    //initialize string
    var theString = ``;

    //finalize theString
    theString = `//take screenshot and name it: ${x.target}\n\t\t`;
    theString += `await globalUI.takeScreenshot('${x.target}');\n`;

    //return the string
    return theString;
}

//SELECT WINDOW
function convert_selectWindow(x) {
    //initialize string
    var theString = ``;

    //add comment and variable initialization
    theString = `\n\t\t//select window: ${x.target}\n\t\t`;
    theString += `var browserTabs = await [];\n\t\tawait browserTabs.push(page);`;

    if (x.target.substring(9) === 'local') {
        theString += `\n\t\tawait browserTabs[0].bringToFront()\n\t\tpage = browserTabs[0];\n\t\tawait page.waitFor(1000);\n`;
    } else if (x.target.substring(9) > browserTabs.length) {
        theString += `\n\t\tvar newTab = await page.browser().newPage();\n\t\tawait newTab.setViewport(page.viewport());\n\t\tawait newTab.goto(${ x.value }, { waitUntil: 'networkidle2' });\n\t\tawait newTab.bringToFront();\n\t\tawait browserTabs.push(newTab);\n\t\tpage = newTab;\n`;
    } else if (parseInt(x.target.substring(9)) >= 0) {
        theString += `\n\t\tvar goto = parseInt(target.substring(9));\n\t\tawait browserTabs[goto].bringToFront();\n\t\tpage = browserTabs[goto];\n\t\tawait page.waitFor(1000);\n`;
    }

    //return the string
    return theString;
}

//MOUSE OVER
function convert_mouseOver(x) {
    //initialize string
    var theString = ``;

    //initialize the selector
    var theSelector = {
        id: "",
        title: ""
    };

    //convert selector
    theSelector.id = convertSelector(x.target);
    theSelector.title = getSelectorTitle(x.target);

    //add to selector object
    addToSelectorsObject(theSelector);

    //if its not the dropdown menu
    theString = `
        //Hover mouse over ${theSelector.title}
        await globalUI.mouseHoverOver(testFields.${theSelector.title});\n`;

    //return the string
    return theString;
}

//DELETE COOKIES
function convert_deleteAllCookies(x) {
    //initialize string
    var theString = ``;

    //add comment and variable initialization
    theString = `\n\t\t//Initialize for clearing cookies: ${x.target}\n\t\t`;
    theString += `var browserTabs = await [];\n\t\tawait browserTabs.push(page);\n\t\t`;

    theString += `\n\t\t//Clear all cookies\n\t\tfor (var i = 0; i < browserTabs.length; i++) {\n\t\t\tawait browserTabs[i]._client.send('Network.clearBrowserCookies');\n\t\t}\n\t\t`;

    //return the string
    return theString;
}

//temp
function tempFunction(x) {
    var theString = `\n\t\t//FUNCTION NOT CURRENTLY SUPPORTED\n\t\t//Function Attempted: ${x}`;
}