const fs = require('fs');
const path = require('path');
const axios = require('axios').default;

const sendToCloud = () => {
    const FormData = require('form-data');
    const data = new FormData();
    data.append('file', fs.createReadStream(path.join(__dirname, '../assets/images/new-image.jpeg')));

    const config = {
        method: 'post',
        url: 'https://storage.googleapis.com/upload/storage/v1/b/flashvolve/o?=multipart&name=s12151.jpeg',
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    return axios(config)
        .then(async function (response) {
            return await response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = sendToCloud;