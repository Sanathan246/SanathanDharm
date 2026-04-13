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
        border-bottom: 3px solid #1e293b;
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
console.log('%c🕉️ Welcome to SanathanDharm 🕉️', 'font-size: 20px; color: #FF6B35; font-weight: bold;');
console.log('%cEmbrace the eternal truth and timeless wisdom', 'font-size: 14px; color: #1e293b;');

// ===== Typing Effect for Hero Subtitle =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

const heroSubtitle = document.querySelector('.hero .subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    window.addEventListener('load', () => {
        setTimeout(() => typeWriter(heroSubtitle, originalText), 1000);
    });
}

// ===== Expandable Teaching Cards =====
document.querySelectorAll('.teaching-card').forEach(card => {
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    
    // Add more content
    const expandedContent = {
        'The Vedas': 'The Vedas are the oldest Hindu scriptures, composed in Sanskrit around 1500 BCE. They consist of four collections: Rigveda, Yajurveda, Samaveda, and Atharvaveda, containing hymns, rituals, and philosophical insights.',
        'The Upanishads': 'The Upanishads are philosophical texts that form the basis of Vedanta. They explore concepts like Atman (soul), Brahman (ultimate reality), and the path to self-realization through meditation and knowledge.',
        'The Bhagavad Gita': 'Part of the Mahabharata epic, the Bhagavad Gita is a 700-verse dialogue between Krishna and Arjuna. It teaches about duty (dharma), devotion (bhakti), and the paths to spiritual liberation.',
        'Karma & Reincarnation': 'Karma refers to the law of cause and effect, where actions influence future experiences. Reincarnation is the cycle of birth and death, offering opportunities for spiritual growth until liberation is achieved.'
    };
    
    const title = h3.textContent;
    const moreP = document.createElement('p');
    moreP.textContent = expandedContent[title] || 'More details coming soon...';
    moreP.style.display = 'none';
    moreP.classList.add('expanded-content');
    card.appendChild(moreP);
    
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const isExpanded = moreP.style.display === 'block';
        moreP.style.display = isExpanded ? 'none' : 'block';
        card.classList.toggle('expanded');
    });
});

// ===== Back to Top Button =====
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #1e293b;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1000;
`;
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
    } else {
        backToTopBtn.style.opacity = '0';
    }
});

// ===== Scroll Progress Indicator =====
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, #FF6B35, #1e293b);
    z-index: 1001;
    transition: width 0.3s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// ===== Enhanced Hover Effects =====
document.querySelectorAll('.concept-card, .pillar, .teaching-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
        card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
        card.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// ===== Modal System for Pillars =====
const modal = document.createElement('div');
modal.className = 'modal';
modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2000;
`;

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';
modalContent.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
`;

const closeBtn = document.createElement('span');
closeBtn.textContent = '×';
closeBtn.className = 'close-btn';
closeBtn.style.cssText = `
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 30px;
    cursor: pointer;
    color: #1e293b;
`;

modalContent.appendChild(closeBtn);
modal.appendChild(modalContent);
document.body.appendChild(modal);

const pillarDetails = {
    'Dharma': 'Dharma is the moral and ethical duty that sustains society and the universe. It encompasses righteousness, justice, and the proper conduct that leads to harmony. In Sanathan Dharma, dharma is not just a set of rules but a living principle that guides every aspect of life, from personal relationships to societal responsibilities.',
    'Artha': 'Artha represents the pursuit of material prosperity and economic well-being. It is one of the four purusharthas (aims of life) and emphasizes the importance of wealth creation through righteous means. Artha should be pursued in balance with dharma to avoid greed and unethical practices.',
    'Kama': 'Kama refers to desire, pleasure, and emotional fulfillment. It includes love, art, music, and all forms of aesthetic enjoyment. In the context of Sanathan Dharma, kama is not condemned but is to be pursued in harmony with dharma and artha, ensuring that pleasures do not lead to harm or imbalance.',
    'Moksha': 'Moksha is the ultimate goal of spiritual liberation and freedom from the cycle of birth and death. It is the realization of the true self (Atman) as one with the universal consciousness (Brahman). Through various paths like knowledge, devotion, and righteous action, one can achieve moksha and attain eternal peace.'
};

document.querySelectorAll('.pillar').forEach(pillar => {
    const learnMoreBtn = document.createElement('button');
    learnMoreBtn.textContent = 'Learn More';
    learnMoreBtn.className = 'learn-more-btn';
    learnMoreBtn.style.cssText = `
        margin-top: 10px;
        padding: 8px 16px;
        background: #FF6B35;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    `;
    learnMoreBtn.addEventListener('mouseenter', () => learnMoreBtn.style.background = '#E55A2B');
    learnMoreBtn.addEventListener('mouseleave', () => learnMoreBtn.style.background = '#FF6B35');
    
    const title = pillar.querySelector('h3').textContent;
    learnMoreBtn.addEventListener('click', () => {
        modalContent.innerHTML = '';
        modalContent.appendChild(closeBtn);
        
        const h2 = document.createElement('h2');
        h2.textContent = title;
        h2.style.color = '#1e293b';
        
        const p = document.createElement('p');
        p.textContent = pillarDetails[title];
        p.style.lineHeight = '1.6';
        
        modalContent.appendChild(h2);
        modalContent.appendChild(p);
        modal.style.display = 'flex';
    });
    
    pillar.appendChild(learnMoreBtn);
});

closeBtn.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// ===== Simple Particle Effect in Hero =====
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float 6s linear infinite;
        `;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        hero.appendChild(particle);
    }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
        50% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(particleStyle);

window.addEventListener('load', createParticles);

// ===== Search Functionality for Teachings =====
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search teachings...';
searchInput.className = 'search-input';
searchInput.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px;
    border: 2px solid #1e293b;
    border-radius: 25px;
    width: 200px;
    font-size: 14px;
    z-index: 1000;
    display: none;
`;

const searchBtn = document.createElement('button');
searchBtn.textContent = '🔍';
searchBtn.className = 'search-btn';
searchBtn.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #1e293b;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 1001;
    transition: transform 0.3s;
`;
searchBtn.addEventListener('click', () => {
    searchInput.style.display = searchInput.style.display === 'block' ? 'none' : 'block';
    if (searchInput.style.display === 'block') searchInput.focus();
});

document.body.appendChild(searchInput);
document.body.appendChild(searchBtn);

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll('.teaching-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
});

