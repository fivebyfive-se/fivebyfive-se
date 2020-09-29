(() => {
    let lockToScrollPos = [];


    const handleScroll = () => {
        window.scrollTo(...lockToScrollPos); 
    };
    const handleWheel = (e) => {
        e.preventDefault();
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
        document.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('touchmove', handleWheel, { passive: false });
    };
    const enableScroll = () => {
        lockToScrollPos = [];
        document.removeEventListener('scroll', handleScroll, { passive: false });
        document.removeEventListener('wheel', handleWheel, { passive: false });
        document.removeEventListener('touchmove', handleWheel, { passive: false });
    };

    const getDetailsView = (button) => {
        const detailsId = button.dataset.showDetails;
        const background = button.dataset.backgroundImage;
        const closeButtonLabel = button.dataset.closeButton;

        let detailsView = document.querySelector(`[data-details-view-for=${detailsId}]`);

        if (!detailsView) {
            const itemDiv = document.querySelector(`[data-details-view=${detailsId}]`);
            detailsView = document.createElement('div');
            const detailsImage = document.createElement('div');
            const detailsContent = document.createElement('div');
            const detailsTitle = document.createElement('h2');
            const closeButton = document.createElement('a');

            closeButton.classList.add('button', 'button--secondary', 'close-button');
            closeButton.innerHTML = `<i class="ri-fullscreen-exit-line"></i> ${closeButtonLabel}`;

            detailsView.dataset.detailsViewFor = detailsId;
            detailsView.classList.add('details-view');
            detailsImage.classList.add('details-view__image');
            detailsImage.style.backgroundImage = `url(${background})`;
            detailsContent.classList.add('details-view__text', 'page-item');
            detailsTitle.innerHTML = itemDiv.querySelector('.item__title').innerText;


            detailsContent.appendChild(detailsTitle);

            const desc = itemDiv.querySelector('.item__description');
            if (desc) {
                detailsContent.appendChild(desc.cloneNode(true));
            }
            itemDiv.querySelectorAll('.item__meta').forEach((meta) => detailsContent.appendChild(meta.cloneNode(true)));

            detailsContent.appendChild(closeButton);
            detailsView.appendChild(detailsImage);
            detailsView.appendChild(detailsContent);

            closeButton.addEventListener('click', (evt) => {
                enableScroll();
                evt.preventDefault();
                detailsView.classList.remove('details-view--active');
            });

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