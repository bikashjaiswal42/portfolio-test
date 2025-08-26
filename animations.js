// GSAP Animations for Portfolio Website
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded. Animations will not work properly.');
        return;
    }

    // Register ScrollTrigger plugin if available
    if (gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initScrollAnimations();
    }

    // Initialize all animations
    initHeroAnimations();
    initTextAnimations();
    initHoverEffects();
    initParallaxEffects();
});

// Hero section entrance animations
function initHeroAnimations() {
    // Hero title glitch effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Create glitch effect with GSAP
        gsap.to(heroTitle, {
            duration: 0.2,
            skewX: 20,
            ease: "power3.inOut",
            repeat: 3,
            yoyo: true,
            repeatDelay: 3,
            onComplete: () => {
                // Add class for continuous CSS animation
                heroTitle.classList.add('glitch-active');
            }
        });
    }

    // Hero content fade in
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.from(heroContent, {
            duration: 1.2,
            y: 60,
            opacity: 0,
            ease: "power3.out",
            delay: 0.4
        });
    }

    // Hero CTA button pulse
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        gsap.to(ctaButton, {
            duration: 1.5,
            scale: 1.05,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        gsap.to(scrollIndicator, {
            duration: 1.5,
            y: 10,
            opacity: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

// Text animations for headings and paragraphs
function initTextAnimations() {
    // Split text for letter animations (if SplitText plugin is available)
    if (typeof SplitText !== 'undefined') {
        // Animate section headings
        document.querySelectorAll('.section-title').forEach(title => {
            const split = new SplitText(title, { type: "chars, words" });
            
            gsap.from(split.chars, {
                duration: 0.6,
                opacity: 0,
                scale: 0,
                y: 80,
                rotationX: 180,
                transformOrigin: "0% 50% -50",
                ease: "back",
                stagger: 0.01,
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
    } else {
        // Fallback animation if SplitText is not available
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                duration: 1,
                opacity: 0,
                y: 50,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
    }

    // Animate paragraphs
    gsap.utils.toArray('.animate-text').forEach(text => {
        gsap.from(text, {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power3.out",
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });
}

// Hover effects for interactive elements
function initHoverEffects() {
    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                duration: 0.3,
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0, 255, 255, 0.3)",
                ease: "power1.out"
            });
            
            // Animate the skill icon
            const icon = item.querySelector('.skill-icon');
            if (icon) {
                gsap.to(icon, {
                    duration: 0.5,
                    rotate: 360,
                    ease: "power1.out"
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.3,
                scale: 1,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                ease: "power1.out"
            });
            
            // Reset the skill icon
            const icon = item.querySelector('.skill-icon');
            if (icon) {
                gsap.to(icon, {
                    duration: 0.5,
                    rotate: 0,
                    ease: "power1.out"
                });
            }
        });
    });
    
    // Project items hover effect
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const overlay = item.querySelector('.project-overlay');
        const details = item.querySelector('.project-details');
        
        if (overlay && details) {
            item.addEventListener('mouseenter', () => {
                gsap.to(overlay, {
                    duration: 0.3,
                    opacity: 1,
                    ease: "power1.out"
                });
                
                gsap.to(details, {
                    duration: 0.4,
                    y: 0,
                    opacity: 1,
                    ease: "power2.out",
                    delay: 0.1
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(overlay, {
                    duration: 0.3,
                    opacity: 0,
                    ease: "power1.out"
                });
                
                gsap.to(details, {
                    duration: 0.4,
                    y: 20,
                    opacity: 0,
                    ease: "power2.out"
                });
            });
        }
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                duration: 0.3,
                backgroundColor: "#00ffff",
                color: "#121212",
                ease: "power1.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.3,
                backgroundColor: "transparent",
                color: "#00ffff",
                ease: "power1.out"
            });
        });
    });
}

// Parallax effects for background elements
function initParallaxEffects() {
    // Parallax for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            gsap.to('.hero-background', {
                duration: 1,
                x: (x - 0.5) * 20,
                y: (y - 0.5) * 20,
                ease: "power1.out"
            });
        });
    }
    
    // Parallax for decorative elements
    document.querySelectorAll('.parallax-element').forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.1;
        
        window.addEventListener('scroll', () => {
            const yPos = window.scrollY * speed;
            gsap.to(element, {
                duration: 0.5,
                y: yPos,
                ease: "none"
            });
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Animate elements when they come into view
    gsap.utils.toArray('.animate-on-scroll').forEach(element => {
        // Get animation type from data attribute
        const animationType = element.getAttribute('data-animation') || 'fade';
        
        // Set animation based on type
        switch (animationType) {
            case 'fade':
                gsap.from(element, {
                    duration: 1,
                    opacity: 0,
                    y: 50,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
                break;
                
            case 'slide-left':
                gsap.from(element, {
                    duration: 1,
                    opacity: 0,
                    x: -100,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
                break;
                
            case 'slide-right':
                gsap.from(element, {
                    duration: 1,
                    opacity: 0,
                    x: 100,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
                break;
                
            case 'scale':
                gsap.from(element, {
                    duration: 1,
                    opacity: 0,
                    scale: 0.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
                break;
                
            case 'rotate':
                gsap.from(element, {
                    duration: 1,
                    opacity: 0,
                    rotation: 90,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
                break;
        }
    });
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            duration: 1,
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate stats counters
    const statsItems = document.querySelectorAll('.stats-item');
    
    statsItems.forEach(item => {
        const counterElement = item.querySelector('.counter-value');
        const targetValue = parseInt(counterElement.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: item,
            start: "top 80%",
            onEnter: () => {
                gsap.to(counterElement, {
                    duration: 2,
                    innerText: targetValue,
                    snap: { innerText: 1 },
                    ease: "power2.out"
                });
                
                // Animate the circle if it exists
                const circle = item.querySelector('svg circle');
                if (circle) {
                    const percentage = parseInt(item.getAttribute('data-percentage')) || 100;
                    const circumference = 2 * Math.PI * parseFloat(circle.getAttribute('r'));
                    const offset = circumference - (percentage / 100) * circumference;
                    
                    gsap.to(circle, {
                        duration: 2,
                        strokeDashoffset: offset,
                        ease: "power2.out"
                    });
                }
            },
            once: true
        });
    });
    
    // Staggered animation for skill items
    const skillsSection = document.querySelector('.skills-container');
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (skillsSection && skillItems.length) {
        gsap.from(skillItems, {
            duration: 0.8,
            opacity: 0,
            y: 50,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: skillsSection,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });
    }
    
    // Staggered animation for project items
    const projectsSection = document.querySelector('.projects-container');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (projectsSection && projectItems.length) {
        gsap.from(projectItems, {
            duration: 0.8,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: projectsSection,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });
    }
}