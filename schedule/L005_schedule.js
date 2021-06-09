const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const makejson = require('../utils/makejson');
const CH_L005 = require('../clickhouse/L005');
const CH_L005_b = require('../clickhouse/L005_bumun');
const winston = require('../config/winston')(module);
const confirmutils = require('../utils/confirmutils');

const L005 = require('../service/L005');

exports.scheduleInsert = () => {
    schedule.scheduleJob(process.env.L005_TIME, function() {
        let value = makejson.makeReqData_L005('L005', 1);

        httpcall.Call('get', process.env.L005_ADDRESS, value,  async function (err, res) {
            const resData = res;
            const resConfirmCode = resData.body.result.checksum;
            if(resConfirmCode) {
                const localMakeConfirmCode = await confirmutils.makeConfirmCode(resData.body.list);

                if (resConfirmCode !== localMakeConfirmCode) {
                    winston.error(`우리쪽 값 ${localMakeConfirmCode} ,  받은 값 ${resConfirmCode}`);
                    throw Error('************** CheckSum 값이 일치하지 않아 데이터를 저장하지 않습니다. **************');
                }
            }

            CH_L005.parseAndInsert(res);
            CH_L005_b.parseAndInsert(res);
            L005.parseAndInsert(res);

            if(res.body.list) {
                let k = res.body.result.total_page;
                if(k >= 2) {
                    for (let index = 2; index <= k; index++) {
                        let value_for = makejson.makeReqData_L005('L005', index);

                        httpcall.Call('get', process.env.L005_ADDRESS, value_for, async function (err, res) {
                            const resData = res;
                            const resConfirmCode = resData.body.result.checksum;
                            if(resConfirmCode) {
                                const localMakeConfirmCode = await confirmutils.makeConfirmCode(resData.body.list);

                                if (resConfirmCode !== localMakeConfirmCode) {
                                    winston.error(`우리쪽 값 ${localMakeConfirmCode} ,  받은 값 ${resConfirmCode}`);
                                    throw Error('************** CheckSum 값이 일치하지 않아 데이터를 저장하지 않습니다. **************');
                                }
                            }
                            CH_L005.parseAndInsert(res);
                            CH_L005_b.parseAndInsert(res);
                            L005.parseAndInsert(res);
                        })
                    }
                }
            }
        })
    })
};