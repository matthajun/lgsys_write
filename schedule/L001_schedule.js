const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const L001 = require('../service/L001');
const makejson = require('../utils/makejson');
const winston = require('../config/winston')(module);
const confirmutils = require('../utils/confirmutils');

let result = {};
let result_for = {};

async function L001_schedule(num) {
    let value = makejson.makeReqData_L001('L001', 1);

    httpcall.Call('get', process.env.L001_ADDRESS, value,  async function (err, res) {
        if(res) {
            //console.log(res);
            const resData = res;
            const resConfirmCode = resData.body.result.checksum;
            if(resConfirmCode) {
                const localMakeConfirmCode = await confirmutils.makeConfirmCode(resData.body.list);

                if (resConfirmCode !== localMakeConfirmCode) {
                    winston.error(`우리쪽 값 ${localMakeConfirmCode} ,  받은 값 ${resConfirmCode}`);
                    throw Error('************** CheckSum 값이 일치하지 않아 데이터를 저장하지 않습니다. **************');
                }
            }
            result = await L001.parseAndInsert(res, 1);

            if (res.body.list) {
                let k = res.body.result.total_page;
                if (k >= 2) {
                    for (let index = 2; index <= k; index++) {
                        setTimeout(function() {
                            value.body.page = index;

                            httpcall.Call('get', process.env.L001_ADDRESS, value, async function (err, res) {
                                if (res) {
                                    const resData = res;
                                    const resConfirmCode = resData.body.result.checksum;
                                    if (resConfirmCode) {
                                        const localMakeConfirmCode = await confirmutils.makeConfirmCode(resData.body.list);

                                        if (resConfirmCode !== localMakeConfirmCode) {
                                            winston.error(`우리쪽 값 ${localMakeConfirmCode} ,  받은 값 ${resConfirmCode}`);
                                            throw Error('************** CheckSum 값이 일치하지 않아 데이터를 저장하지 않습니다. **************');
                                        }
                                    }

                                    await L001.parseAndInsert(res, index);
                                }
                                else {
                                    winston.error('************************* index: ' + index + '번 실패 *************************');
                                }
                            })
                        },1000)
                    }
                }
            }
            if (result instanceof Error) {
                throw new Error(result);
            }
        }
        else {
            winston.error('************** L001응답이 없습니다. *******************');
            if (num === 1){
                return;
            }
            else {
                winston.info('***************************** L001 2번째 시도 *****************************');
                await L001_schedule(num - 1);
            }
        }
    })

}

exports.scheduleInsert = () => {
    schedule.scheduleJob(process.env.L001_TIME, async function() {
        await L001_schedule(2);
    })
};
