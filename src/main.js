document.addEventListener('DOMContentLoaded', () => {
    const panes = document.querySelectorAll('.pane');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');
    const contentData = JSON.parse(document.getElementById('content-data').textContent);

    // New Feature Controls
    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');

    // Language Detection: Default to German if system is German, else English
    const userLang = navigator.language || navigator.userLanguage;
    let currentLang = userLang.startsWith('de') ? 'de' : 'en';

    let isLightMode = false;

    const translations = {
        en: {
            "header.title": "Protect Art.",
            "header.subtitle": "A United Creatives Movement.",
            "protect.title": "Protect Art.",
            "protect.desc": "Art is not content. It is intellectual property.",
            "see.title": "See your art.",
            "see.desc": "Know where your work lives.",
            "gallery.title": "Gallery.",
            "gallery.desc": "Shown. Credited. Respected.",
            "movement.title": "The movement.",
            "movement.desc": "Protect art. Together.",
            "community.title": "Community.",
            "community.desc": "Creators uniting for clearer standards.",
            "how.title": "How it works.",
            "how.desc": "One time. That's it.",
            "news.title": "News.",
            "news.desc": "Momentum in motion.",
            "why.title": "Why art.",
            "why.desc": "Because credit matters."
        },
        de: {
            "header.title": "Protect Art.",
            "header.subtitle": "A United Creatives Movement.",
            "protect.title": "Protect Art.",
            "protect.desc": "Kunst ist kein Content. Sie ist geistiges Eigentum.",
            "see.title": "Sieh deine Kunst.",
            "see.desc": "Wisse, wo deine Arbeit lebt.",
            "gallery.title": "Galerie.",
            "gallery.desc": "Gezeigt. Genannt. Respektiert.",
            "movement.title": "Die Bewegung.",
            "movement.desc": "Kunst schützen. Zusammen.",
            "community.title": "Community.",
            "community.desc": "Kreative vereint für klare Standards.",
            "how.title": "So funktioniert's.",
            "how.desc": "Einmalig. Das war's.",
            "news.title": "Neuigkeiten.",
            "news.desc": "Dynamik in Bewegung.",
            "why.title": "Warum Kunst.",
            "why.desc": "Weil Anerkennung zählt."
        }
    };

    // Also Translation for Modal Content (Simple mapping for demo)
    // In a real app, this might be fetched or structured differently
    const modalTranslations = {
        en: contentData,
        de: {
            "protect": {
                "title": "Kunst schützen.",
                "content": "<p><strong>Kunst ist kein Content. Sie ist geistiges Eigentum.</strong></p><p>United Creatives wurde auf einem einfachen Prinzip aufgebaut: Wenn kreative Arbeit Wert generiert, muss sie geschützt, dokumentiert und ordnungsgemäß lizenziert werden.</p><p>Wir bieten Kreativen die Infrastruktur, um Missbrauch zu verhindern.</p><p>Schutz ist nicht reaktionär.<br>Schutz ist strukturell.</p>"
            },
            "see": {
                "title": "Sieh deine Kunst.",
                "content": "<p><strong>Wenn du nicht siehst, wo deine Arbeit genutzt wird, kannst du sie nicht kontrollieren.</strong></p><p>United Creatives bietet strukturierte Sichtbarkeit durch Überwachungsmechanismen.</p><p>Das ist entscheidend.</p><p>Denn bei der Rechtsdurchsetzung ist Dokumentation das Druckmittel.</p>"
            },
            "gallery": {
                "title": "Galerie.",
                "content": "<p><strong>Ein Portfolio zeigt deine Arbeit.<br>Eine Galerie innerhalb von United Creatives schützt sie.</strong></p><p>Jedes hochgeladene Kunstwerk kann mit definierten Lizenztypen und Nutzungsumfängen verbunden werden.</p><p>Professionelle Kreative versenden keine Dateien.<br>Sie gewähren Rechte unter definierten Bedingungen.</p>"
            },
            "movement": {
                "title": "Die Bewegung.",
                "content": "<p>Die Kreativwirtschaft hat unlizenzierte Nutzung zu lange normalisiert.</p><p>United Creatives existiert als Teil eines breiteren Wandels — einer Bewegung hin zu strukturiertem Respekt.</p><p>Schütze Kunst. Zusammen.</p>"
            },
            "community": {
                "title": "Community.",
                "content": "<p><strong>Rechtsschutz ist nicht nur legal. Er ist kollektiv.</strong></p><p>Innerhalb der Community erhalten Mitglieder Zugang zu Best Practices für Lizensierung und Preisstrategien.</p><p>Wir glauben, Wissen reduziert Zögern.<br>Struktur reduziert Angst.</p>"
            },
            "how": {
                "title": "So funktioniert's.",
                "content": "<p><strong>Ein System. Kompletter Workflow.</strong></p><h3>1. Hochladen & Strukturieren</h3><p>Lade deine Kunst hoch und definiere Nutzungsparameter.</p><h3>2. Rechte definieren</h3><p>Wähle Lizenztyp, Dauer, Region.</p><h3>3. Vertrag generieren</h3><p>Das System erstellt eine rechtlich strukturierte Vereinbarung.</p><h3>4. Überwachen & Durchsetzen</h3><p>Wenn unbefugte Nutzung erkannt wird: Dokumentieren und Durchsetzen.</p>"
            },
            "news": {
                "title": "Neuigkeiten.",
                "content": "<p><strong>Kreativer Schutz entwickelt sich schnell.</strong></p><p>United Creatives verfolgt Entwicklungen und übersetzt sie in umsetzbare Updates.</p><p>Transparenz schafft Vertrauen.</p>"
            },
            "why": {
                "title": "Warum Kunst.",
                "content": "<p><strong>Weil Anerkennung nicht optional ist.</strong></p><p>Kunst formt Kultur. Sie informiert Journalismus. Sie verkauft Produkte.</p><p>United Creatives stellt die Sichtbarkeit durch strukturierte Lizensierung wieder her.</p><p>Kunst verdient Bewunderung.<br>Kreative verdienen Kontrolle.</p>"
            }
        }
    };

    function updateTexts() {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });

        langToggle.textContent = currentLang === 'en' ? 'DE' : 'EN';
    }

    function toggleTheme() {
        isLightMode = !isLightMode;
        document.body.classList.toggle('light-mode', isLightMode);
        themeToggle.textContent = isLightMode ? '☾' : '☀';
    }

    // Initial text update based on detected language
    updateTexts();

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'de' : 'en';
        updateTexts();
    });

    themeToggle.addEventListener('click', toggleTheme);

    function openModal(id) {
        // Use the correct language data for the modal
        const data = modalTranslations[currentLang][id];
        if (!data) return;

        modalBody.innerHTML = `
            <h2>${data.title}</h2>
            ${data.content}
        `;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    panes.forEach(pane => {
        pane.addEventListener('click', () => {
            const id = pane.getAttribute('data-id');
            openModal(id);
        });
    });

    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});
