document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('text');
    const lottieContainer = document.getElementById('lottieContainer');
    const lottieElement = document.getElementById('lottie');
    const contactEmail = document.getElementById('contact-email');
    const fadeText = document.getElementById('fadeText');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playPauseButton = document.getElementById('playPauseButton');
    const customButton = document.querySelector('.custom-button');

    let animationCompleted = false;

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
                document.body.addEventListener('click', handleBodyClick);
            });
        }, 800);

        const animation = lottie.loadAnimation({
            container: lottieElement,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'lotusAnimation.json?' + new Date().getTime() 
        });

        function handleBodyClick() {
            if (!animationCompleted) {
                lottieContainer.style.display = 'flex';
                lottieContainer.style.opacity = '1';
                animation.goToAndStop(0, true);
                animation.play();
                backgroundMusic.play();
                setTimeout(() => {
                    playPauseButton.style.opacity = '1';
                    customButton.style.opacity = '1'; 
                }, 1000);
                animationCompleted = true;
            }
        }

        animation.addEventListener('complete', () => {
            console.log("Animation completed");
            fadeText.style.opacity = '1';
            fadeText.textContent = 'Убейте всех своих демонов, ибо ваша душа достойна искупления ';
            contactEmail.style.opacity = '1';
            customButton.style.opacity = '1'; 
            enableHoverEffects();
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
                    element.querySelector('path').style.stroke = '#ffffff'; 
                    element.querySelector('path').style.strokeWidth = '3px'; 
                    const bbox = element.getBoundingClientRect();
                    petalInfo.style.top = `${bbox.top + window.scrollY}px`;
                    petalInfo.style.left = `${bbox.left + window.scrollX}px`;
                    petalInfo.classList.add('visible');
                });

                element.addEventListener('mouseleave', () => {
                    element.querySelector('path').style.stroke = ''; 
                    element.querySelector('path').style.strokeWidth = ''; 
                    petalInfo.classList.remove('visible');
                });
            });
        }
    });

    playPauseButton.addEventListener('click', function() {
        const playIcon = document.querySelector('#playPauseButton .fa-circle-play');
        const pauseIcon = document.querySelector('#playPauseButton .fa-circle-pause');
        
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline-block';
        } else {
            backgroundMusic.pause();
            playIcon.style.display = 'inline-block';
            pauseIcon.style.display = 'none';
        }
    });    

    playPauseButton.style.cursor = 'pointer'; 
});
