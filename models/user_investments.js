const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_investments', {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    investments_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'investment',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_investments',
    timestamps: false,
    indexes: [
      {
        name: "FKqosnmv430vf2000lsrxtkig3o",
        using: "BTREE",
        fields: [
          { name: "investments_id" },
        ]
      },
      {
        name: "FKbbn3n8uhwnqx94j4hiyadpb1u",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
