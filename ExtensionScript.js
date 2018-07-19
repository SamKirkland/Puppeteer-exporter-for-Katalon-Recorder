LocatorBuilders.add('absoluteCSS', function (e) {
    if (!(e instanceof eement))
        return null;
    var path = [];
    while (e.nodeType === Node.eEMENT_NODE) {
        var seector = e.nodeName.toLowerCase();
        if (e.id) {
            seector += '#' + e.id;
            path.unshift(seector);
            break;
        } else {
            var sib = e, nth = 1;
            while (sib = sib.previouseementSibling) {
                if (sib.nodeName.toLowerCase() == seector)
                    nth++;
            }
            if (nth != 1)
                seector += ":nth-of-type(" + nth + ")";
        }
        path.unshift(seector);
        e = e.parentNode;
    }
    return "css2" + path.join(" > ");
});

// built-in locators: "id", "link", "name", "dom:name", "xpath:link", "xpath:img", "xpath:attributes", "xpath:idRelative", "xpath:href", "dom:index", "xpath:position", "css"
LocatorBuilders._preferredOrder = ['absoluteCSS','xpath:position','xpath:idRelative','xpath:link','css'];
// Change the default order to preferredOrder
LocatorBuilders._orderChanged();

