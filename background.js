const extensionId = 'ljdobmomdgdljniojadhoplhkpialdid';

/**
 * Setup Google Analytics code
 * Note: I take privacy very seriously, google analytics is only used to log actions (see googleAnalyticsEvent function below)
 * I do not log exported scripts in any way (they could contain sensitive data!)
 * Feel free to turn off GA in the extensions options, message me on github if you have concerns
 */
(function (i, s, o, g, r, a, m) {
i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
}, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://ssl.google-analytics.com/ga.js', 'ga'); // Note: https protocol here

ga('create', 'UA-37801935-4', 'auto');
ga('require', 'displayfeatures');

function googleAnalyticsEvent(eventName) {
    chrome.storage.sync.get(
        ['GAEnabled'],
        (items) => {
            // default GAEnabled to enabled
            if (items.GAEnabled === undefined || items.GAEnabled) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Export',
                    eventAction: eventName,
                    eventLabel: 'Puppeteer'
                });
            }
        }
    );
}

// Periodically send a message to Katalon Recorder with a list of capabilities. If Katalon Recorder does not receive any message for 2 minutes, it will stop communicating with the plugin.
function register() {
    chrome.runtime.sendMessage(
        extensionId,
        {
            type: 'katalon_recorder_register',
            payload: {
                capabilities: [
                    {
                        id: 'puppeteer',
                        summary: 'Puppeteer',
                        type: 'export'
                    },
                    {
                        id: 'puppeteer_w_comments',
                        summary: 'Puppeteer w Comments',
                        type: 'export'
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

chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
    if (message.type === 'katalon_recorder_export') {
        let payload = message.payload;
        let commands = payload.commands;
        let content = '';
        let extension = '';
        let mimetype = '';

        switch (payload.capabilityId) {
            case 'puppeteer':
            case 'puppeteer_w_comments':
                seleniumToPuppeteer = {
                    open: (x) => `await page.goto(\`${locatorToSelector(x.target)}\`, { waitUntil: 'networkidle0' });`,
                    doubleclick: (x) => `element = await page.$x(\`${locatorToSelector(x.target)}\`);\n\tawait element[0].click({ clickCount: 2 });`,
                    click: (x) => `element = await page.$x(\`${locatorToSelector(x.target)}\`);\n\tawait element[0].click();${waitForNavigationIfNeeded(x)}`,
                    store: (x) => `await let ${locatorToSelector(x.target)} = ${x.value};`,
                    type: (x) => `element = await page.$x(\`${locatorToSelector(x.target)}\`);\n\tawait element[0].type(\`${x.value}\`);`,
                    pause: (x) => `await page.waitFor(parseInt('${locatorToSelector(x.target)}'));`,
                    mouseover: (x) => `await page.hover(\`${locatorToSelector(x.target)}\`);`,
                    deleteallvisiblecookies: (x) => `await page.deleteCookie(await page.cookies());`,
                    capturescreenshot: (x) => `await page.screenshot({ path: \`${locatorToSelector(x.target || "screenshot")}.jpg\` });`,
                    captureentirepagescreenshot: (x) => `await page.screenshot({ path: \`${locatorToSelector(x.target || "screenshot")}.jpg\`, fullPage: true });`,
                    bringbrowsertoforeground: (x) => `await page.bringToFront();`,
                    refresh: (x) => `await page.reload();`,
                    echo: (x) => `console.log(\`${locatorToSelector(x.target)}\`, \`${x.value}\`);`,
                    get: (x) => `await page.goto(\`${locatorToSelector(x.target)}\`);${waitForNavigationIfNeeded(x)}`,
                    comment: (x) => `// ${locatorToSelector(x.target)}`,
                    submit: (x) => `formElement = await page.$x(\`${locatorToSelector(x.target)}\`);\n\tawait page.evaluate(form => form.submit(), formElement[0]);\n\tawait page.waitForNavigation();`,
                    sendkeys: (x) => `await page.keyboard.press(\`${seleniumKeyVars(x.value)}\`)${waitForNavigationIfNeeded(x)}`,
                    selectframe: (x) => `var frames = await page.frames();\n\tvar newFrame = await frames.find(f => f.name() === \`${x.target}\`);`,
                    selectwindow: (x) => `tabs = await browser.pages();\n\tconsole.log(tabs);`,
                    assertelementpresent: (x) => `if (await page.$(\`${locatorToSelector(x.target)}\`) !== null) { console.log("assertElementPresent PASSED."); } else { throw "assertElementPresent FAILED. Element not found."; }`,
                    verifyelementpresent: (x) => `if (await page.$(\`${locatorToSelector(x.target)}\`) !== null) { console.log("verifyElementPresent PASSED."); } else { console.log("verifyElementPresent FAILED. Element not found."); }`,
                    waitforpagetoload: (x) => `await page.waitForFunction(() => { while (document.readyState !== 'complete'); return true; });`,
                    waitforvisible: (x) => `await page.waitForXPath(\`${locatorToSelector(x.target)}\`, { visible: true });`,
                    waitforelementpresent: (x) => `await page.waitForXPath(\`${locatorToSelector(x.target)}\`);`,
                };
                // commands that can cause navigation:
                // open, click, get, sendkeys

                let convertedCommands = commands.map((c) => {
                    let equivCommand = seleniumToPuppeteer[c.command.toLowerCase()];

                    let oldCommand = `Command: ${c.command}, Target: ${c.target}, Value: ${c.value}`;
                    if (typeof equivCommand === "function") {
                        let convertedCommand = equivCommand(c);
                        if (payload.capabilityId === 'puppeteer_w_comments') {
                            return `// Original Katalon Recorder info - ${oldCommand}\n\t${convertedCommand}`;
                        }
                        else {
                            return convertedCommand;
                        }
                    }
                    else {
                        return `// FUNCTION NOT CURRENTLY SUPPORTED - Request it: github.com/SamKirkland/Puppeteer-exporter-for-Katalon-Recorder/issues\n\t// Function Attempted: ${oldCommand}\n`;
                    }
                });

                content =
                    `const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1920, height: 1080 }, args: ['--start-maximized'] });
    const page = await browser.newPage();
    let element, formElement, tabs;

    ${convertedCommands.join('\n\n\t')}
    await browser.close();
})();
`;
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

        googleAnalyticsEvent(`exported ${payload.capabilityId}`);

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


/** version 0.1 2009-04-30
 * @author      Andrea Giammarchi
 * @license     Mit Style License
 * @project     http://code.google.com/p/css2xpath/
 */
css2xpath = (function () { var b = [/\[([^\]~\$\*\^\|\!]+)(=[^\]]+)?\]/g, "[@$1$2]", /\s*,\s*/g, "|", /\s*(\+|~|>)\s*/g, "$1", /([a-zA-Z0-9\_\-\*])~([a-zA-Z0-9\_\-\*])/g, "$1/following-sibling::$2", /([a-zA-Z0-9\_\-\*])\+([a-zA-Z0-9\_\-\*])/g, "$1/following-sibling::*[1]/self::$2", /([a-zA-Z0-9\_\-\*])>([a-zA-Z0-9\_\-\*])/g, "$1/$2", /\[([^=]+)=([^'|"][^\]]*)\]/g, "[$1='$2']", /(^|[^a-zA-Z0-9\_\-\*])(#|\.)([a-zA-Z0-9\_\-]+)/g, "$1*$2$3", /([\>\+\|\~\,\s])([a-zA-Z\*]+)/g, "$1//$2", /\s+\/\//g, "//", /([a-zA-Z0-9\_\-\*]+):first-child/g, "*[1]/self::$1", /([a-zA-Z0-9\_\-\*]+):last-child/g, "$1[not(following-sibling::*)]", /([a-zA-Z0-9\_\-\*]+):only-child/g, "*[last()=1]/self::$1", /([a-zA-Z0-9\_\-\*]+):empty/g, "$1[not(*) and not(normalize-space())]", /([a-zA-Z0-9\_\-\*]+):not\(([^\)]*)\)/g, function (f, e, d) { return e.concat("[not(", a(d).replace(/^[^\[]+\[([^\]]*)\].*$/g, "$1"), ")]") }, /([a-zA-Z0-9\_\-\*]+):nth-child\(([^\)]*)\)/g, function (f, e, d) { switch (d) { case "n": return e; case "even": return "*[position() mod 2=0 and position()>=0]/self::" + e; case "odd": return e + "[(count(preceding-sibling::*) + 1) mod 2=1]"; default: d = (d || "0").replace(/^([0-9]*)n.*?([0-9]*)$/, "$1+$2").split("+"); d[1] = d[1] || "0"; return "*[(position()-".concat(d[1], ") mod ", d[0], "=0 and position()>=", d[1], "]/self::", e) } }, /:contains\(([^\)]*)\)/g, function (e, d) { return "[contains(text(),'" + d + "')]" }, /\[([a-zA-Z0-9\_\-]+)\|=([^\]]+)\]/g, "[@$1=$2 or starts-with(@$1,concat($2,'-'))]", /\[([a-zA-Z0-9\_\-]+)\*=([^\]]+)\]/g, "[contains(@$1,$2)]", /\[([a-zA-Z0-9\_\-]+)~=([^\]]+)\]/g, "[contains(concat(' ',normalize-space(@$1),' '),concat(' ',$2,' '))]", /\[([a-zA-Z0-9\_\-]+)\^=([^\]]+)\]/g, "[starts-with(@$1,$2)]", /\[([a-zA-Z0-9\_\-]+)\$=([^\]]+)\]/g, function (f, e, d) { return "[substring(@".concat(e, ",string-length(@", e, ")-", d.length - 3, ")=", d, "]") }, /\[([a-zA-Z0-9\_\-]+)\!=([^\]]+)\]/g, "[not(@$1) or @$1!=$2]", /#([a-zA-Z0-9\_\-]+)/g, "[@id='$1']", /\.([a-zA-Z0-9\_\-]+)/g, "[contains(concat(' ',normalize-space(@class),' '),' $1 ')]", /\]\[([^\]]+)/g, " and ($1)"], c = b.length; return function a(e) { var d = 0; while (d < c) { e = e.replace(b[d++], b[d++]) } return "//" + e } })();

// built in selenium vars
// https://github.com/Jongkeun/selenium-ide/blob/6d18a36991a9541ab3e9cad50c2023b0680e497b/packages/selenium-ide/src/content/selenium-api.js
// https://github.com/GoogleChrome/puppeteer/blob/master/lib/USKeyboardLayout.js
let keyDictionary = {
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

String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}

function seleniumKeyVars(originalValue) {
    let modifiedValue = originalValue;


    console.log("originalValue", originalValue);
    // loop over all selenium vars and replace all instances with the value in keyDictionary
    Object.keys(keyDictionary).forEach(key => modifiedValue = modifiedValue.replaceAll(key, keyDictionary[key]));

    console.log("modifiedValue", modifiedValue);

    return modifiedValue;
}

/**
 * This function assumes that Katalon's Record uses the ExtensionScript.js (deleted this file), which
 * should be found in the same directory as this file (background.js). The preference of
 * locators is absoluteCSS, xpath:position, xpath:idRelative, xpath:link, css.
 * It is unlikely that anything other than xpath will be received, as absoluteCSS does not
 * currently work. The rest of the checks are just in case.
 * */
function locatorToSelector(target) {
    let selector = target;

    if (target.substring(0, 1) === "/" || target.substring(0, 2) === "//") {
        return selector;
    }
    else if (target.substring(0, 6) === "xpath=") {
        selector = target.substring(6, target.length);
    }
    else if (target.substring(0, 12) === "absoluteCSS=") {
        selector = css2xpath(target.substring(12, target.length));
    }
    else if (target.substring(0, 4) === "css=") {
        selector = css2xpath(target.substring(4, target.length));
    }
    else if (target.substring(0, 5) === "name=") {
        selector = "//*[@name=\"" + target.substring(5, target.length) + "\"]";
    }
    else if (target.substring(0, 3) === "id=") {
        selector = "//*[@id=\"" + target.substring(3, target.length) + "\"]";
    }
    else if (target.substring(0, 5) === "link=") {
        let offset = 5;
        if (target.substring(5, 11) == 'exact:') {
            offset = 11
        }
        selector = "//a[contains(text(),'" + target.substring(offset, target.length) + "')]";
    }

    return selector;
}

/**
 * Automatically adds "waitForNavigation" if the command needs it
 * @param {{command: string, target: string, value: string}} command
 * @return string}
 */
function waitForNavigationIfNeeded(command) {
    if (command.target.toLowerCase().startsWith("link=")) {
        // It's a link, the page is probably going to change
        return `\n\tawait page.waitForNavigation();`;
    }

    return "";
}