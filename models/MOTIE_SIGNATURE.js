const Sequelize = require('sequelize');

module.exports = class MOTIE_SIGNATURE extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            column: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            keyword: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            description: {
                type: Sequelize.STRING(250),
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING(5),
                allowNull: true,
                defaultValue: 'C',
            },
            user: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            trans_tag: {
                type: Sequelize.STRING(5),
                allowNull: false,
                defaultValue: 'C',
            },
            dttm: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            deploy: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 20,
            },
            sanGubun:{
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'MOTIE_SIGNATURE',
            tableName: 'motie_signature',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};