
/* Football Manager-Inspired Developer Portfolio */

document.addEventListener('DOMContentLoaded', () => {

    /* ================= TOP NAVIGATION ================= */

    const topbar = document.getElementById('topbar');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    const navLinks = [...document.querySelectorAll('.nav-link')];
    const sideLinks = [...document.querySelectorAll('.side-item')];

    const sections = [
        ...document.querySelectorAll('main section[id]')
    ];

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    const updateTopbar = () => {
        topbar?.classList.toggle(
            'scrolled',
            window.scrollY > 18
        );
    };

    window.addEventListener('scroll', updateTopbar, {
        passive: true
    });

    updateTopbar();


    /* ================= MOBILE MENU ================= */

    const closeMenu = () => {
        mainNav?.classList.remove('open');

        menuToggle?.setAttribute(
            'aria-expanded',
            'false'
        );
    };

    menuToggle?.addEventListener('click', () => {

        const open =
            mainNav?.classList.toggle('open') ?? false;

        menuToggle.setAttribute(
            'aria-expanded',
            String(open)
        );

    });

    mainNav?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {

        if (event.key === 'Escape') {
            closeMenu();
        }

    });


    /* ================= SMOOTH NAVIGATION ================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener('click', event => {

            const id = link.getAttribute('href');

            if (!id || id === '#') {
                return;
            }

            const target = document.querySelector(id);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: reduceMotion ? 'auto' : 'smooth',
                block: 'start'
            });

            if (history.replaceState) {
                history.replaceState(null, '', id);
            }

        });

    });


    /* ================= SCROLL REVEAL ANIMATIONS ================= */

    const revealElements =
        document.querySelectorAll('.reveal');

    if (
        'IntersectionObserver' in window &&
        !reduceMotion
    ) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add('visible');

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: '0px 0px -25px 0px'
            }
        );

        revealElements.forEach((element, index) => {

            element.style.transitionDelay =
                `${Math.min(index % 4, 3) * 45}ms`;

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add('visible');
        });

    }


    /* ================= ATTRIBUTE CATEGORY TABS ================= */

    const attributeTabs = [
        ...document.querySelectorAll('.attribute-tab')
    ];

    const attributeGroups = [
        ...document.querySelectorAll(
            '[data-attribute-group]'
        )
    ];

    attributeTabs.forEach(tab => {

        tab.addEventListener('click', () => {

            const group = tab.dataset.group;

            attributeTabs.forEach(item => {

                const selected = item === tab;

                item.classList.toggle(
                    'active',
                    selected
                );

                item.setAttribute(
                    'aria-selected',
                    String(selected)
                );

            });

            attributeGroups.forEach(panel => {

                panel.hidden =
                    panel.dataset.attributeGroup !== group;

                if (!panel.hidden) {

                    panel.querySelectorAll(
                        '.attribute-track i'
                    ).forEach(bar => {

                        bar.style.animation = 'none';

                        // Restart the CSS animation.
                        void bar.offsetWidth;

                        bar.style.animation = '';

                    });

                }

            });

        });

    });


    /* ================= PROJECT FILTERS AND SEARCH ================= */

    const projectFilters = [
        ...document.querySelectorAll('.project-filter')
    ];

    const projectCards = [
        ...document.querySelectorAll(
            '.project-card[data-category]'
        )
    ];

    const searchInput =
        document.getElementById('projectSearch');

    const emptyState =
        document.getElementById('emptyProjects');

    let activeFilter = 'all';

    const filterProjects = () => {

        const query = (
            searchInput?.value || ''
        ).trim().toLowerCase();

        let visibleCount = 0;

        projectCards.forEach(card => {

            const categoryMatch =
                activeFilter === 'all' ||
                card.dataset.category === activeFilter;

            const searchableText = (
                `${card.dataset.search || ''} ${card.textContent}`
            ).toLowerCase();

            const textMatch =
                !query || searchableText.includes(query);

            const visible =
                categoryMatch && textMatch;

            card.hidden = !visible;

            if (visible) {
                visibleCount++;
            }

        });

        if (emptyState) {
            emptyState.hidden = visibleCount > 0;
        }

    };

    projectFilters.forEach(button => {

        button.addEventListener('click', () => {

            activeFilter =
                button.dataset.filter || 'all';

            projectFilters.forEach(item => {

                item.classList.toggle(
                    'active',
                    item === button
                );

            });

            filterProjects();

        });

    });

    searchInput?.addEventListener(
        'input',
        filterProjects
    );


    /* ================= PROJECT TILT EFFECT ================= */

    const tiltCards =
        document.querySelectorAll('.project-card');

    if (
        window.matchMedia(
            '(hover: hover) and (pointer: fine)'
        ).matches &&
        !reduceMotion
    ) {

        tiltCards.forEach(card => {

            card.addEventListener('pointermove', event => {

                if (window.innerWidth < 900) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                const rotateX =
                    (-y * 1.5).toFixed(2);

                const rotateY =
                    (x * 1.8).toFixed(2);

                card.style.transform =
                    `perspective(1100px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-3px)`;

            });

            card.addEventListener('pointerleave', () => {

                card.style.transform = '';

            });

        });

    }


    /* ================= ACTIVE SECTION INDICATOR ================= */

    if ('IntersectionObserver' in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                const candidates = entries
                    .filter(entry => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio -
                            a.intersectionRatio
                    );

                if (!candidates.length) {
                    return;
                }

                const id = candidates[0].target.id;

                navLinks.forEach(link => {

                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${id}`
                    );

                });

                sideLinks.forEach(link => {

                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${id}`
                    );

                });

            },
            {
                rootMargin: '-18% 0px -65% 0px',
                threshold: [0, 0.1, 0.25, 0.5]
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* ================= CURRENT YEAR ================= */

    const year = document.getElementById('year');

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
