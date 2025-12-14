document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. HAMBURGER MENU
    // =========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });


    // =========================================
    // 2. SCROLL SPY (Active Link Detector) - IMPROVED
    // =========================================
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200; // Trigger point

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Check if we are currently inside this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Apply active class
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            // Check if href matches the ID (e.g., href="#about" matches id="about")
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
            }
        });
    });


    // =========================================
    // 3. ACTIVITIES FILTER (Categories)
    // =========================================
    const filterButtons = document.querySelectorAll('.cat-item');
    const activityCards = document.querySelectorAll('.activity-card');

    if (filterButtons.length > 0) {
        // Function to filter
        function filterContent(category) {
            activityCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === category || cardCategory === 'universal') {
                    card.style.display = 'flex';
                    // Reset animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filterValue = button.getAttribute('data-filter');
                filterContent(filterValue);
            });
        });

        // Initialize with Sports
        const defaultButton = document.querySelector('.cat-item.active');
        if (defaultButton) {
            filterContent(defaultButton.getAttribute('data-filter'));
        }
    }


    // =========================================
    // 4. FAQ ACCORDION
    // =========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                // Toggle active class
                item.classList.toggle('active');
                
                // Slide logic
                const answer = item.querySelector('.faq-answer');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = 0;
                }

                // Close others (Optional - keeps it clean)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = 0;
                    }
                });
            });
        }
    });


    // =========================================
    // 5. BACK TO TOP BUTTON
    // =========================================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show-btn');
            } else {
                backToTopBtn.classList.remove('show-btn');
            }
        });
    }
});