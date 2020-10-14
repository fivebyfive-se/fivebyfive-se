five.onReady(() => {
    document.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('change', (ev) => {
            if ((field.value || '')) {
                field.classList.add('dirty');
            } else {
                field.classList.remove('dirty');
            }
        });
    });
});