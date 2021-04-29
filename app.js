const { menuPrincipal, pausar } = require("./helpers/inquirer");


const principal = async () => {
    
    let opciones = 0;

    do {

        opciones = await menuPrincipal();

        
        await pausar();
        
    } while (opciones !== 0) {

        console.log("¡Hasta luego!")
    };
}

principal();