LocatorBuilders.add('absoluteCSS', function (e) {
    if (!(e instanceof element)) return null;

    var path = [];
    while (e.nodeType === Node.ELEMENT_NODE) {
        var selector = e.nodeName.toLowerCase();
        if (e.id) {
            selector += '#' + e.id;
            path.unshift(selector);
            break;
        } else {
            var sib = e, nth = 1;
            while (sib = sib.previousElementSibling) {
                if (sib.nodeName.toLowerCase() == selector)
                    nth++;
            }
            if (nth != 1)
                selector += ":nth-of-type(" + nth + ")";
        }
        path.unshift(selector);
        e = e.parentNode;
    }
    return "css2" + path.join(" > ");
});

// built-in locators: "id", "link", "name", "dom:name", "xpath:link", "xpath:img", "xpath:attributes", "xpath:idRelative", "xpath:href", "dom:index", "xpath:position", "css"
LocatorBuilders._preferredOrder = ['absoluteCSS','xpath:idRelative','xpath:link','xpath:position','css'];
// Change the default order to preferredOrder
LocatorBuilders._orderChanged();

