document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('text');
    const lottieContainer = document.getElementById('lottieContainer');
    const lottieElement = document.getElementById('lottie');
    const fadeText = document.getElementById('fadeText');
    const contactEmail = document.getElementById('contact-email');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playPauseButton = document.getElementById('playPauseButton');

    function typeText(text, element, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    typeText('./iridium', textElement, () => {
        textElement.innerHTML += '<span class="blinking">.</span>';
        setTimeout(() => {
            textElement.style.transition = 'top 2s';
            textElement.style.position = 'absolute';
            textElement.style.top = 'calc(100vh - 10vh)';
            textElement.addEventListener('transitionend', () => {
                lottieContainer.style.display = 'flex';
                lottieContainer.style.opacity = '1';

                // Start the animation
                const animation = lottie.loadAnimation({
                    container: lottieElement,
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                    path: 'lotusAnimation.json?' + new Date().getTime()
                });

                animation.addEventListener('complete', () => {
                    console.log("Animation completed");
                    fadeText.style.opacity = '1';
                    fadeText.textContent = 'Убейте всех своих демонов, ибо ваша душа достойна искупления';
                    enableHoverEffects();
                    contactEmail.style.opacity = '1';
                });

                // Play background music
                backgroundMusic.play();
                playPauseButton.style.opacity = '1';
            });
        }, 800);
    });

    playPauseButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playPauseButton.textContent = '| |';
        } else {
            backgroundMusic.pause();
            playPauseButton.textContent = ' >';
        }
    });

    function enableHoverEffects() {
        const svgElements = lottieElement.querySelectorAll('g[id^="petal-"]');
        const petalTexts = {
            'l1': 'you',
            'l2': 'are',
            'r1': 'i',
            'r2': 'am',
            't': 'as bored as',
            'b': 'v0id.pw'
        };

        svgElements.forEach(element => {
            const petalId = element.id.replace('petal-', '');
            const petalInfo = document.createElement('div');
            petalInfo.classList.add('petal-info');
            petalInfo.textContent = petalTexts[petalId] || 'Info about ' + petalId;
            document.body.appendChild(petalInfo);

            element.addEventListener('mouseenter', () => {
                element.querySelector('path').style.stroke = '#ffffff'; // Change stroke color to white on hover
                const bbox = element.getBoundingClientRect();
                petalInfo.style.top = `${bbox.top + window.scrollY}px`;
                petalInfo.style.left = `${bbox.left + window.scrollX}px`;
                petalInfo.classList.add('visible');
            });

            element.addEventListener('mouseleave', () => {
                element.querySelector('path').style.stroke = ''; // Reset stroke color
                petalInfo.classList.remove('visible');
            });
        });
    }
});
