(() => {
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
            const closeButton = document.createElement('a');

            closeButton.classList.add('button', 'button--secondary', 'close-button');
            closeButton.innerText = closeButtonLabel;

            detailsView.dataset.detailsViewFor = detailsId;
            detailsView.classList.add('details-view');
            detailsImage.classList.add('details-view__image');
            detailsImage.style.backgroundImage = `url(${background})`;
            detailsContent.classList.add('details-view__text', 'page-item');
            detailsContent.innerHTML = itemDiv.innerHTML;

            detailsContent.appendChild(closeButton);
            detailsView.appendChild(detailsImage);
            detailsView.appendChild(detailsContent);

            closeButton.addEventListener('click', (evt) => {
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
            getDetailsView(button).classList.add('details-view--active');
        });

    });
})();