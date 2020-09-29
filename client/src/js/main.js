(() => {
    let lockToScrollPos = [];


    const handleScroll = (e) => {
        window.scrollTo(...lockToScrollPos); 
    };
    // const handleWheel = (e) => {
    //     e.preventDefault();
    // };

    const disableScroll = () => {
        if (lockToScrollPos.length > 0) {
            return;
        }
        lockToScrollPos = [
            window.scrollLeft || window.scrollX,
            window.scrollTop || window.scrollY
        ];
        document.addEventListener('scroll', handleScroll, { passive: false });
        // document.addEventListener('wheel', handleWheel, { passive: false });
        // document.addEventListener('touchmove', handleWheel, { passive: false });
    };
    const enableScroll = () => {
        lockToScrollPos = [];
        document.removeEventListener('scroll', handleScroll, { passive: false });
        // document.removeEventListener('wheel', handleWheel, { passive: false });
        // document.removeEventListener('touchmove', handleWheel, { passive: false });
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

    const getDetailsView = (button) => {
        const detailsId = button.dataset.showDetails;
        const background = button.dataset.backgroundImage;
        const closeButtonLabel = button.dataset.closeButton;

        let detailsView = document.querySelector(`[data-details-view-for=${detailsId}]`);

        if (!detailsView) {
            const itemDiv = document.querySelector(`[data-details-view=${detailsId}]`);
            const closeButton = createTag('a', { 'class': 'button button--secondary close-button' },
                createTag('i', { 'class': 'ri-fullscreen-exit-line' }),
                closeButtonLabel
            );

            detailsView = createTag('div', { 'class': 'details-view', 'data-details-view': detailsId },
                createTag('div', { 
                    'class': 'details-view__image', 
                    'style': `background-image: url(${background});`
                }),
                createTag('div', {
                    'class': 'details-view__text page-item'
                },
                    createTag('h2', null, textFrom('.item__title', itemDiv)),
                    ...Array.from(itemDiv.querySelectorAll('.item__meta')).map((m) => m.cloneNode(true)),
                    createTag('p', { 'class': 'item__description' }, textFrom('.item__description', itemDiv)),
                    closeButton
                )
            );

            closeButton.addEventListener('click', (evt) => {
                enableScroll();
                evt.preventDefault();
                document.body.classList.remove('showing-details');
                detailsView.classList.remove('details-view--active');
            });
            document.body.classList.add('showing-details');
            document.body.appendChild(detailsView);
        }
        return detailsView;
    };

    document.querySelectorAll('[data-show-details]').forEach((button) => {
        button.addEventListener('click', (ev) => {
            ev.preventDefault();
            disableScroll();
            getDetailsView(button).classList.add('details-view--active');
        });
    });

    (() => {
        const header = document.querySelector('.header');
        const limit = header.getBoundingClientRect().height * 2;
        window.addEventListener('scroll', (ev) => {
            if (window.scrollY > limit) {
                document.body.classList.add('sticky-header');
            } else {
                document.body.classList.remove('sticky-header');
            }
        });    
    })();

    (() => {
        const menubutton = document.querySelector('.header__menu-button .button');
        const menu = document.querySelector('.header__menues');
        menubutton.addEventListener('click', (ev) => {
            ev.preventDefault();
            menu.classList.toggle('active');
            menubutton.classList.toggle('active');
            document.body.classList.toggle('showing-menu');
            
            if (menu.classList.contains('active')) {
                disableScroll();
            } else {
                enableScroll();
            }
        });
    })();


    // (() => {
    //     const toc = document.createElement('div');
    //     const tocList = document.createElement('nav');
    //     toc.classList.add('table-of-contents');
    //     toc.innerHTML = '<div class="toc__header"><i class="ri-list-unordered"></i></div>';
    //     tocList.classList.add('toc__list');

    //     const scrollTo = (elm) => {
    //         const targetY = elm.getBoundingClientRect().top;
    //         window.scrollTo({x: targetY, behavior: 'smooth'});
    //     };

    //     document.querySelectorAll('h1,h2,h3').forEach((header) => {
    //         const link = document.createElement('a');
    //         link.innerText = header.innerText;
    //         link.classList.add('level--' + header.tagName.toLocaleLowerCase());
    //         link.addEventListener('click', (ev) => {
    //             ev.preventDefault();
    //             scrollTo(header);
    //         });
    //         tocList.append(link);
    //     });
    //     toc.append(tocList);
    //     document.body.append(toc);

    //     document.querySelector('.toc__header').addEventListener('click', (ev) => toc.classList.toggle('active'));
    // })();
})();