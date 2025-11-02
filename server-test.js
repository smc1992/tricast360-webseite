const express = require('express');
const app = express();
const PORT = 4000; // Hardcoded für Test

console.log('🧪 Minimal Test Server starting...');

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    server: 'minimal-test'
  });
});

// Serve static files
app.use(express.static('out'));

// SPA fallback
app.get('*', (req, res) => {
  const path = require('path');
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Minimal Test Server running on port ${PORT}`);
  console.log('🌐 Health check: /api/health');
});
