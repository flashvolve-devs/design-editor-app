// import axios from 'axios';

// export default class getDesigns {
//   static async get() {
//     try {

//       const { data } = await axios.get('https://dash.zapbrand.com.br/version-test/api/1.1/obj/primeStencil');
//       return data;

//     } catch (error) {
//       console.log('Deu ruim!');

//     }
//   }
// }

import axios from 'axios';

export default class getDesigns {
  static async get(userId: any) {
    try {

      const { data } = await axios.get(
        `https://flashvolve.com/version-test/api/1.1/obj/Templates?constraints=[{"key":"user_user","constraint_type":"equals","value":"${userId}"}]`
      );
      return data;

    } catch (error) {
      console.log('Deu ruim!');

    }
  }
}