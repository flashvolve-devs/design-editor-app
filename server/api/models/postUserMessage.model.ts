/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch';

const postUserMessage = async (id: number, messages: any) => {
  const graphQuery = JSON.stringify({
    query: `mutation {
        createDraft(
            id: ${id},
            data: {
                content: "${messages[0]}",
                sender: ${id},
                time: "${new Date().toLocaleTimeString('BR')}",
                status: "delivered"
            },
        )
        {
        id
        content
        }
        }`,
    variables: {},
  });

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: graphQuery,
  };
        
  try {
    const response = await fetch(
      'http://localhost:3002/graphql',
      requestOptions,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Algo deu errado :( \n${error}`);
  }
};

export default postUserMessage;