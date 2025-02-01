const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("resumenDiario", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    dia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comision: {
      type: DataTypes.INTEGER
    },
    ventas: {
      type: DataTypes.INTEGER
    },
  }, {
    tableName: "resumen_diario",
    timestamps: false
  });
};
