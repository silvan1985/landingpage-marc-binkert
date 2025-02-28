# Technische Dokumentation: Marc Binkert Psychotherapie-Webseite

## Überblick

Die Webseite ist eine moderne, responsive One-Page-Landingpage für einen Psychotherapeuten. Sie verwendet HTML5, CSS3 und JavaScript mit einem Fokus auf Benutzerfreundlichkeit, Ästhetik und Zugänglichkeit. Die Seite verfügt über einen Dark Mode, Parallax-Effekte und interaktive Elemente.

## Technische Grundstruktur

### HTML-Struktur
- Verwendung von semantischem HTML5 (`section`, `header`, `footer`, `main`, etc.)
- Responsive Meta-Tags für mobile Optimierung
- Umfangreiche Meta-Tags für SEO und Social Media Sharing
- Einbindung von Google Fonts (Inter)
- Barrierefreiheit durch ARIA-Attribute

### CSS-Architektur
- CSS-Variablen (Custom Properties) für konsistentes Theming
- Flexbox und CSS Grid für das Layout
- Media Queries für Responsive Design
- Dark Mode mit `data-theme`-Attribut
- Smooth Transitions und Animationen

### JavaScript-Funktionalitäten
- Parallax-Scrolling-Effekte
- Theme-Switcher (Light/Dark Mode)
- Interaktive Elemente (Accordion, Kontakt-Popup)
- Stimmungsvisualisierung mit Canvas

## Komponenten und Sektionen

### 1. Header
- Fixierte Navigation mit Logo
- Responsive Menü mit Hamburger-Icon für mobile Geräte
- Theme-Switcher (Sonne/Mond-Icons)
- Smooth-Scroll zu Sektionen

### 2. Hero-Sektion
- Großes Profilbild mit Parallax-Effekt
- Headline und Subheadline
- Call-to-Action Button

### 3. Inhalts-Sektionen
Jede Sektion folgt einem konsistenten Muster:
- Überschrift mit dekorativem Unterstrich
- Einleitender Text, oft als hervorgehobenes Zitat
- Inhaltselemente (Listen, Karten, etc.)
- Visuelles Element (Bild, Icon, etc.)

#### Spezifische Sektionen:
- **Warum-Sektion**: Parallax-Hintergrund, hervorgehobene Zitate
- **Wie-Sektion**: Feature-Grid mit Icons
- **Angebots-Sektion**: Service-Karten im Grid-Layout
- **Über-mich-Sektion**: Bild und Text mit Parallax-Effekt
- **Ziele-Sektion**: Interaktiver Stimmungs-Slider mit Canvas-Visualisierung
- **Expertise-Sektion**: Karten-Grid mit Hover-Effekten
- **Zielgruppen-Sektion**: Responsive Grid (4 Spalten auf Desktop, 2 auf Tablet, 1 auf Mobil)
- **Ansatz-Sektion**: Hervorgehobene Zitate und Listen
- **FAQ-Sektion**: Accordion-Komponente mit JavaScript-Interaktion

### 4. Kontakt-Sektion
- Zwei-Spalten-Layout (Kontaktinfo und Google Maps Embed)
- Responsive Design für verschiedene Bildschirmgrößen

### 5. Kontakt-Popup
- Schwebendes Kontakt-Icon
- Modal-Popup mit Formular
- Formularvalidierung

### 6. Footer
- Mehrspaltiges Grid-Layout
- Logo und Kurzbeschreibung
- Navigationslisten
- Kontaktinformationen
- Notfall-Informationsbox
- Vertrauensabzeichen
- Copyright und rechtliche Links
- Soziale Medien-Icons
- Haftungsausschluss

## CSS-Variablen und Theming

### Farbschema
- **Light Mode**:
  - Primärfarben: Blautöne (`--primary-blue`, `--secondary-blue`, etc.)
  - Hintergrundfarben: Weiß und helles Blau
  - Textfarben: Dunkelgrau und Mittelgrau

- **Dark Mode**:
  - Primärfarben: Grüntöne (`--dark-green`, `--medium-green`, etc.)
  - Hintergrundfarben: Dunkle Grüntöne
  - Textfarben: Helles Grau und Weiß

### Typografie
- Hauptschriftart: 'Inter', sans-serif
- Hierarchie durch Größen und Gewichte
- Konsistente Zeilenabstände

### Abstände und Layout
- Konsistente Abstände durch CSS-Variablen (`--space-sm`, `--space-md`, etc.)
- Container mit maximaler Breite und automatischen Rändern
- Responsive Anpassungen durch Media Queries

## Interaktive Elemente

### Hover-Effekte
- Subtile Transformationen (Skalierung, Translation)
- Farbübergänge
- Box-Shadow-Änderungen

### Animationen
- Smooth Transitions für Theme-Wechsel
- Parallax-Scrolling-Effekte
- Accordion-Öffnen/Schließen
- Modal-Popup-Animation

### JavaScript-Interaktionen
- Theme-Switcher-Funktionalität
- Accordion-Toggle für FAQ
- Kontakt-Popup-Öffnen/Schließen
- Stimmungs-Slider mit Canvas-Visualisierung
- Mobile Menü-Toggle

## Responsive Design-Strategien

### Breakpoints
- Desktop: > 1024px (4-Spalten-Grid)
- Tablet: 768px - 1024px (2-Spalten-Grid)
- Mobil: < 768px (1-Spalte-Grid)

### Mobile-Anpassungen
- Hamburger-Menü statt horizontaler Navigation
- Reduzierte Paddings und Margins
- Stapeln von Grid-Elementen
- Anpassung der Schriftgrößen
- Vereinfachte Hover-Effekte

## Barrierefreiheit

- Semantische HTML-Struktur
- ARIA-Attribute für interaktive Elemente
- Ausreichende Farbkontraste
- Fokus-Stile für Tastaturnavigation
- Alt-Texte für Bilder

## Performance-Optimierungen

- Lazy-Loading für Bilder
- CSS-Transitions statt JavaScript-Animationen wo möglich
- Optimierte Schrifteinbindung
- Effiziente CSS-Selektoren

## Zusammenfassung der Schlüsseltechnologien

1. **HTML5** für semantische Struktur
2. **CSS3** mit Custom Properties für Theming
3. **CSS Grid und Flexbox** für responsive Layouts
4. **JavaScript** für interaktive Elemente
5. **Media Queries** für Responsive Design
6. **CSS-Transitions und Animationen** für visuelle Effekte
7. **Canvas API** für die Stimmungsvisualisierung
8. **Google Maps Embed** für die Standortanzeige

Diese Dokumentation bietet eine umfassende Übersicht über die technische Struktur und kann als Grundlage für einen Prompt zum Nachbau einer ähnlichen Webseite dienen, ohne den spezifischen Inhalt zu kopieren. 