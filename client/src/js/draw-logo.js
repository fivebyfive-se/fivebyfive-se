(() => {
    const drawLogo = (targetElement) => {
        const { width, height } = targetElement.getBoundingClientRect();
        const scale = Math.min(width, height) / 130;
        const two = new Two({ width, height }).appendTo(el);
        const path = two.makePath(
            -5, 45,
            0, 45,
            5, 50,
            20, 20,
            40, 75,
            55, 5,
            75, 70,
            90, 10,
            110, 50,
            115, 45,
            120, 45,
            true
        );
        path.curved = true;
        const circle = two.makeCircle(60, 50, 60);
        
        path.center();
        circle.center();
        
        const logo_group = two.makeGroup(path, circle);
        logo_group.noFill();
        logo_group.stroke = 'var(--color-primary)';
        logo_group.linewidth = '8px';
        path.translation.set(0, 0);
        circle.translation.set(0, 0);
    
        logo_group.translation.set(two.width / 2, two.height / 2);
        logo_group.scale = scale;
    
        two.update();    
    };

    window.five = {
        ...(window.five || {}),
        drawLogo
    };

    document.querySelectorAll('.generate-logo').forEach((targ) => drawLogo(targ));
})();
