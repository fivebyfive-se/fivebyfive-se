five.onReady(() => {
    const handleTags = (target, attribute) => {
        const targetElm = document.querySelector(target);
        const tags = [];
        document.querySelectorAll(`[${attribute}]`).forEach((taggedItem) => {
            (taggedItem.dataset[attribute])
                .split('|')
                .map((t) => (t || '').toLowerCase())
                .filter((t) => t && !tags.includes(t))
                .forEach((t) => tags.push(t));
        });
        tags.forEach((t) => {
            const tagElm = five.createTag('a', { 'data-show-tag': t, 'class': 'show-tag show-tag--active' }, t);
            tagElm.addEventListener('click', (ev) => {
                ev.preventDefault();

                const { showTag } = tagElm.dataset;
                
            });
            targetElm.appendChild(tagElm);
        });
    };

    document.querySelectorAll('[data-filter]').forEach((f) => {
        const { filterAttribute, filterTarget } = f.dataset;
        handleTags(filterTarget, filterAttribute);
    });
});