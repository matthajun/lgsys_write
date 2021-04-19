const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const L002 = require('../service/L002');
const makejson = require('../utils/makejson');

let result = {};

exports.scheduleInsert = () => {
    schedule.scheduleJob('30 * * * *', function() {
        let value = makejson.makeReqData_L002('L002');
        let options = {
            uri: process.env.LOG_ADDRESS,
            method: 'POST',
            body: value,
            json: true
        };

        httpcall.httpReq(options, async function (err, res) {
            result = await L002.parseAndInsert(res);

            if (result instanceof Error) {
                throw new Error(result);
            }
        })
    })
};
