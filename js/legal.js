'use strict';

(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    function initLegalSidebarActiveLinks() {
        const sidebarLinks = Array.from(document.querySelectorAll('.legal-sidebar__nav a'));
        const sections = sidebarLinks
            .map((link) => {
                const id = link.getAttribute('href');

                if (!id || !id.startsWith('#')) return null;

                const section = document.querySelector(id);

                if (!section) return null;

                return {
                    link,
                    section
                };
            })
            .filter(Boolean);

        if (!sections.length || !('IntersectionObserver' in window)) return;

        const setActiveLink = (activeLink) => {
            sidebarLinks.forEach((link) => {
                link.classList.toggle('is-active', link === activeLink);
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (!visibleEntries.length) return;

                const active = sections.find((item) => item.section === visibleEntries[0].target);

                if (active) {
                    setActiveLink(active.link);
                }
            },
            {
                threshold: [0.12, 0.2, 0.35],
                rootMargin: '-18% 0px -62% 0px'
            }
        );

        sections.forEach(({ section }) => observer.observe(section));
    }

    function initSmoothLegalLinks() {
        const links = document.querySelectorAll('.legal-sidebar__nav a, .anchor-strip a');

        links.forEach((link) => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');

                if (!href || !href.startsWith('#')) return;

                const target = document.querySelector(href);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });

                history.pushState(null, '', href);
            });
        });
    }

    function initLegalExternalLinkSafety() {
        document.querySelectorAll('.legal-content a[href^="http"]').forEach((link) => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }

    function init() {
        initLegalSidebarActiveLinks();
        initSmoothLegalLinks();
        initLegalExternalLinkSafety();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();