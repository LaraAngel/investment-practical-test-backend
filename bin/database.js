const Sequelize= require('sequelize');
const express = require('express');

const MYSQL_DB_HOST = "localhost";
const MYSQL_DB_PORT = 3306;
const MYSQL_DB_NAME = "inversion";
const MYSQL_DB_USER = "root";
const MYSQL_DB_PASS = "root";

const sequelize = new Sequelize(MYSQL_DB_NAME,MYSQL_DB_USER,MYSQL_DB_PASS,{
    host: MYSQL_DB_HOST,
    port: MYSQL_DB_PORT,
    dialect: 'mysql'
});

const DB = {}

DB.Sequelize = Sequelize;
DB.sequelize = sequelize;

DB.User = require("../models/user")(sequelize,Sequelize);
DB.Investment = require("../models/investment")(sequelize,Sequelize);
DB.InvestmentOption = require("../models/investment_option")(sequelize,Sequelize);
DB.UserInvestments = require("../models/user_investments")(sequelize,Sequelize);
DB.Status = require('../models/status')(sequelize, Sequelize);
DB.InitModels = require("../models/init-models")(sequelize, Sequelize);


const app = express();

module.exports = {sequelize, app, DB};