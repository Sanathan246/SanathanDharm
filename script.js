// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Form Validation and Submission =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        showMessage('✅ Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// ===== Helper Functions =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// ===== Scroll Animation for Elements =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-in forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .concept-card, .pillar, .teaching-card').forEach(el => {
    observer.observe(el);
});

// ===== Active Navigation Link Highlighting =====
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Add Styles for Active Navigation Link =====
const style = document.createElement('style');
style.textContent = `
    nav a.active {
        background-color: rgba(255, 255, 255, 0.5);
        border-bottom: 3px solid #140a57;
    }
`;
document.head.appendChild(style);

// ===== Parallax Effect on Hero Section =====
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        }
    });
}

// ===== Number Animation for Pillars =====
function animateNumbers() {
    const pillars = document.querySelectorAll('.pillar-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetNumber = parseInt(element.textContent);
                animateNumber(element, targetNumber);
                observer.unobserve(element);
            }
        });
    });
    
    pillars.forEach(pillar => observer.observe(pillar));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 30;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 50);
}

// Initialize number animation when page loads
window.addEventListener('load', animateNumbers);

// ===== Keyboard Navigation Support =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===== Console Message =====
console.log('%c🕉️ Welcome to SanathanDharm 🕉️', 'font-size: 20px; color: #FF9933; font-weight: bold;');
console.log('%cEmbrace the eternal truth and timeless wisdom', 'font-size: 14px; color: #140a57;');