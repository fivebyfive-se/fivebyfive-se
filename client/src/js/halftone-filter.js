orthogonal.onReady(($query, $css) => {
    const setFilterColor = (componentTransferElement, color) => {
        if (componentTransferElement && color) {
            ['r', 'g', 'b'].forEach((component) => {
                const componentElement = componentTransferElement.querySelector(`fefunc${component}`);
                if (componentElement) {
                    const componentRatio = color[component]/255;
                    componentElement.setAttribute('tableValues', `${componentRatio} 0`);
                }
            });
        }
    };

    $query.dataSelectorAll(document, 'css-variable')
        .map(({ element, cssVariable }) => ({ element, color: $css.getVarAsColor(cssVariable)}))
        .forEach(({ element, color }) => setFilterColor(element, color));

    document.querySelector('.background__image').classList.add('appear');
});