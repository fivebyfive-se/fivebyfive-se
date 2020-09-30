(() => {
    const getDetailsView = (button) => {
        const detailsId = button.dataset.showDetails;
        const background = button.dataset.backgroundImage;
        const closeButtonLabel = button.dataset.closeButton;

        let detailsView = document.querySelector(`[data-details-view-for=${detailsId}]`);

        if (!detailsView) {
            const itemDiv = document.querySelector(`[data-details-view=${detailsId}]`);
            const closeButton = five.createTag('a', { 'class': 'button button--secondary close-button' },
                five.createTag('i', { 'class': 'ri-fullscreen-exit-line' }),
                closeButtonLabel
            );

            detailsView = five.createTag('div', { 'class': 'details-view', 'data-details-view': detailsId },
                five.createTag('div', { 
                    'class': 'details-view__image', 
                    'style': `background-image: url(${background});`
                }),
                five.createTag('div', {
                    'class': 'details-view__text page-item'
                },
                    five.createTag('h2', null, five.textFrom('.item__title', itemDiv)),
                    ...Array.from(itemDiv.querySelectorAll('.item__meta')).map((m) => m.cloneNode(true)),
                    five.createTag('p', { 'class': 'item__description' }, five.textFrom('.item__description', itemDiv)),
                    closeButton
                )
            );

            closeButton.addEventListener('click', (evt) => {
                five.enableScroll();
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
            five.disableScroll();
            getDetailsView(button).classList.add('details-view--active');
        });
    });
})();