(() => {
    let lockToScrollPos = [];

    const handleScroll = (e) => {
        window.scrollTo(...lockToScrollPos); 
    };

    const disableScroll = () => {
        if (lockToScrollPos.length > 0) {
            return;
        }
        lockToScrollPos = [
            window.scrollLeft || window.scrollX,
            window.scrollTop || window.scrollY
        ];
        document.addEventListener('scroll', handleScroll, { passive: false });
    };
    const enableScroll = () => {
        lockToScrollPos = [];
        document.removeEventListener('scroll', handleScroll, { passive: false });
    };

    const textFrom = (query, root = document) => {
        const el = root.querySelector(query);
        return el ? el.innerText : ''
    };
    const createTag = (tagName, attributes = null, ...children) => {
        const tag = document.createElement(tagName);
        if (attributes) {
            Object.keys(attributes).forEach((k) => tag.setAttribute(k, attributes[k]));
        }
        children.filter((c) => !!c).forEach((c) => {
            tag.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
        });

        return tag;
    };

    window.five = {
        disableScroll,
        enableScroll,
        textFrom,
        createTag
    };
})();