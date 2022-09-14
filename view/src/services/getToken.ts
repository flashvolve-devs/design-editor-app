export default async function getToken(data: any) {
  const URL = 'http://localhost:3001/login';
  // const URL = 'http://18.228.2.161:3001/login';


  const request = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const response = await request.json();

  return response;
}

// const axios = require('axios');
// const data = JSON.stringify({
//   "email": "jlage@flashvolve.com",
//   "senha": "1234"
// });

// const config = {
//   method: 'post',
//   url: 'https://flashvolve.com/version-test/api/1.1/wf/sign-in',
//   headers: { 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data)
// })
// .catch(function (error) {
//   console.log(error);
// });