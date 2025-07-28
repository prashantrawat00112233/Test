// Menu Toggle Functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Calculate navbar height for precise positioning
const navbarHeight = navbar.offsetHeight;

// Smooth Hamburger Menu Toggle
menuToggle.addEventListener('click', () => {
  // Toggle animation classes
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('show');
  
  // Lock scroll when menu is open
  if (menuToggle.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
    // Add navbar height to menu top position
    navLinks.style.top = `${navbarHeight}px`;
    navLinks.style.height = `calc(100vh - ${navbarHeight}px)`;
  } else {
    document.body.style.overflow = '';
  }
  
  // Prevent navbar hiding when menu is open
  navbar.classList.toggle('menu-open', menuToggle.classList.contains('active'));
});

// Close menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('show');
    document.body.style.overflow = '';
    navbar.classList.remove('menu-open');
  });
});

// Auto Hide Navbar on Scroll
let lastScrollTop = 0;
const SCROLL_THRESHOLD = 100;

window.addEventListener('scroll', () => {
  // Don't hide navbar if menu is open
  if (menuToggle.classList.contains('active')) return;
  
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > SCROLL_THRESHOLD) {
    // Scrolling down
    navbar.classList.add('hide');
  } else {
    // Scrolling up or at top
    navbar.classList.remove('hide');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Responsive behavior
window.addEventListener('resize', () => {
  // Close menu when resizing to desktop
  if (window.innerWidth > 768) {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('show');
    document.body.style.overflow = '';
    navbar.classList.remove('menu-open');
    navbar.classList.remove('hide');
  }
  
  // Update menu position on mobile resize
  if (window.innerWidth <= 768 && menuToggle.classList.contains('active')) {
    const newNavbarHeight = navbar.offsetHeight;
    navLinks.style.top = `${newNavbarHeight}px`;
    navLinks.style.height = `calc(100vh - ${newNavbarHeight}px)`;
  }
});