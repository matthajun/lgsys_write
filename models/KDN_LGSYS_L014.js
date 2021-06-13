const Sequelize = require('sequelize');

module.exports = class KDN_LGSYS_L014 extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            message_id: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            device_id: {
                type: Sequelize.STRING(80),
                allowNull: true,
            },
            date_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'C',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_LGSYS_L014',
            tableName: 'kdn_lgsys_L014',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
