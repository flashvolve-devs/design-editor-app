export default async function getTokenData(token: any) {
  // const URL = 'http://localhost:3001/login/validate';
  const URL = 'https://design-editor-app-z22dtvdr6q-uc.a.run.app/validate';

  const request = await fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    },
  });

  const response = await request.json();

  return response;
}
