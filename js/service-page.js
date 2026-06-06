'use strict';

(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initRevealAnimations() {
        if (prefersReducedMotion) return;

        const items = document.querySelectorAll(
            '.compare-photo, .compare-content, .scope-factor-row, .timeline-step, .premium-table, .related-card, .final-cta__card'
        );

        if (!items.length) return;

        items.forEach((item) => {
            item.classList.add('service-page-reveal');
        });

        if (!('IntersectionObserver' in window)) {
            items.forEach((item) => item.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.14,
                rootMargin: '0px 0px -42px 0px'
            }
        );

        items.forEach((item) => observer.observe(item));
    }

    function initTimelineProgress() {
        const line = document.querySelector('.timeline-line');

        if (!line || prefersReducedMotion || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    line.classList.add('is-in-view');
                    currentObserver.unobserve(line);
                });
            },
            {
                threshold: 0.28
            }
        );

        observer.observe(line);
    }

    function initRelatedFocus() {
        const cards = document.querySelectorAll('.related-card');

        cards.forEach((card) => {
            const link = card.querySelector('a');

            if (!link) return;

            link.addEventListener('focus', () => {
                card.classList.add('is-focused');
            });

            link.addEventListener('blur', () => {
                card.classList.remove('is-focused');
            });
        });
    }

    function initScopeRowFocus() {
        const rows = document.querySelectorAll('.scope-factor-row');

        rows.forEach((row) => {
            row.addEventListener('focusin', () => {
                row.classList.add('is-focused');
            });

            row.addEventListener('focusout', (event) => {
                if (!row.contains(event.relatedTarget)) {
                    row.classList.remove('is-focused');
                }
            });
        });
    }

    function initServiceContactLinks() {
        const servicePage = document.querySelector('[data-service-page]');
        const serviceSlug = servicePage?.getAttribute('data-service-page');

        if (!serviceSlug) return;

        document.querySelectorAll('[data-service-contact-link]').forEach((link) => {
            const baseHref = link.getAttribute('href') || 'contact.html#contact-form';
            const cleanHref = baseHref.split('?')[0].split('#')[0] || 'contact.html';
            const hash = baseHref.includes('#') ? `#${baseHref.split('#')[1]}` : '#contact-form';

            link.setAttribute('href', `${cleanHref}?service=${encodeURIComponent(serviceSlug)}${hash}`);
        });
    }

    function initTableLabels() {
        document.querySelectorAll('.premium-table tbody tr').forEach((row) => {
            const cells = row.querySelectorAll('td');

            if (cells[0] && !cells[0].hasAttribute('data-label')) {
                cells[0].setAttribute('data-label', 'Compare');
            }

            if (cells[1] && !cells[1].hasAttribute('data-label')) {
                cells[1].setAttribute('data-label', 'Why');
            }

            if (cells[2] && !cells[2].hasAttribute('data-label')) {
                cells[2].setAttribute('data-label', 'Ask');
            }
        });
    }

    function init() {
        initRevealAnimations();
        initTimelineProgress();
        initRelatedFocus();
        initScopeRowFocus();
        initServiceContactLinks();
        initTableLabels();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();