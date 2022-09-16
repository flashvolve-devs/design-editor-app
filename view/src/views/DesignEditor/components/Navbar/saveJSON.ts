import axios from 'axios';
// import loadPreviewImage from './previewImage';

export default async function (json: any) {
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

    // jsonExport.preview = await loadPreviewImage(jsonExport);
    jsonExport.preview = 'https://res.cloudinary.com/prime-arte/image/upload/v1658249537/cld-sample-5.jpg';
    
    let jsonString = JSON.stringify(jsonExport);

    const { data } = await axios.post('https://dash.zapbrand.com.br/version-test/api/1.1/obj/primeStencil', { json_text: jsonString, requestbody_text: JSON.stringify(jsonRequestBody), id_text: jsonID }, { headers: { 'Content-Type': 'application/json' } });

    return data;

  } catch (error) {
    console.log('Deu ruim!');
  }
}

