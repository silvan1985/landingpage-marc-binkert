document.addEventListener('DOMContentLoaded', () => {
    // Kontakt Popup Funktionalität
    const contactTrigger = document.getElementById('contactTrigger');
    const contactPopup = document.getElementById('contactPopup');
    const contactPopupClose = document.getElementById('contactPopupClose');
    const contactForm = document.getElementById('contactForm');

    contactTrigger.addEventListener('click', () => {
        contactPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    contactPopupClose.addEventListener('click', () => {
        contactPopup.classList.remove('active');
        document.body.style.overflow = '';
    });

    contactPopup.addEventListener('click', (e) => {
        if (e.target === contactPopup) {
            contactPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Hier können Sie die Formularverarbeitung implementieren
        // Zum Beispiel: E-Mail-Versand oder API-Aufruf
        alert('Vielen Dank für Ihre Nachricht! Ich werde mich zeitnah bei Ihnen melden.');
        contactPopup.classList.remove('active');
        document.body.style.overflow = '';
        contactForm.reset();
    });

    // Mobile Menü Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Schließe mobiles Menü beim Klick auf einen Link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll für alle internen Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll-Effekt
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

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
    });
}); 