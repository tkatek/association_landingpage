 const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active'); // Animates the icon (optional)
            navMenu.classList.toggle('active');   // Shows/Hides the menu
        });

        // Close menu when a link is clicked (UX improvement)
        document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));


    document.addEventListener('DOMContentLoaded', function() {
        
        const filterButtons = document.querySelectorAll('.cat-item');
        const activityCards = document.querySelectorAll('.activity-card');

        // Function to filter cards
        function filterContent(category) {
            activityCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // Logic: Match category OR if the card is "universal" (See All Card)
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

        // Add Click Events to Sidebar
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. Remove active class from all
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // 2. Add active class to clicked
                button.classList.add('active');

                // 3. Get filter value
                const filterValue = button.getAttribute('data-filter');

                // 4. Run Filter
                filterContent(filterValue);
            });
        });

        // Trigger Default (Sports) on load
        // This ensures the page starts with Sports + See All visible
        const defaultButton = document.querySelector('.cat-item.active');
        if (defaultButton) {
            const defaultFilter = defaultButton.getAttribute('data-filter');
            filterContent(defaultFilter);
        }
    });        