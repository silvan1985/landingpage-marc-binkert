/**
 * Marc Binkert Website - JavaScript
 * Optimierte Version mit verbesserter Fehlerbehandlung und Event-Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    // Hilfsfunktion zum sicheren Abrufen von DOM-Elementen
    const safeGetElement = (selector, parent = document) => {
        try {
            return parent.querySelector(selector);
        } catch (error) {
            console.error(`Fehler beim Abrufen des Elements mit Selektor ${selector}:`, error);
            return null;
        }
    };

    const safeGetElements = (selector, parent = document) => {
        try {
            return parent.querySelectorAll(selector);
        } catch (error) {
            console.error(`Fehler beim Abrufen der Elemente mit Selektor ${selector}:`, error);
            return [];
        }
    };

    // Debounce-Funktion für Performance-Optimierung
    const debounce = (func, wait = 20, immediate = true) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // Kontakt Popup Funktionalität
    const initContactPopup = () => {
        const contactTrigger = document.getElementById('contactTrigger');
        const contactPopup = document.getElementById('contactPopup');
        const contactPopupClose = document.getElementById('contactPopupClose');
        const contactForm = document.getElementById('contactForm');

        if (!contactTrigger || !contactPopup || !contactPopupClose || !contactForm) {
            console.warn('Kontakt-Popup-Elemente nicht gefunden, Funktionalität wird übersprungen.');
            return;
        }

        // Öffnen des Popups
        contactTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            contactPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Verhindert Scrollen im Hintergrund
            
            // Fokus auf das erste Eingabefeld setzen (Barrierefreiheit)
            const firstInput = contactForm.querySelector('input:not([type="hidden"])');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        });

        // Schließen des Popups über den Schließen-Button
        contactPopupClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Verhindert Bubble-Up des Events
            closeContactPopup();
        });

        // Schließen des Popups durch Klick außerhalb
        contactPopup.addEventListener('click', (e) => {
            if (e.target === contactPopup) {
                e.preventDefault();
                closeContactPopup();
            }
        });

        // Escape-Taste zum Schließen (Barrierefreiheit)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactPopup.classList.contains('active')) {
                closeContactPopup();
            }
        });

        // Formularverarbeitung
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Einfache Formularvalidierung
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                return;
            }
            
            // Hier können Sie die Formularverarbeitung implementieren
            // Zum Beispiel: E-Mail-Versand oder API-Aufruf
            alert('Vielen Dank für Ihre Nachricht! Ich werde mich zeitnah bei Ihnen melden.');
            closeContactPopup();
            contactForm.reset();
        });

        // Hilfsfunktion zum Schließen des Popups
        function closeContactPopup() {
            contactPopup.classList.remove('active');
            document.body.style.overflow = ''; // Scrollen wieder erlauben
        }
    };

    // Mobile Menü Funktionalität
    const initMobileMenu = () => {
        const mobileMenuToggle = safeGetElement('.mobile-menu-toggle');
        const navLinks = safeGetElement('.nav-links');
        
        if (!mobileMenuToggle || !navLinks) {
            console.warn('Mobile-Menü-Elemente nicht gefunden, Funktionalität wird übersprungen.');
            return;
        }

        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // ARIA-Attribute für Barrierefreiheit aktualisieren
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Verhindern, dass der Hintergrund scrollt, wenn das Menü geöffnet ist
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });

        // Schließe mobiles Menü beim Klick auf einen Link
        safeGetElements('.nav-link', navLinks).forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    };

    // Smooth Scroll Funktionalität
    const initSmoothScroll = () => {
        safeGetElements('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                try {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return; // Ignoriere leere Anker
                    
                    const target = document.querySelector(targetId);
                    if (!target) return;
                    
                    e.preventDefault();
                    
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } catch (error) {
                    console.error('Fehler beim Smooth Scroll:', error);
                }
            });
        });
    };

    // Header Scroll-Effekt
    const initHeaderScrollEffect = () => {
        const header = safeGetElement('.header');
        if (!header) {
            console.warn('Header-Element nicht gefunden, Scroll-Effekt wird übersprungen.');
            return;
        }

        let lastScroll = 0;
        
        // Debounce für bessere Performance
        const handleScroll = debounce(() => {
            try {
                const currentScroll = window.pageYOffset;

                // Wenn wir ganz oben sind, entferne alle Klassen
                if (currentScroll <= 0) {
                    header.classList.remove('scroll-up');
                    header.classList.remove('scroll-down');
                    return;
                }

                // Bestimme Scroll-Richtung und aktualisiere Klassen
                if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                    // Nach unten scrollen
                    header.classList.remove('scroll-up');
                    header.classList.add('scroll-down');
                } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                    // Nach oben scrollen
                    header.classList.remove('scroll-down');
                    header.classList.add('scroll-up');
                }
                
                lastScroll = currentScroll;
            } catch (error) {
                console.error('Fehler beim Header-Scroll-Effekt:', error);
            }
        }, 10);

        window.addEventListener('scroll', handleScroll);
    };

    // Initialisiere alle Funktionen
    try {
        initContactPopup();
        initMobileMenu();
        initSmoothScroll();
        initHeaderScrollEffect();
        
        console.log('Alle JavaScript-Funktionen wurden erfolgreich initialisiert.');
    } catch (error) {
        console.error('Fehler bei der Initialisierung der JavaScript-Funktionen:', error);
    }
}); 