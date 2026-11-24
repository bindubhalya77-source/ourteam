
document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll("#cardContainer .card");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const noResults = document.getElementById("noResults");

    let selectedCategory = "all";

    function filterCards() {

        const searchText = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(function (card) {

            const title = card.querySelector("h3").textContent.toLowerCase();
            const description = card.querySelector("p").textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch =
                title.includes(searchText) ||
                description.includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                selectedCategory === category;

            if (matchesSearch && matchesCategory) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }

        });

        noResults.hidden = visibleCount > 0;
    }

    searchInput.addEventListener("input", filterCards);

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            selectedCategory = button.dataset.category;

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            filterCards();
        });

    });

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        formMessage.textContent =
            "Thank you, " + name + "! Your enquiry was submitted successfully.";

        formMessage.style.color = "green";

        contactForm.reset();

    });

    filterCards();

});
