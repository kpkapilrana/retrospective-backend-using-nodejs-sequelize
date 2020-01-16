const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "whatwentwell";
const modelName = "whatwentwell";
const Op = Sequelize.Op;

module.exports = class WhatWentWell extends Sequelize.Model {
   
    //schema
    static init(sequelize, DataTypes) {
        return super.init(schema(DataTypes), {
            tableName,
            modelName,
            sequelize
        });
    }
    //associations
    static associate(models) {
        this.myAssociation = this.belongsTo(models.Retrospective, 
            {foreignKey: 'retrospectiveId', targetKey:'id'});
    }

    static addNew(obj, transaction) {
        return this.create(
            obj
        , {
        returning: true
        });
    }

    static updateRecord(data, where, transaction = null) {
        return this.update(data, {
            where: where,
            isNewRecord: false
        }, transaction);
    }

    static delete(where, transaction = null) {
        return this.destroy({
            where: where
        }, transaction);
    }
}