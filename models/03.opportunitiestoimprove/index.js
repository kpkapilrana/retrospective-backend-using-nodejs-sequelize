const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "opportunitiestoimprove";
const modelName = "opportunitiestoimprove";

module.exports = class OpportunitiesToImprove extends Sequelize.Model {
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
    this.myAssociation = this.belongsTo(models.Retrospective, {foreignKey: 'retrospectiveId', targetKey:'id'});
}

static addNew(obj) {
    return this.create(
        obj
    , {
    returning: true
    });
}

static updateRecord(data, where) {
    return this.update(data, {
        where,
        isNewRecord: false
    });
}

static delete(where, transaction = null) {
    return this.destroy({
        where: where
    }, transaction);
}
}