const Sequelize = require('sequelize');

module.exports = class KDN_LGSYS_L012 extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            message_id: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            group_seq: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            plant_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            plant_name: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            machine_no: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            manufacturer_name: {
                type: Sequelize.STRING(30),
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
            device_id: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            device_name: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            first_loged_time: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            loged_time_from: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            loged_time_to: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            analysis_cycle: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            keyword_name: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            keyword_value: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            event_level: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            stat_time: {
                type: Sequelize.STRING(30),
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
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'C',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_LGSYS_L012',
            tableName: 'kdn_lgsys_L012',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};