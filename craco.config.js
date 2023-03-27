const dotenv = require('dotenv');
const path = require('path');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

module.exports = {
  webpack: {
    configure: {
      // Agrega la definición de las variables de entorno a la configuración de Webpack
      // para que estén disponibles en tiempo de ejecución
      plugins: [],
    },
  },
};
