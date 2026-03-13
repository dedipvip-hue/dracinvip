import axios from 'axios';

async function test() {
  try {
    const res = await axios.get('https://magma-api.biz.id/dramabox/trending', {
      headers: { 'Origin': 'https://example.com' }
    });
    console.log('Status:', res.status);
    console.log('CORS Headers:', {
      'access-control-allow-origin': res.headers['access-control-allow-origin'],
    });
  } catch (e) {
    console.error('Error:', e.message);
  }
}
test();
