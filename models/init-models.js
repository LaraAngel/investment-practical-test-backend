var DataTypes = require("sequelize").DataTypes;
var _investment = require("./investment");
var _investment_option = require("./investment_option");
var _status = require("./status");
var _user = require("./user");
var _user_investments = require("./user_investments");

function initModels(sequelize) {
  var investment = _investment(sequelize, DataTypes);
  var investment_option = _investment_option(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_investments = _user_investments(sequelize, DataTypes);

  user_investments.belongsTo(investment, { as: "investment", foreignKey: "investments_id"});
  investment.hasMany(user_investments, { as: "user_investments", foreignKey: "investments_id"});
  investment.belongsTo(investment_option, { as: "investment_option", foreignKey: "investment_option_id"});
  investment_option.hasMany(investment, { as: "investments", foreignKey: "investment_option_id"});
  investment.belongsTo(status, { as: "status", foreignKey: "status_id"});
  status.hasMany(investment, { as: "investments", foreignKey: "status_id"});
  investment_option.belongsTo(status, { as: "status", foreignKey: "status_id"});
  status.hasMany(investment_option, { as: "investment_options", foreignKey: "status_id"});
  user.belongsTo(status, { as: "status", foreignKey: "status_id"});
  status.hasMany(user, { as: "users", foreignKey: "status_id"});
  user_investments.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_investments, { as: "user_investments", foreignKey: "user_id"});

  return {
    investment,
    investment_option,
    status,
    user,
    user_investments,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
