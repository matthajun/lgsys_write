const Sequelize = require('sequelize');

module.exports = class KDN_LGSYS_L002 extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            message_id: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            format: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: 'local',
            },
            type_count: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            code_count: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            value_count: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            content_count: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            desc: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            label: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            keywords: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            used: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            analyze: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            seq: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            sent_time: {
                type: Sequelize.STRING(20),
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
            modelName: 'KDN_LGSYS_L002',
            tableName: 'kdn_lgsys_L002',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
