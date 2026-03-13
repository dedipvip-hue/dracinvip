import axios from 'axios';

async function testEndpoints() {
  const id = '42000006238'; // Gila, Hebat Banget si Putri
  const endpoints = [
    `/dramabox/chapters?id=${id}`,
    `/dramabox/chapters?bookId=${id}`,
    `/dramabox/getDetail?id=${id}`,
    `/dramabox/getDetail?bookId=${id}`,
    `/dramabox/book?id=${id}`,
    `/dramabox/book?bookId=${id}`,
  ];

  for (const ep of endpoints) {
    try {
      const res = await axios.get(`https://magma-api.biz.id${ep}`);
      console.log(`Success ${ep}:`, res.status, Object.keys(res.data));
    } catch (e) {
      console.log(`Failed ${ep}:`, e.response?.status || e.message);
    }
  }
}

testEndpoints();
