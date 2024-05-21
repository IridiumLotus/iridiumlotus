document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.querySelector('.terminal .command');
    const cursor = document.querySelector('.blinking-cursor');
    const text = './iridium';
    let index = 0;

    function type() {
        if (index < text.length) {
            terminal.textContent += text.charAt(index);
            index++;
            setTimeout(type, 150);
        } else {
            cursor.classList.add('static');
            setTimeout(moveTerminal, 500); // Add delay before moving the terminal
        }
    }

    function moveTerminal() {
        const terminalContainer = document.querySelector('.terminal-container');
        terminalContainer.style.top = '80%';
        terminalContainer.style.transform = 'translate(-50%, 0)';
        setTimeout(showLotus, 1000); // Delay before showing the lotus
    }

    function showLotus() {
        document.querySelector('.lotus-container').classList.remove('hidden');
        document.getElementById('static-lotus').addEventListener('click', playAnimation);
    }

    function playAnimation() {
        console.log('Static lotus clicked');
        const staticLotus = document.getElementById('static-lotus');
        staticLotus.classList.add('hidden');
        const lottieContainer = document.getElementById('lottie-lotus');
        lottieContainer.classList.remove('hidden');

        const animation = lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'lotusAnimation.json'
        });

        animation.addEventListener('DOMLoaded', () => {
            console.log('Lottie animation loaded');
            animation.play();
        });

        animation.addEventListener('complete', () => {
            console.log('Lottie animation complete');
            // Ensure petals are clickable after animation completes
            const petals = document.querySelectorAll('.petal');
            petals.forEach(petal => {
                petal.addEventListener('click', onPetalClick);
                petal.addEventListener('mouseover', onPetalHover);
                petal.addEventListener('mouseout', onPetalBlur);
            });
        });

        animation.addEventListener('error', (error) => {
            console.error('Error loading Lottie animation:', error);
        });
    }

    function onPetalClick(event) {
        // Handle click event for the petal
        console.log('Petal clicked:', event.target.id);
    }

    function onPetalHover(event) {
        // Handle hover event for the petal
        event.target.style.opacity = 0.7;
    }

    function onPetalBlur(event) {
        // Handle blur event for the petal
        event.target.style.opacity = 1;
    }

    type();
});
