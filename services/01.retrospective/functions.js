const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const retrospectiveModel = require('../../models/01.retrospective');
const whatwellwentModel = require('../../models/02.whatwentwell');
const opportunitiesToImproveModel = require('../../models/03.opportunitiestoimprove');
const questionsModel = require('../../models/04.questions');
const suggestionsModel = require('../../models/05.suggestions');


var _ = require('lodash');

class Functions {
    
    static async getRetrospective() {
        let include = [
            { model: whatwellwentModel, attributes: ['id','name']},
            { model: opportunitiesToImproveModel, attributes: ['id','name']},
            { model: questionsModel, attributes: ['id','name']},
            { model: suggestionsModel, attributes: ['id','name']},
        ]
        
        return await retrospectiveModel.getAll(include).then(response => {
            return response;
        })
    }

    static async getOne(id) {
        const where ={
            id: id
        };
        let include = [
            { model: whatwellwentModel, attributes: ['id','name']},
            { model: opportunitiesToImproveModel, attributes: ['id','name']},
            { model: questionsModel, attributes: ['id','name']},
            { model: suggestionsModel, attributes: ['id','name']},
        ]
        
        return await retrospectiveModel.getId(where, include).then(resp => {
            return resp
        }) 
        // return {
        //     await retrospectiveModel.getId(where, include)
        // }
    }

    static async addRetrospective(retrospectiveObj) {
        // return retrospectiveModel.sequelize.transaction((t) => {
            var promises = [];
            const whatwellwent = retrospectiveObj.whatWellWent;
            const opportunities = retrospectiveObj.opportunityToImprove;
            const questions = retrospectiveObj.questions;
            const suggestions = retrospectiveObj.suggestions;
            
           retrospectiveModel.addNew(retrospectiveObj).then(async (res) =>{
                if(res) {
                    if(whatwellwent && whatwellwent.length > 0) {
                        const x = await this.addWhatWentWell(whatwellwent, res.id);
                        promises.push(x)
                    }
                    if(opportunities && opportunities.length > 0) {
                        const x2 = await this.addOpportunitiesToImprove(opportunities, res.id);
                        promises.push(x2)
                    }
                    if(questions && questions.length > 0) {
                        const x3 = await this.addQuestions(questions, res.id);
                    promises.push(x3)
                    }
                    console.log(suggestions);
                    
                    if(suggestions && suggestions.length > 0) {
                        const x4 = await this.addSuggestions(suggestions, res.id);
                    promises.push(x4)
                    }
                    return Promise.all(promises)
                }
           });
                
            return Promise.all(promises);
        // });
    }


    static async updateRetrospective(retrospectiveObj, retrospectiveId) {
        // return retrospectiveModel.sequelize.transaction((t) => {
            var promises = [];
            const whatwellwent = retrospectiveObj.whatWellWent;
            const opportunities = retrospectiveObj.opportunityToImprove;
            const questions = retrospectiveObj.questions;
            const suggestions = retrospectiveObj.suggestions;
            const deletedwhatwellwent = retrospectiveObj.deletedwhatwellwent;
            const deletedOpportunityToImprove = retrospectiveObj.deletedOpportunityToImprove;
            const deletedQuestions = retrospectiveObj.deletedQuestions;
            const deletedSuggestions = retrospectiveObj.deletedSuggestions;
            
            
        //    retrospectiveModel.update(retrospectiveObj, where).then(async (res) =>{
                if(retrospectiveId) {
                    if(deletedwhatwellwent && deletedwhatwellwent.length > 0) {
                        const where = {
                            id: {
                                [Op.in]: deletedwhatwellwent
                            }
                        }
                        const y = whatwellwentModel.delete(where);
                        promises.push(y)
                    }
                    if(whatwellwent && whatwellwent.length > 0) {
                        const x = await this.addWhatWentWell(whatwellwent, retrospectiveId);
                        promises.push(x)
                    }
                    if(deletedOpportunityToImprove && deletedOpportunityToImprove.length > 0) {
                        let where = {
                            id: {
                                [Op.in]: deletedOpportunityToImprove
                            }
                        }
                        const y = opportunitiesToImproveModel.delete(where);
                        promises.push(y)
                    }
                    if(opportunities && opportunities.length > 0) {
                        const x2 = await this.addOpportunitiesToImprove(opportunities, retrospectiveId);
                        promises.push(x2)
                    }
                    if(deletedQuestions && deletedQuestions.length > 0) {
                        let where = {
                            id: {
                                [Op.in]: deletedQuestions
                            }
                        }
                        const y = questionsModel.delete(where);
                        promises.push(y)
                    }
                    if(questions && questions.length > 0) {
                        const x3 = await this.addQuestions(questions, retrospectiveId);
                    promises.push(x3)
                    }
                    console.log(suggestions);
                    if(deletedSuggestions && deletedSuggestions.length > 0) {
                        const where = {
                            id: {
                                [Op.in]: deletedSuggestions
                            }
                        }
                        const y = suggestionsModel.delete(where);
                        promises.push(y)
                    }
                    if(suggestions && suggestions.length > 0) {
                        const x4 = await this.addSuggestions(suggestions, retrospectiveId);
                    promises.push(x4)
                    }
                    return Promise.all(promises)
                }
        //    });
    }

