/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });


    // Close menu when a link is clicked

    const links = navLinks.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });

    });

}


/* =========================================
   SMOOTH ANCHOR SCROLLING
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});