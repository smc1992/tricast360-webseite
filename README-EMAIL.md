# TRICAST360 E-Mail-System

## Übersicht
Das TRICAST360-Projekt verwendet jetzt ein eigenes SMTP-basierendes E-Mail-System für die Verarbeitung von Kontaktformularen. Alle Formulare senden automatisch formatierte HTML-E-Mails an info@tricast360.de.

## Setup

### 1. Abhängigkeiten installieren
```bash
npm install
```

### 2. SMTP-Konfiguration
Bearbeiten Sie die `.env`-Datei mit Ihren SMTP-Einstellungen:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@tricast360.de
SMTP_PASS=IHR_SMTP_PASSWORT_HIER
```

**Wichtige Hinweise:**
- Für Gmail: Aktivieren Sie "Weniger sichere Apps" oder verwenden Sie App-Passwörter
- Für andere Anbieter: Verwenden Sie die entsprechenden SMTP-Einstellungen
- Testen Sie die Verbindung zunächst

### 3. Server starten
```bash
# Nur Server starten
npm run server

# Oder Frontend + Backend gleichzeitig
npm run dev:full
```

Der Server läuft dann auf `http://localhost:3001`.

## E-Mail-Vorlage

Die HTML-E-Mail-Vorlage befindet sich in `email-templates/contact-inquiry.html` und enthält:
- **Professionelles Design** mit TRICAST360-Branding
- **Vollständige Anfrage-Details** (Unternehmen, Kontakt, Nachricht)
- **Sicherheitsinformationen** (IP-Adresse, Zeitstempel)
- **Responsive Layout** für alle E-Mail-Clients

## Verwendete Formulare

Alle folgenden Formulare verwenden das neue E-Mail-System:

1. **Kontakt-Seite**: Vollständiges Projekt-Anfrageformular
2. **Home-Seite**: Schnellkontakt-Modal
3. **About-Seite**: Kontakt-Modal
4. **Shop-Seite**: Shop-Kontaktformular
5. **System-Seite**: Technische Anfragen

## API-Endpunkt

```
POST http://localhost:3001/api/contact
Content-Type: application/json

{
  "company": "Firma GmbH",
  "contact_person": "Max Mustermann",
  "email": "max@example.com",
  "phone": "+49 123 456789",
  "additional_info": "Projektbeschreibung...",
  "privacy_consent": "on"
}
```

## Sicherheit

- **Rate Limiting**: Max. 5 Anfragen pro 15 Minuten pro IP
- **Datenschutz**: Checkbox für Datenschutz-Zustimmung erforderlich
- **Validierung**: Serverseitige Validierung aller Eingaben
- **Spam-Schutz**: Grundlegende Validierungsregeln

## Testen

1. Server starten: `npm run server`
2. Frontend starten: `npm run dev`
3. Formular ausfüllen und absenden
4. E-Mail sollte bei info@tricast360.de ankommen

## Fehlerbehebung

### SMTP-Verbindungsfehler
- Überprüfen Sie SMTP-Host, Port und Authentifizierung
- Testen Sie mit einem E-Mail-Client zuerst
- Gmail: App-Passwort anstatt normales Passwort verwenden

### E-Mails kommen nicht an
- Spam-Ordner überprüfen
- SMTP-Server-Konfiguration validieren
- Server-Logs auf Fehler prüfen

## Support

Bei Problemen:
1. Server-Logs überprüfen: `console.log` Ausgaben
2. SMTP-Konfiguration testen
3. E-Mail-Client mit denselben Einstellungen testen

---

**Entwickelt für TRICAST360® - Professionelle Baumschutz-Lösungen**
