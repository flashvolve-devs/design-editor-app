import axios from 'axios';

export default async function create(data: any) {
  const newData = { Nome: data.name, Email: data.email, Senha: data.password }
  const config = {
    method: 'post',
    url: 'https://flashvolve.bubbleapps.io/version-test/api/1.1/wf/sign-up',
    headers: {
      'Content-Type': 'application/json'
    },
    data: newData
  };

  return axios(config)
    .then(async function (response) {
      return await response.data
    })
    .catch(function (error) {
      return error.response.data
    });
}