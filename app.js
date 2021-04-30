require('dotenv').config({ path: './config/.env' });

const { menuPrincipal, pausar, leerIngreso } = require("./helpers/inquirer");
const Busquedas = require('./models/busquedas');

const principal = async () => {
    
    const busquedas = new Busquedas;
    let opciones = 0;

    do {

        opciones = await menuPrincipal();

        switch (opciones) {
            
            case 1:
                // Captura de la ciudad
                const lugar = await leerIngreso("Lugar:");

                const lugares = await busquedas.ciudad(lugar);
                console.log(lugares);
                
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