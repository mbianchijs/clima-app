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

// Captura la opción seleccionada
const leerIngreso = async ( message ) => {

    const pregunta = [
        {
            type: "input",
            name: "ingreso",
            message,
            validate: function ( ingreso ) {
                if( ingreso.length === 0 ) {
                    return `${'Debe ingresar un valor'.red}`;
                }

                return true;
            }
        }
    ]

    const { ingreso } = await inquirer.prompt(pregunta);

    return ingreso;

}

// Lista los lugares según criterio de búsqueda
const listarLugares = async ( lugares = [] ) => {

    const choices = lugares.map(( lugar, index ) => {

        const indice = `${ index + 1 }.`.green;

        return {
            value: lugar.id,
            name: `${ indice } ${ lugar.nombre }`
        }
        
    });

    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "Seleccione lugar",
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);

    return id;

}

module.exports = {
    menuPrincipal,
    pausar,
    leerIngreso,
    listarLugares
}