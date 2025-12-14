const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active"); // Animates the icon (optional)
  navMenu.classList.toggle("active"); // Shows/Hides the menu
});

// Close menu when a link is clicked (UX improvement)
document.querySelectorAll(".nav-links a").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".cat-item");
  const activityCards = document.querySelectorAll(".activity-card");

  // Function to filter cards
  function filterContent(category) {
    activityCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      // Logic: Match category OR if the card is "universal" (See All Card)
      if (cardCategory === category || cardCategory === "universal") {
        card.style.display = "flex";
        // Reset animation
        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      } else {
        card.style.display = "none";
      }
    });
  }

  // Add Click Events to Sidebar
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 1. Remove active class from all
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // 2. Add active class to clicked
      button.classList.add("active");

      // 3. Get filter value
      const filterValue = button.getAttribute("data-filter");

      // 4. Run Filter
      filterContent(filterValue);
    });
  });

  // Trigger Default (Sports) on load
  // This ensures the page starts with Sports + See All visible
  const defaultButton = document.querySelector(".cat-item.active");
  if (defaultButton) {
    const defaultFilter = defaultButton.getAttribute("data-filter");
    filterContent(defaultFilter);
  }
});
// FAQ Accordion Logic
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const questionBtn = item.querySelector(".faq-question");

  questionBtn.addEventListener("click", () => {
    // 1. Toggle the 'active' class on the clicked item
    item.classList.toggle("active");

    // 2. Control the max-height for the smooth slide animation
    const answer = item.querySelector(".faq-answer");

    if (item.classList.contains("active")) {
      // If opening, set height to the content's scrollHeight
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      // If closing, set height back to 0
      answer.style.maxHeight = 0;
    }

    // OPTIONAL: Close other items when one opens (Accordion Style)
    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
        otherItem.querySelector(".faq-answer").style.maxHeight = 0;
      }
    });
  });
});
