const fs = require('fs');
const path = require('path');
const axios = require('axios').default;

function generateRandomString(num){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result= '';   
    const charactersLength = characters.length
    for ( let i = 0; i < num; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const sendToCloud = async (type) => {
    const FormData = require('form-data');
    const data = new FormData();
    
    let config;
    if(type === 'upload') {
        data.append('file', fs.createReadStream(path.join(__dirname, '../assets/images/upload-image.jpeg')));
        config = {
            method: 'post',
            url: `https://storage.googleapis.com/upload/storage/v1/b/flashvolve/o?=multipart&name=${`upload-image-${generateRandomString(10)}`}.jpeg`,
            headers: {
                ...data.getHeaders()
            },
            data: data
        };
    } else {
        data.append('file', fs.createReadStream(path.join(__dirname, '../assets/images/new-image.jpeg')));
        config = {
            method: 'post',
            url: `https://storage.googleapis.com/upload/storage/v1/b/flashvolve/o?=multipart&name=${`canva-image-${generateRandomString(10)}`}.jpeg`,
            headers: {
                ...data.getHeaders()
            },
            data: data
        };
    }

    return axios(config)
        .then(async function (response) {
            return await response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = sendToCloud;