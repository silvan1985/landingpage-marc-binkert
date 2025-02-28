// Parallax-Effekt für Premium-Webseiten
document.addEventListener('DOMContentLoaded', function() {
    // Elemente, die den Parallax-Effekt erhalten sollen
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const heroSection = document.querySelector('.hero-section');
    const aboutSection = document.querySelector('.about-section');
    const expertiseSection = document.querySelector('.expertise-section');
    
    // Sanfter Parallax-Effekt beim Scrollen
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Subtiler Parallax-Effekt für den Hero-Hintergrund
        if (heroSection) {
            const speed = 0.15; // Sehr subtil
            const yPos = -(scrollPosition * speed);
            heroSection.style.backgroundPositionY = `calc(bottom + ${yPos}px)`;
        }
        
        // Parallax-Effekt für Elemente mit der Klasse 'parallax-element'
        parallaxElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            const distance = elementTop - window.innerHeight + elementVisible;
            const speed = element.dataset.speed || 0.1;
            
            if (elementTop < window.innerHeight && elementTop > -element.offsetHeight) {
                element.style.transform = `translateY(${distance * speed}px)`;
            }
        });
        
        // Subtiler Zoom-Effekt für About-Bild
        if (aboutSection) {
            const aboutImage = aboutSection.querySelector('.about-image');
            if (aboutImage) {
                const aboutTop = aboutSection.getBoundingClientRect().top;
                const aboutVisible = window.innerHeight;
                
                if (aboutTop < aboutVisible && aboutTop > -aboutSection.offsetHeight) {
                    const scale = 1 + Math.max(0, (aboutVisible - Math.abs(aboutTop)) / aboutVisible * 0.05);
                    aboutImage.style.transform = `scale(${scale})`;
                }
            }
        }
        
        // Subtiler Fade-Effekt für Expertise-Karten
        if (expertiseSection) {
            const cards = expertiseSection.querySelectorAll('.expertise-card');
            cards.forEach((card, index) => {
                const cardTop = card.getBoundingClientRect().top;
                const cardVisible = window.innerHeight - 100;
                
                if (cardTop < cardVisible) {
                    // Verzögerter Einblendeffekt
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }
    });
    
    // Sanfter Parallax-Effekt bei Mausbewegung für Hero-Sektion
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            const moveX = (mouseX - 0.5) * 10; // Sehr subtile Bewegung
            const moveY = (mouseY - 0.5) * 10; // Sehr subtile Bewegung
            
            // Subtile Bewegung des Hintergrunds
            heroSection.style.backgroundPositionX = `calc(center + ${moveX}px)`;
            
            // Subtile Bewegung des Inhalts in die entgegengesetzte Richtung
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translate(${-moveX/3}px, ${-moveY/3}px)`;
            }
        });
    }
    
    // Initialer Aufruf, um Effekte sofort anzuwenden
    window.dispatchEvent(new Event('scroll'));
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