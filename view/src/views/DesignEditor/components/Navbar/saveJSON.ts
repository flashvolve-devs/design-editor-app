import axios from 'axios';
import loadPreviewImage from './previewImage';

export default async function (json: any, base64: string) {
  try {

    let jsonExport = json;
    let jsonID = jsonExport.id;
    let jsonContentFormat = jsonExport.content == undefined ? jsonExport.layers : jsonExport.content;
    let modifications = [];

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

    let jsonRequestBody = {
      template: jsonID,
      modifications: modifications
    }

    const previewImage = await loadPreviewImage(base64);
    jsonExport.preview = previewImage;
    
    let jsonString = JSON.stringify(jsonExport);

    await axios.post('https://dash.zapbrand.com.br/version-test/api/1.1/obj/primeStencil', { json_text: jsonString, requestbody_text: JSON.stringify(jsonRequestBody), id_text: jsonID }, { headers: { 'Content-Type': 'application/json' } });

    return previewImage;

  } catch (error) {
    console.log('Deu ruim!');
  }
}

