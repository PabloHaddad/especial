// script.js

document.addEventListener("DOMContentLoaded", () => {
    
    // Elements
    const typedTextElement = document.getElementById("typed-text");
    const loadingSpinner = document.getElementById("search-loading");
    const heartTransition = document.getElementById("heart-transition");
    const introScreen = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");
    const bgParticles = document.getElementById("bg-particles");
    const carouselImg = document.getElementById("carousel-img");

    // Config
    const textToType = "A melhor mãe do mundo";
    const typingSpeed = 100; // ms per char
    
    const images = [
        "assets/Captura de tela 2026-05-08 094155.png",
        "assets/Captura de tela 2026-05-08 094420.png",
        "assets/Captura de tela 2026-05-08 094505.png",
        "assets/Captura de tela 2026-05-08 094547.png"
    ];
    let currentImageIndex = 0;

    // 1. Typing Animation
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            // Typing finished, simulate search loading
            setTimeout(startSearch, 600);
        }
    }

    // 2. Start Search & Transition
    function startSearch() {
        // Hide cursor, show spinner
        document.querySelector('.cursor').style.display = 'none';
        loadingSpinner.classList.remove('hidden');

        // Wait a bit, then trigger the heart transition
        setTimeout(() => {
            triggerHeartTransition();
        }, 1500);
    }

    // 3. Heart Expansion Transition
    function triggerHeartTransition() {
        // Expand the heart
        heartTransition.classList.add('expand');

        // After heart covers screen, switch contents
        setTimeout(() => {
            introScreen.classList.remove('active');
            introScreen.classList.add('hidden');
            
            mainContent.classList.remove('hidden');
            mainContent.classList.add('active');
            
            // Create background particles
            createParticles();
            
            // Start the image carousel
            startImageCarousel();
        }, 800); // Wait for heart to expand enough to cover screen
    }

    // 4. Image Carousel
    function startImageCarousel() {
        setInterval(() => {
            // Fade out
            carouselImg.style.opacity = 0;
            
            setTimeout(() => {
                // Change image source while invisible
                currentImageIndex = (currentImageIndex + 1) % images.length;
                carouselImg.src = images[currentImageIndex];
                
                // Fade back in
                carouselImg.style.opacity = 1;
            }, 800); // Wait for fade out transition (CSS is 0.8s)

        }, 3000); // Change every 3 seconds
    }

    // 5. Generate Floating Particles
    function createParticles() {
        const particleCount = 20;
        const emojis = ['♥', '💖', '✨', '🌸'];

        for (let i = 0; i < particleCount; i++) {
            createSingleParticle(emojis);
        }

        // Keep generating new ones occasionally
        setInterval(() => {
            createSingleParticle(emojis);
        }, 2000);
    }

    function createSingleParticle(emojis) {
        const particle = document.createElement('div');
        particle.classList.add('floating-heart');
        
        // Random properties
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.fontSize = (Math.random() * 15 + 10) + 'px';
        particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        bgParticles.appendChild(particle);

        // Remove after animation finishes to prevent DOM bloat
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    // Start the experience after a brief delay
    setTimeout(typeText, 1000);
});
