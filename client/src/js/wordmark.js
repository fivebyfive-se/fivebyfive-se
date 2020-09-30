(() => {
    // U+0131
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p').forEach((el) => {
        el.innerHTML = el.innerHTML.replace(/(f)ive\s*by\s*five/i, "<span class=\"wordmark\">$1\u0131ve by f\u0131ve</span>");
    });
})();