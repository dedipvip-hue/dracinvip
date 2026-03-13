import axios from 'axios';

async function test() {
  try {
    const url = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.magma-api.biz.id/dramabox/trending');
    const res = await axios.get(url);
    console.log(res.status);
    const data = JSON.parse(res.data.contents);
    console.log(Object.keys(data));
    console.log(data.data ? data.data.length : 'no data');
    console.log(data.result ? data.result.length : 'no result');
  } catch (e) {
    console.error(e.message);
  }
}
test();
