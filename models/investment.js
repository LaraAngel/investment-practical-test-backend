const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('investment', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    final_date: {
      type: DataTypes.DATE(6),
      allowNull: true
    },
    initial_date: {
      type: DataTypes.DATE(6),
      allowNull: true
    },
    invested: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    returned: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    roi: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    investment_option_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'investment_option',
        key: 'id'
      }
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
    tableName: 'investment',
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
        name: "FK5ig73d6x6vrxcj1wyprfvbk9l",
        using: "BTREE",
        fields: [
          { name: "investment_option_id" },
        ]
      },
      {
        name: "FKej8s7qryh503oyfaruucml436",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
    ]
  });
};
