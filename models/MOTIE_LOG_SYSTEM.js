const Sequelize = require('sequelize');

module.exports = class MOTIE_LOG_SYSTEM extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            stationId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            powerGenId: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            assetNm: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            cpuNotice: {
                type: Sequelize.INTEGER(100),
                allowNull: true,
            },
            cpuWarning: {
                type: Sequelize.INTEGER(100),
                allowNull: true,
            },
            memoryNotice: {
                type: Sequelize.INTEGER(100),
                allowNull: true,
            },
            memoryWarning: {
                type: Sequelize.INTEGER(100),
                allowNull: true,
            },
            diskwarning: {
                type: Sequelize.INTEGER(100),
                allowNull: true,
            },
            diskNotice: {
                type: Sequelize.INTEGER(100),
                allowNull: true,
            },
            levelLow: {
                type: Sequelize.INTEGER(100),
                allowNull: true,
            },
            levelHight: {
                type: Sequelize.INTEGER(100),
                allowNull: true,
            },
            content: {
                type: Sequelize.STRING(250),
                allowNull: true,
            },
            fstUser: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            lstUser: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            fstDttm: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            lstDttm: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            state_level: {
                type: Sequelize.STRING(5),
                allowNull: false,
                defaultValue: 'C',
            },
            state_limit: {
                type: Sequelize.STRING(5),
                allowNull: false,
                defaultValue: 'C',
            },
            trans_tag:{
                type: Sequelize.STRING(5),
                allowNull: false,
                defaultValue: 'C',
            },
            stateValue:{
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: '200',
            },
            deploy:{
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 20,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'MOTIE_LOG_SYSTEM',
            tableName: 'motie_log_system',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};