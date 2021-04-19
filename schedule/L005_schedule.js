const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const L005 = require('../service/L005');
const makejson = require('../utils/makejson');
const CH_L005 = require('../clickhouse/L005');

let result = {};
let result_for = {};

exports.scheduleInsert = () => {
    schedule.scheduleJob('3 */5 * * * *', function() {
        let value = makejson.makeReqData_L001('L005', 1);
        let options = {
            uri: process.env.LOG_ADDRESS,
            method: 'POST',
            body: value,
            json: true
        };

        httpcall.httpReq(options, async function (err, res) {
            result = await L005.parseAndInsert(res);
            CH_L005.parseAndInsert(res);
            let k = res.body.body.result.total_page;

            for(let index = 2; index <= k; index++){
                //console.log(index);
                let value_for = makejson.makeReqData_L001('L005', index);
                let options_for = {
                    uri: process.env.LOG_ADDRESS,
                    method: 'POST',
                    body: value_for,
                    json: true
                };
                httpcall.httpReq(options_for, async function (err, res) {
                    result_for = await L005.parseAndInsert(res);
                    CH_L005.parseAndInsert(res);

                    if (result_for instanceof Error) {
                        throw new Error(result_for);
                    }
                })
            }

            if (result instanceof Error) {
                throw new Error(result);
            }
        })
    })
};