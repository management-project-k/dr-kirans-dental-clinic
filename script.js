// --- IMPORTANT: Set your EmailJS keys/IDs here ---
const EMAILJS_PUBLIC_KEY   = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID   = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID  = 'YOUR_TEMPLATE_ID';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS (configure with your keys)
    if (window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // Smooth Scrolling for Navigation Links (accessibility focus improvement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Accessibility: Move focus programmatically for screen-readers
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });

    // Hamburger Menu Toggle (for mobile)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Accessibility: Announce menu state
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });

        // Close menu on link click (mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.style.background = (window.scrollY > 100) ?
            'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
        // For SEO: Ensures sticky header stays clear of content
    });

    // --- Anime.js Animations ---

    // 1. Hero Counters Animation (trigger on scroll into view)
    const counters = document.querySelectorAll('.counter');
    const heroStats = document.querySelector('.hero-stats');
    if (counters.length > 0 && heroStats) {
        const animateCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                anime({
                    targets: counter,
                    innerHTML: [0, target],
                    duration: 2000,
                    easing: 'easeOutQuad',
                    round: 1,
                    update: function(anim) {
                        counter.innerHTML = Math.ceil(anim.animatables[0].target.innerHTML);
                        counter.setAttribute('aria-valuenow', counter.innerHTML); // for screen-readers
                    }
                });
            });
        };
        // Intersection Observer triggers animation
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counterObserver.observe(heroStats);
    }

    // 2. Scroll-Triggered Fade-In/Slide Animations for Sections
    const animateOnScroll = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [50, 0],
                    duration: 1000,
                    easing: 'easeOutQuad',
                    delay: anime.stagger(200)
                });
                // Accessibility: Remove tabindex after animation
                entry.target.addEventListener('transitionend', () => entry.target.removeAttribute('tabindex'));
            }
        });
    };
    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    document.querySelectorAll('.about, .services, .testimonials, .contact, .booking, .team-card, .service-card').forEach(el => {
        scrollObserver.observe(el);
    });

    // 3. Team Cards: Initial Fade-In/Slide on Load
    const teamCards = document.querySelectorAll('.team-card');
    if (teamCards.length > 0) {
        anime({
            targets: '.team-card',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(300),
            duration: 800,
            easing: 'easeOutQuad'
        });
    }

    // 4. Service Cards: Hover Effects with Anime.js
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.05,
                rotateZ: 2,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                rotateZ: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // 5. Testimonials Carousel (SEO improvement: ARIA live region)
    const carouselInner = document.querySelector('.carousel-inner');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;

    // For accessibility: add ARIA attributes
    if (carouselInner) carouselInner.setAttribute('aria-live', 'polite');

    if (carouselInner && prevBtn && nextBtn && totalTestimonials > 0) {
        const updateCarousel = () => {
            const translateX = -currentIndex * 100;
            requestAnimationFrame(() => {
                anime({
                    targets: carouselInner,
                    translateX: `${translateX}%`,
                    duration: 500,
                    easing: 'easeInOutQuad'
                });
            });
        };
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            updateCarousel();
        };
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            updateCarousel();
        };
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        updateCarousel();
    }

    // 6. Contact Form Handling with EmailJS and Animations
    const contactForm = document.getElementById('contact-form');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    const submitBtn = document.querySelector('.contact-form button');

    if (formInputs.length > 0) {
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                anime({ targets: input, scale: 1.02, duration: 300, easing: 'easeOutQuad' });
                input.style.borderColor = '#007BFF';
            });
            input.addEventListener('blur', () => {
                anime({ targets: input, scale: 1, duration: 300, easing: 'easeOutQuad' });
                input.style.borderColor = '#ddd';
            });
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
            anime({ targets: submitBtn, scale: 1.05, duration: 200, easing: 'easeOutQuad' });
        });
        submitBtn.addEventListener('mouseleave', () => {
            anime({ targets: submitBtn, scale: 1, duration: 200, easing: 'easeOutQuad' });
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            anime({ targets: submitBtn, scale: 0.95, duration: 100, easing: 'easeOutQuad' });

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            if (!nameInput || !emailInput || !messageInput) return;

            const formData = {
                from_name: nameInput.value,
                from_email: emailInput.value,
                message: messageInput.value
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
                .then(() => {
                    alert('Message sent successfully! We\'ll get back to you soon.');
                    contactForm.reset();
                    anime({ targets: submitBtn, scale: 1, duration: 200, easing: 'easeOutQuad' });
                }, (error) => {
                    alert('Failed to send message. Please try again.');
                    console.error('EmailJS error:', error);
                    anime({ targets: submitBtn, scale: 1, duration: 200, easing: 'easeOutQuad' });
                });
        });
    }

    // Calendly widget handled via embed in HTML, no extra JS needed

    // Log loaded
    console.log('Website loaded successfully with all animations and enhancements!');
});
