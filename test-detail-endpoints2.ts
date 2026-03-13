import axios from 'axios';

async function testEndpoints() {
  const id = '42000006238'; // Gila, Hebat Banget si Putri
  const endpoints = [
    `/dramabox/chapter?id=${id}`,
    `/dramabox/chapter?bookId=${id}`,
    `/dramabox/chapterList?id=${id}`,
    `/dramabox/chapterList?bookId=${id}`,
    `/dramabox/playInfo?id=${id}`,
    `/dramabox/playInfo?bookId=${id}`,
    `/dramabox/videoInfo?id=${id}`,
    `/dramabox/videoInfo?bookId=${id}`,
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
