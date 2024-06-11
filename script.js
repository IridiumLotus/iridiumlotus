document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('text');
    const lottieContainer = document.getElementById('lottieContainer');
    const lottieElement = document.getElementById('lottie');
    const lotusImg = document.getElementById('lotusImg');
    const contactEmail = document.getElementById('contact-email');
    const fadeText = document.getElementById('fadeText');

    // Text typing animation
    function typeText(text, element, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            } else {
                callback();
            }
        }
        type();
    }

    // Function to fade in words one by one
    function fadeInWords(text, element) {
        const words = text.split(' ');
        element.innerHTML = '';
        let wordIndex = 0;

        function showNextWord() {
            if (wordIndex < words.length) {
                const span = document.createElement('span');
                span.style.opacity = '0';
                span.style.transition = 'opacity 1s';
                span.textContent = words[wordIndex] + ' ';
                element.appendChild(span);
                setTimeout(() => {
                    span.style.opacity = '1';
                }, 100);
                wordIndex++;
                setTimeout(showNextWord, 300);
            }
        }

        showNextWord();
        element.style.opacity = '1';  // Ensure fadeText is visible
    }

    // Start typing animation
    typeText('./iridium', textElement, () => {
        textElement.innerHTML += '<span class="blinking">.</span>';
        setTimeout(() => {
            textElement.style.transition = 'top 2s';
            textElement.style.top = 'calc(100vh - 10vh)';
            textElement.addEventListener('transitionend', () => {
                lotusImg.style.opacity = '1'; // Fade in the lotus image
                contactEmail.style.opacity = '1'; // Fade in the contact email
                setTimeout(() => {
                    lotusImg.style.cursor = 'pointer'; // Enable pointer cursor after delay
                    lotusImg.addEventListener('click', handleLotusClick);
                }, 1000); // 1 second delay after the fade-in transition
            });
        }, 800); // Adjust the delay before moving the text to the bottom

        // Load and setup Lottie animation
        const animation = lottie.loadAnimation({
            container: lottieElement,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'lotusAnimation.json?' + new Date().getTime() // Add cache buster
        });

        function handleLotusClick() {
            lotusImg.style.display = 'none'; // Hide the initial PNG
            lottieContainer.style.display = 'flex'; // Show the Lottie container
            lottieContainer.style.opacity = '1'; // Fade in the Lottie container
            animation.goToAndStop(0, true);
            animation.play();
        }

        // Handle completion of Lottie animation
        animation.addEventListener('complete', () => {
            // Show and fade in the text word by word
            fadeInWords('Я не могу сдержать своего презрения к вам, демонам. Вы говорите чисто, а затем взрываете больницы', fadeText);
        });
    });
});
