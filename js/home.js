'use strict';

(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initRevealAnimations() {
        if (prefersReducedMotion) return;

        const revealItems = document.querySelectorAll(
            '.featured-service-row, .material-tile, .provider-step, .trust-note__panel, .final-cta__card'
        );

        if (!revealItems.length || !('IntersectionObserver' in window)) {
            revealItems.forEach((item) => item.classList.add('is-visible'));
            return;
        }

        revealItems.forEach((item) => {
            item.classList.add('js-reveal');
        });

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.16,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        revealItems.forEach((item) => observer.observe(item));
    }

    function initZoneDots() {
        const dots = document.querySelectorAll('[data-zone-label]');

        if (!dots.length) return;

        dots.forEach((dot) => {
            dot.setAttribute('aria-pressed', 'false');

            dot.addEventListener('click', () => {
                const isActive = dot.classList.contains('is-active');

                dots.forEach((item) => {
                    item.classList.remove('is-active');
                    item.setAttribute('aria-pressed', 'false');
                });

                if (!isActive) {
                    dot.classList.add('is-active');
                    dot.setAttribute('aria-pressed', 'true');
                }
            });

            dot.addEventListener('keydown', (event) => {
                if (event.key !== 'Escape') return;

                dot.classList.remove('is-active');
                dot.setAttribute('aria-pressed', 'false');
                dot.blur();
            });
        });

        document.addEventListener('click', (event) => {
            const target = event.target;

            if (!(target instanceof HTMLElement)) return;
            if (target.closest('[data-zone-label]')) return;

            dots.forEach((dot) => {
                dot.classList.remove('is-active');
                dot.setAttribute('aria-pressed', 'false');
            });
        });
    }

    function initFeatureRows() {
        const rows = document.querySelectorAll('.featured-service-row');

        rows.forEach((row) => {
            const links = row.querySelectorAll('a');

            links.forEach((link) => {
                link.addEventListener('focus', () => {
                    row.classList.add('is-focused');
                });

                link.addEventListener('blur', () => {
                    row.classList.remove('is-focused');
                });
            });
        });
    }

    function initMaterialBoard() {
        const board = document.querySelector('.material-board__grid');

        if (!board || prefersReducedMotion) return;

        board.addEventListener(
            'pointermove',
            (event) => {
                const rect = board.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;

                board.style.setProperty('--pointer-x', `${x.toFixed(2)}%`);
                board.style.setProperty('--pointer-y', `${y.toFixed(2)}%`);
            },
            { passive: true }
        );
    }

    function initProviderPathProgress() {
        const path = document.querySelector('.provider-path__line');

        if (!path || prefersReducedMotion || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    path.classList.add('is-in-view');
                    currentObserver.unobserve(path);
                });
            },
            {
                threshold: 0.28
            }
        );

        observer.observe(path);
    }

    function init() {
        initRevealAnimations();
        initZoneDots();
        initFeatureRows();
        initMaterialBoard();
        initProviderPathProgress();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();