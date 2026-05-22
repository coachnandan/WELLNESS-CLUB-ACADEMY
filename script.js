// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Countdown Timer
    // Set date to real event date (June 13, 2026 at 09:00:00)
    const eventDate = new Date("June 13, 2026 09:00:00");

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate.getTime() - now;

        if (distance < 0) {
            return; // Event started
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minsEl.textContent = minutes.toString().padStart(2, '0');
        secsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. GSAP Animations
    
    // Hero Animations
    const heroTl = gsap.timeline();
    
    heroTl.fromTo('.badge.fade-up', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", autoAlpha: 1 }
    )
    .fromTo('.hero-title.fade-up',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", autoAlpha: 1 },
        "-=0.6"
    )
    .fromTo('.hero-subtitle.fade-up',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", autoAlpha: 1 },
        "-=0.6"
    )
    .fromTo('.hero-actions.fade-up',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", autoAlpha: 1 },
        "-=0.6"
    )
    .fromTo('.event-meta.fade-up',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", autoAlpha: 1 },
        "-=0.6"
    )
    .fromTo('.hero-visual.fade-up',
        { scale: 0.8, opacity: 0, rotationX: 10 },
        { scale: 1, opacity: 1, rotationX: 0, duration: 1.2, ease: "back.out(1.2)", autoAlpha: 1 },
        "-=1"
    );

    // Scroll Fade Ins & Fade Ups
    gsap.utils.toArray('.fade-in, .fade-up').forEach(element => {
        gsap.fromTo(element, 
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                autoAlpha: 1
            }
        );
    });

    // Scroll Reveals Up (Staggered)
    const revealSections = ['.about', '.speakers', '.why-attend', '.faq', '.registration'];
    
    revealSections.forEach(section => {
        const triggers = document.querySelectorAll(`${section} .reveal-up`);
        if(triggers.length > 0) {
            gsap.fromTo(triggers,
                { y: 60, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    autoAlpha: 1
                }
            );
        }
    });

    // Timeline Reveals
    gsap.utils.toArray('.reveal-left').forEach(element => {
        gsap.fromTo(element, 
            { x: -50, opacity: 0 },
            {
                scrollTrigger: { trigger: element, start: "top 85%" },
                x: 0, opacity: 1, duration: 0.8, ease: "power3.out", autoAlpha: 1
            }
        );
    });

    gsap.utils.toArray('.reveal-right').forEach(element => {
        gsap.fromTo(element, 
            { x: 50, opacity: 0 },
            {
                scrollTrigger: { trigger: element, start: "top 85%" },
                x: 0, opacity: 1, duration: 0.8, ease: "power3.out", autoAlpha: 1
            }
        );
    });

    // 4. Number Counters
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            once: true,
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2.5,
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        counter.innerHTML = Math.ceil(this.targets()[0].innerHTML);
                    }
                });
            }
        });
    });

    // 5. 3D Tilt Effect on Speaker Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // 6. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 7. 3D Scrolling Effect (Entire Website)
    const sections = gsap.utils.toArray('section');
    
    sections.forEach((section, index) => {
        // Skip hero for different animation
        if (index === 0) return;

        gsap.fromTo(section, 
            { 
                rotationX: -15, 
                z: -100,
                opacity: 0.5,
                transformPerspective: 1000
            },
            {
                rotationX: 0,
                z: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 95%",
                    end: "top 30%",
                    scrub: 1,
                    // onMobile: Tone down the effect
                    onRefresh: self => {
                        if (window.innerWidth < 768) {
                            gsap.set(section, { rotationX: 0, z: 0 });
                        }
                    }
                }
            }
        );
    });

    // Special Smooth Scroll for Mobile 3D feel
    if (window.innerWidth > 1024) {
        // Desktop only smooth scroll enhancement if needed
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for sticky nav
                    behavior: 'smooth'
                });
            }
        });
    });
});
