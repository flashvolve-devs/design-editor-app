import axios from 'axios';

export default class getDesigns {
  static async get() {
    try{

        const { data } = await axios.get('https://dash.zapbrand.com.br/version-test/api/1.1/obj/primeStencil');
        return data;

    }catch(error){
        console.log('Deu ruim!');

    }
  }
}