const Sequelize = require('sequelize');

module.exports = class KDN_LGSYS_L017 extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            message_id: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'L017',
            },
            res_cd: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            res_msg: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            sent_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_LGSYS_L017',
            tableName: 'kdn_lgsys_L017',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};