    static async addWhatWentWell(whatwentwells, id) {
        return new Promise((resolve, reject) => {
            let count = 0
            _.forEach(whatwentwells, async (obj) => {
                count++;
                    try{
                    if(obj.id) {
                        const where ={
                            id:obj.id
                        }
                        delete obj.id;
                        await whatwellwentModel.updateRecord(obj, where)
                    } else {
                        obj.retrospectiveId = id;
                        await whatwellwentModel.addNew(obj)
                    }
                    if(whatwentwells.length === count) {
                        resolve();
                    }
                }catch(err) {
                    reject(err);
                    console.log(err);
                    
                }
            });
        })
    }

    static async addOpportunitiesToImprove(opportunities, id) {
        return new Promise((resolve, reject) => {
            let count = 0
            _.forEach(opportunities, async (obj) => {
                count++;
                try{
                if(obj.id) {
                    let where ={
                        id:obj.id
                    }
                    delete obj.id;
                    await opportunitiesToImproveModel.updateRecord(obj, where)
                } else {
                    obj.retrospectiveId = id;
                    await opportunitiesToImproveModel.addNew(obj)
                }
                if(opportunities.length === count) {
                    resolve();
                }
            }catch(err){
                reject(err);
                console.log(err);
                
            }
        });
        })
    }

    static async addQuestions(questions, id) {
        return new Promise((resolve, reject) => {
            let count = 0
            _.forEach(questions, async (obj) => {
                count++;
                try{
                if(obj.id) {
                    let where ={
                        id:obj.id
                    }
                    delete obj.id;
                   await questionsModel.updateRecord(obj, where)
                } else {
                    obj.retrospectiveId = id;
                   await questionsModel.addNew(obj)
                }
                if(questions.length === count) {
                    resolve();
                }
            }catch(err){
                console.log(err);
                reject(err);
            }
        });
        })
    }

    static async addSuggestions(suggestions, id) {
        console.log("sfdf");
        
        return new Promise((resolve, reject) => {
            let count = 0
            _.forEach(suggestions, async (obj) => {
                count++;
                try{
                if(obj.id) {
                    let where ={
                        id:obj.id
                    }
                    delete obj.id;
                    await suggestionsModel.updateRecord(obj, where)
                } else {
                    obj.retrospectiveId = id;
                    await suggestionsModel.addNew(obj)
                }
                if(suggestions.length === count) {
                    resolve();
                }
            }catch(err){
                reject(err)
            }
        });
        })
    }

    // static async updateRetrospective(retrospective, where, who) {
    //     return retrospectiveModel.updateRetrospective(retrospective, where).then(() => {
    //         return retrospectiveModel.getId(where).then((resp) => {
    //             if (!resp) {
    //                 throw errorDef.MASTERDATA_NOT_FOUND;
    //             }
    //             return resp;
    //         });
    //     });
    // }
    static async deleteRetrospective(where, who, type = "soft") {
            return await retrospectiveModel.deleteHard(where).then((resp) => {
                if (!resp) {
                    return resp;
                } else {
                    return where; 
                }
            });
    }
}


module.exports = Functions;