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


chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
    if (message.type === 'katalon_recorder_export') {
        var payload = message.payload;
        var commands = payload.commands;
        var content = '';
        var extension = '';
        var mimetype = '';
        switch (payload.capabilityId) {
            case 'puppeteer':
				debugger;
                let seleniumToPuppeteer = {
                    "open": (x) => `await page.goto('${x.target}');`,
                    "click": (x) => `selector = locatorToSelector(\`${x.target}\`);\n\tawait page.waitForSelector(selector);\n\tawait page.click(selector);`,
                    "echo": (x) => `console.log('${x.target}');`,
                    "store": (x) => `let ${x.target} = ${x.value};`,
                    "type": (x) => `selector = locatorToSelector(\`${x.target}\`);\n\tvar container = await getContainer(\`${x.target}\`, page);\t\nawait container.type(selector, \`${x.value}\`);`,
                    "get": (x) => `await page.goto('${x.target}');`,
                    "comment": (x) => `// ${x.target}`,
                    "sendkeys": (x) => `selector = locatorToSelector(\`${x.target}\`);\n\tawait page.waitForSelector(selector);\n\tawait page.keyboard.sendCharacter(\`${x.value}\`);`,
                    "selectframe": (x) => `if(\`${x.target}\` === 'relative=parent') {\n\t\tpage = page.frames()[0];\n\t}\n\telse if('${x.target}'.substring(0, 5) === 'index') {\n\t\tpage=page.frames()[parseInt('${x.target}'.substring(6))];\n\t};`,
                    "captureScreenshot": (x) => `let name = ${x.target} + ".jpg";\nawait page.goto(page.url());\nawait page.screenshot({ path: name });`,
                    "captureEntirePageScreenshot": (x) => `let name = ${x.target} + ".jpg";\nawait page.screenshot({ path: name, fullPage: true }); `,
                    "bringBrowserToForeground": (x) => `await page.bringToFront();`,
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
                    }`,
                    "pause": (x) => `await page.waitFor(parseInt(${x.target}));`,
                    "mouseOver": (x) => `var path = await locatorToSelector(${x.target});\nvar container = await getContainer(path);\nawait container.hover(path);`,
                    "deleteAllVisibleCookies": (x) => `for (var i = 0; i < browserTabs.length; i++) {
                        await browserTabs[i]._client.send('Network.clearBrowserCookies');
                    }`,
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
                    }`
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

(async () => {
	let browser = await puppeteer.launch({headless: false, args:['--start-maximized']});
    var page = await browser.newPage();

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

    await browser.close()
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
