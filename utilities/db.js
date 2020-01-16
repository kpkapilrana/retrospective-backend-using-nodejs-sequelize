const Sequelize = require("sequelize");
const utils = require('./utils')
const config = utils.getConfig(['/opt/environment/config/environment.json', 'config']);
const databaseName = require('config').db.dbname; 

console.info(`new instance of sequelize with config - dbname: ${databaseName} - username: ${config.db.username} - dialect: ${config.db.options.dialect}`);

// let dialectOptions = config.db.options.dialectOptions || {};

// if (config.db.socketPath !== undefined && config.db.socketPath !== '') {
//     dialectOptions['socketPath'] = config.db.socketPath;
// }
let options = config.db.options;

// options['dialectOptions'] = dialectOptions;
// options['pool'] = {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   };
options['operatorsAliases'] = false;
console.log('connection config', options);

sequelize = new Sequelize(
    databaseName,
    config.db.username,
    config.db.password,
    options);


const models = {
    Retrospective: require("../models/01.retrospective").init(sequelize, Sequelize),
    WhatWentWell: require("../models/02.whatwentwell").init(sequelize, Sequelize),
    OpportunitiesToImprove: require("../models/03.opportunitiestoimprove").init(sequelize, Sequelize),
    Questions: require("../models/04.questions").init(sequelize, Sequelize),
    Suggestions: require("../models/05.suggestions").init(sequelize, Sequelize),
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

const db = {
    ...models,
    sequelize
};

module.exports = db;