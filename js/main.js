'use strict';

(function () {
    const CONFIG = window.SITE_CONFIG || {};

    const SELECTORS = {
        header: '[data-site-header]',
        mobileToggle: '[data-mobile-toggle]',
        mobileClose: '[data-mobile-close]',
        mobileMenu: '[data-mobile-menu]',
        mobilePanel: '[data-mobile-panel]',
        dropdownRoot: '[data-services-dropdown]',
        dropdownToggle: '[data-dropdown-toggle]',
        dropdownPanel: '[data-dropdown-panel]',
        serviceMenu: '[data-service-menu]',
        mobileServiceMenu: '[data-mobile-service-menu]',
        footerServiceMenu: '[data-footer-service-menu]',
        cookieBanner: '[data-cookie-banner]'
    };

    const body = document.body;

    function safeText(value) {
        return value === undefined || value === null ? '' : String(value);
    }

    function getCookieStorageKey() {
        return CONFIG.cookies?.storageKey || 'kitchpro_cookie_consent';
    }

    function getCleanPath(pathname) {
        const clean = pathname.split('?')[0].split('#')[0];
        const path = clean.split('/').pop();

        return path || 'index.html';
    }

    function getServiceBySlug(slug) {
        return (CONFIG.services || []).find((service) => service.slug === slug);
    }

    function getTelHref() {
        const rawPhone = CONFIG.contact?.phoneRaw || '';

        return rawPhone ? `tel:${rawPhone}` : '#';
    }

    function getMailHref() {
        const email = CONFIG.contact?.email || '';

        return email ? `mailto:${email}` : '#';
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = safeText(value);
        });
    }

    function setHref(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.setAttribute('href', safeText(value));
        });
    }

    function applyConfigText() {
        setText('[data-company-name]', CONFIG.company?.name);
        setText('[data-company-id]', CONFIG.company?.companyId);
        setText('[data-address]', CONFIG.company?.address);
        setText('[data-service-area]', CONFIG.company?.serviceArea);

        setText('[data-phone-display]', CONFIG.contact?.phoneDisplay);
        setText('[data-email]', CONFIG.contact?.email);
        setText('[data-support-hours]', CONFIG.contact?.supportHours);
        setText('[data-phone-button-text]', CONFIG.contact?.phoneButtonText);

        setText('[data-footer-description]', CONFIG.footer?.description);
        setText('[data-footer-disclaimer]', CONFIG.footer?.disclaimer);

        setText('[data-current-year]', new Date().getFullYear());
        setText('[data-legal-updated]', CONFIG.legal?.lastUpdated);

        setHref('[data-phone-link]', getTelHref());
        setHref('[data-email-link]', getMailHref());

        document.querySelectorAll('[data-cta-text]').forEach((element) => {
            const key = element.getAttribute('data-cta-text');
            const value = CONFIG.cta?.[key];

            if (value) {
                element.textContent = safeText(value);
            }
        });
    }

    function createServiceLink(service, className) {
        const link = document.createElement('a');

        link.href = service.url;
        link.className = className;
        link.textContent = service.title;
        link.setAttribute('data-nav-link', '');

        return link;
    }

    function renderServiceMenus() {
        const services = CONFIG.services || [];

        document.querySelectorAll(SELECTORS.serviceMenu).forEach((menu) => {
            menu.innerHTML = '';

            services.forEach((service) => {
                menu.appendChild(createServiceLink(service, 'dropdown__link'));
            });
        });

        document.querySelectorAll(SELECTORS.mobileServiceMenu).forEach((menu) => {
            menu.innerHTML = '';

            services.forEach((service) => {
                menu.appendChild(createServiceLink(service, 'mobile-menu__service-link'));
            });
        });

        document.querySelectorAll(SELECTORS.footerServiceMenu).forEach((menu) => {
            menu.innerHTML = '';

            services.forEach((service) => {
                const item = document.createElement('li');
                const link = createServiceLink(service, 'footer__link');

                item.appendChild(link);
                menu.appendChild(item);
            });
        });
    }

    function initStickyHeader() {
        const header = document.querySelector(SELECTORS.header);

        if (!header) return;

        const updateHeaderState = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 16);
        };

        updateHeaderState();

        window.addEventListener('scroll', updateHeaderState, {
            passive: true
        });
    }

    function openMobileMenu(toggle, menu) {
        if (!toggle || !menu) return;

        body.classList.add('menu-open');
        menu.classList.add('is-open');
        menu.removeAttribute('hidden');
        toggle.setAttribute('aria-expanded', 'true');

        const firstFocusable = menu.querySelector(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (firstFocusable) {
            window.setTimeout(() => firstFocusable.focus(), 60);
        }
    }

    function closeMobileMenu(toggle, menu) {
        if (!toggle || !menu) return;

        body.classList.remove('menu-open');
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');

        window.setTimeout(() => {
            if (!menu.classList.contains('is-open')) {
                menu.setAttribute('hidden', '');
            }
        }, 260);
    }

    function initMobileMenu() {
        const toggle = document.querySelector(SELECTORS.mobileToggle);
        const close = document.querySelector(SELECTORS.mobileClose);
        const menu = document.querySelector(SELECTORS.mobileMenu);
        const panel = document.querySelector(SELECTORS.mobilePanel);

        if (!toggle || !menu) return;

        toggle.setAttribute('aria-expanded', 'false');

        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.contains('is-open');

            if (isOpen) {
                closeMobileMenu(toggle, menu);
            } else {
                openMobileMenu(toggle, menu);
            }
        });

        if (close) {
            close.addEventListener('click', () => {
                closeMobileMenu(toggle, menu);
                toggle.focus();
            });
        }

        menu.addEventListener('click', (event) => {
            const target = event.target;

            if (target === menu) {
                closeMobileMenu(toggle, menu);
                return;
            }

            if (target instanceof HTMLElement && target.closest('a')) {
                closeMobileMenu(toggle, menu);
            }
        });

        if (panel) {
            panel.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMobileMenu(toggle, menu);
                toggle.focus();
            }
        });
    }

    function initServicesDropdown() {
        const dropdown = document.querySelector(SELECTORS.dropdownRoot);

        if (!dropdown) return;

        const toggle = dropdown.querySelector(SELECTORS.dropdownToggle);
        const panel = dropdown.querySelector(SELECTORS.dropdownPanel);

        if (!toggle || !panel) return;

        let closeTimer = null;

        const openDropdown = () => {
            window.clearTimeout(closeTimer);
            dropdown.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
            panel.removeAttribute('hidden');
        };

        const closeDropdown = () => {
            closeTimer = window.setTimeout(() => {
                dropdown.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                panel.setAttribute('hidden', '');
            }, 140);
        };

        const closeDropdownImmediately = () => {
            window.clearTimeout(closeTimer);
            dropdown.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            panel.setAttribute('hidden', '');
        };

        dropdown.addEventListener('mouseenter', openDropdown);
        dropdown.addEventListener('mouseleave', closeDropdown);

        dropdown.addEventListener('focusin', openDropdown);
        dropdown.addEventListener('focusout', (event) => {
            if (!dropdown.contains(event.relatedTarget)) {
                closeDropdown();
            }
        });

        toggle.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                openDropdown();

                const firstLink = panel.querySelector('a');

                if (firstLink) firstLink.focus();
            }

            if (event.key === 'Escape') {
                closeDropdownImmediately();
                toggle.focus();
            }
        });

        panel.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeDropdownImmediately();
                toggle.focus();
            }
        });

        document.addEventListener('click', (event) => {
            const target = event.target;

            if (!(target instanceof HTMLElement)) return;
            if (dropdown.contains(target)) return;

            closeDropdownImmediately();
        });
    }

    function setActiveLinks() {
        const currentPath = getCleanPath(window.location.pathname);

        document.querySelectorAll('[data-nav-link]').forEach((link) => {
            const href = link.getAttribute('href');

            if (!href) return;

            const linkPath = getCleanPath(href);

            if (linkPath === currentPath) {
                link.classList.add('is-active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('is-active');
                link.removeAttribute('aria-current');
            }
        });
    }

    function initSmoothAnchorScroll() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');

                if (!targetId || targetId === '#') return;

                const target = document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            });
        });
    }

    function createCookieBanner() {
        const storageKey = getCookieStorageKey();

        if (localStorage.getItem(storageKey)) return;
        if (document.querySelector(SELECTORS.cookieBanner)) return;

        const banner = document.createElement('section');

        banner.className = 'cookie-banner';
        banner.setAttribute('data-cookie-banner', '');
        banner.setAttribute('aria-label', 'Cookie consent');

        const bannerText =
            CONFIG.cookies?.bannerText ||
            'KITCHPRO uses cookies to improve site functionality and remember preferences.';

        const acceptText = CONFIG.cookies?.acceptText || 'Accept';
        const declineText = CONFIG.cookies?.declineText || 'Decline';
        const policyText = CONFIG.cookies?.policyText || 'Cookie Policy';
        const cookiePage = CONFIG.pages?.cookies || 'cookie-policy.html';
        const privacyPage = CONFIG.pages?.privacy || 'privacy-policy.html';
        const termsPage = CONFIG.pages?.terms || 'terms-of-service.html';

        banner.innerHTML = `
            <div class="cookie-banner__content">
                <div class="cookie-banner__text">
                    <strong>Cookie preferences</strong>
                    <p>
                        ${bannerText}
                        Review our
                        <a href="${privacyPage}">Privacy Policy</a>,
                        <a href="${cookiePage}">${policyText}</a>,
                        and <a href="${termsPage}">Terms</a>.
                    </p>
                </div>

                <div class="cookie-banner__actions">
                    <button class="btn btn--secondary btn--small" type="button" data-cookie-decline>
                        ${declineText}
                    </button>
                    <button class="btn btn--primary btn--small" type="button" data-cookie-accept>
                        ${acceptText}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        window.setTimeout(() => {
            banner.classList.add('is-visible');
        }, 80);
    }

    function initCookieBanner() {
        createCookieBanner();

        const banner = document.querySelector(SELECTORS.cookieBanner);

        if (!banner) return;

        const storageKey = getCookieStorageKey();
        const accept = banner.querySelector('[data-cookie-accept]');
        const decline = banner.querySelector('[data-cookie-decline]');

        const saveChoice = (choice) => {
            localStorage.setItem(storageKey, choice);
            banner.classList.remove('is-visible');

            window.setTimeout(() => {
                banner.remove();
            }, 260);
        };

        if (accept) {
            accept.addEventListener('click', () => {
                saveChoice(CONFIG.cookies?.acceptedValue || 'accepted');
            });
        }

        if (decline) {
            decline.addEventListener('click', () => {
                saveChoice(CONFIG.cookies?.declinedValue || 'declined');
            });
        }
    }

    function initContactForms() {
        document.querySelectorAll('[data-contact-form]').forEach((form) => {
            const message = form.querySelector('[data-form-message]');
            const consent = form.querySelector('input[name="consent"]');

            form.addEventListener('submit', (event) => {
                event.preventDefault();

                if (message) {
                    message.classList.remove('is-error', 'is-success', 'is-visible');
                    message.textContent = '';
                }

                if (!form.checkValidity()) {
                    if (message) {
                        message.textContent =
                            CONFIG.forms?.errorMessage ||
                            'Please complete the required fields before submitting your request.';
                        message.classList.add('is-visible', 'is-error');
                    }

                    form.reportValidity();
                    return;
                }

                if (consent && !consent.checked) {
                    if (message) {
                        message.textContent =
                            CONFIG.forms?.requiredConsentMessage ||
                            'Please confirm consent before submitting your request.';
                        message.classList.add('is-visible', 'is-error');
                    }

                    consent.focus();
                    return;
                }

                if (message) {
                    message.textContent =
                        CONFIG.forms?.successMessage ||
                        'Thank you. Your request has been prepared for provider comparison options.';
                    message.classList.add('is-visible', 'is-success');
                }

                form.reset();
            });
        });
    }

    function initKitchenZoneLabels() {
        document.querySelectorAll('[data-zone-label]').forEach((label) => {
            label.addEventListener('mouseenter', () => {
                label.classList.add('is-active');
            });

            label.addEventListener('mouseleave', () => {
                label.classList.remove('is-active');
            });

            label.addEventListener('focus', () => {
                label.classList.add('is-active');
            });

            label.addEventListener('blur', () => {
                label.classList.remove('is-active');
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

    function exposeHelpers() {
        window.KITCHPRO = {
            config: CONFIG,
            getServiceBySlug,
            getTelHref,
            getMailHref
        };
    }

    function init() {
        exposeHelpers();
        applyConfigText();
        renderServiceMenus();
        initStickyHeader();
        initMobileMenu();
        initServicesDropdown();
        setActiveLinks();
        initSmoothAnchorScroll();
        initCookieBanner();
        initContactForms();
        initKitchenZoneLabels();
        initServiceContactLinks();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();