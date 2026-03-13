import axios from 'axios';

async function checkVideoPath() {
  try {
    const endpoints = ['/dramabox/foryou', '/dramabox/vip', '/dramabox/random'];
    
    for (const ep of endpoints) {
      const res = await axios.get(`https://magma-api.biz.id${ep}`);
      const item = res.data.data?.[0] || res.data.result?.[0];
      console.log(`\n--- ${ep} ---`);
      console.log('videoPath:', item?.videoPath ? 'YES' : 'NO');
      if (item?.videoPath) {
          console.log(item.videoPath);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

checkVideoPath();
