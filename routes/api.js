const express = require('express');
const router = express.Router();
const confirmutils = require('../utils/confirmutils');
const makejson = require('../utils/makejson');
const winston = require('../config/winston')(module);

const time = require('../utils/setDateTime');

const L001 = require('../service/L001');
const L002 = require('../service/L002');
const L005 = require('../service/L005');

const CH_L005 = require('../clickhouse/L005'); //16일 테스트용

router.post('/v1', async (req, res, next) => {
    try {
        winston.debug("post id " + req.body.header.message_id);
        const codeId = req.body.header.message_id;

        let result =  {};
        let ch_result = {};
        switch (codeId) {
            case "L001" :
                //result = await  L001.parseAndInsert(req);
                break;
            case "L002" :
                //result = await  L002.parseAndInsert(req);
                break;
            case "L003" :
                //result = await  L001.parseAndInsert(req);
                break;
            case "L005" :
                //result = await  L005.parseAndInsert(req);
                //ch_result = await CH_L005.parseAndInsert(req);
                break;

            default:
                throw Error(`{"res_cd":"99"}`);
        }

        if(result instanceof Error){ //Insert가 안되었을때
            throw new Error(result);
        }else if(ch_result instanceof Error){
            throw new Error(ch_result);
        }
        else{
            res.json(makejson.makeResData(null,req));
        }

    } catch (err) {
        next(err);
    }
});

module.exports = router;