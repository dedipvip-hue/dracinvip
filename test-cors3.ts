import axios from 'axios';

async function test() {
  try {
    const res = await axios.get('https://magma-api.biz.id/dramabox/trending', {
      headers: { 
        'Origin': 'https://example.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    console.log('With UA Status:', res.status);
    
    const res2 = await axios.get('https://magma-api.biz.id/dramabox/trending', {
      headers: { 
        'Origin': 'https://example.com',
        // No UA
      }
    });
    console.log('Without UA Status:', res2.status);
  } catch (e) {
    console.error('Error:', e.message);
  }
}
test();
