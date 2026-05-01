// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark-mode');
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark' : 'light');
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (html.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
        }
    });
});

// ===== SMOOTH SCROLL NAVIGATION =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== ACTIVE LINK HIGHLIGHTING =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const successMessage = document.getElementById('successMessage');
        
        fetch('https://formspree.io/f/mqenkjyj', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth' });
                contactForm.reset();
                
                setTimeout(() => {
                    contactForm.style.display = 'block';
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                alert('Error sending message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        });
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        if (current < target) {
            current += increment;
            element.textContent = Math.floor(current);
        } else {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Trigger counter animation when stats are visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));

// ===== ANIMATE SKILL BARS =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-item').forEach(el => skillObserver.observe(el));

// ===== SCROLL ANIMATIONS =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-card, .about-highlights, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// ===== SMOOTH PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('✨ Portfolio loaded successfully!');
