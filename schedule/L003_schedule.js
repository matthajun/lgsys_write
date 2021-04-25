const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const L001 = require('../service/L001');
const makejson = require('../utils/makejson');

let result = {};

exports.scheduleInsert = () => {
    schedule.scheduleJob('35 * * * *', function() {
        let value = makejson.makeReqData_L003('L003');

        httpcall.Call('get', process.env.L003_ADDRESSS, value, async function (err, res) {
            result = await L001.parseAndInsert(res);

            if (result instanceof Error) {
                throw new Error(result);
            }
        })
    })
};