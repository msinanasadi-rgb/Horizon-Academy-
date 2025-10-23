// Hamburger menu functionality with accessibility
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    // Ensure required ARIA attributes exist
    if (!navLinks.id) {
        navLinks.id = 'primary-navigation';
    }
    hamburger.setAttribute('aria-controls', navLinks.id);
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');
    if (!hamburger.getAttribute('aria-label')) {
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    }
    navLinks.setAttribute('aria-hidden', 'true');

    function toggleMenu(forceState) {
        const willOpen = typeof forceState === 'boolean' ? forceState : !navLinks.classList.contains('active');
        hamburger.classList.toggle('active', willOpen);
        navLinks.classList.toggle('active', willOpen);
        hamburger.setAttribute('aria-expanded', String(willOpen));
        navLinks.setAttribute('aria-hidden', String(!willOpen));
    }

    hamburger.addEventListener('click', function() {
        toggleMenu();
    });

    // Keyboard support
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
        if (e.key === 'Escape') {
            toggleMenu(false);
            hamburger.focus();
        }
    });

    // Close menu when clicking on a link (use event delegation)
    navLinks.addEventListener('click', function(e) {
        const target = e.target;
        if (target && target.closest('a')) {
            toggleMenu(false);
        }
    });

    // Reset state on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            toggleMenu(false);
        }
    });
});
