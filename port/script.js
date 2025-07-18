// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        }); 
    });
});

// Navigation scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.section-title, .project-card, .skill-category-card, .timeline-item, .about-left, .about-right');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize reveal elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Add your form submission logic here
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

// Cyberpunk cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Add this CSS to your styles.css file for the cursor trail effect
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 5px;
        height: 5px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        animation: cursorTrail 1s linear forwards;
        z-index: 9999;
    }
    
    @keyframes cursorTrail {
        0% {
            opacity: 0.8;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);

// Navigation highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Projects horizontal scroll
const projectGrid = document.querySelector('.project-grid');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

if (scrollLeftBtn && scrollRightBtn) {
    const scrollAmount = 400; // Adjust this value to control scroll distance

    scrollLeftBtn.addEventListener('click', () => {
        projectGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        projectGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll buttons based on scroll position
    projectGrid.addEventListener('scroll', () => {
        const isAtStart = projectGrid.scrollLeft === 0;
        const isAtEnd = projectGrid.scrollLeft + projectGrid.clientWidth >= projectGrid.scrollWidth - 1;

        scrollLeftBtn.style.opacity = isAtStart ? '0.5' : '1';
        scrollRightBtn.style.opacity = isAtEnd ? '0.5' : '1';
        scrollLeftBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
        scrollRightBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    });
}

// Custom scrollbar functionality
const scrollbarThumb = document.querySelector('.scrollbar-thumb');
const scrollbarTrack = document.querySelector('.scrollbar-track');

if (projectGrid && scrollbarThumb && scrollbarTrack) {
    // Calculate and set initial thumb width
    function updateThumbWidth() {
        const scrollRatio = projectGrid.clientWidth / projectGrid.scrollWidth;
        const thumbWidth = Math.max(scrollRatio * 100, 20); // minimum 20% width
        scrollbarThumb.style.width = `${thumbWidth}%`;
    }

    // Update thumb position when scrolling
    function updateThumbPosition() {
        const scrollPercentage = projectGrid.scrollLeft / (projectGrid.scrollWidth - projectGrid.clientWidth);
        const trackWidth = scrollbarTrack.clientWidth;
        const thumbWidth = scrollbarThumb.offsetWidth;
        const maxTranslateX = trackWidth - thumbWidth;
        const translateX = scrollPercentage * maxTranslateX;
        scrollbarThumb.style.transform = `translateX(${translateX}px)`;
    }

    // Initialize
    updateThumbWidth();
    updateThumbPosition();

    // Update on scroll
    projectGrid.addEventListener('scroll', () => {
        requestAnimationFrame(updateThumbPosition);
    });

    // Update on window resize
    window.addEventListener('resize', () => {
        updateThumbWidth();
        updateThumbPosition();
    });

    // Scrollbar drag functionality
    let isDragging = false;
    let startX;
    let scrollLeft;

    scrollbarThumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - scrollbarThumb.offsetLeft;
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        e.preventDefault();
        const trackRect = scrollbarTrack.getBoundingClientRect();
        const x = e.clientX - trackRect.left;
        const trackWidth = trackRect.width;
        const thumbWidth = scrollbarThumb.offsetWidth;
        
        // Calculate the new position within bounds
        const newPosition = Math.max(0, Math.min(x - startX, trackWidth - thumbWidth));
        const scrollPercentage = newPosition / (trackWidth - thumbWidth);
        
        // Update project grid scroll position
        projectGrid.scrollLeft = scrollPercentage * (projectGrid.scrollWidth - projectGrid.clientWidth);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.userSelect = '';
    });

    // Click on track to scroll
    scrollbarTrack.addEventListener('click', (e) => {
        if (e.target === scrollbarThumb) return;

        const trackRect = scrollbarTrack.getBoundingClientRect();
        const clickPosition = e.clientX - trackRect.left;
        const trackWidth = trackRect.width;
        const thumbWidth = scrollbarThumb.offsetWidth;
        const scrollPercentage = clickPosition / trackWidth;

        projectGrid.scrollLeft = scrollPercentage * (projectGrid.scrollWidth - projectGrid.clientWidth);
    });

    // Mouse wheel support
    projectGrid.addEventListener('wheel', (e) => {
        e.preventDefault();
        projectGrid.scrollLeft += e.deltaY;
        updateThumbPosition();
    });
}

// Touch scroll for mobile
let isDown = false;
let startX;
let scrollLeft;

if (projectGrid) {
    projectGrid.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - projectGrid.offsetLeft;
        scrollLeft = projectGrid.scrollLeft;
    });

    projectGrid.addEventListener('touchend', () => {
        isDown = false;
    });

    projectGrid.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - projectGrid.offsetLeft;
        const walk = (x - startX) * 2;
        projectGrid.scrollLeft = scrollLeft - walk;
    });
}

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillsSection = document.querySelector('#about');

const animateSkills = () => {
    let sectionTop = skillsSection.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 150) {
        skillBars.forEach(bar => {
            const finalWidth = bar.getAttribute('style').split(':')[1].trim();
            bar.style.width = finalWidth;
        });
    }
};

window.addEventListener('scroll', animateSkills); 