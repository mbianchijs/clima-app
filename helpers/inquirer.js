const inquirer = require('inquirer');
const colors = require('colors');

const preguntas = [

    {        
        type: "list",
        name: "opciones",
        message: "Seleccione una opción",
        choices: [  
            {
                value: 1,
                name: `${'1. '.yellow} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2. '.yellow} Historial búsquedas`
            },
            {
                value: 0,
                name: `${'0. '.red} Salir`
            },
        ]
    }
];


// Imprime el encabezado y despliega el menú de opciones
const menuPrincipal = async () => {

    console.clear()
    console.log('-------------------------------------------');
    console.log(`${ 'Bievenido a ClimaApp'.green }`);
    console.log('-------------------------------------------');

    const {opciones} = await inquirer.prompt(preguntas);

    return opciones;
}

// Simular pausa
const pausar = async () => {   

    const pregunta = [
        {

            type: "input",
            name: "pausar",
            message: `Presiones ${ 'Enter'.blue } para continuar`,
        }
    ];

    const { pausar } = await inquirer.prompt(pregunta);

    return pausar;
}

module.exports = {
    menuPrincipal,
    pausar
}