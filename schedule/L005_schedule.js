const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const L005 = require('../service/L005');
const makejson = require('../utils/makejson');
const CH_L005 = require('../clickhouse/L005');

let result = {};
let result_for = {};

exports.scheduleInsert = () => {
    schedule.scheduleJob('*/5 * * * *', function() {
        let value = makejson.makeReqData_L001('L005', 1);
        httpcall.Call('get', process.env.L005_ADDRESS, value,  async function (err, res) {

            result = await L005.parseAndInsert(res);
            CH_L005.parseAndInsert(res);

            if(res.body.result !== null) {
                let k = res.body.result.total_page;
                if(k !== null) {

                    for (let index = 2; index <= k; index++) {
                        //console.log(index);
                        let value_for = makejson.makeReqData_L001('L005', index);

                        httpcall.Call('get', process.env.L005_ADDRESS, value_for, async function (err, res) {
                            result_for = await L005.parseAndInsert(res);
                            CH_L005.parseAndInsert(res);

                            if (result_for instanceof Error) {
                                throw new Error(result_for);
                            }
                        })
                    }
                }
            }

            if (result instanceof Error) {
                throw new Error(result);
            }
        })
    })
};