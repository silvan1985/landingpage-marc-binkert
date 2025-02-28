/**
 * Marc Binkert Website - Animationen und Effekte
 * Optimierte Version mit verbesserter Performance und Fehlerbehandlung
 */

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Hilfsfunktionen
     */
    
    // Sichere Element-Selektoren
    const safeSelect = (selector, parent = document) => {
        try {
            return parent.querySelector(selector);
        } catch (error) {
            console.error(`Fehler beim Abrufen des Elements mit Selektor ${selector}:`, error);
            return null;
        }
    };
    
    const safeSelectAll = (selector, parent = document) => {
        try {
            return parent.querySelectorAll(selector);
        } catch (error) {
            console.error(`Fehler beim Abrufen der Elemente mit Selektor ${selector}:`, error);
            return [];
        }
    };
    
    // Debounce-Funktion für Performance-Optimierung bei Scroll-Events
    const debounce = (func, wait = 10) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    };
    
    // Prüfen, ob ein Element im Viewport ist
    const isInViewport = (element, offset = 0) => {
        if (!element) return false;
        
        try {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
                rect.bottom >= 0 + offset
            );
        } catch (error) {
            console.error('Fehler bei der Viewport-Prüfung:', error);
            return false;
        }
    };
    
    /**
     * Parallax-Effekte
     */
    const initParallaxEffects = () => {
        try {
            // Elemente, die den Parallax-Effekt erhalten sollen
            const parallaxElements = safeSelectAll('.parallax-element');
            const heroSection = safeSelect('.hero-section');
            const aboutSection = safeSelect('.about-section');
            const expertiseSection = safeSelect('.expertise-section');
            
            // Optimierter Scroll-Handler mit Debounce
            const handleScroll = debounce(() => {
                const scrollPosition = window.pageYOffset;
                
                // Subtiler Parallax-Effekt für den Hero-Hintergrund
                if (heroSection) {
                    const speed = 0.15; // Sehr subtil
                    const yPos = -(scrollPosition * speed);
                    heroSection.style.backgroundPositionY = `calc(bottom + ${yPos}px)`;
                }
                
                // Parallax-Effekt für Elemente mit der Klasse 'parallax-element'
                parallaxElements.forEach(element => {
                    if (isInViewport(element, 150)) {
                        const elementTop = element.getBoundingClientRect().top;
                        const elementVisible = 150;
                        const distance = elementTop - window.innerHeight + elementVisible;
                        const speed = parseFloat(element.dataset.speed) || 0.1;
                        
                        element.style.transform = `translateY(${distance * speed}px)`;
                    }
                });
                
                // Subtiler Zoom-Effekt für About-Bild
                if (aboutSection) {
                    const aboutImage = safeSelect('.about-image', aboutSection);
                    if (aboutImage && isInViewport(aboutSection)) {
                        const aboutTop = aboutSection.getBoundingClientRect().top;
                        const aboutVisible = window.innerHeight;
                        
                        const scale = 1 + Math.max(0, (aboutVisible - Math.abs(aboutTop)) / aboutVisible * 0.05);
                        aboutImage.style.transform = `scale(${scale})`;
                    }
                }
                
                // Subtiler Fade-Effekt für Expertise-Karten
                if (expertiseSection && isInViewport(expertiseSection, 100)) {
                    const cards = safeSelectAll('.expertise-card', expertiseSection);
                    cards.forEach((card, index) => {
                        if (isInViewport(card, 100)) {
                            // Verzögerter Einblendeffekt mit RAF für bessere Performance
                            requestAnimationFrame(() => {
                                setTimeout(() => {
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, index * 100);
                            });
                        }
                    });
                }
            }, 10);
            
            // Event-Listener für Scroll mit Fehlerbehandlung
            window.addEventListener('scroll', () => {
                try {
                    handleScroll();
                } catch (error) {
                    console.error('Fehler beim Scroll-Event:', error);
                }
            });
            
            // Sanfter Parallax-Effekt bei Mausbewegung für Hero-Sektion
            if (heroSection) {
                const handleMouseMove = debounce((e) => {
                    try {
                        const mouseX = e.clientX / window.innerWidth;
                        const mouseY = e.clientY / window.innerHeight;
                        const moveX = (mouseX - 0.5) * 10; // Sehr subtile Bewegung
                        const moveY = (mouseY - 0.5) * 10; // Sehr subtile Bewegung
                        
                        // Subtile Bewegung des Hintergrunds
                        heroSection.style.backgroundPositionX = `calc(center + ${moveX}px)`;
                        
                        // Subtile Bewegung des Inhalts in die entgegengesetzte Richtung
                        const heroContent = safeSelect('.hero-content', heroSection);
                        if (heroContent) {
                            heroContent.style.transform = `translate(${-moveX/3}px, ${-moveY/3}px)`;
                        }
                    } catch (error) {
                        console.error('Fehler beim Mouse-Move-Event:', error);
                    }
                }, 5);
                
                heroSection.addEventListener('mousemove', handleMouseMove);
            }
            
            // Initialer Aufruf, um Effekte sofort anzuwenden
            handleScroll();
            
        } catch (error) {
            console.error('Fehler bei der Initialisierung der Parallax-Effekte:', error);
        }
    };
    
    /**
     * Accordion-Funktionalität für FAQ-Bereich
     */
    const initAccordion = () => {
        try {
            const accordionHeaders = safeSelectAll('.accordion-header');
            
            if (accordionHeaders.length === 0) {
                return;
            }
            
            accordionHeaders.forEach(header => {
                header.addEventListener('click', function(e) {
                    try {
                        e.preventDefault();
                        
                        // Toggle active class für den Header
                        this.classList.toggle('active');
                        
                        // Finde den zugehörigen Content
                        const content = this.nextElementSibling;
                        if (!content) return;
                        
                        // Toggle active class für den Content
                        content.classList.toggle('active');
                        
                        // Ändere das Icon
                        const icon = safeSelect('.accordion-icon', this);
                        if (icon) {
                            icon.textContent = this.classList.contains('active') ? '−' : '+';
                        }
                        
                        // Schließe alle anderen Accordion-Items (optional für Single-Toggle-Verhalten)
                        if (this.classList.contains('active')) {
                            accordionHeaders.forEach(otherHeader => {
                                if (otherHeader !== this) {
                                    otherHeader.classList.remove('active');
                                    
                                    const otherContent = otherHeader.nextElementSibling;
                                    if (otherContent) {
                                        otherContent.classList.remove('active');
                                    }
                                    
                                    const otherIcon = safeSelect('.accordion-icon', otherHeader);
                                    if (otherIcon) {
                                        otherIcon.textContent = '+';
                                    }
                                }
                            });
                        }
                        
                        // Scrolle zum aktiven Accordion-Item, wenn es nicht vollständig sichtbar ist
                        if (this.classList.contains('active')) {
                            const headerRect = this.getBoundingClientRect();
                            if (headerRect.top < 0 || headerRect.bottom > window.innerHeight) {
                                const offset = 100; // Abstand zum oberen Rand
                                const targetPosition = window.pageYOffset + headerRect.top - offset;
                                
                                window.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth'
                                });
                            }
                        }
                    } catch (error) {
                        console.error('Fehler beim Accordion-Click:', error);
                    }
                });
            });
            
            // Öffne das erste Accordion-Item standardmäßig (optional)
            // if (accordionHeaders.length > 0) {
            //     accordionHeaders[0].click();
            // }
            
        } catch (error) {
            console.error('Fehler bei der Initialisierung des Accordions:', error);
        }
    };
    
    /**
     * Expertise-Karten Animation
     */
    const initExpertiseCards = () => {
        try {
            const expertiseCards = safeSelectAll('.expertise-card');
            
            if (expertiseCards.length === 0) {
                return;
            }
            
            const checkVisibility = debounce(() => {
                expertiseCards.forEach((card, index) => {
                    if (isInViewport(card, window.innerHeight * 0.1)) {
                        // Verzögerte Animation für gestaffeltes Erscheinen
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            }, 50);
            
            // Initiale Prüfung und bei Scroll
            checkVisibility();
            window.addEventListener('scroll', checkVisibility);
            
        } catch (error) {
            console.error('Fehler bei der Initialisierung der Expertise-Karten:', error);
        }
    };
    
    // Initialisiere alle Funktionen
    try {
        initParallaxEffects();
        initAccordion();
        initExpertiseCards();
        
        console.log('Alle Animation-Funktionen wurden erfolgreich initialisiert.');
    } catch (error) {
        console.error('Fehler bei der Initialisierung der Animation-Funktionen:', error);
    }
});

// Smooth Scroll für Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Header-Höhe berücksichtigen
                    behavior: 'smooth'
                });
            }
        });
    });
}); 