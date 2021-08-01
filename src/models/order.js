const { Sequelize,  ModelCtor, Model} = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns {ModelCtor<Model>}
 */
function setupOrderModel (sequelize) {
    const Order = sequelize.define('order', {});
    return Order;
}

module.exports = setupOrderModel;