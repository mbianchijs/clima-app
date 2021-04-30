const axios = require('axios');

class Busquedas {

    constructor() {

    }

    get urlParams() {

        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 7,
            'language': 'es'
        }

    }

    async ciudad( lugar = '' ) {

        try {
            
            const instancia = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.urlParams

            })

            const res = await instancia.get();

            console.log(res.data)

            return [];

        } catch (error) {

            return [];
        }


        return res.data;

    }

}

module.exports = Busquedas;