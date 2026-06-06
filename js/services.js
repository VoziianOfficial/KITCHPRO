'use strict';

(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initRevealAnimations() {
        if (prefersReducedMotion) return;

        const items = document.querySelectorAll(
            '.service-row, .scope-strip, .premium-table, .photo-mosaic__item, .faq-item, .final-cta__card'
        );

        if (!items.length) return;

        items.forEach((item) => {
            item.classList.add('services-reveal');
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

    function initScopeAccordion() {
        const scopeItems = document.querySelectorAll('.scope-strip');

        if (!scopeItems.length) return;

        scopeItems.forEach((item) => {
            item.addEventListener('toggle', () => {
                if (!item.open) return;

                scopeItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.open = false;
                    }
                });
            });
        });
    }

    function initServiceRowsFocus() {
        const rows = document.querySelectorAll('.service-row');

        rows.forEach((row) => {
            const link = row.querySelector('a');

            if (!link) return;

            link.addEventListener('focus', () => {
                row.classList.add('is-focused');
            });

            link.addEventListener('blur', () => {
                row.classList.remove('is-focused');
            });
        });
    }

    function initFaqBehavior() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach((item) => {
            const summary = item.querySelector('summary');

            if (!summary) return;

            summary.addEventListener('keydown', (event) => {
                if (event.key !== 'Escape') return;

                item.open = false;
                summary.blur();
            });
        });
    }

    function init() {
        initRevealAnimations();
        initScopeAccordion();
        initServiceRowsFocus();
        initFaqBehavior();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();