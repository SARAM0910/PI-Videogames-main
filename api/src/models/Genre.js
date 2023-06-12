const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    // aqui no paso el Id por que se crea en automatico
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{ timestamps: false });
};

