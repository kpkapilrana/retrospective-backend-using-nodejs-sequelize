const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "retrospective";
const modelName = "retrospective";
const Op = Sequelize.Op;

module.exports = class Retrospective extends Sequelize.Model {
   
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
        this.myAssociation = this.hasMany(models.WhatWentWell, {foreignKey: 'retrospectiveId', sourceKey:'id'});
        this.myAssociation = this.hasMany(models.OpportunitiesToImprove, {foreignKey: 'retrospectiveId', sourceKey:'id'});
        this.myAssociation = this.hasMany(models.Questions, {foreignKey: 'retrospectiveId', sourceKey:'id'});
        this.myAssociation = this.hasMany(models.Suggestions, {foreignKey: 'retrospectiveId', sourceKey:'id'});
    }
    //methods

    static getId(where, include) {
        return this.findOne({
            where,
            include: include
        });
    }

    static getAll(include) {
        return this.findAndCountAll({
            include:include
        });
    }

    static addNew(obj, transaction) {
        return this.create(
            obj
            , {
            returning: true,
            transaction: transaction
          });
    }
    
    static updateRecord(data, where) {
        return this.update(data, {
            where: where
        });
    }

    static deleteHard(where) {
        return this.destroy({
            where: where
        });
    }
}