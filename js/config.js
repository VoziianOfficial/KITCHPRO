'use strict';

window.SITE_CONFIG = {
    company: {
        name: 'KITCHPRO',
        companyId: 'KTP-KR-4827',
        address: '1846 Westlake Kitchen Avenue, Austin, TX 78701, USA',
        serviceArea: 'USA kitchen remodeling provider comparison platform'
    },

    contact: {
        phoneRaw: '+18885550148',
        phoneDisplay: '(888) 555-0148',
        phoneButtonText: 'Compare Kitchen Providers',
        email: 'hello@kitchprocompare.com',
        supportHours: 'Mon–Fri, 8:00 AM–7:00 PM'
    },

    cta: {
        primary: 'Compare Providers',
        secondary: 'View Services',
        contact: 'Request Quote Options',
        phone: 'Call to Compare',
        quote: 'Request Quotes',
        services: 'Explore Kitchen Services'
    },

    footer: {
        description:
            'KITCHPRO is an independent kitchen remodeling provider comparison platform helping homeowners explore local provider options, service categories, and quote paths.',
        disclaimer:
            'Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.'
    },

    pages: {
        home: 'index.html',
        services: 'services.html',
        about: 'about.html',
        contact: 'contact.html',
        privacy: 'privacy-policy.html',
        cookies: 'cookie-policy.html',
        terms: 'terms-of-service.html'
    },

    navigationLabels: {
        home: 'Home',
        services: 'Services',
        about: 'About',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        terms: 'Terms of Service'
    },

    legal: {
        lastUpdated: 'June 7, 2026'
    },

    cookies: {
        storageKey: 'kitchpro_cookie_consent',
        acceptedValue: 'accepted',
        declinedValue: 'declined',
        bannerText:
            'KITCHPRO uses cookies to improve site functionality, remember preferences, and understand basic website usage.',
        acceptText: 'Accept',
        declineText: 'Decline',
        policyText: 'Cookie Policy'
    },

    forms: {
        successMessage:
            'Thank you. Your request has been prepared for kitchen provider comparison options.',
        errorMessage:
            'Please complete the required fields before submitting your request.',
        requiredConsentMessage:
            'Please confirm consent before submitting your request.'
    },

    assets: {
        logoAlt: 'KITCHPRO kitchen remodeling comparison logo',
        heroHome: 'assets/images/home-hero-kitchen.jpg',
        heroServices: 'assets/images/services-hero-kitchen.jpg',
        heroAbout: 'assets/images/about-hero-kitchen.jpg',
        heroContact: 'assets/images/contact-hero-kitchen.jpg',
        cta: 'assets/images/cta-kitchen.jpg',
        kitchenZones: 'assets/images/kitchen-zones.jpg'
    },

    services: [
        {
            number: '01',
            title: 'Full Kitchen Remodeling',
            slug: 'full-kitchen-remodeling',
            url: 'full-kitchen-remodeling.html',
            short: 'Complete kitchen transformation, layout changes, surfaces, storage, and finishes.',
            image: 'assets/images/full-kitchen-remodeling.jpg',
            alt: 'Premium full kitchen remodeling with island, cabinets, and stone surfaces',
            heroTitle: 'Full Kitchen Remodeling',
            heroText:
                'Compare full kitchen remodeling options and connect with local providers for complete project scopes.',
            related: [
                'custom-cabinets-refacing',
                'countertops-stone-surfaces',
                'kitchen-islands-layout-upgrades'
            ]
        },
        {
            number: '02',
            title: 'Custom Cabinets & Refacing',
            slug: 'custom-cabinets-refacing',
            url: 'custom-cabinets-refacing.html',
            short: 'Cabinet doors, refacing, storage upgrades, finishes, and built-in solutions.',
            image: 'assets/images/custom-cabinets-refacing.jpg',
            alt: 'Custom kitchen cabinets and refacing details in a premium dark kitchen',
            heroTitle: 'Custom Cabinets & Refacing',
            heroText:
                'Explore cabinet refacing, custom storage, door styles, finishes, and provider quote options.',
            related: [
                'full-kitchen-remodeling',
                'countertops-stone-surfaces',
                'lighting-fixtures-finishing'
            ]
        },
        {
            number: '03',
            title: 'Countertops & Stone Surfaces',
            slug: 'countertops-stone-surfaces',
            url: 'countertops-stone-surfaces.html',
            short: 'Quartz, marble, granite, stone surfaces, waterfall edges, and island tops.',
            image: 'assets/images/countertops-stone-surfaces.jpg',
            alt: 'Luxury kitchen countertop with marble and stone surface details',
            heroTitle: 'Countertops & Stone Surfaces',
            heroText:
                'Compare countertop materials, edge profiles, stone options, and local provider quote paths.',
            related: [
                'backsplash-tile-work',
                'custom-cabinets-refacing',
                'kitchen-islands-layout-upgrades'
            ]
        },
        {
            number: '04',
            title: 'Backsplash & Tile Work',
            slug: 'backsplash-tile-work',
            url: 'backsplash-tile-work.html',
            short: 'Tile, stone, marble backsplash, accent walls, and detailed installation options.',
            image: 'assets/images/backsplash-tile-work.jpg',
            alt: 'Kitchen backsplash and tile work with stone and warm lighting',
            heroTitle: 'Backsplash & Tile Work',
            heroText:
                'Review backsplash materials, tile patterns, wall coverage, and provider comparison options.',
            related: [
                'countertops-stone-surfaces',
                'lighting-fixtures-finishing',
                'full-kitchen-remodeling'
            ]
        },
        {
            number: '05',
            title: 'Kitchen Islands & Layout Upgrades',
            slug: 'kitchen-islands-layout-upgrades',
            url: 'kitchen-islands-layout-upgrades.html',
            short: 'Island seating, layout changes, storage planning, prep zones, and flow upgrades.',
            image: 'assets/images/kitchen-islands-layout-upgrades.jpg',
            alt: 'Large kitchen island with seating and premium layout planning',
            heroTitle: 'Kitchen Islands & Layout Upgrades',
            heroText:
                'Compare island layouts, seating needs, storage planning, prep zones, and provider options.',
            related: [
                'countertops-stone-surfaces',
                'lighting-fixtures-finishing',
                'custom-cabinets-refacing'
            ]
        },
        {
            number: '06',
            title: 'Lighting, Fixtures & Finishing',
            slug: 'lighting-fixtures-finishing',
            url: 'lighting-fixtures-finishing.html',
            short: 'Lighting plans, sinks, faucets, pulls, hardware, and final detail upgrades.',
            image: 'assets/images/lighting-fixtures-finishing.jpg',
            alt: 'Kitchen lighting, brass fixtures, faucet, and finishing details',
            heroTitle: 'Lighting, Fixtures & Finishing',
            heroText:
                'Explore lighting zones, faucets, sinks, pulls, finishes, and local provider quote options.',
            related: [
                'kitchen-islands-layout-upgrades',
                'backsplash-tile-work',
                'full-kitchen-remodeling'
            ]
        }
    ],

    featuredServices: [
        'full-kitchen-remodeling',
        'custom-cabinets-refacing',
        'countertops-stone-surfaces',
        'kitchen-islands-layout-upgrades'
    ],

    materialBoard: [
        {
            title: 'Quartz',
            image: 'assets/images/quartz-texture.jpg',
            alt: 'Light quartz stone texture for kitchen surfaces'
        },
        {
            title: 'Natural Stone',
            image: 'assets/images/natural-stone-texture.jpg',
            alt: 'Natural dark stone texture for premium kitchen countertops'
        },
        {
            title: 'Warm Wood',
            image: 'assets/images/warm-wood-texture.jpg',
            alt: 'Warm wood material texture for kitchen remodeling'
        },
        {
            title: 'Matte Cabinets',
            image: 'assets/images/matte-cabinets.jpg',
            alt: 'Matte cabinet finish detail in a modern kitchen'
        },
        {
            title: 'Tile Backsplash',
            image: 'assets/images/tile-backsplash.jpg',
            alt: 'Decorative tile backsplash material for kitchen design'
        },
        {
            title: 'Brass Fixtures',
            image: 'assets/images/brass-fixtures.jpg',
            alt: 'Brass kitchen faucet and fixture detail'
        }
    ],

    comparisonRows: [
        {
            label: 'Materials',
            reason: 'Affects durability, look, maintenance, and quote range.',
            question: 'What brands, grades, and materials are used?'
        },
        {
            label: 'Timeline',
            reason: 'Impacts daily routine, kitchen access, and planning.',
            question: 'What is the estimated project timeline?'
        },
        {
            label: 'Warranty',
            reason: 'Helps clarify coverage for materials and workmanship.',
            question: 'What warranties are included?'
        },
        {
            label: 'Labor scope',
            reason: 'Defines what work is included and what may cost extra.',
            question: 'Who will complete each part of the project?'
        },
        {
            label: 'Removal & cleanup',
            reason: 'Can affect project cost, schedule, and convenience.',
            question: 'Is removal, disposal, and cleanup included?'
        },
        {
            label: 'Payment terms',
            reason: 'Helps compare deposit needs and payment schedules.',
            question: 'What payment schedule is expected?'
        }
    ]
};