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

    const STORAGE_KEYS = {
        cookieChoice: 'kitchpro_cookie_choice'
    };

    const body = document.body;

    function safeText(value) {
        return value === undefined || value === null ? '' : String(value);
    }

    function getCleanPath(pathname) {
        const path = pathname.split('/').pop();
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

        setHref('[data-phone-link]', getTelHref());
        setHref('[data-email-link]', getMailHref());

        document.querySelectorAll('[data-cta-text]').forEach((element) => {
            const key = element.getAttribute('data-cta-text');
            element.textContent = safeText(CONFIG.cta?.[key]);
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
                const link = createServiceLink(service, 'dropdown__link');
                menu.appendChild(link);
            });
        });

        document.querySelectorAll(SELECTORS.mobileServiceMenu).forEach((menu) => {
            menu.innerHTML = '';

            services.forEach((service) => {
                const link = createServiceLink(service, 'mobile-menu__service-link');
                menu.appendChild(link);
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
                dropdown.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                panel.setAttribute('hidden', '');
                toggle.focus();
            }
        });

        panel.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                dropdown.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                panel.setAttribute('hidden', '');
                toggle.focus();
            }
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
            }
        });
    }

    function initSmoothAnchorScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');

                if (!targetId || targetId === '#') return;

                const target = document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    function createCookieBanner() {
        if (localStorage.getItem(STORAGE_KEYS.cookieChoice)) return;
        if (document.querySelector(SELECTORS.cookieBanner)) return;

        const banner = document.createElement('section');

        banner.className = 'cookie-banner';
        banner.setAttribute('data-cookie-banner', '');
        banner.setAttribute('aria-label', 'Cookie consent');

        banner.innerHTML = `
            <div class="cookie-banner__content">
                <div class="cookie-banner__text">
                    <strong>Cookie preferences</strong>
                    <p>
                        We use cookies to improve site experience and remember your preferences.
                        Review our
                        <a href="privacy-policy.html">Privacy Policy</a>,
                        <a href="cookie-policy.html">Cookie Policy</a>,
                        and <a href="terms-of-service.html">Terms</a>.
                    </p>
                </div>

                <div class="cookie-banner__actions">
                    <button class="btn btn--secondary btn--small" type="button" data-cookie-decline>
                        Decline
                    </button>
                    <button class="btn btn--primary btn--small" type="button" data-cookie-accept>
                        Accept
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

        const accept = banner.querySelector('[data-cookie-accept]');
        const decline = banner.querySelector('[data-cookie-decline]');

        const saveChoice = (choice) => {
            localStorage.setItem(STORAGE_KEYS.cookieChoice, choice);
            banner.classList.remove('is-visible');

            window.setTimeout(() => {
                banner.remove();
            }, 260);
        };

        if (accept) {
            accept.addEventListener('click', () => saveChoice('accepted'));
        }

        if (decline) {
            decline.addEventListener('click', () => saveChoice('declined'));
        }
    }

    function initContactForms() {
        document.querySelectorAll('[data-contact-form]').forEach((form) => {
            const message = form.querySelector('[data-form-message]');

            form.addEventListener('submit', (event) => {
                event.preventDefault();

                if (message) {
                    message.textContent =
                        'Thanks. Your request was prepared successfully. A local provider comparison path can now be reviewed.';
                    message.classList.add('is-visible');
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();