import axios from 'axios';

async function checkVideoPath() {
  try {
    const res = await axios.get('https://magma-api.biz.id/dramabox/trending');
    const item = res.data.data?.[0] || res.data.result?.[0];
    console.log('Keys in trending item:', Object.keys(item));
    console.log('videoPath:', item.videoPath);
    
    const searchRes = await axios.get('https://magma-api.biz.id/dramabox/search?query=Gila');
    const searchItem = searchRes.data.data?.[0] || searchRes.data.result?.[0];
    console.log('Keys in search item:', Object.keys(searchItem || {}));
    console.log('search videoPath:', searchItem?.videoPath);
  } catch (e) {
    console.error(e);
  }
}

checkVideoPath();
