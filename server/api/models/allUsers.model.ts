import fetch from 'node-fetch';

const getAllUsers = async () => {
  const graphQuery = JSON.stringify({
    query: `query {
    allUsers {
        id
        name
        profile_picture
        whatsapp_name
        phone_number
        messages{
            content
            sender
            time
            status
        }
    }
  }`,
    variables: {},
  });

  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: graphQuery,
  };

  try {
    const response = await fetch(
      'http://localhost:3002/graphql',
      requestOptions,
    );
    const data = await response.json();
    return data.data.allUsers;
  } catch (error) {
    console.log(`Algo deu errado :( \n${error}`);
  }
};

export default getAllUsers;
