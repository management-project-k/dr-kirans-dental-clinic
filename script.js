// --- EMAILJS CONFIGURATION ---
const EMAILJS_PUBLIC_KEY   = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID   = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID  = 'YOUR_TEMPLATE_ID';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    if (window.emailjs) emailjs.init(EMAILJS_PUBLIC_KEY);

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });

    // --- HAMBURGER MENU ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- NAVBAR BACKGROUND ON SCROLL ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.style.background = (window.scrollY > 100) ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
    });

    // --- HERO COUNTERS ---
    const counters = document.querySelectorAll('.counter');
    const heroStats = document.querySelector('.hero-stats');
    if (counters.length && heroStats) {
        const animateCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const step = Math.ceil(target / 100);
                const interval = setInterval(() => {
                    count += step;
                    counter.innerText = count > target ? target : count;
                    counter.setAttribute('aria-valuenow', counter.innerText);
                    if(count >= target) clearInterval(interval);
                }, 20);
            });
        };
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counterObserver.observe(heroStats);
    }

    // --- SCROLL ANIMATIONS ---
    const animateOnScroll = (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    };
    const scrollObserver = new IntersectionObserver(animateOnScroll, { threshold: 0.1 });
    document.querySelectorAll('.about, .services, .testimonials, .contact, .booking, .team-card, .service-card').forEach(el => {
        scrollObserver.observe(el);
    });

    // --- SERVICE & TEAM CARD HOVER ---
    document.querySelectorAll('.service-card, .team-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hovered'));
        card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
    });

    // --- TESTIMONIAL CAROUSEL ---
    const carouselInner = document.querySelector('.carousel-inner');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    const updateCarousel = () => {
        if(carouselInner) carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
    if(prevBtn && nextBtn && testimonials.length) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateCarousel();
        });
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateCarousel();
        });
    }

    // --- CONTACT FORM HANDLING ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e){
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const formData = { from_name: name, from_email: email, message: message };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
            .then(() => {
                alert('Message sent successfully! We will contact you soon.');
                contactForm.reset();
            })
            .catch(err => {
                console.error('EmailJS error:', err);
                alert('Failed to send message. Please try again later.');
            });
        });
    }

    console.log('All scripts loaded and working!');
});
