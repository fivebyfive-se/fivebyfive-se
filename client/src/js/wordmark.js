five.onReady(() => {
    // U+0131
    const rex = /(f)ive\s*by\s*five/i;
    const findText = (node) => {
        if (node.nodeType === Node.TEXT_NODE && rex.test(node.textContent)) {
            const tag = document.createElement('span');
            tag.innerHTML = node.textContent.replace(/(f)ive\s*by\s*five/i, "<span class=\"wordmark\">$1\u0131ve by f\u0131ve</span>");
            node.parentNode.replaceChild(tag, node)
        } else {
            node.childNodes.forEach((n) => findText(n));
        }
    };
    document.querySelectorAll('a,h1,h2,h3,h4,h5,h6,p').forEach((el) => findText(el));    
});
