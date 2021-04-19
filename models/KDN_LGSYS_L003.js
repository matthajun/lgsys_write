const Sequelize = require('sequelize');

module.exports = class KDN_LGSYS_L003 extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            no: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
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
            device_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            device_name: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            device_type: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            ip_address: {
                type: Sequelize.STRING(20),
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
            modelName: 'KDN_LGSYS_L003',
            tableName: 'kdn_lgsys_L003',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
