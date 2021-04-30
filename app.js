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

                // Imprime resultados
                console.log('\nInformación del lugar seleccionado:\n'.green);
                console.log('Lugar/Ciudad:'.cyan, seleccionado.nombre);
                console.log('Logitud:'.cyan, seleccionado.longitud);
                console.log('Latitud:'.cyan, seleccionado.latitud);
                
                break;
            
            case 2:
                
                break;
        
        }

        console.log();

        if (opciones !== 0) await pausar();
        
    } while (opciones !== 0) {

        console.log("¡Hasta luego!")
    };
}

principal();