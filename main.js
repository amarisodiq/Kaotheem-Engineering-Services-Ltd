// ========================================
// WAIT FOR DOM TO FULLY LOAD
// ========================================
document.addEventListener("DOMContentLoaded", function () {
    
  // ========================================
  // CLIENT LOGO SCROLLING LOOP
  // ========================================
  const scrollContainer = document.querySelector(".scrolling-content");
  if (scrollContainer) {
      // Duplicate images to ensure seamless scrolling
      scrollContainer.innerHTML += scrollContainer.innerHTML;
  }
  
  // ========================================
  // HANDLE MISSING GALLERY IMAGES
  // ========================================
  const galleryImages = document.querySelectorAll('.gallery-item img');
  galleryImages.forEach(img => {
      img.onerror = function() {
          console.log('Image not found, using placeholder:', this.src);
          this.src = 'https://via.placeholder.com/600x400/0a3d6d/white?text=Kaotheem+Image+Coming+Soon';
          this.classList.add('placeholder-image');
      };
  });
  
  // Handle modal images
  const modalImages = document.querySelectorAll('.modal-body img');
  modalImages.forEach(img => {
      img.onerror = function() {
          console.log('Modal image not found:', this.src);
          this.src = 'https://via.placeholder.com/1200x800/0a3d6d/white?text=Kaotheem+Image+Coming+Soon';
          this.classList.add('placeholder-image');
      };
  });
  
  // ========================================
  // MOBILE NAVBAR AUTO-CLOSE
  // ========================================
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarNav');
  
  if (navLinks.length > 0 && navbarCollapse) {
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              const navbarToggler = document.querySelector('.navbar-toggler');
              const isMobile = navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none';
              
              if (isMobile) {
                  const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                      toggle: false
                  });
                  bsCollapse.hide();
              }
          });
      });
  }
  
  // ========================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (targetId !== "#" && targetId !== "") {
              const target = document.querySelector(targetId);
              if (target) {
                  e.preventDefault();
                  target.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
              }
          }
      });
  });
  
  // ========================================
  // ADD ACTIVE CLASS TO NAV LINKS ON SCROLL
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
      window.addEventListener('scroll', () => {
          let current = '';
          const scrollPosition = window.scrollY + 100;
          
          sections.forEach(section => {
              const sectionTop = section.offsetTop;
              const sectionHeight = section.clientHeight;
              if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                  current = section.getAttribute('id');
              }
          });
          
          navLinks.forEach(link => {
              link.classList.remove('active');
              const href = link.getAttribute('href');
              if (href === `#${current}`) {
                  link.classList.add('active');
              }
          });
      });
  }
  
  // ========================================
  // CONTACT FORM HANDLING (ENHANCED)
  // ========================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  
  if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          // Get form elements
          const name = document.getElementById('name');
          const email = document.getElementById('email');
          const message = document.getElementById('message');
          const privacy = document.getElementById('privacyPolicy');
          
          // Validate form
          let isValid = true;
          
          // Validate name
          if (!name.value.trim()) {
              name.classList.add('is-invalid');
              isValid = false;
          } else {
              name.classList.remove('is-invalid');
          }
          
          // Validate email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!email.value.trim() || !emailRegex.test(email.value)) {
              email.classList.add('is-invalid');
              isValid = false;
          } else {
              email.classList.remove('is-invalid');
          }
          
          // Validate message
          if (!message.value.trim()) {
              message.classList.add('is-invalid');
              isValid = false;
          } else {
              message.classList.remove('is-invalid');
          }
          
          // Validate privacy policy
          if (privacy && !privacy.checked) {
              privacy.classList.add('is-invalid');
              isValid = false;
          } else if (privacy) {
              privacy.classList.remove('is-invalid');
          }
          
          if (!isValid) return;
          
          // Show loading state
          if (submitBtn) {
              submitBtn.disabled = true;
          }
          if (loadingSpinner) {
              loadingSpinner.classList.remove('d-none');
          }
          if (submitBtn && submitBtn.querySelector('i')) {
              submitBtn.querySelector('i').classList.add('d-none');
          }
          
          // Hide previous messages
          if (successMessage) successMessage.classList.add('d-none');
          if (errorMessage) errorMessage.classList.add('d-none');
          
          try {
              const formData = new FormData(contactForm);
              const response = await fetch('https://formsubmit.co/ajax/info@kaotheem.com', {
                  method: 'POST',
                  body: formData
              });
              
              if (response.ok) {
                  if (successMessage) successMessage.classList.remove('d-none');
                  contactForm.reset();
                  if (successMessage) {
                      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                  setTimeout(() => {
                      if (successMessage) successMessage.classList.add('d-none');
                  }, 5000);
              } else {
                  throw new Error('Submission failed');
              }
          } catch (error) {
              console.error('Form submission error:', error);
              if (errorMessage) errorMessage.classList.remove('d-none');
              setTimeout(() => {
                  if (errorMessage) errorMessage.classList.add('d-none');
              }, 5000);
          } finally {
              // Reset button state
              if (submitBtn) {
                  submitBtn.disabled = false;
              }
              if (loadingSpinner) {
                  loadingSpinner.classList.add('d-none');
              }
              if (submitBtn && submitBtn.querySelector('i')) {
                  submitBtn.querySelector('i').classList.remove('d-none');
              }
          }
      });
  }
});

