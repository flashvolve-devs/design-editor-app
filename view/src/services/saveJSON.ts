import axios from 'axios';
import loadPreviewImage from './previewImage';

export default async function (json: any, base64: string, userId: string) {
  try {

    const jsonExport = json;
    const jsonID = jsonExport.id;
    const modifications = [];
    let jsonContentFormat = jsonExport.content == undefined ? jsonExport.layers : jsonExport.content;

    jsonContentFormat = jsonContentFormat.filter((item: any) => item.name != 'Initial Frame' && item.name != 'StaticPath');

    for (let i = 0; i < jsonContentFormat.length; i++) {
      let item = {};
      if (jsonContentFormat[i].name == 'StaticText') {
        item = { name: jsonContentFormat[i].id, text: jsonContentFormat[i].text }
      } else {
        item = { name: jsonContentFormat[i].id, src: jsonContentFormat[i].src }
      }
      modifications.push(item);
    }

    const jsonRequestBody = {
      template: jsonID,
      modifications: modifications
    }

    const previewImage = await loadPreviewImage(base64);
    jsonExport.preview = previewImage;

    const jsonString = JSON.stringify(jsonExport);

    await axios.post(
      'https://flashvolve.com/version-test/api/1.1/obj/Templates',
      { json_text: jsonString, requestbody_text: JSON.stringify(jsonRequestBody), id_text: jsonID, user_user: userId },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return previewImage;

  } catch (error) {
    console.log('Deu ruim!');
  }
}

