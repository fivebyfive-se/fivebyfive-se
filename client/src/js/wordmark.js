five.onReady(() => {
    // U+0131
    const fiveRex = /(f)ive\s*by\s*five/i;
    const iconRex = /:([a-z\-]+?):/;
    const findText = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            if (fiveRex.test(node.textContent)) {
                const tag = document.createElement('span');
                tag.innerHTML = node.textContent.replace(fiveRex, "<span class=\"wordmark\">$1\u0131ve by f\u0131ve</span>");
                node.parentNode.replaceChild(tag, node)    
            } else if (iconRex.test(node.textContent)) {
                const tag = document.createElement('span');
                tag.innerHTML = node.textContent.replace(iconRex, '<i class="ri-$1"></i>');
                node.parentNode.replaceChild(tag, node);
            }
        } else {
            node.childNodes.forEach((n) => findText(n));
        }
    };
    document.querySelectorAll('a,h1,h2,h3,h4,h5,h6,p').forEach((el) => findText(el));    
});
