// script.js
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 1; // Start at the first real image
const imageWidth = images[0].offsetWidth + 20; // Image width + gap

// Clone images for seamless looping
const firstClone = carousel.children[0].cloneNode(true);
const secondClone = carousel.children[1].cloneNode(true);
const lastButOneClone = carousel.children[carousel.children.length - 2].cloneNode(true)
const lastClone = carousel.children[carousel.children.length - 1].cloneNode(true);

carousel.appendChild(firstClone);
carousel.appendChild(secondClone);
carousel.prepend(lastClone);
carousel.prepend(lastButOneClone);

const totalImages = images.length + 2; // Include clones

// Set initial position
carousel.style.transform = `translateX(${-imageWidth * currentIndex}px)`;

// Update position with animation
function updateCarousel() {
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(${-imageWidth * currentIndex}px)`;
}

// Handle next button
function nextImage() {
    if (currentIndex >= totalImages - 2) {
        currentIndex++; // Move to the cloned first image
        updateCarousel();

        // Reset position to first real image
        setTimeout(() => {
            carousel.style.transition = "none";
            currentIndex = 1;
            carousel.style.transform = `translateX(${-imageWidth * currentIndex}px)`;
        }, 500);
    } else {
        currentIndex++;
        updateCarousel();
    }
}

// Handle previous button
function prevImage() {
    if (currentIndex <= 0) {
        currentIndex--; // Move to the cloned last image
        updateCarousel();

        // Reset position to last real image
        setTimeout(() => {
            carousel.style.transition = "none";
            currentIndex = totalImages - 3;
            carousel.style.transform = `translateX(${-imageWidth * currentIndex}px)`;
        }, 500);
    } else {
        currentIndex--;
        updateCarousel();
    }
}

// Event listeners
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);
