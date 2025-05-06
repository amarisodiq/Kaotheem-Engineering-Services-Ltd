const { computeStyles } = require("@popperjs/core");

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");


document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarSupportedContent');

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        //   toggle: false
        // });

        const isMobile = window.getComputedStyle(
          document.querySelector('.navbar-toggler')).display !== 'none';

          if(isMobile){
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });

        bsCollapse.hide();
          }
    });
  });
});


// loop
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector(".scrolling-content");

  // Duplicate images to ensure seamless scrolling
  scrollContainer.innerHTML += scrollContainer.innerHTML;
});