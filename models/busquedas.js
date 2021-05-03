const axios = require('axios');
const { leerHistorialDB, insertHistorialDB } = require('../helpers/tratarArchivo');


class Busquedas {

    _historial = [];

    constructor() {

        this.leerHistorial();

    }
    
    get urlParamsMapbox() {

        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 7,
            'language': 'es'
        }

    }

    get urlParamsOW() {

        return {
            'appid': process.env.OW_KEY,
            'units': 'metric',
            'lang': 'es'
        }

    }

    get capitalizado() {

        return this._historial.map( registro => {
            let palabras = registro.lugar.split(" ");
            palabras = palabras.map(palabra => palabra[0].toUpperCase() + palabra.substring(1));
            return (
                {
                    lugar: palabras.join(' '),
                    ultimaConsulta: registro.ultimaConsulta

                }
            );
        } )

    }

    async ciudad( lugar = '' ) {

        try {
            
            const instancia = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.urlParamsMapbox

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

    }

    async climaCiudadLugar( lat, lon ) {

        try {
            
            const instancia = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.urlParamsOW, lat, lon},

            })

            const res = await instancia.get();
            const { weather, main } = res.data;

            return  {
                estado: weather[0].description,
                temperatura: main.temp,
                minima: main.temp_min,
                maxima: main.temp_max,
                humedad: main.humidity,
            }

        } catch (error) {

            return [];
        }

    }

    guardarHistorial( lugar = '' ) {

        const obj = {
            
            lugar: lugar.toLowerCase(),
            ultimaConsulta: new Date()

        }

        this._historial.unshift(obj);

        insertHistorialDB(this._historial);
    }

    leerHistorial() {

        const data = leerHistorialDB();
        if (data) this._historial = data;
    }

}

module.exports = Busquedas;