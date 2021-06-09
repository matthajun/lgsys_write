const Sequelize = require('sequelize');

module.exports = class KDN_LGSYS_L006 extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            message_id: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            plant_id: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: 'local',
            },
            plant_name: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            machine_no: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            manufacturer_name: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            log_type: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            log_category: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            format: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            device_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            device_name: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            loged_time: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            type01: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            type02: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            type03: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            code01: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            code02: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            code03: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            value01: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            value02: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            value03: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            value04: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            value05: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            value06: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            value07: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            content01: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            content02: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            content03: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            raw: {
                type: Sequelize.TEXT,
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
            trans_tag: {
                type: Sequelize.STRING(5),
                allowNull: false,
                defaultValue: 'C',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_LGSYS_L006',
            tableName: 'kdn_lgsys_L006',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};