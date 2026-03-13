import axios from 'axios';

async function testEndpoints() {
  const endpoints = [
    '/dramabox/trending',
    '/dramabox/latest',
    '/dramabox/vip',
    '/dramabox/foryou',
    '/dramabox/random'
  ];

  for (const ep of endpoints) {
    try {
      console.log(`Testing ${ep}...`);
      const res = await axios.get(`https://magma-api.biz.id${ep}`);
      console.log(`Success ${ep}:`, res.status, res.data.status, res.data.data?.length || res.data.result?.length);
    } catch (e) {
      console.error(`Error ${ep}:`, e.message);
    }
  }
}

testEndpoints();
