const FormData = require('form-data');
const data = new FormData();
data.append('file', fs.createReadStream('04-zUnrQx/pessoa.jpg'));

const config = {
    method: 'post',
    url: 'https://storage.googleapis.com/upload/storage/v1/b/flashvolve/o?=multipart&name=s12151.jpeg',
    headers: {
        ...data.getHeaders()
    },
    data: data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });