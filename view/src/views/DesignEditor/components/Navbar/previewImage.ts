import axios from 'axios';

export default async function (image: any) {
    const dataConfig = JSON.stringify({
        "base64": image
    });

    const config = {
        method: 'post',
        url: 'https://glitter-silken-tarantula.glitch.me/uploadGoogle',
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 10000,
        data: dataConfig
    };

    const { data } = await axios(config);

    return data.image_url
};
