const axios = require('axios');

const saveInCloudinary = async (image, w, h) => {
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

    const cloudinaryImage = await axios(config)
        .then(async function (response) {
            return await response.data.url;
        })
        .catch(function (error) {
            console.log(error);
        });

    const cloudinaryImageFaceCenter = (cloudinaryImage.split('upload/')[0] + `upload/c_fill,g_face:center,h_${parseInt(h)},w_${parseInt(w)}/` + cloudinaryImage.split('upload/')[1]);

    console.log(cloudinaryImageFaceCenter);

    return cloudinaryImageFaceCenter;
}

module.exports = saveInCloudinary;

//  const cloudnaryImage = await saveInCloudinary(content.src, width, heigth);
