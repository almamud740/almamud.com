// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navMenu.style.display = navMenu.classList.contains('active') ? 'flex' : 'none';
    });
}

// Close menu when link is clicked (only on mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            if (navMenu) {
                navMenu.classList.remove('active');
                navMenu.style.display = 'none';
            }
        }
    });
});

// Smooth scroll for navigation
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

// Active link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
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

// Contact form submission with Fetch API
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const formData = new FormData(this);
        const successMessage = document.getElementById('successMessage');
        
        // Send form data using Fetch API (avoids CORS issues)
        fetch('https://formspree.io/f/mqenkjyj', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Reset form
                contactForm.reset();
                
                // Optional: Show form again after 5 seconds
                setTimeout(() => {
                    contactForm.style.display = 'block';
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        });
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

console.log('Portfolio loaded successfully!');