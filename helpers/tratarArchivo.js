const fs = require('fs');
const path = './db/historial.json';

const insertHistorialDB = ( registro ) => {

    fs.writeFileSync(path, JSON.stringify(registro));

}

const leerHistorialDB = () => {

    if(!fs.existsSync(path)){
        return false;
    }
    
    let lectura = JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }));

    return lectura;

}

module.exports = { insertHistorialDB, leerHistorialDB }