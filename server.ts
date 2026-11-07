import express from 'express';
import path from 'path';

const app = express();
const port = Number(process.env.PORT) || 3000;
const distPath = path.resolve(import.meta.dirname, 'dist');

// Enable compression / standard caching if desired
app.use(express.json());

// Serve static assets from dist
app.use(express.static(distPath));

// Also serve /public path alias if requested by legacy URLs
app.use('/public', express.static(distPath));
app.use('/assets', express.static(path.join(distPath, 'assets')));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Fallback to index.html for SPA client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`DAS Portfolio Server listening on 0.0.0.0:${port}`);
});
