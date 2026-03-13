import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import axios from 'axios';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Proxy route for magma-api
  app.get('/api/dramabox/*', async (req, res) => {
    try {
      const endpoint = req.originalUrl.replace('/api/dramabox', '/dramabox');
      const targetUrl = `https://magma-api.biz.id${endpoint}`;
      
      const response = await axios.get(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      res.json(response.data);
    } catch (error: any) {
      console.error(`Proxy error for ${req.originalUrl}:`, error.message);
      res.status(error.response?.status || 500).json({ 
        status: false, 
        error: error.message,
        data: [] 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
