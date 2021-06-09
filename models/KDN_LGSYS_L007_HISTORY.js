const Sequelize = require('sequelize');

module.exports = class KDN_LGSYS_L007_HISTORY extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            res_cd: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            res_msg: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            contents: {
                type: Sequelize.STRING(300),
                allowNull: true,
            },
            date_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_LGSYS_L007_HISTORY',
            tableName: 'kdn_lgsys_L007_history',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};