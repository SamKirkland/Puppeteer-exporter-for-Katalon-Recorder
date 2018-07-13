const puppeteer = require('puppeteer');
const xpath2css = require('xpath2css');
const delay = require('delay');
// built in selenium vars
// https://github.com/Jongkeun/selenium-ide/blob/6d18a36991a9541ab3e9cad50c2023b0680e497b/packages/selenium-ide/src/content/selenium-api.js
let KEY_BACKSPACE = "\uE003"; let KEY_BKSP = KEY_BACKSPACE;
let KEY_TAB = "\uE004";
let KEY_ENTER = "\uE007";
let KEY_SHIFT = "\uE008";
let KEY_ESC = "\uE00C"; let KEY_ESCAPE = KEY_ESC;
let KEY_DELETE = "\uE017"; let KEY_DEL = KEY_DELETE;

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
function getLink(target) {
    // var find = 'a href="*+target';
    // var source = await page.content();
    // var regex, link, matches = [];
  
    
    // var find = tVal.split('*');
    // var toReg = "\" + find[0] + "(.*?)" + "\" + find[1];
    // regex = new RegExp(toReg, 'gi');
    // matches = source.match(regex);
    // link = matches[0].match(/"([^"]+)"/)[1];

    //return link;
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
        selector = getLink(target);
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
    await page.goto('https://www.google.com/');

	
                        selector = locatorToSelector(`id=lst-ib`);
                        container = await getContainer(selector);
                        await container.type(selector, `google`);
	
                        await page.keyboard.press(keyDictionary[`\${KEY_ENTER}`]);
                        //await waitForPageEnter(`${KEY_ENTER}`);
	
                            selector = locatorToSelector(`link=Google`);
                            container = await getContainer(selector);
                        try{
                            if(`link=Google`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//form[@id='tsf']/div[2]/div[3]/center/div/div/div[9]/span`);
                            container = await getContainer(selector);
                        try{
                            if(`//form[@id='tsf']/div[2]/div[3]/center/div/div/div[9]/span`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`link=About`);
                            container = await getContainer(selector);
                        try{
                            if(`link=About`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	await page.goto('https://www.google.com/');

	
                            selector = locatorToSelector(`link=Images`);
                            container = await getContainer(selector);
                        try{
                            if(`link=Images`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='gbwa']/div/a`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='gbwa']/div/a`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//a[@id='gb8']/span[2]`);
                            container = await getContainer(selector);
                        try{
                            if(`//a[@id='gb8']/span[2]`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`id=searchboxinput`);
                            container = await getContainer(selector);
                        try{
                            if(`id=searchboxinput`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                        selector = locatorToSelector(`id=searchboxinput`);
                        container = await getContainer(selector);
                        await container.type(selector, `ames, ia`);
	
                        await page.keyboard.press(keyDictionary[`\${KEY_ENTER}`]);
                        //await waitForPageEnter(`${KEY_ENTER}`);
	
                            selector = locatorToSelector(`id=pane > div > div.widget-pane-content.scrollable-y > div > div > div.section-hero-header.white-foreground > button.section-hero-header-directions.noprint > div > div`);
                            container = await getContainer(selector);
                        try{
                            if(`id=pane > div > div.widget-pane-content.scrollable-y > div > div > div.section-hero-header.white-foreground > button.section-hero-header-directions.noprint > div > div`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                        selector = locatorToSelector(`//div[@id='sb_ifc51']/input`);
                        container = await getContainer(selector);
                        await container.type(selector, `archangel, russia`);
	
                        selector = locatorToSelector(`//div[@id='sb_ifc51']/input`);
                        container = await getContainer(selector);
                        await container.type(selector, `archangel, russia`);
	
                        await page.keyboard.press(keyDictionary[`\${KEY_ENTER}`]);
                        //await waitForPageEnter(`${KEY_ENTER}`);
	
                            selector = locatorToSelector(`//div[@id='sb_ifc52']/input`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='sb_ifc52']/input`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                        selector = locatorToSelector(`//div[@id='sb_ifc52']/input`);
                        container = await getContainer(selector);
                        await container.type(selector, `eureka, ca`);
	
                        await page.keyboard.press(keyDictionary[`\${KEY_ENTER}`]);
                        //await waitForPageEnter(`${KEY_ENTER}`);
	
                            selector = locatorToSelector(`//div[@id='omnibox-directions']/div/div[3]/button/div/div`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='omnibox-directions']/div/div[3]/button/div/div`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                        selector = locatorToSelector(`//div[@id='sb_ifc53']/input`);
                        container = await getContainer(selector);
                        await container.type(selector, `moose, canada`);
	
                        await page.keyboard.press(keyDictionary[`\${KEY_ENTER}`]);
                        //await waitForPageEnter(`${KEY_ENTER}`);
	
                            selector = locatorToSelector(`//div[@id='omnibox-directions']/div/div[2]/div/div/div[2]/div/div/button/div`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='omnibox-directions']/div/div[2]/div/div/div[2]/div/div/button/div`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='pane']/div/div/div/div/div[2]/button[2]/span`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='pane']/div/div/div/div/div[2]/button[2]/span`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='pane']/div/div/div/div/div[2]/div[2]/div/div[2]/div/span/label`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='pane']/div/div/div/div/div[2]/div[2]/div/div[2]/div/span/label`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='pane']/div/div/div/div/div[2]/button[2]/span[2]`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='pane']/div/div/div/div/div[2]/button[2]/span[2]`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='pane']/div/div/div/div/div[4]/div[2]/div[2]/button[2]`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='pane']/div/div/div/div/div[4]/div[2]/div[2]/button[2]`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='modal-dialog-widget']/div[2]/div/div[2]/button`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='modal-dialog-widget']/div[2]/div/div[2]/button`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='omnibox-directions']/div/div[2]/div/div/div[2]/div/div[2]/button/div`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='omnibox-directions']/div/div[2]/div/div/div[2]/div/div[2]/button/div`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='pane']/div/div[3]/button`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='pane']/div/div[3]/button`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//canvas[@id='']`);
                            container = await getContainer(selector);
                        try{
                            if(`//canvas[@id='']`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='pane']/div/div[3]/button`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='pane']/div/div[3]/button`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='directions-searchbox-2']/button[2]/div`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='directions-searchbox-2']/button[2]/div`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='pane']/div/div/div/div/div[2]/button[2]/span`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='pane']/div/div/div/div/div[2]/button[2]/span`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='pane']/div/div/div/div/div[2]/button[2]/span[2]`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='pane']/div/div/div/div/div[2]/button[2]/span[2]`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='section-directions-trip-0']/div[2]/div[3]/div[2]/h1`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='section-directions-trip-0']/div[2]/div[3]/div[2]/h1`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='pane']/div/div/div/div/div[2]/div[3]/button`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='pane']/div/div/div/div/div[2]/div[3]/button`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='modal-dialog-widget']/div[2]/div/div[3]/div/div/div/div[4]/div[2]/div/button`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='modal-dialog-widget']/div[2]/div/div[3]/div/div/div/div[4]/div[2]/div/button`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='modal-dialog-widget']/div[2]/div/div[2]/button`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='modal-dialog-widget']/div[2]/div/div[2]/button`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//canvas[@id='']`);
                            container = await getContainer(selector);
                        try{
                            if(`//canvas[@id='']`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//canvas[@id='']`);
                            container = await getContainer(selector);
                        try{
                            if(`//canvas[@id='']`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='messages_container']/div[3]/div/div[2]/div/div[2]/div/div/div/div[12]/div`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='messages_container']/div[3]/div/div[2]/div/div[2]/div/div/div/div[12]/div`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`link=not-qa-repo`);
                            container = await getContainer(selector);
                        try{
                            if(`link=not-qa-repo`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='msg_input']/div/p`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='msg_input']/div/p`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }
	
                            selector = locatorToSelector(`//div[@id='messages_container']/div[3]/div/div[2]/div/div[2]/div/div/div/div[6]/div`);
                            container = await getContainer(selector);
                        try{
                            if(`//div[@id='messages_container']/div[3]/div/div[2]/div/div[2]/div/div/div/div[6]/div`.substring(0, 5) === "link=" ){
                                await page.goto(selector);
                            } else {
                                await container.waitForSelector(selector);
                                await delay (250);
                                await container.click(selector);
                            }   
                        }catch(error) {
                            console.log(error);
                            container.mouse.down();
                        }

    await browser.close();
    
})()