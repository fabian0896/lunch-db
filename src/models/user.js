const { DataTypes, Sequelize,  ModelCtor, Model} = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns {ModelCtor<Model>}
 */
function setupUserModel (sequelize) {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        identification: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        cardId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    return User;
}

module.exports = setupUserModel;