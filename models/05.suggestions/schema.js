const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../services/services.config/errorDef');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: true,
        }
    };
}