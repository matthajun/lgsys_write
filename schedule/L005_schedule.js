const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const makejson = require('../utils/makejson');
const CH_L005 = require('../clickhouse/L005');
const CH_L005_b = require('../clickhouse/L005_bumun');
const winston = require('../config/winston')(module);
const confirmutils = require('../utils/confirmutils');

const L005 = require('../service/L005');
const L015 = require('../service/L015');
const L005_FAIL = require('../service/L005_FAIL');

const timer = ms => new Promise(res => setTimeout(res, ms));

async function L005_schedule(num) {
        let value = makejson.makeReqData_L005('L005', 1);
        let result = {};

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

            await CH_L005.parseAndInsert(res);
            let result_sect = await CH_L005_b.parseAndInsert(res);
            result = L005.parseAndInsert(res);

            //트랜잭션 처리
            if (result instanceof Error) {
                throw new result;
            }
            else {
                const logRes = makejson.makeReqData_L015('L015', res.body.result.tid, result);

                httpcall.Call('post', process.env.L015_ADDRESS, logRes, async function (err, res) {
                    if (res) {
                        await L015.parseAndInsert(res);
                    } else {
                        winston.error('************************* res 값이 없습니다. *************************');
                        winston.error('************************* L013의 트랜잭션 처리에 실패했습니다. *************************');
                    }
                })
            }
            //단위-부문 트랜잭션, MYSQL 백업 테이블로
            if (result_sect instanceof Error) {
                winston.error('****************** 부문 시스템과의 연결이 끊겼습니다. ******************');
                L005_FAIL.parseAndInsert(res);
            }

            if (res.body.list) {
                let k = res.body.result.total_page;
                if(k >= 2) {
                    for (let index = 2; index <= k; index++) {
                        value.body.page = index;
                        winston.info(index + ' 번 시도 *************************');

                        httpcall.Call('get', process.env.L005_ADDRESS, value, async function (err, res) {
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
                                CH_L005.parseAndInsert(res);
                                CH_L005_b.parseAndInsert(res);
                                L005.parseAndInsert(res);
                            }
                            else {
                                winston.error('************************* index: ' + index + '번 실패 *************************');
                            }
                        });
                        await timer(500);
                    }
                }
            }
            else {
                winston.error('************** L005 응답이 없습니다. *******************');
                if (num === 1){
                    return;
                }
                else {
                    winston.info('***************************** L005 2번째 시도 *****************************');
                    await L005_schedule(num - 1);
                }
            }
        })
};

exports.scheduleInsert = () => {
    schedule.scheduleJob(process.env.L005_TIME, async function() {
        await L005_schedule(1);
    })
};