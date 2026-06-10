// ============================================
// SOULSPEAK - INTERACTIVE JAVASCRIPT
// ============================================

// Initialize particles
function initializeParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100vh';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = true;
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Smooth scroll with mouse parallax
function initializeParallax() {
    document.addEventListener('mousemove', (e) => {
        const mascot = document.querySelector('.hero-mascot');
        if (!mascot) return;

        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        mascot.style.transform = `translateX(${x * 20}px) translateY(${y * 20}px)`;
    });
}

// Cinematic intro animation
function startIntroAnimation() {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');

    if (!introScreen) return;

    // Auto fade out after 4 seconds
    setTimeout(() => {
        introScreen.classList.add('fade-out');
    }, 4000);
}

// Smooth scroll behavior
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Eye glow animation
function animateEyeGlow() {
    const eyeGlows = document.querySelectorAll('.eye-glow');
    eyeGlows.forEach(eye => {
        eye.style.animation = `eyePulse 1.5s ease-in-out infinite`;
    });

    // Add keyframes dynamically
    if (!document.querySelector('style[data-eye-animation]')) {
        const style = document.createElement('style');
        style.setAttribute('data-eye-animation', 'true');
        style.textContent = `
            @keyframes eyePulse {
                0%, 100% { r: 8px; }
                50% { r: 10px; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll effect on navbar
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'linear-gradient(to bottom, rgba(15, 15, 30, 0.98), rgba(15, 15, 30, 0.8))';
            navbar.style.boxShadow = '0 10px 30px rgba(146, 13, 187, 0.15)';
        } else {
            navbar.style.background = 'linear-gradient(to bottom, rgba(15, 15, 30, 0.95), rgba(15, 15, 30, 0.7))';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// Button ripple effect
function initializeRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple CSS if not already present
function addRippleStyles() {
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleAnimation 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes rippleAnimation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Light intensity based on time
function timeBasedBackgroundEffect() {
    const hour = new Date().getHours();
    const isDarkHour = hour >= 20 || hour <= 4;

    if (isDarkHour) {
        document.body.style.filter = 'brightness(0.95) contrast(1.05)';
    }
}

// Lazy loading images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Add animation to elements on scroll
function initializeScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `slideInLeft 0.8s ease forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .value-card, .testimonial-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

// Copy to clipboard
function initializeCopyToClipboard() {
    document.querySelectorAll('[data-copy]').forEach(element => {
        element.addEventListener('click', function() {
            const text = this.dataset.copy;
            navigator.clipboard.writeText(text).then(() => {
                const original = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = original;
                }, 2000);
            });
        });
    });
}

// PWA support
function initializePWA() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {
            // Service worker registration failed, not critical
        });
    }
}

// Page visibility
function handleVisibilityChange() {
    if (document.hidden) {
        // Page is hidden
        document.body.style.opacity = '0.8';
    } else {
        // Page is visible
        document.body.style.opacity = '1';
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌙 SoulSpeak is loading...');

    // Start cinematic intro
    startIntroAnimation();

    // Initialize all features
    initializeParticles();
    animateCounters();
    initializeParallax();
    initializeSmoothScroll();
    animateEyeGlow();
    initializeNavbarScroll();
    addRippleStyles();
    initializeRippleEffect();
    timeBasedBackgroundEffect();
    initializeLazyLoading();
    initializeScrollAnimation();
    initializeCopyToClipboard();
    initializePWA();

    // Handle visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    console.log('✨ SoulSpeak is ready!');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + S: Scroll to features
    if (e.altKey && e.key === 's') {
        document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
    }

    // Alt + D: Scroll to download
    if (e.altKey && e.key === 'd') {
        document.querySelector('#download').scrollIntoView({ behavior: 'smooth' });
    }

    // Alt + C: Scroll to community
    if (e.altKey && e.key === 'c') {
        document.querySelector('#community').scrollIntoView({ behavior: 'smooth' });
    }
});

// Performance monitoring
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`🚀 Page load time: ${pageLoadTime}ms`);
    });
}

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.style.opacity = '1';

// Dynamic background based on scroll
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.moon, .nebula');

            parallaxElements.forEach(el => {
                el.style.transform = `translateY(${scrolled * 0.5}px)`;
            });

            ticking = false;
        });
        ticking = true;
    }
});
