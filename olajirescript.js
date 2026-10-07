/* script.js */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= NAVBAR ================= */

    const navbar = document.getElementById("navbar");

    const handleNavbar = () => {
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleNavbar);
    handleNavbar();


    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });

    }


    /* ================= REVEAL ON SCROLL ================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* ================= STAGGERED CARDS ================= */

    const cardGroups = [
        ".snapshot-card",
        ".skill-category",
        ".education-card",
        ".language-card",
        ".project-card"
    ];

    cardGroups.forEach(selector => {

        const cards = document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay = `${index * 0.08}s`;

        });

    });


    /* ================= SKILL FILTER ================= */

    const filterButtons = document.querySelectorAll(".skill-filter");
    const skillCategories = document.querySelectorAll(".skill-category");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.dataset.filter;

            skillCategories.forEach(category => {

                if (filter === "all" || category.dataset.category === filter) {
                    category.classList.remove("hidden");
                } else {
                    category.classList.add("hidden");
                }

            });

        });

    });


    /* ================= SMOOTH ANCHOR SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navHeight = navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* ================= HERO PARALLAX ================= */

    const heroImage = document.querySelector(".hero-image");

    if (heroImage && window.innerWidth > 900) {

        window.addEventListener("mousemove", event => {

            const x = (window.innerWidth / 2 - event.clientX) / 70;
            const y = (window.innerHeight / 2 - event.clientY) / 70;

            heroImage.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }


    /* ================= PROJECT TILT ================= */

    const projectBrowsers = document.querySelectorAll(".project-browser");

    projectBrowsers.forEach(browser => {

        browser.addEventListener("mousemove", event => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect = browser.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            browser.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.01)`;

        });

        browser.addEventListener("mouseleave", () => {

            browser.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

        });

    });


    /* ================= PROJECT CARD TILT ================= */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect = card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;

            const rotateY = (x - 0.5) * 4;
            const rotateX = (y - 0.5) * -4;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* ================= IMAGE FALLBACK ================= */

    const galleryImages = document.querySelectorAll(".gallery-item img");

    galleryImages.forEach(image => {

        image.addEventListener("error", () => {

            image.parentElement.classList.add("image-missing");

            image.style.display = "none";

            const fallback = document.createElement("div");

            fallback.className = "gallery-fallback";

            fallback.innerHTML = `
                <span>Silverlight</span>
                <small>Project Screenshot</small>
            `;

            image.parentElement.insertBefore(
                fallback,
                image.nextSibling
            );

        });

    });


    /* ================= ACTIVE NAVIGATION ================= */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav-menu a"
    );

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink =
                        document.querySelector(
                            `.nav-menu a[href="#${entry.target.id}"]`
                        );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                }

            });

        },
        {
            threshold: 0.3
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* ================= CURRENT YEAR ================= */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* ================= ESCAPE MENU ================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            navMenu?.classList.remove("active");
        }

    });

});
