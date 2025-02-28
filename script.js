/**
 * Marc Binkert Website - JavaScript
 * Optimierte Version mit verbesserter Fehlerbehandlung und Event-Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher Funktionalität
    const initThemeSwitcher = () => {
        const toggleSwitch = document.querySelector('#checkbox');
        const currentTheme = localStorage.getItem('theme');
        
        if (!toggleSwitch) {
            console.warn('Theme-Switch-Element nicht gefunden, Funktionalität wird übersprungen.');
            return;
        }
        
        // Prüfen, ob ein Theme gespeichert ist
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            
            if (currentTheme === 'dark') {
                toggleSwitch.checked = true;
            }
        }
        
        // Theme wechseln, wenn der Switch geklickt wird
        function switchTheme(e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                
                // Sanfte Übergangsanimation
                document.body.classList.add('theme-transition');
                setTimeout(() => {
                    document.body.classList.remove('theme-transition');
                }, 1000);
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                
                // Sanfte Übergangsanimation
                document.body.classList.add('theme-transition');
                setTimeout(() => {
                    document.body.classList.remove('theme-transition');
                }, 1000);
            }    
        }
        
        // Event Listener für den Switch
        toggleSwitch.addEventListener('change', switchTheme, false);
        
        // Füge eine Klasse für die Übergangsanimation hinzu
        document.body.classList.add('theme-ready');
    };

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

    // Scroll-Animationen für Therapiebereiche
    function initScrollAnimations() {
        try {
            const sections = document.querySelectorAll('.expertise-card, .service-card, .accordion-item');
            
            if (!sections.length) return;
            
            // Füge Klasse für CSS-Transition hinzu
            sections.forEach(section => {
                section.classList.add('fade-in-section');
            });
            
            // Beobachter für Scroll-Events
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // Optional: Beobachtung beenden, wenn Element sichtbar wurde
                        // observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 }); // Element wird sichtbar, wenn 15% im Viewport sind
            
            // Beobachte alle Elemente
            sections.forEach(section => {
                observer.observe(section);
            });
        } catch (error) {
            console.error('Fehler bei Scroll-Animationen:', error);
        }
    }

    // Stimmungsvisualisierung
    function initMoodVisualization() {
        try {
            const moodSlider = document.getElementById('moodSlider');
            const moodCanvas = document.getElementById('moodCanvas');
            
            if (!moodSlider || !moodCanvas) return;
            
            const ctx = moodCanvas.getContext('2d');
            let particles = [];
            
            // Erstelle Partikel
            function createParticles(mood) {
                particles = [];
                const particleCount = 50;
                
                for (let i = 0; i < particleCount; i++) {
                    // Farbe basierend auf Stimmung
                    let color;
                    if (mood < 4) {
                        color = `rgba(231, 76, 60, ${Math.random() * 0.7 + 0.3})`; // Rot für negative Stimmung
                    } else if (mood < 7) {
                        color = `rgba(249, 212, 35, ${Math.random() * 0.7 + 0.3})`; // Gelb für neutrale Stimmung
                    } else {
                        color = `rgba(76, 175, 80, ${Math.random() * 0.7 + 0.3})`; // Grün für positive Stimmung
                    }
                    
                    // Geschwindigkeit und Größe basierend auf Stimmung
                    const speed = mood / 10 * 2;
                    const size = Math.random() * (mood / 3) + 2;
                    
                    particles.push({
                        x: Math.random() * moodCanvas.width,
                        y: Math.random() * moodCanvas.height,
                        radius: size,
                        color: color,
                        speedX: (Math.random() - 0.5) * speed,
                        speedY: (Math.random() - 0.5) * speed,
                        opacity: Math.random() * 0.7 + 0.3
                    });
                }
            }
            
            // Animiere Partikel
            function animateParticles() {
                ctx.clearRect(0, 0, moodCanvas.width, moodCanvas.height);
                
                particles.forEach(particle => {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();
                    
                    // Bewege Partikel
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    // Prüfe Grenzen
                    if (particle.x < 0 || particle.x > moodCanvas.width) {
                        particle.speedX = -particle.speedX;
                    }
                    if (particle.y < 0 || particle.y > moodCanvas.height) {
                        particle.speedY = -particle.speedY;
                    }
                });
                
                requestAnimationFrame(animateParticles);
            }
            
            // Initialisiere mit aktuellem Wert
            createParticles(parseInt(moodSlider.value));
            animateParticles();
            
            // Event-Listener für Slider
            moodSlider.addEventListener('input', function() {
                createParticles(parseInt(this.value));
            });
        } catch (error) {
            console.error('Fehler bei Stimmungsvisualisierung:', error);
        }
    }

    // Verbesserte Parallax-Effekte
    function initParallaxEffects() {
        try {
            const parallaxSections = document.querySelectorAll('.parallax-bg');
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            if (!parallaxSections.length && !parallaxElements.length) return;
            
            // Funktion für sanften Parallax-Effekt
            function updateParallax() {
                // Hintergrund-Parallax
                parallaxSections.forEach(section => {
                    const scrollPosition = window.pageYOffset;
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    // Prüfe, ob Sektion im Viewport ist
                    if (scrollPosition + window.innerHeight > sectionTop && 
                        scrollPosition < sectionTop + sectionHeight) {
                        
                        const yPos = (scrollPosition - sectionTop) * 0.4;
                        section.style.backgroundPosition = `center ${yPos}px`;
                    }
                });
                
                // Element-Parallax
                parallaxElements.forEach(element => {
                    const scrollPosition = window.pageYOffset;
                    const elementTop = element.getBoundingClientRect().top + scrollPosition;
                    const elementHeight = element.offsetHeight;
                    const windowHeight = window.innerHeight;
                    
                    // Prüfe, ob Element im Viewport ist
                    if (scrollPosition + windowHeight > elementTop && 
                        scrollPosition < elementTop + elementHeight) {
                        
                        const speed = element.getAttribute('data-speed') || 0.1;
                        const yPos = (scrollPosition - elementTop) * speed;
                        
                        // Sanfte Transformation mit requestAnimationFrame
                        requestAnimationFrame(() => {
                            element.style.transform = `translateY(${yPos}px)`;
                        });
                    }
                });
            }
            
            // Initialer Aufruf
            updateParallax();
            
            // Event-Listener für Scroll
            window.addEventListener('scroll', debounce(updateParallax, 10));
            
            // Event-Listener für Resize
            window.addEventListener('resize', debounce(updateParallax, 100));
        } catch (error) {
            console.error('Fehler bei Parallax-Effekten:', error);
        }
    }

    // Accordion Funktionalität für FAQ-Bereich
    function initAccordion() {
        try {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            
            if (!accordionHeaders.length) {
                console.warn('Keine Accordion-Elemente gefunden, Funktionalität wird übersprungen.');
                return;
            }
            
            accordionHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    // Toggle active class für Header
                    this.classList.toggle('active');
                    
                    // Finde zugehörigen Content
                    const content = this.nextElementSibling;
                    if (!content || !content.classList.contains('accordion-content')) {
                        console.warn('Accordion-Content nicht gefunden');
                        return;
                    }
                    
                    // Toggle active class für Content
                    content.classList.toggle('active');
                    
                    // ARIA-Attribute für Barrierefreiheit aktualisieren
                    const isExpanded = content.classList.contains('active');
                    this.setAttribute('aria-expanded', isExpanded);
                    content.setAttribute('aria-hidden', !isExpanded);
                });
            });
            
            // Optional: Erstes Accordion-Element standardmäßig öffnen
            // if (accordionHeaders.length > 0) {
            //     accordionHeaders[0].click();
            // }
        } catch (error) {
            console.error('Fehler bei Accordion-Funktionalität:', error);
        }
    }

    // Initialisiere alle Funktionen
    try {
        initThemeSwitcher();
        initContactPopup();
        initMobileMenu();
        initSmoothScroll();
        initHeaderScrollEffect();
        initScrollAnimations();
        initMoodVisualization();
        initParallaxEffects();
        initAccordion();
        
        console.log('Alle JavaScript-Funktionen wurden erfolgreich initialisiert.');
    } catch (error) {
        console.error('Fehler bei der Initialisierung der JavaScript-Funktionen:', error);
    }
}); 