document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('text');
    const contactEmail = document.getElementById('contact-email');
    const fadeText = document.getElementById('fadeText');
    const lottieContainer = document.getElementById('lottieContainer');
    const lottie = document.getElementById('lottie');
    const lotusImg = document.getElementById('lotusImg');
    const playPauseButton = document.getElementById('playPauseButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const animationPath = 'iridium_lotus.json';
    
    const petalInfo = {
        'petal-l1': 'Sample text 1',
        'petal-l2': 'Sample text 2',
        'petal-r1': 'Sample text 3',
        'petal-r2': 'Sample text 4',
        'petal-t': 'Sample text 5',
        'petal-b': 'Sample text 6'
    };

    const animation = lottie.loadAnimation({
        container: lottie,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: animationPath
    });

    animation.addEventListener('DOMLoaded', () => {
        lottieContainer.style.display = 'flex';
    });

    animation.addEventListener('complete', () => {
        console.log('Animation complete'); // Debugging log
        lotusImg.style.opacity = 1;
        contactEmail.style.opacity = 1;
        fadeText.style.opacity = 1;
        playPauseButton.style.opacity = 1;
        
        // Enable pointer events for petal hover effects
        document.querySelectorAll('#petal-l1 path, #petal-l2 path, #petal-r1 path, #petal-r2 path, #petal-t path, #petal-b path').forEach((petal) => {
            petal.style.pointerEvents = 'auto';
        });
        
        Object.keys(petalInfo).forEach(petalId => {
            const petal = document.getElementById(petalId);
            const infoBox = document.createElement('div');
            infoBox.classList.add('petal-info');
            infoBox.innerText = petalInfo[petalId];
            petal.parentElement.appendChild(infoBox);

            petal.addEventListener('mouseover', () => {
                petal.style.stroke = 'rgb(255, 255, 255)';
                petal.style.strokeWidth = '3px';
                infoBox.classList.add('visible');
            });

            petal.addEventListener('mouseout', () => {
                petal.style.stroke = '';
                petal.style.strokeWidth = '';
                infoBox.classList.remove('visible');
            });
        });
    });

    function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
            textElement.innerHTML = text.substring(0, i + 1) + '<span class="blinking">|</span>';
            setTimeout(() => {
                typeWriter(text, i + 1, fnCallback);
            }, 100);
        } else if (typeof fnCallback === 'function') {
            setTimeout(fnCallback, 700);
        }
    }

    function startTextAnimation() {
        textElement.style.opacity = 1;
        typeWriter('./iridium', 0, () => {
            textElement.innerHTML = './iridium';
            textElement.style.transform = 'translate(-50%, 300%)';
            textElement.style.opacity = 0;
            setTimeout(() => {
                lottieContainer.style.display = 'flex';
                lottieContainer.style.opacity = 1;
            }, 1000);
        });
    }

    startTextAnimation();
});
