const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "suggestions";
const modelName = "suggestions";


module.exports = class Suggestions extends Sequelize.Model {
   
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
        {foreignKey: 'retrospectiveId', targetKey:'id'},
        
        );
}

static addNew(obj, transaction = null) {
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

    static delete(where, transaction = null) {
        return this.destroy({
            where: where
        }, transaction);
    }

}