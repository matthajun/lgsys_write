const winston = require('../config/winston')(module);
const setDateTime = require('../utils/setDateTime');
const sequelize = require('sequelize');
const db = require('../models');

const {ClickHouse} = require('clickhouse');
const clickhouse = new ClickHouse({
    host: process.env.CH_ADDRESS,
    port: 8124,
    debug: false,
    basicAuth: null,
    isUseGzip: false,
    format: "json",
    config: {
        session_timeout                         : 30,
        output_format_json_quote_64bit_integers : 0,
        enable_http_compression                 : 0,
        database                                : 'dti',
    },
});

const tableName = process.env.CH_L005;

module.exports.parseAndInsert = async function(req) {
    let Array = [];
    let queries = [];

    if(req.body.list) {
        for (let list of req.body.list) {
            let req_body = {};
            req_body = {
                message_id: req.header.message_id, ...list,
                sent_time: req.body.sent_time,
                date_time: setDateTime.setDateTime()
            };
            Array.push(req_body);
        }
        for (let value of Array) {
            const contents = `${value.message_id}` + '\',\'' + `${value.normal_seq}` + '\',\'' + `${value.plant_id}` + '\',\'' + `${value.plant_name}`
                + '\',\'' + `${value.machine_no}` + '\',\'' + `${value.manufacturer_name}` + '\',\'' + `${value.log_type}` + '\',\'' + `${value.log_category}`
                + '\',\'' + `${value.format}` + '\',\'' + `${value.device_id}` + '\',\'' + `${value.device_name}` + '\',\'' + `${value.loged_time}` + '\',\'' + `${value.event_level}`
                + '\',\'' + `${value.type01}` + '\',\'' + `${value.type02}` + '\',\'' + `${value.type03}` + '\',\'' + `${value.code01}` + '\',\'' + `${value.code02}`
                + '\',\'' + `${value.code03}` + '\',\'' + `${value.value01}` + '\',\'' + `${value.value02}` + '\',\'' + `${value.value03}`
                + '\',\'' + `${value.value04}` + '\',\'' + `${value.value05}` + '\',\'' + `${value.value06}` + '\',\'' + `${value.value07}`
                + '\',\'' + JSON.stringify(value.event_info) + '\',\'' + `${value.stat_time}` + '\',\'' + `${value.sent_time}` + '\',\'' + `${value.date_time}`;

            const query = `insert into dti.${tableName} VALUES (\'${contents}\')`;
            queries.push(query);
        }
    }
    else{
        winston.error('****************** body.list가 없습니다. ******************************')
    }

    let rtnResult = {};
    try {

        const trans = await db.sequelize.transaction(async (t) => {
            winston.info("********************************************************************************");
            winston.info("******************* CH query start *************************");
            for (const query of queries) {
                const r = await clickhouse.query(query).toPromise();
            }
            winston.info("********************************************************************************");
            winston.info("******************* CH query end *************************");
        })

    } catch (error) {
        winston.error(error.stack);
        rtnResult = error;
    } finally {
        return rtnResult;
    }
};