// ========================================
// HERO BACKGROUND SLIDESHOW - CONTINUOUS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  
  // Array of hero background images
  const heroImages = [
      './image/gallery-6.png',
      './image/gallery-5.png',
      './image/gallery-7.png',
      './image/gallery-1.png',
      './image/kaotheem-2.jpg'
  ];
  
  let currentImageIndex = 0;
  let slideInterval;
  const slideDuration = 5000; // 5 seconds per slide
  const transitionSpeed = 1000; // 1 second transition
  
  const heroSection = document.querySelector('.hero-bg');
  
  // Only run if hero section exists
  if (heroSection && heroImages.length > 0) {
      
      // Preload all images for smooth transitions
      heroImages.forEach((src) => {
          const img = new Image();
          img.src = src;
      });
      
      // Set initial background
      heroSection.style.backgroundImage = `url('${heroImages[0]}')`;
      heroSection.style.transition = `background-image ${transitionSpeed}ms ease-in-out`;
      
      // Create navigation dots
      createNavigationDots();
      
      // Start slideshow
      startSlideshow();
      
      function changeBackground() {
          currentImageIndex = (currentImageIndex + 1) % heroImages.length;
          heroSection.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
          updateActiveDot();
      }
      
      function goToImage(index) {
          if (index !== currentImageIndex) {
              currentImageIndex = index;
              heroSection.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
              updateActiveDot();
              resetSlideshow();
          }
      }
      
      function startSlideshow() {
          if (slideInterval) clearInterval(slideInterval);
          slideInterval = setInterval(changeBackground, slideDuration);
      }
      
      function resetSlideshow() {
          clearInterval(slideInterval);
          startSlideshow();
      }
      
      function createNavigationDots() {
          const existingDots = document.querySelector('.hero-slide-dots');
          if (existingDots) existingDots.remove();
          
          const dotsContainer = document.createElement('div');
          dotsContainer.className = 'hero-slide-dots';
          
          heroImages.forEach((image, index) => {
              const dot = document.createElement('div');
              dot.className = 'hero-dot';
              if (index === 0) dot.classList.add('active');
              dot.addEventListener('click', () => goToImage(index));
              dotsContainer.appendChild(dot);
          });
          
          heroSection.appendChild(dotsContainer);
      }
      
      function updateActiveDot() {
          const dots = document.querySelectorAll('.hero-dot');
          dots.forEach((dot, index) => {
              if (index === currentImageIndex) {
                  dot.classList.add('active');
              } else {
                  dot.classList.remove('active');
              }
          });
      }
  }
});

// ========================================
// TYPEWRITER TEXT ANIMATION
// ========================================
const texts = [
  "Quality NDT Services You Can Trust",
  "Safety | Precision | Reliability",
  "9+ Years of Excellence",
  "Authorized Distributor - SREM TECHNOLOGIES"
];

let currentText = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100;
const pause = 2000;

function typeWriter() {
  const element = document.getElementById("typewriter");
  if (!element) return;
  
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

// Start typewriter if element exists
if (document.getElementById("typewriter")) {
  typeWriter();
}

// ========================================
// GALLERY MODAL STYLES
// ========================================
const addModalStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
      .custom-modal-image,
      .modal-body img {
          max-width: 85%;
          max-height: 70vh;
          width: auto;
          height: auto;
          margin: 0 auto;
          display: block;
          object-fit: contain;
          border-radius: 8px;
      }
      
      @media (min-width: 1200px) {
          .custom-modal-image,
          .modal-body img {
              max-width: 70%;
              max-height: 65vh;
          }
      }
      
      @media (min-width: 1400px) {
          .custom-modal-image,
          .modal-body img {
              max-width: 60%;
              max-height: 60vh;
          }
      }
      
      @media (min-width: 1600px) {
          .custom-modal-image,
          .modal-body img {
              max-width: 50%;
              max-height: 55vh;
          }
      }
      
      @media (min-width: 1920px) {
          .custom-modal-image,
          .modal-body img {
              max-width: 45%;
              max-height: 50vh;
          }
      }
      
      .modal-content.bg-dark {
          background-color: rgba(0, 0, 0, 0.95) !important;
          border: none;
          border-radius: 16px;
      }
      
      .modal-header.border-0 {
          border-bottom: none !important;
          padding: 1rem 1rem 0 1rem;
      }
      
      .btn-close-white {
          filter: brightness(0) invert(1);
          opacity: 0.7;
          transition: opacity 0.3s;
      }
      
      .btn-close-white:hover {
          opacity: 1;
      }
      
      .gallery-item {
          cursor: pointer;
          overflow: hidden;
          border-radius: 12px;
      }
      
      .gallery-item img {
          transition: transform 0.5s ease;
          width: 100%;
          height: 280px;
          object-fit: cover;
      }
      
      .gallery-item:hover img {
          transform: scale(1.05);
      }
      
      .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(8, 20, 62, 0.85);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
      }
      
      .gallery-item:hover .gallery-overlay {
          opacity: 1;
      }
      
      .gallery-overlay i {
          font-size: 3rem;
          color: white;
          margin-bottom: 1rem;
      }
      
      .gallery-overlay p {
          color: white;
          margin: 0;
          font-weight: 500;
      }
      
      @media (max-width: 768px) {
          .gallery-item img {
              height: 220px;
          }
      }
  `;
  document.head.appendChild(style);
};

// Add modal styles if gallery exists
if (document.querySelector('.gallery-section')) {
  addModalStyles();
}

// ========================================
// EMAIL VALIDATION HELPER
// ========================================
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ========================================
// AOS REFRESH
// ========================================
if (typeof AOS !== 'undefined') {
  AOS.refresh();
}

// ========================================
// CONSOLE LOG
// ========================================
console.log('Kaotheem Energy Services - Website Loaded Successfully');