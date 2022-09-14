export default async function getTokenData(token: any) {
  // const URL = 'http://localhost:3001/login/validate';
  const URL = 'http://18.228.2.161:3001/validate';

  const request = await fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    },
  });

  const response = await request.json();

  return response;
}
