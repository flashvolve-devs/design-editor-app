import axios from 'axios';

export default async function create(data: any) {
  const config = {
    method: 'post',
    url: 'https://flashvolve.com/version-test/api/1.1/wf/sign-up',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  .then(async function (response) {
    return await response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}