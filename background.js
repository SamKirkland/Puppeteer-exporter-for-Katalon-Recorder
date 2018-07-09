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


chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
    if (message.type === 'katalon_recorder_export') {
        var payload = message.payload;
        var commands = payload.commands;
        var content = '';
        var extension = '';
        var mimetype = '';

        switch (payload.capabilityId) {
            case 'puppeteer':
                debugger;
            case 'puppeteerBT':
                debugger;
            case 'puppeteerShared':
                seleniumToPuppeteer = {
                    "open": (x) => `await page.goto('${x.target}');\n`,
                    "click": (x) => `
                    selector = locatorToSelector(\`${x.target}\`);
                    container = await getContainer(selector);
                try{
                    await container.waitForSelector(selector);
                    await delay (250);
                    await container.click(selector);
                }catch() {
                    container.mouse.down();
                }\n`,
                    "echo": (x) => `console.log('${x.target}');\n`,
                    "store": (x) => `let ${x.target} = ${x.value};\n`,
                    "type": (x) => `selector = locatorToSelector(\`${x.target}\`);
                container = await getContainer(selector);
                await container.type(selector, \`${x.value}\`);\n`,
                    "get": (x) => `await page.goto('${x.target}');\n`,
                    "comment": (x) => `// ${x.target}\n`,
                    "sendkeys": (x) => `await page.keyboard.sendCharacter(\`${x.value}\`);
                await waitForPageEnter(\`${x.value}\`);\n`,
                    "selectframe": (x) => `if(\`${x.target}\` === 'relative=parent') {\n\t\tpage = page.frames()[0];\n\t}\n\telse if('${x.target}'.substring(0, 5) === 'index') {\n\t\tpage=page.frames()[parseInt('${x.target}'.substring(6))];\n\t};\n`,
                    "captureScreenshot": (x) => `let name = ${x.target} + ".jpg";\nawait page.goto(page.url());\nawait page.screenshot({ path: name });\n`,
                    "captureEntirePageScreenshot": (x) => `let name = ${x.target} + ".jpg";\nawait page.screenshot({ path: name, fullPage: true });\n`,
                    "bringBrowserToForeground": (x) => `await page.bringToFront();\n`,
                    "refresh": (x) => `await page.reload();`,
                    "selectWindow": (x) => `if (${x.target}.substring(4).toLowerCase() === 'open') {\n
                var newTab = await page.browser().newPage();
                await newTab.setViewport(page.viewport());
                await newTab.goto(${x.value}, { waitUntil: 'networkidle2' });
                await newTab.bringToFront();
                await browserTabs.push(newTab);
                page = newTab;
            } else if (${x.target}.substring(4).toLowerCase() === 'closealltogether') {
                for (var i = 0; i < browserTabs.length; i++) {
                    if (browserTabs[i] !== page) {
                        await browserTabs[i].close();
                    }
                }
                var newTabs = [page];
                browserTabs = [];
                browserTabs = newTabs;
            } else if (parseInt(${x.target}.substring(4)) >= 0) {
                var goto = parseInt(target.substring(4));
                await browserTabs[goto].bringToFront();
                page = browserTabs[goto];
                await page.waitFor(1000);
            }\n`,
                    "pause": (x) => `await page.waitFor(parseInt(${x.target}));\n`,
                    "mouseOver": (x) => `var path = await locatorToSelector(${x.target});\nvar container = await getContainer(path);\nawait container.hover(path);\n`,
                    "deleteAllVisibleCookies": (x) => `for (var i = 0; i < browserTabs.length; i++) {
                await browserTabs[i]._client.send('Network.clearBrowserCookies');
            }\n`,
                    "echo": (x) => `var path, container;
            if (value !== "#shownotification") {
                path = await locatorToSelector(${x.target});
                container = await getContainer(path);
            } else {
                container = page;
            }
    
            if (container.evaluate('Notification.permission !== "granted"') && value === "#shownotification") {
                await container.evaluate('Notification.requestPermission()');
                await container.evaluate(t => {
                    new Notification('Notification title', { body: t });
                }, ${x.target});
            } else if (value === "#shownotification") { //notification access already granted.
                await container.evaluate(t => {
                    new Notification('Notification title', { body: t });
                }, ${x.target});
            }\n`,
                    "assertAlert": (x) => `try {
                                            await assertionHelper(${x.target}, \`/alert\\(['"]([^'"]+)['"]\\)/\`);
                                            console.log("Target: '" + ${x.target} + "' found.");
                                        } catch (error) {
                                            console.log("Alert message not found.");
                                        }`,
                    "assertChecked": (x) => `var property;

                                            try {
                                                var selector = locatorToSelector(${x.target});
                                                var container = await getContainer(selector);
                                                const elementHandle = await container.waitForSelector(selector);
                                                const jshandle = await elementHandle.getProperty('checked');
                                                property = await jshandle.jsonValue();
                                            } catch (err) {
                                                throw new Error("assertChecked FAILED. Unable to retreive element or property. Error message:\n" + err);
                                                process.exit();
                                            }
                                        
                                            if (property) {
                                                console.log("assertChecked PASSED. Element is checked.");
                                            } else {
                                                throw new Error("assertChecked FAILED. Element is unchecked.");
                                                process.exit();
                                            }`,
                    "assertConfirmation": (x) => `try {
                                                    await assertionHelper(${x.target}, \`confirm\\(['"]([^'"]+)['"]\\)\`);
                                                    console.log("Target: '" + ${x.target} + "' found.");
                                                } catch (error) {
                                                    console.log("Confirmation message not found.");
                                                }`,
                    "assertText": (x) => `var property;

                                        try {
                                            var selector = locatorToSelector(${x.target});
                                            var container = await getContainer(selector);
                                            const elementHandle = await container.waitForSelector(selector);
                                            const jshandle = await elementHandle.getProperty('text');
                                            property = await jshandle.jsonValue();
                                        } catch (err) {
                                            throw ("assertText FAILED. Unable to retreive element or property. Error message:\n" + err);
                                            process.exit();
                                        }
                                    
                                        if (property === ${x.value}) {
                                            console.log("assertText PASSED. Actual value = '" + property + "'. Given value = '" + ${x.value} + "'.");
                                        } else {
                                            throw ("assertText FAILED. Actual value = '" + property + "'. Given value = '" + ${x.value} + "'.");
                                            process.exit();
                                        }`,
                    "assertTitle": (x) => `var title;

                                        try {
                                            title = await page.title();
                                        } catch (err) {
                                            throw ("verifyTitle FAILED. Could not retreive title. Error message:\n" + err);
                                            process.exit();
                                        }
                                    
                                        if (title === ${x.value}) {
                                            console.log("assertTitle PASSED. Actual value = '" + title + "'. Given value = '" + ${x.value} + "'.");
                                        } else {
                                            throw "assertTitle FAILED. Actual value = '" + title + "'. Given value = '" + ${x.value} + "'.";
                                            process.exit();
                                        }`,
                    "assertElementPresent": (x) => `var selector = locatorToSelector(${x.target});

                                                if (await elementExists(selector)) {
                                                    console.log("assertElementPresent PASSED.");
                                                } else {
                                                    throw ("assertElementPresent FAILED. Element not found.");
                                                    process.exit();
                                                }`,
                    "assertPrompt": (x) => `try {
                                            await assertionHelper(target, \`prompt\\(['"]([^'"]+)['"]\`);
                                            console.log("Target: '" + target + "' found.");
                                        } catch (error) {
                                            console.log("Prompt message not found.");
                                        }`,
                    "assertValue": (x) => `var property;

                                        try {
                                            var selector = locatorToSelector(${x.target});
                                            var container = await getContainer(selector);
                                            const elementHandle = await container.waitForSelector(selector);
                                            const jshandle = await elementHandle.getProperty('value');
                                            property = await jshandle.jsonValue();
                                        } catch (err) {
                                            throw ("assertValue FAILED. Unable to retreive element or property. Error message:\n" + err);
                                            process.exit();
                                        }
                                    
                                        if (property === ${x.value}) {
                                            console.log("assertValue PASSED. Actual value = '" + property + "'. Given value = '" + ${x.value} + "'.");
                                        } else {
                                            throw "assertValue FAILED. Actual value = '" + property + "'. Given value = '" + ${x.value} + "'.";
                                            process.exit();
                                        }`,
                    "verifyChecked": (x) => `var property;

                                        try {
                                            var selector = locatorToSelector(${x.target});
                                            var container = await getContainer(selector);
                                            const elementHandle = await container.waitForSelector(selector);
                                            const jshandle = await elementHandle.getProperty('checked');
                                            property = await jshandle.jsonValue();
                                        } catch (err) {
                                            return console.log("verifyChecked FAILED. Unable to retreive element or property. Error message:\n" + err);
                                        }
                                    
                                        if (property) {
                                            console.log("verifyChecked PASSED. Element is checked.");
                                        } else {
                                            console.log("verifyChecked FAILED. Element is unchecked.");
                                        }`,
                    "verifyElementPresent": (x) => `var selector = locatorToSelector(${x.target});

                                                if (await elementExists(selector)) {
                                                    console.log("verifyElementPresent PASSED.");
                                                } else {
                                                    console.log("verifyElementPresent FAILED. Element not found.");
                                                }`,
                    "verifyText": (x) => `var property;

                                        try {
                                            var selector = locatorToSelector(${x.target});
                                            var container = await getContainer(selector);
                                            const elementHandle = await container.waitForSelector(selector);
                                            const jshandle = await elementHandle.getProperty('text');
                                            property = await jshandle.jsonValue();
                                        } catch (err) {
                                            return console.log("verifyText FAILED. Unable to retreive element or property. Error message:\n" + err);
                                        }
                                    
                                        if (property === ${x.value}) {
                                            console.log("verifyText PASSED. Actual value = '" + property + "'. Given value = '" + ${x.value} + "'.");
                                        } else {
                                            console.log("verifyText FAILED. Actual value = '" + property + "'. Given value = '" + ${x.value} + "'.");
                                        }`,
                    "verifyTitle": (x) => `var title;

                                        try {
                                            title = await page.title();
                                        } catch (err) {
                                            return console.log("verifyTitle FAILED. Could not retreive title. Error message:\n" + err);
                                        }
                                    
                                        if (title === ${x.value}) {
                                            console.log("verifyTitle PASSED. Actual value = '" + title + "'. Given value = '" + ${x.value} + "'.");
                                        } else {
                                            console.log("verifyTitle FAILED. Actual value = '" + title + "'. Given value = '" + ${x.value} + "'.");
                                        }`,
                    "verifyValue": (x) => `var property;
                                    
                                        try {
                                            var selector = locatorToSelector(${x.target});
                                            var container = await getContainer(selector);
                                            const elementHandle = await container.waitForSelector(selector);
                                            const jshandle = await elementHandle.getProperty('value');
                                            property = await jshandle.jsonValue();
                                        } catch (err) {
                                            return console.log("verifyValue FAILED. Unable to retreive element or property. Error message:\n" + err);
                                        }
                                    
                                        if (property === ${x.value}) {
                                            console.log("verifyValue PASSED. Actual value = '" + property + "'. Given value = '" + ${x.value} + "'.");
                                        } else {
                                            console.log("verifyValue FAILED. Actual value = '" + property + "'. Given value = '" + ${x.value} + "'.");
                                        }`,
                    "waitForPageToLoad": (x) => `while (await page.evaluate('document.readyState !== \'complete\';'));`,
                    "waitForVisible": (x) => `var selector = locatorToSelector(${x.target}); var container = await getContainer(selector); return await container.waitForSelector(selector, { visible: true });`
                }

                if(payload.capabilityId === 'puppeteerBT') {
                    //ex seleniumToPuppeteer[command] = `new instructions;`;
                }

                let convertedCommands = commands.map((c) => {
                    let equivCommand = seleniumToPuppeteer[c.command.toLowerCase()];

                    if (typeof equivCommand === "function") {
                        return equivCommand(c);
                    }
                    return `alert('Command "${c.command.toLowerCase()}" not supported');`; //, ${c.target}', '${x.value}');`;
                });

                content =
                    `const puppeteer = require('puppeteer');
const xpath2css = require('xpath2css');
const delay = require('delay');
// built in selenium vars
// https://github.com/Jongkeun/selenium-ide/blob/6d18a36991a9541ab3e9cad50c2023b0680e497b/packages/selenium-ide/src/content/selenium-api.js
let KEY_BACKSPACE = "\\uE003"; let KEY_BKSP = KEY_BACKSPACE;
let KEY_TAB = "\\uE004";
let KEY_ENTER = "\\uE007";
let KEY_SHIFT = "\\uE008";
let KEY_ESC = "\\uE00C"; let KEY_ESCAPE = KEY_ESC;
let KEY_DELETE = "\\uE017"; let KEY_DEL = KEY_DELETE;

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

async function elementExists(selector) {
    try {
        var elementhandle = await page.$(selector);

        if (elementhandle) {
            return true;
        } else {
            var frames = await curpage.frames();
            var i, length = frames.length;
            for (i = 0; i < length; i++) {
                elementhandle = await frames[i].$(selector);

                if (elementhandle) {
                    return true;
                }
            }
        }
    } catch (err) {
        return false;
    }
    return false;
}
var page;
var keyDictionary = {
    '$(KEY_LEFT)': 'ArrowLeft',
    '$(KEY_UP)': 'ArrowUp',
    '$(KEY_RIGHT)': 'ArrowRight',
    '$(KEY_DOWN)': 'ArrowDown',
    '$(KEY_PGUP)': 'PageUp',
    '$(KEY_PAGE_UP)': 'PageUp',
    '$(KEY_PGDN)': 'PageDown',
    '$(KEY_PAGE_DOWN)': 'PageDown',
    '$(KEY_BKSP)': 'Backspace',
    '$(KEY_BACKSPACE)': 'Backspace',
    '$(KEY_DEL)': 'Delete',
    '$(KEY_DELETE)': 'Delete',
    '\${KEY_ENTER}\': 'Enter',
    '$(KEY_TAB)': 'Tab',
    '$(KEY_HOME)': 'Home'
};

async function assertionHelper(target, regex) {
    await curpage.evaluate((t, r) => {
        var elem = document.scripts;
        var reg = new RegExp(r);
        for (var i = 0; i < elem.length; i++) {
            var txt = elem[i].textContent.match(reg);
            if (txt) {
                var checkText = txt[1].replace('\\n', '\n');
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

(async () => {
	let browser = await puppeteer.launch({headless: false, args:['--start-maximized']});
    var initPage = await browser.newPage();
    page = initPage;
    var selector = null;
    var container = null;
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
    ${convertedCommands.join('\n\t')}

    // helper function for enter button to wait
    async function waitForPageEnter(value) {
		console.log(value);
		if(value === \`\${KEY_ENTER}\`) {
			await console.log("ya we waitin");
			await page.waitForNavigation({ timeout: 4500 });
		}

    }

    await browser.close();
    
})()`;


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
