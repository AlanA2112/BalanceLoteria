require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DATABASE_URL
} = process.env;

const sequelize = new Sequelize("postgresql://postgres:TKIIceCchDxvCaCXKPvUZOeyhFmWYwzo@maglev.proxy.rlwy.net:18228/railway
", {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, '/models', file));
    model(sequelize); // Esta línea está llamando la función que define los modelos.
    modelDefiners.push(model);
  });

// En sequelize.models están todos los modelos importados como propiedades
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

console.log(sequelize.models);  // Asegúrate de que ResumenDiario esté en este objeto.


// Asegúrate de exportar los modelos de la siguiente manera:
module.exports = {
  ...sequelize.models, // exporta los modelos
  conn: sequelize,     // exporta la conexión
  Op
};
