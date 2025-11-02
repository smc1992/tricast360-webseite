const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

console.log('🚀 Starting TRICAST360 Server...');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Port:', PORT);

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    port: PORT
  });
});

// Serve static files
app.use(express.static('out'));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(require('path').join(__dirname, 'out', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ TRICAST360 Server running on port ${PORT}`);
});
