// Mobile Menu Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-menu a');
const navbarHeight = navbar.offsetHeight;

// Menu Toggle with Optimized Animation
hamburger.addEventListener('click', () => {
  // Prepare for animation
  if (!navMenu.classList.contains('active')) {
    navMenu.style.willChange = 'transform, opacity, max-height';
  }
  
  // Toggle classes
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
  document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
  
  // Clean up after animation
  if (!navMenu.classList.contains('active')) {
    setTimeout(() => {
      navMenu.style.willChange = 'auto';
    }, 300);
  }
});

// Close menu when clicking links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  });
});

// Auto Hide Navbar on Scroll
let lastScrollTop = 0;
const SCROLL_THRESHOLD = 100;

window.addEventListener('scroll', () => {
  if (hamburger.classList.contains('active')) return;
  
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > SCROLL_THRESHOLD) {
    navbar.classList.add('hide');
  } else {
    navbar.classList.remove('hide');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Responsive Behavior
function handleResize() {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    navbar.classList.remove('hide');
  } else {
    navMenu.removeAttribute('style');
    void navMenu.offsetHeight;
  }
}

window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);

// Initialize menu items for smooth animation
navLinks.forEach((link, index) => {
  link.parentElement.style.setProperty('--i', index);
});
