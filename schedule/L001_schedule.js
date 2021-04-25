const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const L001 = require('../service/L001');
const makejson = require('../utils/makejson');

let result = {};
let result_for = {};

exports.scheduleInsert = () => {
    schedule.scheduleJob('*/5 * * * *', function() {
        let value = makejson.makeReqData_L001('L001', 1);
        httpcall.Call('get', process.env.L001_ADDRESS, value,  async function (err, res) {

            result = await L001.parseAndInsert(res, 1);

            if(res.body.result !== null) {
                let k = res.body.result.total_page;
                if(k !== null) {

                    for (let index = 2; index <= k; index++) {
                        //console.log(index);
                        let value_for = makejson.makeReqData_L001('L001', index);

                        httpcall.Call('get', process.env.L001_ADDRESS, value_for, async function (err, res) {
                            result_for = await L001.parseAndInsert(res, index);

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