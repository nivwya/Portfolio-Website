// Enhanced slow animations for home page elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all elements with opacity 0 and transform
    const animatedElements = document.querySelectorAll(`
        .hero-content h1,
        .hero-content .subtitle,
        .hero-content .description,
        .hero-content .explore-btn,
        .section-title,
        .project-card,
        .skill-category-card,
        .timeline-item,
        .about-card-glass,
        .contact-container,
        .social-links-sidebar .social-link,
        nav .logo,
        nav .nav-links a
    `);

    // Set initial state for all animated elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Staggered animation for hero content
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + (index * 200)); // 300ms delay + 200ms between each element
    });

    // Animate navigation elements
    const navElements = document.querySelectorAll('nav .logo, nav .nav-links a');
    navElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });

    // Animate social links sidebar
    const socialLinks = document.querySelectorAll('.social-links-sidebar .social-link');
    socialLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, 500 + (index * 150));
    });

    // Enhanced scroll reveal with intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Add a subtle scale effect for cards
                if (element.classList.contains('project-card') || 
                    element.classList.contains('skill-category-card')) {
                    element.style.transform = 'translateY(0) scale(1)';
                }
            }
        });
    }, observerOptions);

    // Observe all section elements
    const sectionElements = document.querySelectorAll(`
        .section-title,
        .project-card,
        .skill-category-card,
        .timeline-item,
        .about-card-glass,
        .contact-container
    `);

    sectionElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for navigation links
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

    // Navigation scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

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

    // Enhanced cyberpunk cursor effect
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

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.project-card, .skill-category-card, .cyber-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Expand/collapse experience timeline details
    function toggleExperienceDetails(item) {
        // Collapse all others
        document.querySelectorAll('.timeline-item.expandable').forEach(el => {
            if (el !== item) el.classList.remove('expanded');
        });
        // Toggle this one
        item.classList.toggle('expanded');
    }

    // Experience details data
    const experienceDetails = {
        ge: {
            role: 'Software Engineer Intern',
            company: 'Al Mulla Group',
            dates: 'Jun. 2025 - Jul. 2025',
            location: 'Free Trade Zone, Kuwait',
            achievements: [
                'Built a full-featured Supplier Portal for vendor onboarding, authentication, reporting, and profile management.',
                'Used Laravel (PHP), MySQL, and JavaScript for backend, database, and dynamic frontend development.',
                'Integrated with SAP systems to ensure seamless enterprise data flow.',
                'Took part in daily stand-ups and planning sessions to stay aligned with the team and keep the project moving forward.'
            ],
            tech: ['PHP', 'MySQL', 'Laravel', 'HTML5', 'CSS', 'JavaScript', 'Git', 'SAP'],
            quote: '"Designed and developed a full-featured Supplier Portal from scratch, integrating Laravel, MySQL, JavaScript, and SAP systems to streamline vendor operations.',
            cert: { url: 'https://internshipcert.linkyhost.com/', label: 'Certification' }
        },
    };

    function renderExperienceDetails(key) {
        const data = experienceDetails[key];
        if (!data) return '';
        return `
            <div class="exp-details-box">
                <div class="exp-details-left">
                    <div class="exp-details-header">
                        <div class="exp-details-role">${data.role}</div>
                        <div class="exp-details-company">${data.company}</div>
                        <div class="exp-details-meta">
                            <span><i class='fas fa-calendar-alt'></i> ${data.dates}</span>
                            <span><i class='fas fa-map-marker-alt'></i> ${data.location}</span>
                        </div>
                    </div>
                    <div class="exp-details-section">
                        <h4>Key Achievements</h4>
                        <ul class="exp-details-achievements">
                            ${data.achievements.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="exp-details-right">
                    <span class="exp-tech-heading">💻 Technologies Used</span>
                    <div class="exp-details-techbox">
                        <div class="exp-details-tech">
                            ${data.tech.map(t => `<span>${t}</span>`).join('')}
                        </div>
                    </div>
                    ${data.cert ? `<div class="exp-details-section exp-details-cert"><a href="${data.cert.url}" target="_blank" class="exp-cert-link"><i class="fas fa-certificate"></i> ${data.cert.label}</a></div>` : ''}
                </div>
            </div>
        `;
    }

    // Fill truncated description and skills in experience cards
    function fillExperienceCardSummaries() {
        const expData = experienceDetails;
        document.querySelectorAll('.exp-desc-truncate').forEach(descEl => {
            const key = descEl.getAttribute('data-exp');
            if (expData[key]) {
                let text = expData[key].quote || '';
                descEl.textContent = text;
            }
        });
        document.querySelectorAll('.exp-skills-truncate').forEach(skillsEl => {
            const key = skillsEl.getAttribute('data-exp');
            if (expData[key]) {
                skillsEl.innerHTML = '';
                const skills = expData[key].tech;
                let shown = skills.slice(0, 4);
                shown.forEach(skill => {
                    const span = document.createElement('span');
                    span.textContent = skill;
                    skillsEl.appendChild(span);
                });
                if (skills.length > 4) {
                    const more = document.createElement('span');
                    more.className = 'exp-skill-more';
                    more.textContent = `+view more`;
                    skillsEl.appendChild(more);
                }
            }
        });
    }

    // Show dropdown details for experience cards
    function setupExperienceDropdown() {
        const expCards = document.querySelectorAll('.experience-card');
        const expDetailsPanel = document.getElementById('exp-details-panel');
        expCards.forEach(card => {
            card.addEventListener('click', function() {
                expCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                const key = this.getAttribute('data-exp');
                expDetailsPanel.innerHTML = renderExperienceDetails(key);
                expDetailsPanel.style.display = 'block';
                expDetailsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
        // Show first by default
        const firstKey = expCards[0]?.getAttribute('data-exp');
        if (firstKey) {
            expDetailsPanel.innerHTML = renderExperienceDetails(firstKey);
            expDetailsPanel.style.display = 'block';
        }
    }

    fillExperienceCardSummaries();
    setupExperienceDropdown();
});