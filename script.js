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
        document.getElementById('lottie-lotus').addEventListener('click', playAnimation);
        document.querySelectorAll('.petal').forEach(petal => {
            petal.addEventListener('click', onPetalClick);
            petal.addEventListener('mouseover', onPetalHover);
            petal.addEventListener('mouseout', onPetalBlur);
        });
    }

    function playAnimation() {
        const animation = lottie.loadAnimation({
            container: document.getElementById('lottie-lotus'),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'lotusAnimation.json'
        });
        animation.play();
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
