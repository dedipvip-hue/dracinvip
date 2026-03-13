import http from 'http';
import https from 'https';

https.get('https://magma-api.biz.id/dramabox/trending', {
  headers: {
    'Origin': 'https://example.com'
  }
}, (res) => {
  console.log('CORS headers:', {
    'access-control-allow-origin': res.headers['access-control-allow-origin'],
    'access-control-allow-methods': res.headers['access-control-allow-methods']
  });
});
