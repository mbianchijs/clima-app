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

            return res.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1]
            }))

        } catch (error) {

            return [];
        }


        return res.data;

    }

}

module.exports = Busquedas;