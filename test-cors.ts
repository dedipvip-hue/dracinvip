import axios from 'axios';

async function testCors() {
  try {
    const res = await axios.options('https://magma-api.biz.id/dramabox/random');
    console.log('OPTIONS headers:', res.headers);
  } catch (e) {
    console.error('OPTIONS error:', e.message);
  }
  
  try {
    const res = await axios.get('https://magma-api.biz.id/dramabox/random');
    console.log('GET headers:', res.headers);
  } catch (e) {
    console.error('GET error:', e.message);
  }
}

testCors();
