export default async function getToken(data: any) {
  // const URL = 'http://localhost:3001/login';
  const URL = 'https://design-editor-app-z22dtvdr6q-uc.a.run.app/login';


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
