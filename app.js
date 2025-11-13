        // Create floating particles
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }

        // Smooth scroll for navigation links with fallback
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                // allow other handlers (like closeMenu) to run
                const href = this.getAttribute('href');
                if (!href || href === '#') return;

                // Try to find the target element by id selector (e.g. '#projects')
                const target = document.querySelector(href);

                if (target && typeof target.scrollIntoView === 'function') {
                    // Prevent default jump only when we can perform smooth scroll
                    e.preventDefault();
                    try {
                        target.scrollIntoView({ behavior: 'smooth' });
                    } catch (err) {
                        // In case the browser does not support behavior option, fallback to instant scroll
                        target.scrollIntoView();
                    }
                } else {
                    // Fallback: allow the default behavior (normal jump) by not preventing default
                    // or, if target element not found, set the hash so the browser navigates
                    if (!target) {
                        // let the browser update the URL hash which will jump to the element if present later
                        // do not preventDefault so default anchor navigation occurs
                        return;
                    }
                }
            });
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.section-title, .about-text, .about-image, .project-card, .contact-form').forEach(el => {
            observer.observe(el);
        });

        // Stagger animation for project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        // Form submission handler
        function handleSubmit(e) {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
            e.target.reset();
        }

        // Hamburger menu toggle
        function toggleMenu() {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        function closeMenu() {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('header');
            if (header) {
                header.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });