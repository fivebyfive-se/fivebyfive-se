(() => {
    const loadImage = (element) => {
        const { lazyBg, lazySrc } = element.dataset;
        if (lazyBg) {
            element.style.backgroundImage = `url(${lazyBg})`;
        } else if (lazySrc) {
            element.setAttribute('src', lazySrc);
        }
        element.classList.remove('lazyload--loading');
        element.classList.add('lazyload--loaded');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('[data-lazy-bg],[data-lazy-src]').forEach((i) => {
        i.classList.add('lazyload', 'lazyload--loading');
        observer.observe(i);
    });
})();