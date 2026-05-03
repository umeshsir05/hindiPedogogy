// script.js - Cross-page dark mode + mobile toggle menu (no SPA)
document.addEventListener('DOMContentLoaded', function() {
  // ----- DARK MODE -----
  const darkToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  // Helper to update icon based on dark mode state
  function updateDarkIcon(isDark) {
    if (!darkToggle) return;
    const icon = darkToggle.querySelector('i');
    if (icon) {
      if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
  }
  
  // Load stored theme or system preference
  const storedTheme = localStorage.getItem('langPedagogyTheme');
  if (storedTheme === 'dark') {
    body.classList.add('dark');
    updateDarkIcon(true);
  } else if (storedTheme === 'light') {
    body.classList.remove('dark');
    updateDarkIcon(false);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      body.classList.add('dark');
      updateDarkIcon(true);
      localStorage.setItem('langPedagogyTheme', 'dark');
    } else {
      body.classList.remove('dark');
      updateDarkIcon(false);
      localStorage.setItem('langPedagogyTheme', 'light');
    }
  }
  
  // Toggle dark mode on button click
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        localStorage.setItem('langPedagogyTheme', 'light');
        updateDarkIcon(false);
      } else {
        body.classList.add('dark');
        localStorage.setItem('langPedagogyTheme', 'dark');
        updateDarkIcon(true);
      }
    });
  }
  
  // ----- MOBILE TOGGLE MENU -----
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  
  function closeMobileMenu() {
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
      if (hamburger) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  }
  
  function toggleMobileMenu() {
    if (navMenu && navMenu.classList.contains('open')) {
      closeMobileMenu();
    } else if (navMenu) {
      navMenu.classList.add('open');
      document.body.classList.add('menu-open');
      if (hamburger) {
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    }
  }
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when a navigation link is clicked (on mobile)
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
    
    // Close menu if clicking outside of menu and hamburger
    document.addEventListener('click', function(event) {
      const isMenuOpen = navMenu.classList.contains('open');
      if (!isMenuOpen) return;
      const isClickInsideMenu = navMenu.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);
      if (!isClickInsideMenu && !isClickOnHamburger) {
        closeMobileMenu();
      }
    });
  }
  
  // On window resize, close menu if screen becomes wide
  window.addEventListener('resize', function() {
    if (window.innerWidth > 860 && navMenu && navMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });
  
  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksAll = document.querySelectorAll('.nav-list a');
  navLinksAll.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
