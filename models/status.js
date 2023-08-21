const Investment = require('./investment')
const Sequelize = require('sequelize')
module.exports = function(sequelize, DataTypes) {
   const Status =  sequelize.define('status', {
       id: {
           autoIncrement: true,
           type: DataTypes.BIGINT,
           allowNull: false,
           primaryKey: true
       },
       name: {
           type: DataTypes.STRING(255),
           allowNull: true
       }
   }, {
       sequelize,
       tableName: 'status',
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
       ]
   });
    return Status;
};
