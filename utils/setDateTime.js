const moment = require('moment');

module.exports.setDateTime = function () {
    return moment().format("YYYYMMDDHHmmss");
};

module.exports.setDateTime_ago = function (mm) {
    let a = moment().subtract(mm,'minutes');
    return a.format('YYYYMMDDHHmmss')
};

module.exports.changeFormat = function (time) {
    return moment(time).format('YYYYMMDDHHmmss')
};

module.exports.setDateTimeforHistory = function () {
    return moment().format("YYYY.MM.DD, HH:mm:ss");
};

module.exports.setDateTimeforInsert = function () {
    return moment().format("YYYY.MM.DD_HHmmssms");
};