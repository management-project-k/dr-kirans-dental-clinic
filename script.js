// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS (configure with your keys - see instructions below)
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click (mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar Background Change on Scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });

    // Anime.js Animations

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
                    }
                });
            });
        };

        // Intersection Observer for counters (trigger once in view)
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
                    delay: anime.stagger(200) // Stagger for grids
                });
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe sections and cards (with existence check)
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
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
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

    // 5. Testimonials Carousel
    const carouselInner = document.querySelector('.carousel-inner');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;

    if (carouselInner && prevBtn && nextBtn && totalTestimonials > 0) {
        const updateCarousel = () => {
            const translateX = -currentIndex * 100;
            anime({
                targets: carouselInner,
                translateX: `${translateX}%`,
                duration: 500,
                easing: 'easeInOutQuad'
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

        // Optional: Auto-advance carousel every 5 seconds (uncomment if desired)
        // setInterval(nextSlide, 5000);

        // Initial carousel setup
        updateCarousel();
    }

    // 6. Contact Form Handling with EmailJS and Animations
    const contactForm = document.getElementById('contact-form');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    const submitBtn = document.querySelector('.contact-form button');

    if (formInputs.length > 0) {
        // Animate form inputs on focus
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                anime({
                    targets: input,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                input.style.borderColor = '#007BFF'; // Direct style for border (Anime.js doesn't animate CSS properties directly here)
            });

            input.addEventListener('blur', () => {
                anime({
                    targets: input,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                input.style.borderColor = '#ddd';
            });
        });
    }

    if (submitBtn) {
        // Submit button animation on hover
        submitBtn.addEventListener('mouseenter', () => {
            anime({
                targets: submitBtn,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });

        submitBtn.addEventListener('mouseleave', () => {
            anime({
                targets: submitBtn,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    }

    if (contactForm) {
        // EmailJS Form Submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (submitBtn) {
                // Animate submit button on click
                anime({
                    targets: submitBtn,
                    scale: 0.95,
                    duration: 100,
                    easing: 'easeOutQuad'
                });
            }

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (!nameInput || !emailInput || !messageInput) return;

            const formData = {
                from_name: nameInput.value,
                from_email: emailInput.value,
                message: messageInput.value
            };

            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData) // Replace with your EmailJS service and template IDs
                .then((response) => {
                    alert('Message sent successfully! We\'ll get back to you soon.');
                    contactForm.reset();
                    if (submitBtn) {
                        // Reset button animation
                        anime({
                            targets: submitBtn,
                            scale: 1,
                            duration: 200,
                            easing: 'easeOutQuad'
                        });
                    }
                }, (error) => {
                    alert('Failed to send message. Please try again.');
                    console.error('EmailJS error:', error);
                    if (submitBtn) {
                        // Reset button animation
                        anime({
                            targets: submitBtn,
                            scale: 1,
                            duration: 200,
                            easing: 'easeOutQuad'
                        });
                    }
                });
        });
    }

    // 7. Calendly: No additional JS needed; embed handles loading via script in HTML

    console.log('Website loaded successfully with all animations and features!');
});
