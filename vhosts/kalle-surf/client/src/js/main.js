(() => {
    const header = document.querySelector('.site-header');
    const menuButton = document.querySelector('.site-header__button');
    const menuLinks = document.querySelectorAll('.site-header .nav__item');
    const toggleMenu = (force=undefined) => header.classList.toggle('site-header--show-menu', force);
    const getScrollLinks = () => document.querySelectorAll('[data-scroll-to]');

    const setActiveScrollLink = (id) => {
        const targetSelector = `#${id}`;
        getScrollLinks().forEach((l) => l.classList.toggle('nav__item--active', l.dataset.scrollTo === targetSelector));
    };

    getScrollLinks().forEach((navItem) => {
        navItem.addEventListener('click', (ev) => {
            const clickTarget = ev.currentTarget.dataset.scrollTo ? ev.currentTarget : ev.target;
            if (clickTarget) {
                const { scrollTo } = clickTarget.dataset;
                const targetElement = document.getElementById(scrollTo.replace('#', ''));
                targetElement.scrollIntoView({ behavior: 'smooth' });
                setActiveScrollLink(targetElement.id);    
                ev.preventDefault();
            }
        })
    });

    const initLinks = () => {
        const downButton = document.querySelector('.down-button--hidden');
        const basketContainer = document.querySelector('.sprd-header__actions');
        const siteImage = document.querySelector('.site-image');

        const observer = new IntersectionObserver((entries) => {
            entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
                const { target } = entry;
                if (target.classList.contains('page-section')) {
                    const isAbout = target.classList.contains('page-section--about');
                    downButton.classList.toggle('down-button--hidden', !isAbout);
                    basketContainer.classList.toggle('actions--hidden', isAbout);
                    siteImage.classList.toggle('site-image--discreet', !isAbout);
                    setActiveScrollLink(target.id);
                } else {
                    downButton.classList.toggle('down-button--hidden', true);
                    basketContainer.classList.toggle('actions--hidden', true);
                    siteImage.classList.toggle('site-image--discreet', true);
                    setActiveScrollLink('');
                }
                toggleMenu(false);
            })
        }, { threshold: .5 });

        document.querySelectorAll('.page-section, .site-footer').forEach((s) => observer.observe(s));

        document.querySelectorAll('.kalle').forEach((k) => k.addEventListener('click', (ev) => {
            toggleMenu(true);
            siteImage.classList.remove('site-image--discreet');
            siteImage.classList.add('site-image--highlight');
            setTimeout(() => siteImage.classList.remove('site-image--highlight'), 7000);
        }));
    }

    menuButton.addEventListener('click', () => toggleMenu());
    menuLinks.forEach((l) => l.addEventListener('click', () => toggleMenu(false)));    

    const initFade = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.filter((entry) => entry.isIntersecting).forEach(entry => {
                const { target } = entry;
                if (target.classList.contains('fade-in')) {
                    target.classList.add('fade-in--visible');
                    observer.unobserve(target);
                }
            });
        }, { threshold: [ .75 ] });
        

        document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
        initLinks();
    };

    const waitForSpreadshirt = () => {
        const sprd = document.getElementById('sprd-content') && document.querySelector('.sprd-listpage');
        if (!sprd) {
            setTimeout(waitForSpreadshirt, 250);
        } else {
            document.querySelectorAll('.sprd__headline, .sprd-header, #sprd-main svg, .sprd-info-footer, .sprd-service-footer, .sprd-info-footer__open-shop')
                .forEach((sp) => {
                    sp.classList.add('fade-in');
                });
            document.getElementById('spreadshop').classList.remove('fade-in');
            initFade();
        }
    }; 

    setTimeout(waitForSpreadshirt, 250);
})();