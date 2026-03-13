import axios from 'axios';

async function checkTrending() {
  try {
    const res = await axios.get('https://magma-api.biz.id/dramabox/trending');
    const item = res.data.data?.[0] || res.data.result?.[0];
    console.log(JSON.stringify(item, null, 2));
  } catch (e) {
    console.error(e);
  }
}

checkTrending();
