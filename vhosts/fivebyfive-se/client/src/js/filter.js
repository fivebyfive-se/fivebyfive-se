five.onReady(() => {
    const handleTags = (target, attribute, showAllLabel) => {
        const targetElm = document.querySelector(target);
        const tags = [];
        const taggedItems = [];
        const showAllButton = five.createTag('a', { 'data-show-tag': '_', 'data-show-tag-all': 'true'}, showAllLabel);
        let activeTags = [];

        showAllButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            loadTag(null);
        });

        const loadTag = (tag) => {
            if (tag === null) {
                
            }
            const isActive = activeTags.includes(tag);

            if (isActive) {
                activeTags = [...activeTags.filter((t) => t !== tag)];
                targetElm.querySelector(`[data-show-tag=${tag}]`).classList.remove('show-tag--active');

            }
            
            taggedItems.forEach((item) => {
                if (item.tags.includes(tag)) {
                    item.element.classList.remove('tagitem--hidden');
                } else {
                    item.element.classList.add('tagitem--hidden');
                }
            })
        };
        const updateFilter = () => {
            tagElm.querySelectorAll(`[data-show-tag]`).forEach((el) => el.remove());
            activeTags.push(...tags);
            tags.sort().forEach((t) => {
                const tagElm = five.createTag('a', { 'data-show-tag': t, 'class': 'show-tag show-tag--active' }, t);
                tagElm.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    const { showTag } = tagElm.dataset;
                    loadTag(showTag);                    
                });
                targetElm.appendChild(tagElm);
            });    
        };
        const updateTaggedItems = () => {
            let anyNew = false;
            document.querySelectorAll(`[${attribute}]`).forEach((element) => {
                if (!element.dataset.tagItemHandled) {
                    const taggedItem = {
                        tags: (element.getAttribute(attribute) || '')
                            .split('|')
                            .filter((t) => !!t)
                            .map((t) => t.toLowerCase()),
                        element
                    }
                    element.dataset.tagItemHandled = 'true';
                    taggedItems.push(taggedItem);
                    const newTags = taggedItem.tags.filter((t) => !tags.includes(t));
                    if (newTags.length > 0) {
                        anyNew = true;
                        tags.push(...newTags);
                    }
                }
            });
            if (anyNew) {
                updateFilter();
            }
        };

        updateTaggedItems();
    };

    document.querySelectorAll('[data-filter]').forEach((f) => {
        const { filterAttribute, filterTarget, filterAllLabel } = f.dataset;
        handleTags(filterTarget || f, filterAttribute || 'data-tag', filterAllLabel || 'all');
    });
});