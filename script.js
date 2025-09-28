

// Configuration constants
const CONFIG = {
    TYPING_DELAY: 500,        // Delay before starting typing animation (ms)
    COPY_FEEDBACK_DURATION: 2000,  // Duration to show "Copied!" feedback (ms)
    SCROLL_TO_TOP_THRESHOLD: 300,  // Scroll position to show "back to top" button (px)
    TYPING_SPEED: 100         // Speed of typing animation (ms per character)
};

// Protection against right-click and developer tools
document.addEventListener('DOMContentLoaded', function() {
    // Check if device is mobile to avoid false positives
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
    document.addEventListener('keydown', function(e) {
        // F12 key
        if (e.keyCode === 123) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Developer Tools)
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+A (Select All)
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+P (Print)
        if (e.ctrlKey && e.keyCode === 80) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // F1 (Help) - can sometimes open developer tools
        if (e.keyCode === 112) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    // Detect if developer tools are open (skip on mobile devices)
    if (!isMobile) {
        let devtools = {
            open: false,
            orientation: null
        };
        
        const threshold = 160;
        let resizeTimeout;
        
        setInterval(function() {
            // Clear any existing timeout
            clearTimeout(resizeTimeout);
            
            // Add a small delay to avoid false positives during window resize
            resizeTimeout = setTimeout(function() {
                const heightDifference = window.outerHeight - window.innerHeight;
                const widthDifference = window.outerWidth - window.innerWidth;
                
                // More sophisticated detection
                if ((heightDifference > threshold && heightDifference < 1000) || 
                    (widthDifference > threshold && widthDifference < 1000)) {
                    if (!devtools.open) {
                        devtools.open = true;
                        // Store original content to restore later
                        const originalContent = document.body.innerHTML;
                        
                        // Create warning overlay instead of replacing entire body
                        const warningOverlay = document.createElement('div');
                        warningOverlay.id = 'devtools-warning';
                        warningOverlay.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(0, 0, 0, 0.95);
                            color: #fff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 24px;
                            z-index: 999999;
                            font-family: Arial, sans-serif;
                            text-align: center;
                            backdrop-filter: blur(10px);
                        `;
                        warningOverlay.innerHTML = `
                            <div>
                                <h2 style="margin-bottom: 20px; color: #ff4444;">⚠️ Developer Tools Detected</h2>
                                <p style="margin-bottom: 15px;">Please close developer tools to continue.</p>
                                <p style="font-size: 16px; opacity: 0.8;">This website is protected for security reasons.</p>
                            </div>
                        `;
                        document.body.appendChild(warningOverlay);
                    }
                } else {
                    if (devtools.open) {
                        devtools.open = false;
                        // Remove warning overlay
                        const warningOverlay = document.getElementById('devtools-warning');
                        if (warningOverlay) {
                            warningOverlay.remove();
                        }
                    }
                }
            }, 100);
        }, 500);
    }    // Enhanced protection against console access
    (function() {
        try {
            var _z = console;
            Object.defineProperty(window, "console", {
                get: function() {
                    if (_z._commandLineAPI) {
                        throw "Console has been disabled for security reasons.";
                    }
                    return _z;
                },
                set: function(val) {
                    _z = val;
                }
            });
        } catch (e) {
            // Fallback: Override console methods
            window.console = {
                log: function() { return "Console disabled"; },
                warn: function() { return "Console disabled"; },
                error: function() { return "Console disabled"; },
                info: function() { return "Console disabled"; },
                debug: function() { return "Console disabled"; },
                clear: function() { return "Console disabled"; },
                dir: function() { return "Console disabled"; },
                dirxml: function() { return "Console disabled"; },
                table: function() { return "Console disabled"; },
                trace: function() { return "Console disabled"; },
                assert: function() { return "Console disabled"; },
                count: function() { return "Console disabled"; },
                markTimeline: function() { return "Console disabled"; },
                profile: function() { return "Console disabled"; },
                profileEnd: function() { return "Console disabled"; },
                time: function() { return "Console disabled"; },
                timeEnd: function() { return "Console disabled"; },
                timeStamp: function() { return "Console disabled"; },
                timeline: function() { return "Console disabled"; },
                timelineEnd: function() { return "Console disabled"; },
                group: function() { return "Console disabled"; },
                groupCollapsed: function() { return "Console disabled"; },
                groupEnd: function() { return "Console disabled"; }
            };
        }
    })();

    // Disable print screen
    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 44) {
            e.preventDefault();
            return false;
        }
    });

    // Clear console periodically (less frequent to improve performance)
    setInterval(function() {
        try {
            console.clear();
        } catch (e) {
            // Ignore errors if console is already disabled
        }
    }, 5000); // Changed from 2000ms to 5000ms
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
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
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