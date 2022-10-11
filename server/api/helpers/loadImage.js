const { loadImage } = require('canvas');
const saveInCloudinary = require('../middlewares/cloudinary.middleware');
const loadImageUrl = async (ctx, content) => {

  const cloudnaryImage = await saveInCloudinary(content.src);
  const cloudnaryImageFaceCenter = (cloudnaryImage.split('upload/')[0] + 'upload/c_fill,g_face:center,h_500,w_500/' + cloudnaryImage.split('upload/')[1]);
  const imageUrl = await loadImage(cloudnaryImageFaceCenter);
  ctx.drawImage(imageUrl, content.left, content.top, content.width * content.scaleX, content.height * content.scaleY);

};

module.exports = loadImageUrl;