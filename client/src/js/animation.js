(() => {
    const targetElement = five.createTag('div', { 'class': 'background-animation' });
    document.body.prepend(targetElement);

    const { width, height } = targetElement.getBoundingClientRect();
    const two = new Two({ width, height }).appendTo(targetElement);

    const radius = width / 4;
    const distance = radius / (4 * Math.PI);

    const circleA = two.makeCircle(-distance, 0, radius);
    const circleB = two.makeCircle(distance, 0, radius);

    circleA.fill = circleB.fill = 'var(--color-background-secondary-overlay)';

    const group = two.makeGroup(circleA, circleB);
    group.translation.set(two.width / 2, two.height / 2);
    group.rotation = 0;
    group.scale = 1;
    group.noStroke();

    const makeAnimation = (duration, startValue, endValue, direction = 1) => {
        return {
            duration,
            startValue,
            endValue,
            currentValue: startValue,
            currentFrame: 0,
            direction
        };
    };
    
    const easeInOut = function (f, b, c, d) {
        let t = f / (d/2);
        if (t < 1) {
            return c/2*t*t + b;
        }
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    const updateAnimations = (...animations) => {
        animations.forEach((a) => {
            a.currentFrame += a.direction;
            a.currentValue = easeInOut(a.currentFrame, a.startValue, a.endValue, a.duration);
            if (a.currentFrame >= a.duration || a.currentFrame <= 0) {
                a.direction = -a.direction;
            }
        });
    };

    const groupRotation = makeAnimation(2500, 0, 2),
        circleDistance = makeAnimation(1250, distance, distance * 2);

    two.bind('update', () => {
        updateAnimations(groupRotation, circleDistance);
        group.rotation = groupRotation.currentValue;
        circleA.translation.set(-circleDistance.currentValue, 0);
        circleB.translation.set(circleDistance.currentValue, 0);
      }).play()
})();
