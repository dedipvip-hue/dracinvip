import axios from 'axios';

async function test() {
  try {
    const url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://www.magma-api.biz.id/dramabox/trending');
    const res = await axios.get(url);
    console.log(res.status);
    console.log(Object.keys(res.data));
    console.log(res.data.data ? res.data.data.length : 'no data');
  } catch (e) {
    console.error(e.message);
  }
}
test();
