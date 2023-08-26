const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('investment_option', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    field: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    inversion_limit: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    risk: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'status',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'investment_option',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FKfba1tlj4lo3askorrd0jtabee",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
    ]
  });
};
