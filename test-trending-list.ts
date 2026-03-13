import axios from 'axios';

async function checkTrending() {
  try {
    const res = await axios.get('https://magma-api.biz.id/dramabox/trending');
    const items = res.data.data || res.data.result;
    console.log(items.map(i => i.bookName));
  } catch (e) {
    console.error(e);
  }
}

checkTrending();
