import CryptoJS from 'crypto-js';

export default async function create(data: any, path: any) {
  // const URL = `http://localhost:3001/${path}`;
  const URL = `http://18.228.2.161:3001/${path}`;

  const md5Password = CryptoJS.MD5(data.password).toString();

  const request = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ ...data, password: md5Password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const response = await request.json();

  return response;
}
