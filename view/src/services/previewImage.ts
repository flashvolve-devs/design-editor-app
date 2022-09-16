import axios from 'axios';

export default async function (image: any) {

    const config = {
        method: 'post',
        url: 'https://flashvolve.bubbleapps.io/version-test/api/1.1/wf/base64',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "image": image
        }
    };

    const { data } = await axios(config);

    return data;

};
