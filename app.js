require('dotenv').config({ path: './config/.env' });

const { menuPrincipal, pausar, leerIngreso, listarLugares } = require("./helpers/inquirer");
const Busquedas = require('./models/busquedas');

const principal = async () => {
    
    const busquedas = new Busquedas;
    let opciones = 0;

    do {

        opciones = await menuPrincipal();

        switch (opciones) {
            
            case 1:
                // Capta lugar a buscar
                const lugar = await leerIngreso("Lugar:");

                // Busca coincidencias según lugar ingresado
                const lugares = await busquedas.ciudad(lugar);

                // Imprime listado y devuelve ID seleccionado
                const idLugar = await listarLugares(lugares);

                // Recuperada data según id lugar
                const seleccionado = lugares.find( lugar => lugar.id === idLugar );

                // Devuelve valores asociados al clima según lugar seleccionado
                const clima = await busquedas.climaCiudadLugar(seleccionado.latitud, seleccionado.longitud);

                // Limpia consola e imprime resultados
                console.clear();
                console.log('\nInformación del lugar seleccionado:\n'.green);
                console.log('Lugar/Ciudad:'.cyan, seleccionado.nombre);
                console.log('Logitud:'.cyan, seleccionado.longitud);
                console.log('Latitud:'.cyan, seleccionado.latitud);
                console.log('Temperatura:'.cyan, clima.temperatura);
                console.log('Mínima:'.cyan, clima.minima);
                console.log('Máxima:'.cyan, clima.maxima);
                console.log('Humedad:'.cyan, clima.humedad);
                console.log('Estado del clima:'.cyan, clima.estado);

                // Guarda el historial de búsqueda
                busquedas.guardarHistorial( seleccionado.nombre );
                
                break;
            
            case 2:

                if(busquedas._historial.length > 0) {

                    busquedas.capitalizado.forEach((registro, index) => {
                        
                        const indice = `${ index + 1 }.`.green;
                        console.log(`${ indice } ${ registro.lugar } (${ registro.ultimaConsulta })`);
                        
                    });
                } else {
                    console.log("¡No hay historial para mostrar!".yellow);
                }
                break;
        
        }

        console.log();

        if (opciones !== 0) await pausar();
        
    } while (opciones !== 0) {

        console.log("¡Hasta luego!")
    };
}

principal();