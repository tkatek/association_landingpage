document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. GLOBAL: HAMBURGER MENU (Runs on ALL pages)
    // =========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // =========================================
    // 2. HOMEPAGE ONLY: SCROLL SPY & FILTERS
    // =========================================
    
    // Check if we are on the Homepage by looking for the 'home' section
    const homeSection = document.getElementById('home');

    if (homeSection) {
        // --- A. SCROLL SPY ---
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active-link');
                // Only highlight if the link points to the current section ID
                if (current && link.getAttribute('href').includes('#' + current)) {
                    link.classList.add('active-link');
                }
            });
        });

        // --- B. ACTIVITIES FILTER (Tabs) ---
        const filterButtons = document.querySelectorAll('.cat-item');
        const activityCards = document.querySelectorAll('.activity-card');

        if (filterButtons.length > 0) {
            function filterContent(category) {
                activityCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === category || cardCategory === 'universal') {
                        card.style.display = 'flex';
                        // Small animation reset
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
            
            // Initialize default filter
            const defaultButton = document.querySelector('.cat-item.active');
            if (defaultButton) filterContent(defaultButton.getAttribute('data-filter'));
        }

        // --- C. FAQ ACCORDION ---
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');
            if(questionBtn) {
                questionBtn.addEventListener('click', () => {
                    item.classList.toggle('active');
                    const answer = item.querySelector('.faq-answer');
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    } else {
                        answer.style.maxHeight = 0;
                    }
                    // Close others
                    faqItems.forEach(other => {
                        if(other !== item && other.classList.contains('active')) {
                            other.classList.remove('active');
                            other.querySelector('.faq-answer').style.maxHeight = 0;
                        }
                    });

                });
            }
        });
    }

    // =========================================
    // 3. GLOBAL: BACK TO TOP BUTTON
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

    // =========================================
    // 4. ACTIVITIES PAGE ONLY: SEARCH & FILTER
    // =========================================
    
    // Check if we are on the Activities Page
    const blogGrid = document.querySelector('.articles-grid');

    if (blogGrid) {
        
        const blogCards = document.querySelectorAll('.blog-card');
        const catLinks = document.querySelectorAll('.cat-links a');
        const searchInput = document.querySelector('.search-widget input');

        // --- A. CATEGORY FILTER ---
        catLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Stop page from jumping to top

                // 1. Switch Active Class
                catLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // 2. Filter Cards
                const filterValue = link.getAttribute('data-filter');

                blogCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'flex';
                        // Animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // --- B. SEARCH BAR LOGIC ---
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchText = e.target.value.toLowerCase();

                blogCards.forEach(card => {
                    // Get Title and Text from the card
                    const title = card.querySelector('h3').innerText.toLowerCase();
                    const excerpt = card.querySelector('.card-excerpt').innerText.toLowerCase();

                    // Check if search text exists in Title OR Excerpt
                    if (title.includes(searchText) || excerpt.includes(searchText)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    }
});