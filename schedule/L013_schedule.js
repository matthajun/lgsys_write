const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const makejson = require('../utils/makejson');
const CH_L005 = require('../clickhouse/L005');
const CH_L005_b = require('../clickhouse/L005_bumun');
const winston = require('../config/winston')(module);
const confirmutils = require('../utils/confirmutils');

const L005 = require('../service/L005');

async function L013_schedule(num) {
    let value = makejson.makeReqData_L013('L013');

    httpcall.Call('get', process.env.L013_ADDRESS, value,  async function (err, res) {
        if(res) {
            const resData = res;
            const resConfirmCode = resData.body.result.checksum;
            if (resConfirmCode) {
                const localMakeConfirmCode = await confirmutils.makeConfirmCode(resData.body.list);

                if (resConfirmCode !== localMakeConfirmCode) {
                    winston.error(`우리쪽 값 ${localMakeConfirmCode} ,  받은 값 ${resConfirmCode}`);
                    throw Error('************** CheckSum 값이 일치하지 않아 데이터를 저장하지 않습니다. **************');
                }
                winston.info(`단위위협시스템 값 ${localMakeConfirmCode} ,  로그시스템 값 ${resConfirmCode}`);
                winston.info('****************************** 정합성 코드가 일치합니다.*************************');
            }

            CH_L005.parseAndInsert(res);
            CH_L005_b.parseAndInsert(res);
            L005.parseAndInsert(res);
        }
        else {
            winston.error('************************* res 값이 없습니다. *************************');
            if (num === 1){
                return;
            }
            else {
                winston.info('**************************** L013 2번째 시도 ***************************');
                await L013_schedule(num - 1);
            }
        }
    })
}

exports.scheduleInsert = () => {
    schedule.scheduleJob(process.env.L005_TIME, async function() {
        await L013_schedule(2);
    })
};