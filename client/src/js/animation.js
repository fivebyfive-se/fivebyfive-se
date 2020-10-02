five.onReady(() => {
    const targetElement = five.createTag('div', { 'class': 'background-animation' });
    document.body.prepend(targetElement);

    const { width, height } = targetElement.getBoundingClientRect();
    const two = new Two({ width, height }).appendTo(targetElement);

    const radius = Math.max(width, height) / Math.PI;
    const distance = radius / (6 * Math.PI);

    const circleA = two.makeCircle(-distance, 0, radius);
    const circleB = two.makeCircle(distance, 0, radius);

    circleA.fill = circleB.fill = 'var(--color-background-secondary-overlay)';
    const group = two.makeGroup(circleA, circleB);
    group.translation.set(two.width / 2, two.height / 2);
    group.rotation = 0;
    group.scale = 1;
    group.noStroke();

    const svg = targetElement.querySelector('svg');
    svg.style.zIndex = '-15';

    const groupTween = new TWEEN.Tween({rotation: 0})
        .to({rotation: 3}, 40000)
        .onUpdate((o) => group.rotation = o.rotation)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .repeat(Infinity)
        .yoyo()
        .start();   
    const circleTween = new TWEEN.Tween({ distance })
        .to({ distance: -distance }, 30000)
        .onUpdate((o) => {
            circleA.translation.set(0, o.distance);
            circleB.translation.set(0, -o.distance);
        })
        .easing(TWEEN.Easing.Back.InOut)
        .repeat(Infinity)
        .yoyo()
        .start();
    // const opacityTween = new TWEEN.Tween({ opacity: .7})
    //     .to({ opacity: .5 }, 3000)
    //     .onUpdate((o) => group.opacity = o.opacity)
    //     .repeat(Infinity)
    //     .repeatDelay(5000)
    //     .yoyo()
    //     .start()

    five.animate((time) => {
        TWEEN.update(time);
        two.update();
    });
});

