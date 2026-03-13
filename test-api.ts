import axios from 'axios';

async function testApi() {
  try {
    console.log('Fetching random directly...');
    const res = await axios.get('https://magma-api.biz.id/dramabox/random');
    console.log(JSON.stringify(res.data.data[0] || res.data.result[0], null, 2));
  } catch (e) {
    console.error(e.message);
  }
}

testApi();
