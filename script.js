/**
 * Casimir Engineering Website - JavaScript
 * Keyboard shortcuts and smooth scrolling navigation
 */

(function() {
    'use strict';

    /* ========================================
       Configuration
       ======================================== */

    const KEYBOARD_SHORTCUTS = {
        'h': '#hero',           // Home
        'k': '#capabilities',   // Capabilities (K)
        'p': '#projects',       // Projects
        'w': '#process',        // Process (Work)
        'c': '#contact',        // Contact
        'l': 'toggle-language', // Language toggle
        '?': 'toggle-shortcuts', // Toggle shortcuts overlay
        '/': 'toggle-shortcuts', // Alternative help (hidden)
        "'": 'toggle-shortcuts', // Alternative help (hidden)
        ',': 'toggle-shortcuts'  // Alternative help (hidden)
    };

    const SMOOTH_SCROLL_OFFSET = 80; // Account for sticky header

    /* ========================================
       Language Configuration
       ======================================== */

    const LANGUAGES = {
        en: { name: 'English', flag: '🇬🇧', label: 'Français' },
        fr: { name: 'Français', flag: '🇫🇷', label: 'English' }
    };

    // Detect browser language, default to French if browser is French, otherwise English
    function detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        return browserLang.startsWith('fr') ? 'fr' : 'en';
    }

    let currentLanguage = localStorage.getItem('language') || detectBrowserLanguage();

    // Translations object
    const TRANSLATIONS = {
        en: {
            hero: {
                title: 'Let\'s build it together.',
                subtitle: 'From prototype to mass production - robotics, electronics, and test benches.',
                intro: 'My name is Raphaël Casimir. I help companies transform <b>ideas</b> into physical <b>products</b> with a focus on robust industrialization and automated test infrastructure.<br><br>From military radars to consumer electronics, I am able to provide end-to-end engineering support thanks to a network of engineers and industrial partners.',
                location: 'Based in Lausanne, Switzerland. Working with partners in Switzerland, France, the UK and China.',
                cta_discuss: 'Discuss a project',
                cta_capabilities: 'See capabilities'
            },
            nav: {
                capabilities: 'Capabilities',
                projects: 'Projects',
                process: 'Process',
                contact: 'Contact',
                shortcut_capabilities: '[K]',
                shortcut_projects: '[P]',
                shortcut_process: '[W]',
                shortcut_contact: '[C]',
                shortcut_language: '[L]'
            },
            ui: {
                skip_link: 'Skip to main content',
                close_button: 'Close'
            },
            capabilities: {
                title: 'Capabilities'
            },
            cap: {
                product: {
                    title: 'End-to-end product development',
                    desc: 'Concept exploration, system architecture, and design. From initial requirements to manufacturing at scale, I guide projects through the complete development cycle with a pragmatic, manufacturing-aware approach.'
                },
                electronics: {
                    title: 'Electronics & embedded systems',
                    desc: 'PCB design, embedded software development, power systems, and sensor integration. Experience with electronics for robotics, UAVs, and industrial applications.'
                },
                robotics: {
                    title: 'Robotics & mechatronics',
                    desc: 'UAV systems, XYZ systems, actuators selection, and multi-sensor integration. Expertise in autonomous systems and real-time control architectures.'
                },
                testbench: {
                    title: 'Test bench design & automation',
                    desc: 'Custom test benches for electronics and robotics validation. <a href="https://www.tofupilot.com">TofuPilot</a> is my prefered open-source test engine and analytics platform.'
                },
                industrial: {
                    title: 'Industrialization & manufacturing',
                    desc: 'Design for manufacturing (DFM), validation planning, certification support, and production ramp-up. Navigate the transition from prototype to mass production with experienced guidance.'
                },
                network: {
                    title: 'Global manufacturing network',
                    desc: 'Coordination with manufacturing partners in Switzerland, France, the UK, and southern China. Access to diverse capabilities from precision Swiss manufacturing to high-volume Chinese production.'
                },
                communication: {
                    title: 'Training & communication',
                    desc: 'Technical training, investor presentations, and customer demonstrations. Clear communication of complex engineering concepts to diverse audiences.'
                }
            },
            projects: {
                title: 'Selected Projects'
            },
            proj: {
                meta: {
                    scope: 'Scope:',
                    keywords: 'Keywords:'
                },
                uav: {
                    title: 'Professional and military UAV Test Benches',
                    desc: 'Designed, deployed and managed production test benches for professional mapping UAVs.',
                    scope: 'Test infrastructure, automation, validation',
                    keywords: 'UAV, drone, test benches, automation, validation'
                },
                elec: {
                    title: 'R&D & Industrialization for airborne medical container',
                    desc: 'Electronics R&D, fault investigation of existing systems, subcontractor management, industrialization and production management, customer demonstrations.',
                    scope: 'R&D, industrialization, partner management',
                    keywords: 'Electronics, product development, manufacturing'
                },
                radar: {
                    title: 'Automated Test Systems for Military Radar',
                    desc: 'Developed automated performance test systems for military radar platforms.',
                    scope: 'Test automation, embedded systems, tooling',
                    keywords: 'Military, radar, defence, embedded, MATLAB, automation'
                },
                devrel: {
                    title: 'Full stack IOT device development',
                    desc: 'Complete development from idea to small series production of an IOT device.',
                    scope: 'Product design, circuit board design, prototyping, small batch production',
                    keywords: 'Hardware products, design, production'
                },
                cubesat: {
                    title: 'Project coordination for CubeSat development',
                    desc: 'Team coordination for CubeSat development, systems integration',
                    scope: 'Research satellite development, team coordination',
                    keywords: 'CubeSat, team management, PCB design, space'
                }
            },
            process: {
                title: 'How We Work',
                discover: {
                    title: 'Discover',
                    desc: 'Clarify requirements, technical constraints, and success metrics. Understand market context, regulatory requirements, and manufacturing constraints early to guide design decisions.'
                },
                prototype: {
                    title: 'Prototype',
                    desc: 'Rapid iteration on electronics, mechanics, and firmware. Build functional prototypes to validate concepts, test performance, and identify integration challenges before committing to production design.'
                },
                validate: {
                    title: 'Validate & Test',
                    desc: 'Design custom test benches, develop validation plans, and implement data capture systems. Establish repeatable test procedures that can transition to production quality control.'
                },
                industrial: {
                    title: 'Industrialize',
                    desc: 'Design for manufacturing (DFM) review, partner selection, and production ramp-up support. Work with manufacturing partners to ensure smooth transition from prototype to mass production.'
                },
                support: {
                    title: 'Support',
                    desc: 'Long-term maintenance of test infrastructure, design updates, and production support. Ensure test benches remain calibrated and validated throughout product lifecycle.'
                },
                step_numbers: ['01', '02', '03', '04', '05']
            },
            contact: {
                title: 'Get in Touch',
                intro: 'Whether you want to develop a new product or unblock your production, let\'s have a call. Or an email.',
                location_label: 'Location',
                location_value: 'Lausanne, Vaud, Switzerland',
                email_label: 'Email',
                phone_label: 'Phone'
            },
            footer: {
                copyright: '© 2024 Raphaël Casimir. All rights reserved.',
                imprint: 'Imprint',
                privacy: 'Privacy',
                hint: 'Press ? for keyboard shortcuts'
            },
            shortcuts: {
                title: 'Keyboard Shortcuts',
                home: 'Home',
                capabilities: 'Capabilities',
                projects: 'Projects',
                process: 'Process',
                contact: 'Contact',
                language: 'Language',
                help: 'Toggle this help',
                close: 'Close this help'
            }
        },
        fr: {
            hero: {
                title: 'Oui, c\'est possible. Construisons ensemble.',
                subtitle: 'Du prototype à la production de masse - inǵenierie robotique, électronique et bancs de test.',
                intro: 'Je suis Raphaël Casimir. J\'aide les entreprises à transformer leurs <b>idées</b> en <b>produits</b> physiques en prenant en compte les questions d\'industrialisation.<br><br>Je travaille avec un réseau de partenaires pour assurer une large couverture de domaines, des radars militaires à l\'électronique grand public.',
                location: 'Basé à Lausanne, Suisse. Collaboration avec des partenaires en Suisse, France, Royaume-Uni et Chine.',
                cta_discuss: 'Discuter d\'un projet',
                cta_capabilities: 'Voir les compétences'
            },
            nav: {
                capabilities: 'Compétences',
                projects: 'Projets',
                process: 'Processus',
                contact: 'Contact',
                shortcut_capabilities: '[K]',
                shortcut_projects: '[P]',
                shortcut_process: '[W]',
                shortcut_contact: '[C]',
                shortcut_language: '[L]'
            },
            ui: {
                skip_link: 'Aller au contenu principal',
                close_button: 'Fermer'
            },
            capabilities: {
                title: 'Compétences'
            },
            cap: {
                product: {
                    title: 'Développement de produit de bout en bout',
                    desc: 'Exploration de concept, architecture système et conception. Des exigences initiales à la fabrication à grande échelle, je guide les projets à travers le cycle complet de développement avec une approche pragmatique et avec la possibilité de produire en masse. La réparabilité, fin de vie du produit et les considérations écologiques sont prises en compte.'
                },
                electronics: {
                    title: 'Électronique & systèmes embarqués',
                    desc: 'Conception de circuits imprimés (PCB), développement logiciel embarqué, systèmes d\'alimentation et intégration de capteurs. Expérience avec l\'électronique pour la robotique, les UAV (drones) et les applications industrielles.'
                },
                robotics: {
                    title: 'Robotique & mécatronique',
                    desc: 'Drones volants ou terrestres, machines XYZ, sélection d\'actionneurs et intégration de capteurs. Expertise en systèmes autonomes et architectures de contrôle en temps réel.'
                },
                testbench: {
                    title: 'Conception & automatisation de bancs de test',
                    desc: 'Bancs de test personnalisés pour la validation électronique et robotique. <a href="https://www.tofupilot.com">TofuPilot</a> est mon moteur de test et plateforme d\'analyse open-source préféré.'
                },
                industrial: {
                    title: 'Industrialisation & fabrication',
                    desc: 'Design for Manufacturing (DFM), planification de validation, support de certification et montée en production. Accompagnement dans la transition du prototype à la production de masse avec des conseils expérimentés.'
                },
                network: {
                    title: 'Réseau de fabrication mondial',
                    desc: 'Coordination avec des partenaires de fabrication en Suisse, France, Royaume-Uni et sud de la Chine. Accès à diverses capacités allant de la fabrication de précision suisse à la production à grand volume chinoise.'
                },
                communication: {
                    title: 'Formation & communication',
                    desc: 'Formation technique, présentations pour investisseurs et démonstrations clients. Communication claire de concepts d\'ingénierie complexes à des publics variés.'
                }
            },
            projects: {
                title: 'Projets Sélectionnés'
            },
            proj: {
                meta: {
                    scope: 'Périmètre :',
                    keywords: 'Mots-clés :'
                },
                devrel: {
                    title: 'Développement de dispositif IOT full stack',
                    desc: 'Développement complet de l\'idée à la production en petite série d\'un dispositif IOT.',
                    scope: 'Conception produit, conception de circuits imprimés, prototypage, production en petites séries',
                    keywords: 'Produits matériels, conception, production'
                },
                elec: {
                    title: 'R&D et industrialisation pour conteneur médical aéroporté',
                    desc: 'R&D électronique, investigation de pannes de systèmes existants, gestion de sous-traitants, industrialisation et gestion de production, démonstrations clients.',
                    scope: 'R&D, industrialisation, gestion de partenaires',
                    keywords: 'Électronique, développement produit, fabrication'
                },
                uav: {
                    title: 'Bancs de test UAV professionnels et militaires',
                    desc: 'Conception, déploiement et gestion de bancs de test de production pour UAV de cartographie professionnels.',
                    scope: 'Infrastructure de test, automatisation, validation',
                    keywords: 'UAV, drone, bancs de test, automatisation, validation'
                },
                radar: {
                    title: 'Systèmes de test automatisés pour radar militaire',
                    desc: 'Développement de tests de performance automatisés pour radars militaires.',
                    scope: 'Automatisation de tests, systèmes embarqués, outillage',
                    keywords: 'Militaire, radar, défense, embarqué, MATLAB, automatisation'
                },
                cubesat: {
                    title: 'Coordination de projet pour développement d\'un CubeSat',
                    desc: 'Coordination d\'équipe pour développement d\'un CubeSat, intégration des systèmes',
                    scope: 'Développement de satellite de recherche, coordination d\'équipe',
                    keywords: 'CubeSat, gestion d\'équipe, conception PCB, espace'
                }
            },
            process: {
                title: 'Le processus de développement',
                discover: {
                    title: 'Découvrir',
                    desc: 'Clarifier les exigences, contraintes techniques et critères de réussite. Comprendre le contexte du marché, les exigences réglementaires et les contraintes de fabrication dès le début pour guider les décisions de conception.'
                },
                prototype: {
                    title: 'Prototyper',
                    desc: 'Itération rapide sur l\'électronique, la mécanique et le firmware. Construire des prototypes fonctionnels pour valider les concepts, tester les performances et identifier les défis d\'intégration avant de s\'engager dans la conception de production.'
                },
                validate: {
                    title: 'Valider & Tester',
                    desc: 'Concevoir des bancs de test personnalisés, développer des plans de validation et implémenter des systèmes de capture de données. Établir des procédures de test reproductibles qui pourront ensuite transitionner vers le contrôle qualité en production.'
                },
                industrial: {
                    title: 'Industrialiser',
                    desc: 'Design for Manufacturing (DFM), sélection de partenaires et support de montée en production. Travailler avec les partenaires de fabrication pour assurer une transition fluide du prototype à la production en série.'
                },
                support: {
                    title: 'Support',
                    desc: 'Maintenance à long terme de l\'infrastructure de test, mises à jour de conception et support en production. Assurer que les bancs de test restent calibrés et opérationnels tout au long du cycle de vie du produit.'
                },
                step_numbers: ['01', '02', '03', '04', '05']
            },
            contact: {
                title: 'Nous Contacter',
                intro: 'Que vous souhaitiez développer un nouveau produit ou débloquer votre production, parlons-en par téléphone ou par email.',
                location_label: 'Localisation',
                location_value: 'Lausanne, Vaud, Suisse',
                email_label: 'Email',
                phone_label: 'Téléphone'
            },
            footer: {
                copyright: '© 2024 Raphaël Casimir. Tous droits réservés.',
                imprint: 'Mentions légales',
                privacy: 'Confidentialité',
                hint: 'Appuyez sur ? pour les raccourcis clavier'
            },
            shortcuts: {
                title: 'Raccourcis Clavier',
                home: 'Accueil',
                capabilities: 'Compétences',
                projects: 'Projets',
                process: 'Processus',
                contact: 'Contact',
                language: 'Langue',
                help: 'Afficher/masquer cette aide',
                close: 'Fermer cette aide'
            }
        }
    };

    /* ========================================
       Utility Functions
       ======================================== */

    /**
     * Check if user is currently typing in an input or textarea
     */
    function isTyping() {
        const activeElement = document.activeElement;
        const tagName = activeElement.tagName.toLowerCase();
        return (
            tagName === 'input' ||
            tagName === 'textarea' ||
            activeElement.isContentEditable
        );
    }

    /**
     * Scroll to a section with offset for sticky header (instant, no animation)
     */
    function scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (!section) return;

        const headerOffset = SMOOTH_SCROLL_OFFSET;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo(0, offsetPosition);

        // Update URL hash
        if (history.pushState) {
            history.pushState(null, null, sectionId);
        } else {
            window.location.hash = sectionId;
        }
    }

    /* ========================================
       Keyboard Shortcuts Overlay
       ======================================== */

    const overlay = document.getElementById('shortcuts-overlay');
    const closeButton = overlay ? overlay.querySelector('.shortcuts-close') : null;

    /**
     * Toggle the keyboard shortcuts help overlay
     */
    function toggleShortcutsOverlay() {
        if (!overlay) return;

        const isHidden = overlay.getAttribute('aria-hidden') === 'true';
        overlay.setAttribute('aria-hidden', !isHidden);

        // Focus management for accessibility
        if (!isHidden) {
            // Closing - return focus to body
            document.body.focus();
        } else {
            // Opening - focus the close button
            if (closeButton) {
                closeButton.focus();
            }
        }
    }

    /**
     * Close the shortcuts overlay
     */
    function closeShortcutsOverlay() {
        if (!overlay) return;
        overlay.setAttribute('aria-hidden', 'true');
        document.body.focus();
    }

    /* ========================================
       Language Translation Functions
       ======================================== */

    /**
     * Get nested translation value from object using dot notation
     */
    function getNestedTranslation(obj, key) {
        return key.split('.').reduce((o, k) => (o || {})[k], obj);
    }

    /**
     * Update all elements with data-i18n attributes
     */
    function updatePageLanguage() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getNestedTranslation(TRANSLATIONS[currentLanguage], key);

            if (translation) {
                // Handle form inputs and textareas differently
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    // Use innerHTML to support HTML tags like <b>, <strong>, <em>, etc.
                    element.innerHTML = translation;
                }
            }
        });

        // Handle aria-label for close button
        const closeButton = document.getElementById('shortcutsClose');
        if (closeButton) {
            const closeLabel = TRANSLATIONS[currentLanguage].ui.close_button;
            if (closeLabel) {
                closeButton.setAttribute('aria-label', closeLabel);
            }
        }
    }

    /**
     * Update the language switcher display
     */
    function updateLanguageSwitcher() {
        const nextLang = currentLanguage === 'en' ? 'fr' : 'en';
        const langData = LANGUAGES[nextLang];

        // Update desktop language switcher
        const langLabel = document.getElementById('langLabel');
        const langFlag = document.querySelector('#langSwitcher .lang-flag');

        if (langLabel && langData) {
            langLabel.textContent = langData.name; // Show the name of the next language
        }
        if (langFlag && langData) {
            langFlag.textContent = langData.flag;
        }

        // Update mobile language switcher
        const mobileLangLabel = document.getElementById('mobileLangLabel');
        const mobileLangFlag = document.querySelector('#mobileLangSwitcher .lang-flag');

        if (mobileLangLabel && langData) {
            mobileLangLabel.textContent = langData.name;
        }
        if (mobileLangFlag && langData) {
            mobileLangFlag.textContent = langData.flag;
        }
    }

    /**
     * Set the current language
     */
    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.documentElement.setAttribute('lang', lang);
        updatePageLanguage();
        updateLanguageSwitcher();
    }

    /**
     * Toggle between English and French
     */
    function toggleLanguage() {
        const newLang = currentLanguage === 'en' ? 'fr' : 'en';
        setLanguage(newLang);
    }

    /* ========================================
       Mobile Menu Toggle
       ======================================== */

    /**
     * Toggle mobile navigation menu
     */
    function toggleMobileMenu() {
        const menuButton = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');

        if (!menuButton || !navLinks) return;

        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';

        // Toggle aria-expanded
        menuButton.setAttribute('aria-expanded', !isExpanded);

        // Toggle open class
        navLinks.classList.toggle('open');
    }

    /**
     * Close mobile menu when clicking outside
     */
    function closeMobileMenu(event) {
        const menuButton = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');

        if (!menuButton || !navLinks) return;

        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';

        if (isExpanded && !navLinks.contains(event.target) && !menuButton.contains(event.target)) {
            menuButton.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
        }
    }

    /**
     * Close mobile menu when clicking a nav link
     */
    function closeMobileMenuOnNavClick() {
        const menuButton = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');

        if (!menuButton || !navLinks) return;

        menuButton.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
    }

    /* ========================================
       Event Listeners
       ======================================== */

    /**
     * Handle keyboard shortcuts
     */
    document.addEventListener('keydown', function(event) {
        // Ignore if user is typing in an input field
        if (isTyping()) return;

        // Ignore if modifier keys are pressed (Ctrl, Cmd, Alt, Super)
        if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;

        const key = event.key.toLowerCase();

        // Check if this key has a shortcut assigned
        if (KEYBOARD_SHORTCUTS.hasOwnProperty(key)) {
            const action = KEYBOARD_SHORTCUTS[key];

            // Special case: toggle shortcuts overlay
            if (action === 'toggle-shortcuts') {
                event.preventDefault();
                toggleShortcutsOverlay();
                return;
            }

            // Special case: toggle language
            if (action === 'toggle-language') {
                event.preventDefault();
                toggleLanguage();
                return;
            }

            // Navigate to section
            event.preventDefault();
            scrollToSection(action);
        }

        // Close overlay with Escape key
        if (key === 'escape') {
            closeShortcutsOverlay();
        }
    });

    /**
     * Handle clicks on the close button
     */
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            closeShortcutsOverlay();
        });
    }

    /**
     * Close overlay when clicking outside the modal
     */
    if (overlay) {
        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                closeShortcutsOverlay();
            }
        });
    }

    /**
     * Handle smooth scrolling for navigation links
     */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            const href = this.getAttribute('href');

            // Ignore empty anchors or just '#'
            if (!href || href === '#') {
                event.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                scrollToSection(href);

                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });

    /**
     * Handle language switcher click
     */
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', function(event) {
            event.preventDefault();
            toggleLanguage();
        });
    }

    /**
     * Handle mobile menu toggle click
     */
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    /**
     * Handle mobile language switcher (duplicate functionality)
     */
    const mobileLangSwitcher = document.getElementById('mobileLangSwitcher');
    if (mobileLangSwitcher) {
        mobileLangSwitcher.addEventListener('click', function(event) {
            event.preventDefault();
            toggleLanguage();
        });
    }

    /**
     * Close mobile menu when clicking outside
     */
    document.addEventListener('click', closeMobileMenu);

    /**
     * Close mobile menu when clicking nav links
     */
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', closeMobileMenuOnNavClick);
        });
    }

    /**
     * Close mobile menu on window resize to desktop size
     */
    window.addEventListener('resize', function() {
        const menuButton = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');

        if (window.innerWidth >= 768 && menuButton && navLinks) {
            menuButton.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
        }
    });

    /* ========================================
       Initialization
       ======================================== */

    /**
     * Initialize the application
     */
    function init() {
        // Set initial state of shortcuts overlay
        if (overlay) {
            overlay.setAttribute('aria-hidden', 'true');
        }

        // Initialize language
        setLanguage(currentLanguage);

        // Log ready message (can be removed in production)
        console.log('Casimir Engineering website loaded. Press ? for keyboard shortcuts.');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
