

// Configuration constants
const CONFIG = {
    TYPING_DELAY: 500,        // Delay before starting typing animation (ms)
    COPY_FEEDBACK_DURATION: 2000,  // Duration to show "Copied!" feedback (ms)
    SCROLL_TO_TOP_THRESHOLD: 300,  // Scroll position to show "back to top" button (px)
    TYPING_SPEED: 100         // Speed of typing animation (ms per character)
};

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles
    createFloatingParticles();
    
    // Add mouse interaction to gradient orbs
    addMouseInteraction();

    // Smooth scroll for all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Add scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll reveal
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add typing effect to the name
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, CONFIG.TYPING_SPEED);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, CONFIG.TYPING_DELAY);
    }

    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add parallax effect to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            profileImage.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add dynamic year to footer
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.textContent = footer.textContent.replace('2024', currentYear);
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add click to copy email functionality
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            const email = this.href.replace('mailto:', '');
            
            // Create a temporary element to copy email
            const tempInput = document.createElement('input');
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Show feedback
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'linear-gradient(135deg, #FFCC66, #FFB833)';
            }, CONFIG.COPY_FEEDBACK_DURATION);
        });
    }

    // Add dark mode toggle (optional feature)
    const darkModeToggle = document.createElement('button');
    const moonIcon = document.createElement('i');
    moonIcon.className = 'fas fa-moon';
    darkModeToggle.appendChild(moonIcon);
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #FFCC66, #FFB833);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });

    // Add scroll to top button
    const scrollToTopBtn = document.createElement('button');
    const arrowIcon = document.createElement('i');
    arrowIcon.className = 'fas fa-arrow-up';
    scrollToTopBtn.appendChild(arrowIcon);
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #FFCC66, #FFB833);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > CONFIG.SCROLL_TO_TOP_THRESHOLD) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.contact-btn, .social-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add CSS for dark mode
const darkModeCSS = `
    .dark-mode {
        background: linear-gradient(135deg, #1f2937 0%, #111827 100%) !important;
    }
    
    .dark-mode .container {
        background: rgba(31, 41, 55, 0.95) !important;
        color: #f9fafb !important;
    }
    
    .dark-mode .section {
        background: #374151 !important;
        color: #f9fafb !important;
    }
    
    .dark-mode .name {
        color: #f9fafb !important;
    }
    
    .dark-mode .section-title {
        color: #f9fafb !important;
    }
    
    .dark-mode .about-content p,
    .dark-mode .timeline-content p {
        color: #d1d5db !important;
    }
    
    .dark-mode .project-card {
        background: #374151 !important;
    }
    
    .dark-mode .project-content h3 {
        color: #f9fafb !important;
    }
    
    .dark-mode .project-content p {
        color: #d1d5db !important;
    }
    
    .dark-mode .skill-category h3 {
        color: #f9fafb !important;
    }
    
    .dark-mode .timeline-content h3 {
        color: #f9fafb !important;
    }
    
    .dark-mode .company {
        color: #d1d5db !important;
    }
    
    .dark-mode .timeline-date {
        color: #ffcc66 !important;
    }
    
    .dark-mode .contact-content p {
        color: #d1d5db !important;
    }
`;

// Inject dark mode CSS
const style = document.createElement('style');
style.textContent = darkModeCSS;
document.head.appendChild(style);

// Function to create floating particles
function createFloatingParticles() {
    const particleContainer = document.querySelector('.floating-shapes');
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size (bigger for more visibility)
        const size = Math.random() * 12 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        particleContainer.appendChild(particle);
    }
}

// Function to add mouse interaction
function addMouseInteraction() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Add parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.shape');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const yPos = -(scrolled * speed * 0.1);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
}); 