five.onReady(() => {
    const drawLogo = (targetElement) => {
        let { width, height } = targetElement.getBoundingClientRect();
        width = width || 130;
        height = height || 130;

        const scale = Math.min(width, height) / 130;
        const two = new Two({ width, height }).appendTo(targetElement);
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
        const origin = { x: -150, y: 0 };
        path.vertices.slice(1, -1).forEach((v, i) => {
            const { x, y } = v;
            const fromX = Math.random() * (v.x < 0 ? -20 : 20);
            const fromY = Math.random() * (v.y < 0 ? 5 : -5);
            new TWEEN.Tween({x: fromX, y: fromY})
                .to({ x, y }, 500)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate((pos) => {
                    v.x = pos.x;
                    v.y = pos.y;
                })
                .start(Math.random() * 1500);
            v.x = fromX;
            v.y = fromY;
        });
        const animate = (time) => {
            requestAnimationFrame(animate);
            TWEEN.update(time);
            two.update();
        };
        requestAnimationFrame(animate);
    };

    window.five = {
        ...(window.five || {}),
        drawLogo
    };

    document.querySelectorAll('.generate-logo').forEach((targ) => drawLogo(targ));
});
