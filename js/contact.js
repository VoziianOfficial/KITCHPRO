'use strict';

(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initRevealAnimations() {
        if (prefersReducedMotion) return;

        const items = document.querySelectorAll(
            '.contact-intro, .contact-form, .contact-detail-card, .next-step, .faq-item, .final-cta__card'
        );

        if (!items.length) return;

        items.forEach((item) => {
            item.classList.add('contact-reveal');
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

    function initNextStepsProgress() {
        const line = document.querySelector('.next-steps-line');

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

    function initProjectTypeFromUrl() {
        const form = document.querySelector('[data-contact-form]');
        const select = document.querySelector('#project-type');

        if (!form || !select) return;

        const params = new URLSearchParams(window.location.search);
        const service = params.get('service');

        if (!service) return;

        const option = select.querySelector(`option[value="${CSS.escape(service)}"]`);

        if (option) {
            select.value = service;
        }
    }

    function initZipFormatting() {
        const zipInput = document.querySelector('#zip-code');

        if (!zipInput) return;

        zipInput.addEventListener('input', () => {
            zipInput.value = zipInput.value
                .replace(/[^\d-]/g, '')
                .slice(0, 10);
        });
    }

    function initPhoneFormatting() {
        const phoneInput = document.querySelector('#phone');

        if (!phoneInput) return;

        phoneInput.addEventListener('input', () => {
            phoneInput.value = phoneInput.value
                .replace(/[^\d+\s().-]/g, '')
                .slice(0, 22);
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

    function initFormFocusState() {
        const form = document.querySelector('.contact-form');

        if (!form) return;

        form.addEventListener('focusin', () => {
            form.classList.add('is-focused');
        });

        form.addEventListener('focusout', (event) => {
            if (!form.contains(event.relatedTarget)) {
                form.classList.remove('is-focused');
            }
        });
    }

    function init() {
        initRevealAnimations();
        initNextStepsProgress();
        initProjectTypeFromUrl();
        initZipFormatting();
        initPhoneFormatting();
        initFaqBehavior();
        initFormFocusState();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();