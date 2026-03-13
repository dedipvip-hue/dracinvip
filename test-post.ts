import axios from 'axios';

async function testPost() {
  const id = '42000006238';
  const endpoints = [
    '/dramabox/detail',
    '/dramabox/play',
    '/dramabox/video',
    '/dramabox/episodes',
    '/dramabox/chapterList'
  ];

  for (const ep of endpoints) {
    try {
      const res = await axios.post(`https://magma-api.biz.id${ep}`, { id, bookId: id });
      console.log(`Success POST ${ep}:`, res.status);
    } catch (e) {
      console.log(`Failed POST ${ep}:`, e.response?.status || e.message);
    }
  }
}

testPost();
