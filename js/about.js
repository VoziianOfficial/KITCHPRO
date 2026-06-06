'use strict';

(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initRevealAnimations() {
        if (prefersReducedMotion) return;

        const items = document.querySelectorAll(
            '.story-content, .story-photo, .model-step, .value-line, .faq-item, .final-cta__card'
        );

        if (!items.length) return;

        items.forEach((item) => {
            item.classList.add('about-reveal');
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

    function initModelProgress() {
        const modelFlow = document.querySelector('.model-flow');

        if (!modelFlow || prefersReducedMotion || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    modelFlow.classList.add('is-in-view');
                    currentObserver.unobserve(modelFlow);
                });
            },
            {
                threshold: 0.28
            }
        );

        observer.observe(modelFlow);
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

    function initMarqueePauseOnFocus() {
        const marquee = document.querySelector('.service-marquee');
        const track = document.querySelector('.service-marquee__track');

        if (!marquee || !track) return;

        marquee.addEventListener('focusin', () => {
            track.style.animationPlayState = 'paused';
        });

        marquee.addEventListener('focusout', () => {
            track.style.animationPlayState = '';
        });
    }

    function initValuesFocus() {
        const valueLines = document.querySelectorAll('.value-line');

        valueLines.forEach((line) => {
            const focusable = line.querySelector('a, button, summary, input, textarea, select');

            if (!focusable) return;

            focusable.addEventListener('focus', () => {
                line.classList.add('is-focused');
            });

            focusable.addEventListener('blur', () => {
                line.classList.remove('is-focused');
            });
        });
    }

    function init() {
        initRevealAnimations();
        initModelProgress();
        initFaqBehavior();
        initMarqueePauseOnFocus();
        initValuesFocus();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();