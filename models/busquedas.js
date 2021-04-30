const axios = require('axios');

class Busquedas {

    constructor() {

    }

    async ciudad( lugar = '' ) {

        try {
            
            const res = await axios.get('');

            return [];

        } catch (error) {
            return [];
        }


        return res.data;

    }

}

module.exports = Busquedas;