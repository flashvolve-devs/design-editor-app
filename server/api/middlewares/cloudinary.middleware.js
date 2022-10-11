const axios = require('axios');

const saveInCloudinary = async (image) => {
    const data = JSON.stringify({
        "file": `${image}`,
        "api_key": "429282383232114",
        "upload_preset": "santander"
    });

    const config = {
        method: 'post',
        url: 'https://api.cloudinary.com/v1_1/prime-arte/auto/upload',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config)
        .then(async function (response) {
            return await response.data.url;
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = saveInCloudinary;