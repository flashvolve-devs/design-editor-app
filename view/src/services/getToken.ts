import axios from 'axios';
export default async function getToken(data: any) {
  const newData= {email: data.email, senha: data.password}
  const config = {
    method: 'post',
    url: 'https://flashvolve.com/version-test/api/1.1/wf/sign-in',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : newData
  };
  
  return axios(config)
  .then(async function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}