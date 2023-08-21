module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
      id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
      },
      balance: {
          type: DataTypes.DOUBLE,
          allowNull: true
      },
      birthday: {
          type: DataTypes.DATE(6),
          allowNull: true
      },
      email: {
          type: DataTypes.STRING(255),
          allowNull: true
      },
      first_name: {
          type: DataTypes.STRING(255),
          allowNull: true
      },
      last_name: {
          type: DataTypes.STRING(255),
          allowNull: true
      },
      password: {
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
      tableName: 'user',
      timestamps: false,
      indexes: [
          {
              name: "PRIMARY",
              unique: true,
              using: "BTREE",
              fields: [
                  {name: "id"},
              ]
          },
          {
              name: "FK46vu4rhn2vyy9906yvf7qxgra",
              using: "BTREE",
              fields: [
                  {name: "status_id"},
              ]
          },
      ]
  });
};
