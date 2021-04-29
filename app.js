const { menuPrincipal, pausar, leerIngreso } = require("./helpers/inquirer");


const principal = async () => {
    
    let opciones = 0;

    do {

        opciones = await menuPrincipal();

        switch (opciones) {
            
            case 1:
                // Captura de la ciudad

                const lugar = await leerIngreso("Lugar:");
                
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