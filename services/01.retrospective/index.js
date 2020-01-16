const express = require('express');
const router = express.Router();
const functions = require('./functions');
const errorDef = require('../services.config/errorDef');
var _ = require('lodash');


router.get('/searchById/:id', (req, res, next) =>{
        const id = req.params.id;
        return functions.getOne(id).then((resp) => {
            if (!resp) {
                throw errorDef.MASTERDATA_NOT_FOUND
            }
            return res.status(200).send(resp);
        }).catch((reason) => {
            next(reason);
        });
});

router.get('/search', function (req, res, next) {

        return functions.getRetrospective().then((resp) => {
            if (!resp) {
                throw errorDef.MASTERDATA_NOT_FOUND
            }

            return res.status(200).send(resp);
        }).catch((reason) => {
            next(reason);
        });
});

router.post('/add', function (req, res, next) {
    console.log(req.body);
    const retrospective = req.body.retrospective;
    // errorDef.parameterHandler([retrospective]);
    // _.forEach(retrospective, (retrospectiveObj) => {
    //     errorDef.parameterHandler([retrospectiveObj.code, retrospectiveObj.name, retrospectiveObj.citizenship]);
    // });
    // const userInfo = errorDef.userInfoHandler(req);

    return functions.addRetrospective(retrospective).then((resp) => {
        if (!resp) {
            throw errorDef.MASTERDATA_NOT_FOUND
        }
        return res.status(200).send(resp);
    }).catch((reason) => {
        next(reason);
    });
});

router.post('/update', function (req, res, next) {
    const retrospectiveId = req.body.id;
    const retrospective = req.body.retrospective;
    errorDef.parameterHandler([retrospective]);
    // // errorDef.parameterHandler([retrospective.code, retrospective.name, retrospective.citizenship]);
    // const userInfo = errorDef.userInfoHandler(req);

    let where = { id: retrospectiveId };
    return functions.updateRetrospective(retrospective, retrospectiveId).then((resp) => {
        if (!resp) {
            throw errorDef.MASTERDATA_NOT_FOUND
        }
        return res.status(200).send(resp);
    }).catch((reason) => {
        next(reason);
    });
});

router.delete('/delete', function (req, res, next) {
    const retrospectiveId = req.body.id;
    const deleteOption = req.body.option;
    errorDef.parameterHandler([retrospectiveId, deleteOption]);
    // const userInfo = errorDef.userInfoHandler(req);

    let where = { id: retrospectiveId };
    return functions.deleteRetrospective(where, userInfo.id, deleteOption).then((resp) => {
        if (!resp) {
            throw errorDef.MASTERDATA_NOT_FOUND
        }
        return res.status(200).send(resp);
    }).catch((reason) => {
        next(reason);
    });
});

module.exports = router;