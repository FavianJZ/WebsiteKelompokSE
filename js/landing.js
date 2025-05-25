// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.step, .feature-card, .contact-item').forEach(el => {
    observer.observe(el);
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
        } else {
            element.textContent = formatNumber(Math.floor(start));
            requestAnimationFrame(updateCounter);
        }
    }
    
    updateCounter();
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            animateCounter(statNumbers[0], 50000);
            animateCounter(statNumbers[1], 500);
            animateCounter(statNumbers[2], 25000);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2E8B57' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Download button functionality
function handleDownload(platform) {
    const downloadLinks = {
        ios: 'https://apps.apple.com/app/zerowaste',
        android: 'https://play.google.com/store/apps/details?id=com.zerowaste'
    };
    
    // In a real app, you would redirect to the actual app store
    showNotification(`Redirecting to ${platform === 'ios' ? 'App Store' : 'Google Play'}...`, 'info');
    
    // Simulate redirect delay
    setTimeout(() => {
        // window.open(downloadLinks[platform], '_blank');
        console.log(`Would redirect to: ${downloadLinks[platform]}`);
    }, 1000);
}

// Add click events to download buttons
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.innerHTML.includes('iOS')) {
        btn.addEventListener('click', () => handleDownload('ios'));
    } else if (btn.innerHTML.includes('Android')) {
        btn.addEventListener('click', () => handleDownload('android'));
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && window.innerWidth > 768) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading class initially
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add bounce effect to CTA buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animation = 'bounce 0.6s';
    });
    
    btn.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Add CSS for bounce animation
if (!document.querySelector('#bounce-animation')) {
    const style = document.createElement('style');
    style.id = 'bounce-animation';
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 60%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            80% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Cookie notice (simple implementation)
function showCookieNotice() {
    const cookieNotice = document.createElement('div');
    cookieNotice.className = 'cookie-notice';
    cookieNotice.innerHTML = `
        <div class="cookie-content">
            <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
            <button class="cookie-accept">Accept</button>
        </div>
    `;
    
    cookieNotice.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #2c3e50;
        color: white;
        padding: 20px;
        z-index: 9999;
        transform: translateY(100%);
        transition: transform 0.3s ease;
    `;
    
    cookieNotice.querySelector('.cookie-content').style.cssText = `
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
    `;
    
    cookieNotice.querySelector('.cookie-accept').style.cssText = `
        background: #2E8B57;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        white-space: nowrap;
    `;
    
    document.body.appendChild(cookieNotice);
    
    setTimeout(() => {
        cookieNotice.style.transform = 'translateY(0)';
    }, 1000);
    
    cookieNotice.querySelector('.cookie-accept').addEventListener('click', () => {
        cookieNotice.style.transform = 'translateY(100%)';
        setTimeout(() => cookieNotice.remove(), 300);
        localStorage.setItem('cookiesAccepted', 'true');
    });
}

// Show cookie notice if not already accepted
if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(showCookieNotice, 2000);
}

console.log('ZeroWaste Landing Page JavaScript loaded successfully!');