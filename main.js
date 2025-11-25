// const { computeStyles } = require("@popperjs/core");

// @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");


// document.addEventListener('DOMContentLoaded', function () {
//     const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
//     const navbarCollapse = document.getElementById('navbarSupportedContent');

//     navLinks.forEach(link => {
//       link.addEventListener('click', () => {
//         // const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
//         //   toggle: false
//         // });

//         const isMobile = window.getComputedStyle(
//           document.querySelector('.navbar-toggler')).display !== 'none';

//           if(isMobile){
//             const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
//             toggle: false
//           });

//         bsCollapse.hide();
//           }
//     });
//   });
// });


// loop
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector(".scrolling-content");

  // Duplicate images to ensure seamless scrolling
  scrollContainer.innerHTML += scrollContainer.innerHTML;
});


// text animation
const texts = [
  "Welcome to Kaotheem.",
  "Engineering solutions that build the future.",
  "Reliable. Efficient. Impact-driven.",
  "Precision you can trust."
];

let currentText = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100; // Typing speed
const pause = 1500; // Pause between full texts

function typeWriter() {
  const element = document.getElementById("typewriter");
  const fullText = texts[currentText];

  if (isDeleting) {
      charIndex--;
      element.textContent = fullText.substring(0, charIndex);
  } else {
      charIndex++;
      element.textContent = fullText.substring(0, charIndex);
  }

  if (!isDeleting && charIndex === fullText.length) {
      isDeleting = true;
      setTimeout(typeWriter, pause);
  } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentText = (currentText + 1) % texts.length;
      setTimeout(typeWriter, 500);
  } else {
      setTimeout(typeWriter, isDeleting ? 50 : speed);
  }
}

typeWriter();
// End of text animation 

// hero animation
const images = [
  './image/kaotheem-2.jpg',
  './image/kaotheem-6.jpg',
  './image/kaotheem-3.jpg',
  './image/kaotheem-5.jpg',
];

// Preload all images
images.forEach((src) => {
  const img = new Image();
  img.src = src;
});

let current = 0;
const hero = document.querySelector('.bg-hero');

function changeBackground() {
  hero.style.backgroundImage = `url('${images[current]}')`;
  current = (current + 1) % images.length;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  changeBackground(); // Initial load
  setInterval(changeBackground, 5000); // Loop
});

