const { DataTypes, Sequelize,  ModelCtor, Model} = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns {ModelCtor<Model>}
 */
function setupProductModel (sequelize) {
    const Product = sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Product;
}

module.exports = setupProductModel;