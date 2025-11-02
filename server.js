const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Zu viele Anfragen von dieser IP-Adresse. Bitte versuchen Sie es später erneut.'
});
app.use('/api/contact', limiter);

// SMTP Transporter konfigurieren
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// E-Mail-Template laden
function loadEmailTemplate(templateName, data) {
  const templatePath = path.join(__dirname, 'email-templates', `${templateName}.html`);
  let template = fs.readFileSync(templatePath, 'utf8');

  // Platzhalter ersetzen
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    template = template.replace(regex, data[key]);
  });

  return template;
}

// Kontakt-Formular verarbeiten
app.post('/api/contact', async (req, res) => {
  try {
    const {
      company,
      contact_person,
      email,
      phone,
      additional_info,
      privacy_consent,
      vorname,
      nachname,
      unternehmen,
      nachricht
    } = req.body;

    // Validierung
    if (!privacy_consent) {
      return res.status(400).json({
        success: false,
        message: 'Datenschutz-Zustimmung erforderlich'
      });
    }

    // Bestimme Formular-Typ
    const isProjectInquiry = company || contact_person || additional_info;
    const formType = isProjectInquiry ? 'Projekt-Anfrage' : 'Allgemeine Anfrage';

    // E-Mail-Daten vorbereiten
    const emailData = {
      FORM_TYPE: formType,
      COMPANY: company || unternehmen || 'Nicht angegeben',
      CONTACT_PERSON: contact_person || `${vorname || ''} ${nachname || ''}`.trim() || 'Nicht angegeben',
      EMAIL: email,
      PHONE: phone || 'Nicht angegeben',
      MESSAGE: additional_info || nachricht || 'Keine Nachricht',
      DATE: new Date().toLocaleString('de-DE'),
      IP_ADDRESS: req.ip || req.connection.remoteAddress || 'Unbekannt',
      YEAR: new Date().getFullYear()
    };

    // HTML-E-Mail generieren
    const htmlContent = loadEmailTemplate('contact-inquiry', emailData);

    // E-Mail-Optionen
    const mailOptions = {
      from: `"TRICAST360 Website" <${process.env.SMTP_USER}>`,
      to: 'info@tricast360.de',
      subject: `Neue ${formType} - TRICAST360 Website`,
      html: htmlContent,
      replyTo: email
    };

    // E-Mail senden
    const info = await transporter.sendMail(mailOptions);

    console.log('E-Mail erfolgreich gesendet:', info.messageId);

    res.json({
      success: true,
      message: 'Ihre Anfrage wurde erfolgreich gesendet!'
    });

  } catch (error) {
    console.error('E-Mail-Versand fehlgeschlagen:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Server starten
app.listen(PORT, () => {
  console.log(`TRICAST360 E-Mail-Server läuft auf Port ${PORT}`);
  console.log('SMTP-Konfiguration:', {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    user: process.env.SMTP_USER ? 'Konfiguriert' : 'Nicht konfiguriert'
  });
});
