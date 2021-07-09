const Sequelize = require('sequelize');

module.exports = class MOTIE_FAIL_L011 extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            message_id: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            t_id: {
                type: Sequelize.STRING(70),
                allowNull: true,
            },
            seq: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            plant_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            machine_no: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            manufacturer_id: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            device_id: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            msg: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            loged_time: {
                type: Sequelize.STRING(30),
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
            modelName: 'MOTIE_FAIL_L011',
            tableName: 'motie_fail_L011',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};