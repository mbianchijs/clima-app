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
                
                console.log(idLugar);
                
                break;
            
            case 2:
                
                break;
        
        }

        if (opciones !== 0) await pausar();
        
    } while (opciones !== 0) {

        console.log("¡Hasta luego!")
    };
}

principal();