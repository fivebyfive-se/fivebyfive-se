(() => {
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
                five.disableScroll();
            } else {
                five.enableScroll();
            }
        });
    })();
})();