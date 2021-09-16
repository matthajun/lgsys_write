const Sequelize = require('sequelize');

module.exports = class MOTIE_L005_HISTORY extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            message_id: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            stat_start_time: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            stat_end_time: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            page: {
                type: Sequelize.STRING(10),
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
            modelName: 'MOTIE_L005_HISTORY',
            tableName: 'motie_L005_history',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};