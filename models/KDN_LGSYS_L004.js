const Sequelize = require('sequelize');

module.exports = class KDN_LGSYS_L004 extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            message_id: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            res_cd: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            res_msg: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            contents: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            date_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            trans_tag: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'C',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_LGSYS_L004',
            tableName: 'kdn_lgsys_L004',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};