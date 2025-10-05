// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navUl = document.querySelector('nav ul');

if (mobileMenu && navUl) {
    mobileMenu.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
