const { DataTypes, Sequelize,  ModelCtor, Model} = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns {ModelCtor<Model>}
 */
function setupDetailModel (sequelize) {
    const Detail = sequelize.define('detail', {
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 100
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },{
        timestamps: false
    });
    return Detail;
}

module.exports = setupDetailModel;