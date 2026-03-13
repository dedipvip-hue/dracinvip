import axios from 'axios';

async function testEndpoints() {
  const id = '42000006238'; // Gila, Hebat Banget si Putri
  const endpoints = [
    `/dramabox/detail?id=${id}`,
    `/dramabox/detail?bookId=${id}`,
    `/dramabox/info?id=${id}`,
    `/dramabox/info?bookId=${id}`,
    `/dramabox/play?id=${id}`,
    `/dramabox/play?bookId=${id}`,
    `/dramabox/video?id=${id}`,
    `/dramabox/video?bookId=${id}`,
    `/dramabox/episodes?id=${id}`,
    `/dramabox/episodes?bookId=${id}`,
  ];

  for (const ep of endpoints) {
    try {
      const res = await axios.get(`https://magma-api.biz.id${ep}`);
      console.log(`Success ${ep}:`, res.status, Object.keys(res.data));
      if (res.data.data) {
          console.log('Data keys:', Object.keys(res.data.data));
      }
    } catch (e) {
      console.log(`Failed ${ep}:`, e.response?.status || e.message);
    }
  }
}

testEndpoints();
