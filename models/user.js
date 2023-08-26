const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
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
    salt: {
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
    hooks: {
      beforeCreate: async (user) => {
        console.log(JSON.stringify(user))
        if(user.password){
          const salt = await bcrypt.genSalt(12,'a')
          user.salt = salt;
          user.password = await bcrypt.hash(user.password, salt);
          console.log(JSON.stringify(user))
        }
      },
      beforeUpdate: async (user)=>{
        if (user.password){
          const salt = await bcrypt.genSalt(12,'a');
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    },
    instanceMethods: {
      validPassword: (password) =>{
        return bcrypt.compare(password, User.password)
      }
    },
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
        name: "FK46vu4rhn2vyy9906yvf7qxgra",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
    ]
  });
    User.prototype.validPassword = async function(pass, hash){
        return await bcrypt.compare(pass, this.password);
    }

  return User;
};
